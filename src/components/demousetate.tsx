import { useState } from "react"

function DemouseState() {

    const [count, setcount] = useState(0)

    function handleclick() {
        setcount((pre) => {
            return pre + 1
        })
    }
    return (
        <>
                <div>
        <h1>{count}</h1>
        <button onClick={handleclick}>
          click me
        </button>
      </div>

        </>
    )

}
export default DemouseState