import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
type Input={
    name:string,
    email:string,
    password:number,
    PasswordConfirm:number
}

const Signup = () => {
    const navigater=useNavigate()
    const {register,handleSubmit,formState:{errors}, watch}=useForm<Input>()


    const onSubmit = (data: Input) => {
        console.log(data);
      const {name,email,password}=data;
      fetch('http://localhost:3000/register',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
      })
      .then(async(resData)=>{
        console.log(resData);
        if(resData.ok){
            navigater('/signin')
        }else{
            alert("loi r b ee")
            const message=await resData.json()
            return new Promise((resolve,reject)=>{
                reject(message)
        })
      }
        
    })
    .catch(err=>{
        alert("Loi"+err)
    })
}
  return (
    <div>
       <div className=" d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="border border-2 border-primary rounded p-3" style={{width: '600px'}}>
                <div className="d-flex justify-content-between m-3">
                    <Link className="text-decoration-none link-primary fs-5" to="/">Trang chủ</Link>
                    <Link className="text-decoration-none fw-semibold fs-5 btn btn-outline-primary" to="/signin">Đăng nhập</Link>
                </div>
                <h2 className="text-center">Đăng kí</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5" style={{height:'auto'}}>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" {...register("name",{
                            required:"Không được để trống Name",
                            minLength:{
                                value:2,
                                message:"nhập ít nhất 2 ký tự "
                            }
                        })} />
                                {errors.name && <span style={{ color: "red" }}>{errors.name?.message}</span>}

                    </div>

                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="Email"  {...register("email",{
                            required:"không được để trống email",
                            pattern:{
                                value:/^\S+@\S+\.\S+$/,
                                message:"khong dung dinh dang email"
                            }
                        })}/>
                             {errors.email && <span style={{ color: "red" }}>{errors.email?.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" {...register("password",{
                            required:"Khong dc de trong password",
                            minLength:{
                                value:6,
                                message:"khong nho hon 6 ky tu"
                            }
                        })} />
                          {errors.password && <span style={{ color: "red" }}>{errors.password?.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="PasswordConfirm" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="PasswordConfirm" {...register("PasswordConfirm",{
                        required: "Nhập lại thông tin mật khẩu",
                        validate: (value)=>{
                            if(value != watch('password')){
                                return "Không trùng mật khẩu"
                            }
                        }
                        })}/>
                         {errors.PasswordConfirm && <span style={{ color: "red" }}>{errors.PasswordConfirm?.message}</span>}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">Đăng kí</button>
                    </div>
                </form>

            </div>
        </div>

    </div>
  )
}

export default Signup
