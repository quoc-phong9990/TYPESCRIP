import { useEffect } from "react"

function DemoUseface1(){
    useEffect(()=>{
        fetch(' http://localhost:3000/product')
        .then (data=>{
            return data.json()
        })
        .then(data=>{
            console.log(data);
            
        })
    })





}
export default DemoUseface1