import { useEffect } from "react"
import IProduct from "../../interface/IProduct"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DELETE_DATA , ProductContext, SET_DATA } from "../../context/Productprovider"


function Listproduct() {

  const {listProduct,dispatchProduct} = useContext(ProductContext);
  useEffect(()=>{
    fetch('http://localhost:3000/product')
      .then(data => {
        return data.json();
      })
      .then(data =>{
        // setList(data)
        dispatchProduct({type: SET_DATA, payload: data})
      })
    },[])




      // DELETE
  function deleteHandle(id: string) {
    window.confirm("do you want DELETE products now")
    fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then(data => {
        // setlist(list.filter(item => item.id != data.id));
        dispatchProduct({ type: DELETE_DATA, payload: id })
      })
      .catch(() => {
        console.log("xóa lỗi");

      })

  }

    return (

        <>

            <Link to="/admin/products/add">Thêm mới sản phẩm</Link>
        <div className="container mx-auto border-0 border-right-0  ">
        <table className="table col "  >
                <thead className=""> 
                    <tr className="mx-auto">
                        <th scope="col">ID</th>
                        <th scope="col"> Name</th>
                        <th scope="col">Price</th>
                        <th scope="col d-flex" >image</th>
                        <th scope="col"> mô tả </th>
                        <th scope="col"> Thao tac</th>
                    </tr>
                </thead>
                <tbody className="">
                    { listProduct.data.map((item:IProduct) => (
                    
                        <tr className="" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><img src={item.image} alt="" width={200} height={200} /></td>
                            <td className="">{item.dipscription}</td>
                           

                            <td className="d-flex">
                                <Link className="btn btn-primary mx-3" to={`/admin/products/edit/${item.id}`} >Sửa</Link>
                                <button className="btn btn-success" onClick={() => { deleteHandle(item.id!) }}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>



        </>




    )

}
export default Listproduct




