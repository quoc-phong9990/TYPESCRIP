import { useForm } from "react-hook-form";
import IProduct from "../../interface/IProduct";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ADD_DATA, ProductContext } from "../../context/Productprovider";

type Input = {
    id?:string,
    name:string
    price:number
    image:string
    dipscription:string
}

function ProductAdd() {
    const { dispatchProduct } = useContext(ProductContext);
    const navigate = useNavigate(); // Corrected spelling here

    const { register, handleSubmit } = useForm<Input>();

    function addHandle(data: IProduct) {
        fetch('http://localhost:3000/product/', {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected content type
            },
            body: JSON.stringify(data)
        })
            .then(newData => {
                return newData.json();
            })
            .then(newData => {
                dispatchProduct({ type: ADD_DATA, payload: newData });
                navigate('/admin/products'); // Corrected spelling here
            })
            .catch(() => {
                console.log("có lỗi khi thêm");
            });
    }

    const onSubmit = (data: Input) => {
        addHandle(data);
    }

    return (
        <>
            <form className="border ml-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                <label  htmlFor="">Tên sản phẩm</label>
                <input className="form-control" type="text" {...register("name")} />
                </div>

                <div className="form-group">
                <label  htmlFor="">Giá</label>
                <input className="form-control" type="number" {...register("price")} />
                </div>

                <div className="form-group">
                <label htmlFor="">Image</label>
                <input className="form-control" type="text" {...register("image")} />
                </div>

               <div className="form-goup">
               <label  htmlFor="">Dipscription</label>
             
                <textarea  id="" cols={30} rows={10} {...register("dipscription")} ></textarea>
               </div>

                <button className="btn btn-primary" type="submit">  ADD </button>
            </form>
        </>
    )
}

export default ProductAdd;
