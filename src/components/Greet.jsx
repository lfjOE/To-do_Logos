import { useState } from "react"

export default function Greet(){
    const [visitor, setVisitor] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false)
    
    return(
        <>
            <label htmlFor="">Please input your name</label>
            
            <input type="text" id="name" onChange={(e) => setVisitor(e.target.value)}/>
            <button onClick={() => setHasSubmitted(true)}>Submit</button>
            {hasSubmitted &&
                <h1>Hello there {visitor}, how are you?</h1>
            }
            
        </>
    )
}