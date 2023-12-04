import { useState } from "react";
import { MdDelete } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { api } from "~/utils/api"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import CreateProduct from "./createProduct";

function EditProduct(data) {
    return (
      <Dialog onOpenChange={(e)=>{if(e==false) {data.refetcher()}}}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <CreateProduct/>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

export function ViewProduct() {
    const [deleted, setDeleted] = useState('')
    const { data: viewProducts, refetch } = api.product.getProducts.useQuery({ id: deleted });
    const deleteProductRoute = api.product.deleteByid.useMutation({onSuccess:()=>refetch()});
    console.log(viewProducts);
    function deleteProduct(id) {
        console.log(id)
        deleteProductRoute.mutate({ id: id })
    }
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {viewProducts ? (viewProducts.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.type}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell onClick={(e) => { deleteProduct(product.id) }}><MdDelete/></TableCell>
                        <TableCell> <EditProduct refetcher = {refetch}/> </TableCell>
                    </TableRow>
                )))
                    : <></>}

            </TableBody>
        </Table>
    )
}
