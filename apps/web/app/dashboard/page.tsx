import { GenerateImages } from "@/components/GenerateImages"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrainModel from "@/components/TrainModel"
import { Packs } from "@/components/Packs"

const page = () => {
    return (
        <div className="max-h-screen w-screen">
            <div className="pt-20">
                <Tabs defaultValue="account" className="h-20 flex justify-center w-full items-center">
                    <TabsList className="size-1/2">
                        <TabsTrigger value="generate">Generate Image</TabsTrigger>
                        <TabsTrigger value="model">Train Model</TabsTrigger>
                        <TabsTrigger value="packs">Packs</TabsTrigger>
                    </TabsList>
                    <TabsContent className="h-full" value="generate"><GenerateImages /></TabsContent>
                    <TabsContent className="h-full" value="model"><TrainModel /></TabsContent>
                    <TabsContent className="h-full" value="packs"><Packs /></TabsContent>
                </Tabs>
            </div>
        </div >
    )
}

export default page