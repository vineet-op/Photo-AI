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
                    <CloudUploadIcon className="w-16 h-16  text-neutral-400" />


                    <div className="w-full max-w-sm space-y-3 text-center">

                        <p className="text-xs text-neutral-500">
                        </p>
                    </div>

                    <div className="text-center space-y-4">
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

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
        </svg>
    );
}