import { useNavigate, useParams } from "react-router-dom"
import IProduct from "../../interface/IProduct"
import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react";
import { ProductContext,EDIT_DATA } from "../../context/Productprovider";


type Input = {
  id?:string,
  name:string
  price:number
  image:string
  dipscription:string
}
function ProductEdit(){
    const {dispatchProduct} = useContext(ProductContext);
    const { id } = useParams();
    const navigate=useNavigate();


    const {
        register,
        handleSubmit,
        reset
    } = useForm<Input>();

    useEffect(() => {
        fetch(`http://localhost:3000/product/${id}`)
            .then(data => {
                return data.json();
            })
            .then(newdata => {
                reset(newdata)
            })
    }, [id]);
    function updateHandle(id: string, data: IProduct){
        // console.log({id, data});
        fetch(`http://localhost:3000/product/${id}`,{
          method: "PUT",
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(data)
        })
        .then(data=>{
          return data.json();
        })   
        .then(newData=>{

          dispatchProduct({type: EDIT_DATA, payload: newData})
        })
        .catch(()=>{
          console.log("Có lỗi khi sửa");

        })
    }

    function onSubmit(data: Input){
    
        updateHandle(id!,data);
        navigate("/admin/products");
    }

  

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Tên sản phẩm</label>
            <input type="text" {...register("name")} />
            <label htmlFor="">Giá</label>
            <input type="number" {...register("price")} />
            <label htmlFor="">Dipscription</label>
            <input type="text" {...register("dipscription")} />
            <button type="submit">Gửi</button>
        </form>



    )


}

export default ProductEdit

