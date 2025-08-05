import { useEffect, useState } from "react";
import { Link } from "react-router"
import { supabase } from '/supabaseclient';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

let data;
let dataarr = [];
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
                    navigate("/about")
                }, 2000)
            }
            setemail("")
            setpassword("")
        }
    }


    return (
        <>
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
                    <h1 style={{ textAlign: "center", marginBottom: "50px", color: "#1976d2" }}>Sign Up</h1>

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
                        onClick={signUp}
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
                        Sign Up
                    </button>

                    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
                        Already have an account?{" "}
                        <Link to="/about" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
                            Log In
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}







