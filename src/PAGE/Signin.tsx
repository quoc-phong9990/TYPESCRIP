import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

type Input ={
    email: string,
    password: string
}
const Signin = () => {
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm<Input>()

    function onSubmit(data: Input){
        // console.log(data);
        fetch("http://localhost:3000/login",{
            method: "POST",
            headers:{
                "Content-Type": 'Application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async(resData)=>{
            // console.log(resData);
            if(resData.ok){
                return resData.json();
            }else{
                const message = await resData.json();
                return new Promise((resolve, reject)=>{
                    reject(message)
                })
            }
        })
        .then(resData=>{
            // console.log(resData);
            if(resData.accessToken){
                localStorage.setItem('token', resData.accessToken);
                sessionStorage.setItem('user', resData.user.name);
                navigate('/home');
            }
        })
        .catch(err=>{
            alert("lỗi: "+ err)
        })
    }
  return (
    <div>
     <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="border border-2 border-primary rounded p-3" style={{width: '600px'}}>
                <div className="d-flex justify-content-between m-3">
                    <Link className="text-decoration-none link-primary fs-5" to="/">Trang chủ</Link>
                    <Link className="text-decoration-none fw-semibold fs-5 btn btn-outline-primary" to="/signup">Đăng kí</Link>
                </div>
                <h2 className="text-center">Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5" style={{height:'auto'}}>

                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input {...register("email")} type="email" className="form-control" id="Email"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input {...register("password")} type="password" className="form-control" id="Password"/>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">Đăng nhập</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Signin
