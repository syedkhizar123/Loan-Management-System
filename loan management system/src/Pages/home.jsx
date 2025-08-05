import { useEffect, useState } from "react";
import { Link } from "react-router"
import { supabase } from '/supabaseclient';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import { TextField } from "@mui/material";


export default function Home() {
    const navigate = useNavigate()

    let session = localStorage.getItem("Session")
    useEffect(() => {
        if (session) {
            navigate("/App")
            return
        }

    }, []);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const signUp = async () => {
        if (email === "" || password === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Fill The Fields",
            });
        } else {
            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            })

            if (error) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }

            if (data) {
                console.log(data)
                Swal.fire({
                    title: "Sign Up Succesful",
                    icon: "success",
                    draggable: true
                });
                setTimeout(() => {
                    navigate("/App")
                }, 1000)
            }
            setemail("")
            setpassword("")
        }
    }


    return (
        <>
            <div
                style={{
                    width: "95%",
                    margin: "0px auto",
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
                        borderRadius: "5px",
                        padding: "30px 25px",
                        backgroundColor: "rgba( 0 , 0 , 0 , 0.9 )",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <h1 style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>SIGN UP</h1>

                    <div style={{ marginBottom: "25px" }}>
                       
                        <TextField

                            label="Email"
                            variant="standard"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            sx={{
                                width: "100%",
                                "& .MuiInputLabel-root": { color: "white" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                                input: { color: "white" }
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "50px" }}>
                       
                        <TextField

                            label="Password"
                            variant="standard"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            sx={{
                                width: "100%",
                                "& .MuiInputLabel-root": { color: "white" }, 
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" }, 
                                "& .MuiInput-underline:before": { borderBottomColor: "white" }, 
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                                input: { color: "white" } 
                            }}
                        />
                    </div>

                    <button
                        onClick={signUp}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                            fontWeight: "bolder",
                            borderRadius: "2px",
                            fontSize: "15px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = "#145ea8"; e.target.style.color = "white" }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "black" }}
                    >
                        SIGN UP
                    </button>

                    <div style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" , color:"grey" }}>
                        Already have an account?{" "}
                        <Link to="/about" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
                            Log In
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}







