import axios from "axios";
import PackCard, { AnimatedCardProps } from "./PackCard";
import { BACKEND_URL } from "app/config";


async function getAllPacks() {
    const response = await axios.get(`${BACKEND_URL}/pack/bulk`)
    console.log(response.data.packs);
    return response.data.packs ?? [];

}


export async function Packs() {

    const packs = await getAllPacks()

    return <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {packs?.map((pack: AnimatedCardProps, index: number) => (
                <PackCard key={index} imageUrl={pack.imageUrl} name={pack.name} description={pack.description} />
            ))}
        </div>
    </main>
}