import React, {useState} from 'react'

export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    var onLogin=(e)=>{
        e.preventDefault();
        alert("Email"+ e.target[0].value+", Password :"+e.target[1].value);
        if(e.target[0].value === 'test@gmail.com' && e.target[1].value ==='123'){
            window.location.href = "/test";
        }
    }

    // var onClick =()=>{
    //     alert("Email : "+ email +", Password :"+password);
    // }
    return (
        <div >
            <form onSubmit={ onLogin }>
                {/* <p>{email} : {password}</p> */}
                <input 
                    type={"email"} placeholder={"Email"}
                    // onChange={(e)=>setEmail(e.target.value)}
                ></input><br/>
                <input type={"password"} placeholder={"Password"}
                    // onChange={(e)=>setPassword(e.target.value)}
                ></input><br/>
                <button 
                    type='submit'
                    // onClick={()=>onClick()}
                >Login</button>
            </form>
        </div>
    )
}
