import { Link } from "react-router"
import { useParams } from "react-router"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from '/supabaseclient';
import Swal from 'sweetalert2'


export default function About() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
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
        if(email === "" || password === ""){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Fill The Fields",
              });
        } else{
           try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if(error){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                  });
                 throw error
                
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
           } catch (error) {
                console.log(error)
           }
        }
    
    }

    return (
        <>
   
            {/* <div >
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
                        <input type="password" value={password} id="password" onChange={(e) => (setpassword(e.target.value))} placeholder="Enter your password" style={{ height: "40px", border: "2px solid black", width: "80%", paddingLeft: "10px", borderRadius: "5px", marginTop: "5px" }} />
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
                
            </div> */}

                 <div
                                style={{
                                    width: "100%",
                                    minHeight: '100vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'Segoe UI, sans-serif',
                                }}
                            >
                                <div
                                    style={{
                                        height: "auto",
                                        width: "350px",
                                        border: "2px solid #ccc",
                                        borderRadius: "12px",
                                        padding: "30px 25px",
                                        backgroundColor: "#edf7f7",
                                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    <h1 style={{ textAlign: "center", marginBottom: "50px", color: "#1976d2" }}>Log In</h1>
                
                                    <div style={{ marginBottom: "25px" }}>
                                        <label htmlFor="email" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            placeholder="Enter your email"
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                                paddingLeft: "10px",
                                                border: "1.5px solid #ccc",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                outlineColor: "#1976d2"
                                            }}
                                        />
                                    </div>
                
                                    <div style={{ marginBottom: "30px" }}>
                                        <label htmlFor="password" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            placeholder="Enter your password"
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                                paddingLeft: "10px",
                                                border: "1.5px solid #ccc",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                outlineColor: "#1976d2"
                                            }}
                                        />
                                    </div>
                
                                    <button
                                        onClick={logIn}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            backgroundColor: "#1976d2",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s",
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#145ea8"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#1976d2"}
                                    >
                                        Log In
                                    </button>
                
                                    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
                                        Don't have an account?{" "}
                                        <Link to="/" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
                                        Sign Up
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

