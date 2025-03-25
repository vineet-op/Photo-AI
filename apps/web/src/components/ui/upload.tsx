"use client";

import JSZip from "jszip";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, CLOUDFLARE_URL } from "../../../app/config";


export function UploadModal({ onUploadDone }: {
    onUploadDone: (zipUrl: string) => void
}) {
    return (
        <Card className="w-full rounded-none border-none mx-auto shadow-none">
            <CardHeader className="border-b pb-4 px-0">
                <CardTitle className="md:text-xl text-sm font-semibold text-black-500">
                    Upload Modal Images
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    Supports multiple images upload
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-0">
                <div
                    className="flex justify-center items-center flex-col"
                >
                    <div className="text-center space-y-2">
                        <p className="text-neutral-500">
                            <span className="font-medium">Drag and drop files here</span> or
                        </p>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.multiple = true;
                                input.onchange = async () => {
                                    const zip = JSZip();
                                    const res = await axios.get(`${BACKEND_URL}/pre-signed-url`)
                                    const url = res.data.url
                                    const key = res.data.key
                                    if (input.files) {
                                        for (const file of input.files) {
                                            const content = await file.arrayBuffer();
                                            zip.file(file.name, content)
                                        }
                                        const content = await zip.generateAsync({ type: "blob" })
                                        const formData = new FormData();
                                        formData.append("file", content)
                                        formData.append("key", url)
                                        const res = await axios.put(url, formData)
                                        onUploadDone(`${CLOUDFLARE_URL}/${key}`)
                                    }

                                };
                                input.click();
                            }}
                        >
                            Browse Files
                        </Button>
                        <p className="text-xs text-neutral-500">
                            Supported formats: PNG, JPG, GIF
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
