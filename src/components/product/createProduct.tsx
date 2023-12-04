
import * as React from "react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import type { FormEvent } from "react"
import toast, { Toaster } from 'react-hot-toast';
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

import { api } from "~/utils/api"
export default function CreateProduct(updateData: { id?: string }) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('');
    const updateProduct = api.product.updateById.useMutation({
        onSuccess: (updated) => {
            toast.success("Updated " + updated.name + " product");
            setName('')
            setPrice(0)
            setType('')
        }
    });
    const createProduct = api.product.create.useMutation({
        onSuccess: (newProduct) => {
            toast.success('Product ' + newProduct.name + ' Created');
            setName('')
            setPrice(0)
            setType('')
        }
    });

    function submitHandler(e: FormEvent) {
        e.preventDefault()
        if (updateData.id) {
            updateProduct.mutate({
                id: updateData.id,
                name: name,
                price: price,
                type: type
            })
        } else {
            createProduct.mutate({
                name: name,
                price: price,
                type: type
            })
        }

    }
    return (
        <form onSubmit={submitHandler}>
            <Toaster />
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input type="number" id="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="type">Type</Label>
                            <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="Name of your project" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </form>)
}



