import { Link } from "react-router"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from '/supabaseclient';
import Swal from 'sweetalert2'
import { TextField } from "@mui/material";


export default function About() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    let session = localStorage.getItem("Session")
    useEffect(() => {
        if (session) {
            navigate("/App")
            setemail("")
            setpassword("")
            return
        }

    }, []);

    const logIn = async () => {
        if (email === "" || password === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Fill The Fields",
            });
        } else {
            if (email === "admin@gmail.com") {
                if (password === "admin123") {
                    localStorage.setItem("Admin", "LogIn")
                    navigate("/pending")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Admin's Password is admin123",
                    });
                }
            }
            else {
                try {
                    let { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password
                    })
                    if (error) {
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
                        localStorage.setItem("Session", JSON.stringify(data.user))
                        console.log(localStorage.getItem("Session"))
                        setemail("")
                        setpassword("")
                    }
                } catch (error) {
                    console.log(error)
                }
            }

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
                    <h1 style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>LOG IN</h1>

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
                        onClick={logIn}
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
                        LOGIN
                    </button>

                    <div style={{ marginTop: "10px", textAlign: "center", fontSize: "14px", color: "grey" }}>
                        Don't have an account?{" "}
                        <Link to="/" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

