import { Link } from "react-router"
import { useParams } from "react-router"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from '/supabaseclient';

export default function About() {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const navigate = useNavigate()

    let session = localStorage.getItem("Session")
    useEffect(() => {
        if(session){
            navigate("/App")
            setemail("")
            setpassword("")
             return
           }
        
      }, []);

    const logIn = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) throw error
        if (error) {
            alert("Invalid input")
        }
        if (data) {
            console.log(data)
            console.log(data.user)
            navigate("/App")
            localStorage.setItem("Session" ,JSON.stringify(data.user) )
            console.log(localStorage.getItem("Session"))
            setemail("")
            setpassword("")
        }
    }

    return (
        <>
   
            <div >
                <h1>Log In Page</h1>

                <div style={{ height: "400px", width: "300px", border: "2px solid black", borderRadius: "10px" }}>
                    <div style={{ marginTop: "60px" }}>
                        <label htmlFor="email" ><b style={{ marginRight: "200px" }}>Email</b></label>
                        <br></br>
                        <input type="email" onChange={(e) => (setemail(e.target.value))} value={email} id="email" placeholder="Enter your email" style={{ height: "40px", width: "80%", paddingLeft: "10px", border: "2px solid black", borderRadius: "5px", marginTop: "5px" }} />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <label htmlFor="password" ><b style={{ marginRight: "180px" }}>Password</b></label>
                        <br></br>
                        <input type="password" id="password" onChange={(e) => (setpassword(e.target.value))} placeholder="Enter your password" style={{ height: "40px", border: "2px solid black", width: "80%", paddingLeft: "10px", borderRadius: "5px", marginTop: "5px" }} />
                    </div>
                    <button onClick={logIn} style={{ marginTop: "40px" , marginBottom: "20px", backgroundColor: "darkblue" , color: "white", borderRadius: "10px", padding: "10px 100px" }}>
                        Log In
                    </button>
                    <div>
                    <span>Dont have an account?</span>
                <Link to={"/"}>
                    <span>Sign Up</span>
                </Link>
                    </div>
                </div>
                
            </div>
        
        </>
    )
}

// let data;
// export function AboutItems() {
//     const { id } = useParams();
//     const [users, setUsers] = useState([])
//     useEffect(() => {
//         const fetchdata = async () => {
//             const response = await fetch(`https://fakestoreapi.com/products/${id}`)
//             data = await response.json()
//             console.log(data)
//             setUsers(data)

//         }
//         fetchdata()
//     }, [id])
//     return (
//         <>
//         <h1 style={{border: "10px solid black" , borderRadius: "10px" , backgroundColor: "lightblue" , padding: "10px 30px"}}>Dynamic Routing Bolte! </h1>
//             <div style={{height: "max-content" , width: "600px" , padding: "20px" , border: "5px solid black" , borderRadius: "10px" , margin: "0px auto"}}>
//                 <img height={"220px"} width={"170px"} src={users.image} />
//                 <h3 style={{ color: "darkblue" }}>{users.title}</h3>
//                 <p style={{ color: "orange" , fontWeight: "bold" }}>Price: {users.price}</p>
//                 <p style={{ color: "purple"  }}><b>Category: {users.category}</b></p>
//                 <p style={{ color: "darkgreen"  }}>Description: {users.description}</p>
//                 <Link to={"/"}>
//                     <button style={{ borderRadius: "10px", border: "5px solid black", backgroundColor: "lightgreen" }}> <b> Back to Home</b></button>
//                 </Link>
//             </div>
//         </>
//     )
// }

