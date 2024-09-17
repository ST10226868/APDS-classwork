import React, {useState} from "react";
import { useNavigate } from "react-router";
import { unstable_usePrompt } from "react-router-dom";
export default function Login(){
    const [form,setForm]= useState({
        name:"",
        password:"",
    });
const navigate = useNavigate();
function updateForm(value){
    return setForm((prev)=>{
        return {...prev,...value};
    });
}
async function onSubmit(e) {
    e.preventDefault();

    const newPerson = {...form};

    const response= await fetch ("http://localhost:3000/user/signup",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPerson),
    })
   .catch(error=>{
    window.alert(error);
   });
   const data = await response.json();
   const {token,name} =data;
   console.log(name + " " + token)

   localStorage.setItem("jwt", token);
   localStorage.setItem("name", name);
   setForm({name: "", password: ""});
   navigate("/");
}
return (
    <div>
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label for="name">Name:</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label for="password">Password:</label>
                <input
                type="text"
                className="form-control"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({password: e.target.value})}
                 />              
            </div>
        </form>
    </div>
);
}