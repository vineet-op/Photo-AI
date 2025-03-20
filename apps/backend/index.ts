import express from "express"
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"
import { prisma } from "db"
import { S3Client } from "bun"
import { FaLAIModel } from "./model/FalAIModel"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const USER_ID = "User123"

const FalAiModel = new FaLAIModel()

app.get("/pre-signed-url", async (req, res) => {

    const key = `models/${Date.now()}_${Math.random()}.zip`
    const url = S3Client.presign(key, {
        method: "PUT",
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET,
        expiresIn: 60 * 5,
        type: "application/zip"
    });

    res.json({
        url,
        key
    })
})

app.post("/ai/training", async (req, res) => {


    const parsedBody = TrainModel.safeParse(req.body)
    const images = req.body.images


    if (!parsedBody.success) {
        res.json({
            message: "Input Incorrect"
        })
        return

    }
    const { request_id, response_url } = await FalAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data?.name)

    const data = await prisma.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: USER_ID,
            falAiRequestId: request_id,
            zipUrl: parsedBody.data.zipUrl,
        }
    })

    res.json({
        modelId: data.id
    })
})

app.post("/ai/generate", async (req, res) => {

    const parsedBody = GenerateImage.safeParse(req.body)

    if (!parsedBody.success) {
        res.json({
            message: "Input Incorrect"
        })
        return
    }

    const model = await prisma.model.findUnique({
        where: {
            id: parsedBody.data.modelId
        }
    })

    if (!model || !model.tensorPath) {
        res.json({
            message: "Model not found"
        })
        return
    }

    const { request_id, response_url } = await FalAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath)

    const data = await prisma.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiRequestId: request_id,
        }
    })

    res.json({
        imageId: data.id
    })


})

app.post("/pack/generate", async (req, res) => {

    const parsedBody = GenerateImageFromPack.safeParse(req.body)

    if (!parsedBody.success) {
        res.json({
            message: "Input Incorrect"
        })
        return
    }

    const prompts = await prisma.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId
        }
    })

    let requestIds: { request_id: string }[] = await Promise.all(prompts.map(prompt => FalAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)))

    const images = await prisma.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiRequestId: requestIds[index].request_id

        }))
    })

    res.json({
        images: images.map((image) => image.id)
    })


})

app.get("/pack/bulk", async (req, res) => {

    const packs = await prisma.packs.findMany({})

    res.json({
        packs
    })

})

app.get("/image/bulk", async (req, res) => {
    const ids = req.query.ids as string[]
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";

    const imagesData = await prisma.outputImages.findMany({
        where: {
            id: { in: ids },
            userId: USER_ID
        },
        skip: parseInt(offset),
        take: parseInt(limit),
    })

    res.json({
        images: imagesData
    })
})

app.post("/fal-ai/webhook/train", async (req, res) => {

    const requestId = req.body.request_id

    await prisma.model.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            trainingStatus: "Success",
            tensorPath: req.body.tensor_path

        },
    })

    res.json({
        message: "Webhook received"
    })
})


app.post("/fal-ai/webhook/image", async (req, res) => {


    const requestId = req.body.request_id

    await prisma.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            status: "Success",
            imageUrl: req.body.image_url

        },
    })

    res.json({
        message: "Webhook received"
    })
})

app.listen(8000, () => {
    console.log("Server is running on port 8000")
})