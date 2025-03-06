
import { z } from "zod"




export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["men", "women", "other"]),
    age: z.number(),
    ethinicity: z.enum(["White",
        "Black",
        "Asian American",
        "East Asian",
        "South East Asian",
        "South Asian",
        "Middle Eastern",
        "Pacific",
        "Hispanic"]),

    eyeColor: z.enum(["Brown", "Blue", "Hazel", "Grey"]),
    bald: z.boolean(),
    images: z.array(z.string())

})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})


export const GenerateImageFromPack = z.object({
    modelId: z.string(),
    packId: z.string(),
})