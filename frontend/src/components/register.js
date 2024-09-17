import React, {useState} from "react";
import { useNavigate } from "react-router";
export default function Register(){
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

    await fetch ("http://localhost:3000/user/signup",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPerson),
    })
    .catch(error=>{
        window.alert(error);
        return;
    });
    setForm({name:"", password:""})
    navigate("/");
    return(
        <div>
            <h3>Register</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
                    />
                    </div>

                    <div>
                        <input
                        type="submit"
                        value="Create Person"
                        className="btn btn-primary"
                        />
                        </div>
            </form>
        </div>
    );
}
}