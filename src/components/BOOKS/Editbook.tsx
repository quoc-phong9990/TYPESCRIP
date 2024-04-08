import { useContext, useEffect } from "react"
import { BookContext,EDIT_DATA } from "../../context/BookProvider"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import IBook from "../../interface/IBook"


 type Input={
  id?: string,
  title: string
  author: string
  year: number
  sale: boolean
  category: string
 }
 
 function Editbook(){
  const {dispatchBook} = useContext(BookContext);
  const { id } = useParams();
  const navigate=useNavigate();


  const {
      register,
      handleSubmit,
      reset
  } = useForm<Input>();

  useEffect(() => {
      fetch(`http://localhost:3000/books/${id}`)
          .then(data => {
              return data.json();
          })
          .then(newdata => {
              reset(newdata)
          })
  }, [id]);
  function updateHandle(id: string, data: IBook){
      // console.log({id, data});
      fetch(`http://localhost:3000/books/${id}`,{
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

        dispatchBook({type: EDIT_DATA, payload: newData})
        console.log(data);
      })
      .catch(()=>{
        console.log("Có lỗi khi sửa");

      })
  }

  function onSubmit(data: Input){
  
      updateHandle(id!,data);
      navigate("/books");
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group">
      <label >TITLE</label>
      <input type="string" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" {...register("title")} />
    </div>

    <div className="form-group">
      <label >AUTHOR</label>
      <input type="string" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter author" {...register("author") }/>
    </div>

    <div className="form-group">
      <label >YEAR</label>
      <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter year" {...register("year") } />
    </div>


    <div className="form-group">
      <label >SALE</label>
      <input type="boolean" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter sale" {...register("sale") }  />
    </div>

    <div className="form-group">
      <label >Category</label>
      <select multiple className="form-control" id="exampleFormControlSelect2" {...register("category") } >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>




    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" >Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>






  )


}

export default Editbook



