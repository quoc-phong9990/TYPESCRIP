import { useState } from "react";
function Demo2() {



const [arr]=useState<string[]>(["hi1","hi2","hi3","hi4"])
const [girt,setgirt]=useState<string>('')
 function handleclickGirt(){
  const random=Math.floor(Math.random()*4);
  setgirt(arr[random])
 }


return (
  <>
    <div>
      <h1>{girt}</h1>
      <button onClick={handleclickGirt}>
        click me
      </button>
    </div>
    
  </>
)
}
export default Demo2