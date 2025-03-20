"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { UploadModal } from '@/components/ui/upload'
import axios from 'axios'
import { BACKEND_URL } from 'app/config'
import { TrainModelInput, GenerateImageFromPackInput, GenerateImageInput } from "common/inferred"
import { useRouter } from 'next/navigation'


const page = () => {

    const handleUpload = () => {

    }

    const uploadProgress = () => {

    }

    const isUploading = () => {

    }




    const [zipUrl, setZipUrl] = useState("")
    const [name, setName] = useState<string>("");
    const [type, setType] = useState("Man");
    const [age, setAge] = useState<string>();
    const [eyeColor, setEyeColor] = useState<string>("")
    const [ethnicity, setEthnicity] = useState<string>("");
    const [bald, setbald] = useState(false)
    const router = useRouter()



    const TrainModel = async () => {

        const input = {
            zipUrl,
            name,
            type,
            eyeColor,
            age: parseInt(age ?? "0"),
            ethnicity,
            bald
        }

        const response = await axios.post(`${BACKEND_URL}/ai/training`, input)
        router.push("/")

    }


    return (
        <div className='flex flex-col justify-center items-center max-h-screen m-20'>
            <Card className="w-[350px] py-4">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input onChange={(e) => setName(e.target.value)}
                                id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Type</Label>
                            <Select onValueChange={(value) => { setType(value) }}>
                                <SelectTrigger id="framework" className='w-full'>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Men">Men</SelectItem>
                                    <SelectItem value="Women">Women</SelectItem>
                                    <SelectItem value="Others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Age</Label>
                            <Input onChange={(e) => setAge(e.target.value)} type="number" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Ethnicity</Label>
                            <Select onValueChange={(value) => { setEthnicity(value) }}>
                                <SelectTrigger id="framework" className='w-full'>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="White">White</SelectItem>
                                    <SelectItem value="Black">Black</SelectItem>
                                    <SelectItem value="Asian_American">Asian American</SelectItem>
                                    <SelectItem value="East_Asian">East Asian</SelectItem>
                                    <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                                    <SelectItem value="South_Asian">South Asian</SelectItem>
                                    <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                                    <SelectItem value="Pacific">Pacific</SelectItem>
                                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">EyeColor</Label>
                            <Select onValueChange={(value) => { setEyeColor(value) }} >
                                <SelectTrigger id="framework" className='w-full'>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Blue">Blue</SelectItem>
                                    <SelectItem value="Brown">Brown</SelectItem>
                                    <SelectItem value="Hazel">Hazel</SelectItem>
                                    <SelectItem value="Gray">Gray</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='pt-5 flex gap-2 items-center '>
                        <Label htmlFor="framework">Bald</Label>
                        <Switch onClick={(e) => {
                            setbald(!bald)
                        }} className='mt-1' />
                    </div>
                    <UploadModal onUploadDone={(zipUrl) => {
                        setZipUrl(zipUrl)
                    }} />
                </CardContent>
                <CardFooter className="flex justify-between" >
                    <Button className='cursor-pointer bg-white text-black' variant={"outline"} onClick={() => router.push("/")}>Cancel</Button>
                    <Button className='cursor-pointer' onClick={TrainModel}>Create Model</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page