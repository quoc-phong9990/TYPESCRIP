import { useContext, useReducer } from "react"
import ListUser from "./USER/listUser"
import IUser from "../interface/IUser"
import ProductList from "./PRODUCT/productList"
import { CountContext } from "../context/CountProvider"



type propCount = {}

const initData = {
    ListUser: [] as IUser[],
    isLoading: true as boolean
}
function reducerData(state: any, action: any) {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "DONE":
            return {
                ...state,
                listProduct: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}


function reducer(state: any, action: any) {
    switch (action) {
        case "ADD":
            return state + 1

        case "DELETE":
            return state - 1

        case "RESET":
            return 0


        default:
            return state

    }

}


function reducer2(state: any, action: any) {
    switch (action.type) {
        case "GAN":
            return action.payload

        default:
            return state;
    }
}

function Count(_prop: propCount) {
    // const{name}=useContext(CountContext)
    const {count ,dispatch}=useContext(CountContext)
    console.log(name);
    // const[count,setcount]=useState(0);
    // const [count1, dispatch1] = useReducer(reducer, 0)
    const [count2, dispatch2] = useReducer(reducer2, 0)
    const [data, dispatchData] = useReducer(reducerData, initData)


    function handleGetData() {
        // tạo Loading
        dispatchData({ type: "LOADING" });

        // call api để dữ liệu
        setTimeout(() => {
            fetch("http://localhost:3000/user")
                .then(data => data.json())
                .then(newData => {
                    dispatchData({ type: "DONE", payload: newData })
                })
                .catch(() => {
                    console.log("lỗi");

                })
        }, 2000)
    }
    return (
        <>
            <div>
                <h1 >count {count}</h1>
                <button className="btn btn-secondary" onClick={() => { dispatch("ADD") }}>tang </button>
                <button className="btn btn-warning" onClick={() => { dispatch("DELETE") }}>giam </button>
                <button className="btn btn-info" onClick={() => { dispatch("RESET") }}>ve gia tri ban dau </button>
            </div>
            {/* demo reducer1 */}
            <div>
                <h1>count2 :{count2}</h1>
                <button className="btn btn-secondary" onClick={() => {
                    dispatch2({
                        type: "GAN",
                        payload: 10,

                    })
                }}>gan gia tri cos object </button>
            </div>

            {/* reducer 2 */}
            <div>
                <button onClick={handleGetData} className="btn btn-primary">Lấy dữ liệu</button>

                {data.isLoading ? <
                    h1>Loading ....</h1> :
                    <div>{<ProductList listData={data.listProduct} onDelete={() => { }} />}</div>}
            </div>

   


            </>
        )
}



export default Count