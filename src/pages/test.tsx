import { useState } from "react"
import { api } from "~/utils/api"

export default function Kitsoz() {
    const [number, setNumber] = useState(0)
    const [text, setText] = useState('')
    const { data: getProducts, refetch } = api.product.getProducts.useQuery({ id: '' });
    console.log(getProducts);

    return <>
        {number}
        <button onClick={() => setNumber(number + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Increment</button>
        <button onClick={() => setNumber(number - 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Decrement</button>
        <input type="text" onChange={(e) => setText(e.target.value)}></input>
        <div>{text}</div>
    </>
}