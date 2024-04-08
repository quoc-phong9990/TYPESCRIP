
import { useEffect, useState } from "react"
import IProduct from "../interface/IProduct"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DELETE_DATA, ProductContext, SET_DATA } from "../context/Productprovider"



const Home = () => {
    const [user, setUser] = useState(sessionStorage.getItem('user'))
    const { listProduct, dispatchProduct } = useContext(ProductContext);
    useEffect(() => {
        fetch('http://localhost:3000/product')
            .then(data => {
                return data.json();
            })
            .then(data => {
                // setList(data)
                dispatchProduct({ type: SET_DATA, payload: data })
            })
    }, [])



    return (


        <div className="homepage">

            <div className="header">
                <img src="./image/HotCoffee.png" alt="" />
               


                <div className="link">

                    <div>
                        {
                            user ?
                                <>
                                    
                                        <span className="text-danger">Xin chào {user}</span>
                                    
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signup">Đăng kí</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signin">Đăng nhập</Link>
                                    </li>
                                </>
                        }
                    </div>

                    <a href="Signin">signin</a>
                    <a href="Signup">signup</a>
                    <a href="">Home</a>
                    <a href="">Articles</a>
                    <a href="page2.html">page2</a>

                </div>
            </div>

            <div className="banner mx-auto">
                <img src="./image/Head-section.png" alt="" />

                <div className="bannermeo">
                    <div className="card">
                        <img src="./image/Avatar-cute-meo.jpg" alt="" />
                        <div className="head">meo1</div>
                    </div>
                    <div className="card">
                        <img src="./image/Avatar-cute-meo.jpg" alt="" />
                        <div className="head">meo2</div>
                    </div>
                    <div className="card">
                        <img src="./image/Avatar-cute-meo.jpg" alt="" />
                        <div className="head">meo3</div>
                    </div>
                    <div className="card">
                        <img src="./image/Avatar-cute-meo.jpg" alt="" />
                        <div className="head">meo4</div>
                    </div>
                    <div className="card">
                        <img src="./image/Avatar-cute-meo.jpg" alt="" />
                        <div className="head">meo5</div>
                    </div>
                </div>
            </div>

            <div className="conten1">
                <div className="right">
                    <h2>long established</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is that....</p>

                    <div className="remo">
                        <p>May 20th 2020</p>
                        <h4>Read more</h4>
                    </div>

                </div>

                <div className="left">
                    <img src="/image/image 1.png" alt="" width="500px" />
                </div>

            </div>
            <div className="conten2 container-xl d-flex flex-wrap justify-content-between">
                {listProduct.data.map((item: IProduct) => (
                    <div key={item.id} className='listhome col-md-2 mb-4   ' >
                        <p><img src={item.image} width={200} height={200} /></p>

                        <Link to={`/detail/${item.id}`}><h4>{item.name}</h4></Link>

                        <h5 className='text-danger'>{item.price} $</h5>
                        <p>{item.dipscription}</p>
                    </div>
                ))}
            </div>
            <div className="content3">
                <div className="right3">
                    <h1>What is Lorem Ipsum?</h1>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution...
                    </p>

                    <div className="remo3">
                        <p>May 20th 2020</p>
                        <h4>Read more</h4>
                    </div>

                </div>

                <div className="left">
                    <img src="./image/image 7.png" alt="" width="600px" height="500px" />
                </div>

            </div>

            <div className="nut">
                <button>See more <img src="./image/Vector.png" alt="" /></button>

            </div>

            <p className="ke"></p>
            <div className="footer">
                <h4>hotcoffee</h4>
                {/* <P> 2020 copyright all rights reserved</P> */}
                <div className="dh">
                    <img src="./image/instagram-fill 1.png" alt="" />
                    <img src="./image/Vector (1).png" alt="" />
                    <img src="./image/linkedin-box-fill 1.png" alt="" />
                </div>
            </div>


        </div>

    )
}

export default Home
