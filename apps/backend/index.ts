import express from "express"
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"
import { prisma } from "db"

const app = express()

app.use(express.json())

const USER_ID = "User123"

app.post("/ai/training", async (req, res) => {


    const parsedBody = TrainModel.safeParse(req.body)

    if (!parsedBody.success) {
        res.json({
            message: "Input Incorrect"
        })
        return
    }

    const data = await prisma.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: USER_ID
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

    const data = await prisma.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
        }
    })

    res.json({
        modelId: data.id
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

    const images = await prisma.outputImages.createManyAndReturn({
        data: prompts.map((prompt) => ({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: ""
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


app.listen(8000, () => {
    console.log("Server is running on port 8000")
})