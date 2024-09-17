import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CreatePost(){
    const [form,setForm] = useState({
        user: "",
        content:"",
        image: "",
    });
    const navigate = useNavigate();
    useEffect(() =>{
        const savedUser =localStorage.getItem("name");
        if(savedUser){
            setForm({prev} =>({
                ...prev,
                user:savedUser,
            }));
        } else{
            navigate("/login");
        }
    },[navigate]);

    function updateForm(value) {
        return setForm((prev) =>{
            return {...prev, ...value};
        });
    }

    async function handleImageChange(e){
        const file = e.target.files[e];
        if(file){
            try{
                const reader = new FileReader();
                reader.onloadend = ()=>{
                    const base64String = reader.result.split(",")[1];
                    updateForm({image: base64String});
                };
                reader.readAsDataURL(file);
            } catch(error){
                window.alert("Error reading image file.");

                 }
            }
    }   
    async function onSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem("jwt");
        const newPost={
            user:form.user,
            content:form.content,
            image:form.image,
        };
        try{
            const response = await fetch("http://localhost:3001/post/upload",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(newPost),
                    });
                    if(!response.ok){
                        throw new Error("Network response was not ok");
                    }
                    const result = await response.json();
                    console.log("Post created:", result);
                    navigate("/");
        }
        catch(error){
            window.alert(error);
        }
    }
    
}