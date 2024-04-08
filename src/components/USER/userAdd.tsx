import { useNavigate } from "react-router-dom";
import IUser from "../../interface/IUser";
import { useForm } from "react-hook-form";
import { ADD_DATAUS,UserContext } from "../../context/UserProvider";
import { useContext } from "react";


// Define the type for the input data
type Input = {
    id?:string,
    firtName:string
    lastName: string
    age:number;
    title:string
    email:string;
    gender:string
}



function UserAdd() {
    const { dispatchUser } = useContext(UserContext);

    const navigater = useNavigate();
    const { register, handleSubmit,formState:{errors} } = useForm<Input>();


    function addUser(dataus: IUser) {
          fetch('http://localhost:3000/user', {
            method: "POST",
            headers: {
              'Content-Type': "Application/json"
            },
            body: JSON.stringify(dataus)
          })
            .then(newData => {
              return newData.json();
            })
            .then(newData => {
              // setlist([...listus, newData]);
              dispatchUser({type:ADD_DATAUS, payload:newData})
            
            
            })
            .catch(() => {
              console.log("loi roi nhe");
              alert("gap loi roi ban oi")
            })
        }


    // Define the onSubmit function
    const onSubmit= (dataus:Input) => {
        addUser(dataus)
        navigater('user/list');
    
     
    }


    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group">
        <label htmlFor="firtName">First Name</label>
        <input type="text" className="form-control" {...register("firtName", {
            required: "Không được để trống First Name",
            minLength: {
                value: 2,
                message: "Nhập ít nhất 2 ký tự"
            }
        })} />
        {errors.firtName && <span style={{ color: "red" }}>{errors.firtName?.message}</span>}
    </div>

    <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" className="form-control" {...register("lastName", {
            required: "Không được để trống Last Name",
            minLength: {
                value: 2,
                message: "Nhập ít nhất 2 ký tự"
            }
        })} />
        {errors.lastName && <span style={{ color: "red" }}>{errors.lastName?.message}</span>}
    </div>

    <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="text" className="form-control" {...register("age", {
            min: {
                value: 1,
                message: "Tuổi phải lớn hơn 1"
            },
            max: {
                value: 100,
                message: "Tuổi phải nhỏ hơn 100"
            }
        })} />
        {errors.age && <span style={{ color: "red" }}>{errors.age?.message}</span>}
    </div>

    <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" className="form-control" {...register("email", {
            pattern: {
                value: /^\S+@\S+\.\S+$/, //regex email
                message: "Email không hợp lệ"
            }
        })} />
        {/* {errors.email && <span style={{ color: "red" }}>{errors.email?.message}</span>} */}
    </div>

    <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <input type="text" className="form-control" {...register("gender", {
            required: "Không được để trống Gender",
            minLength: {
                value: 2,
                message: "Nhập ít nhất 2 ký tự"
            }
        })} />
        {errors.gender && <span style={{ color: "red" }}>{errors.gender?.message}</span>}
    </div>

    <button type="submit" className="btn btn-success">ADD</button>
</form>

        </>
    );
}

export default UserAdd;
