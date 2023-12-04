import { useTheme } from "next-themes";
import CreateProduct from "~/components/product/createProduct";
import { ViewProduct } from "~/components/product/viewProduct";
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"
export default function Home() {
const {theme, setTheme}= useTheme()
console.log (theme)
    return (
        <>
        {/* {theme == "light"? <Button onClick={(e)=>setTheme('dark')}>Dark</Button>: <Button onClick={(e)=>setTheme('light')}>Light</Button> } */}
            <Tabs defaultValue="account" className="w-[1200px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Create Product</TabsTrigger>
                    <TabsTrigger value="password">View Product</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <CreateProduct />
                </TabsContent>
                <TabsContent value="password">
                    <ViewProduct />
                </TabsContent>
            </Tabs>
        </>
    )
}