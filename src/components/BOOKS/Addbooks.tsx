import  { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import IBook from '../../interface/IBook'
import { BookContext,ADD_DATA } from '../../context/BookProvider'


type Inputs = {

  id?: string,
  title: string
  author: string
  year: number
  sale: boolean
  category: string
}
const Addbooks = () => {
  const { dispatchBook } = useContext(BookContext);
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<Inputs>()

  function addHandle(data: IBook) {
    fetch('http://localhost:3000/books/', {
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
        dispatchBook({ type: ADD_DATA, payload: newData });
        navigate('/admin/books'); // Corrected spelling here
        console.log(newData);
      })
      .catch(() => {
        console.log("có lỗi khi thêm");
      });
  }

  const onSubmit = (data: Inputs) => {
    addHandle(data);
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

export default Addbooks
