import { useNavigate, useParams } from "react-router-dom"
import IUser from "../../interface/IUser"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import{EDIT_DATAUS,UserContext} from"../../context/UserProvider"



type Input = {
  id?:string,
  firtName:string
  lastName: string
  age:number;
  title:string
  email:string;
  gender:string
}

function Useredit() {
    const {dispatchUser} = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset
    } = useForm<Input>();

    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`)
            .then(response => response.json())
            .then(userData => {
                reset(userData)
                console.log( userData);
            })
    }, [id]);

      // //  UPDATE
  function userupdateHandle(id: string, dataus: IUser) {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(dataus)
    })
      .then(dataus => {
        return dataus.json();
      })
      .then(newData => {
   
        dispatchUser({type:EDIT_DATAUS, payload:newData})
      
      })
      .catch(() => {
        console.log("Có lỗi khi sửa");

      })

  }
    function onSubmit(dataus: Input) {
        userupdateHandle(id!, dataus)
        navigate("/user");
     
         
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
         
            <label  htmlFor="firstName" >First Name</label>
            <input type="text" className="form-control" {...register("firtName")} />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" {...register("lastName")} />

            <label htmlFor="age">Age</label>
            <input type="text" className="form-control" {...register("age")} />

            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" {...register("email")} />

            <label htmlFor="gender">Gender</label>
            <input type="text" className="form-control" {...register("gender")} />

            <button type="submit">Submit</button>
        </form>
    )
}

export default Useredit
