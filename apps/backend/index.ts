import express from "express"
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"
import { prisma } from "db"

const app = express()

app.use(express.json())

app.post("/ai/training", (req, res) => {
    res.send("Contact us from GET endpoint")
})

app.post("/ai/generate", (req, res) => {
    res.send("Data submitted successfully from POST endpoint")
})

app.post("/pack/generate", (req, res) => {
    res.send("Data updated successfully from POST endpoint")
})

app.get("/pack/bulk", (req, res) => {
    res.send("Hello from GET endpoint")
})

app.get("/image", (req, res) => {
    res.send("About page from GET endpoint")
})


app.listen(8000, () => {
    console.log("Server is running on port 8000")
})