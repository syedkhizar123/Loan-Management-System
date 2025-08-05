import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import  Sidebar from '../components/sidebar';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/header';

export default function AdminLogin() {


    const [email, setemail] = useState("admin@gmail.com")
    const [password, setpassword] = useState("admin123")

    const navigate = useNavigate()
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    function Login() {
        if (email === "admin@gmail.com") {
            if (password === "admin123") {
                localStorage.setItem("Admin", "LogIn")
                navigate("/pending")
            } else {
                alert("Invalid Password")
            }
        } else {
            alert("Invalid Email")
        }
    }
    return (
        //     <>
        // <div>  <Box sx={{ display: 'flex' }}>
        //                 <CssBaseline />
        //                 <Header open={open} toggleDrawer={toggleDrawer} />
        //                 <Sidebar open={open} />
        //                 <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
        //                 </Box>
        //             </Box></div>
        //                 <div
        //                                 style={{
        //                                     width: "100%",
        //                                     minHeight: '100vh',
        //                                     display: 'flex',
        //                                     alignItems: 'center',
        //                                     justifyContent: 'center',
        //                                     fontFamily: 'Segoe UI, sans-serif',
        //                                 }}
        //                             >
        //                                 <div
        //                                     style={{
        //                                         height: "auto",
        //                                         width: "350px",
        //                                         border: "2px solid #ccc",
        //                                         borderRadius: "12px",
        //                                         padding: "30px 25px",
        //                                         backgroundColor: "#edf7f7",
        //                                         boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
        //                                     }}
        //                                 >
        //                                     <h3 style={{ textAlign: "center", marginBottom: "30px", color: "#1976d2" }}>Log In to Admin Dashboard</h3>

        //                                     <div style={{ marginBottom: "25px" }}>
        //                                         <label htmlFor="email" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
        //                                             Email
        //                                         </label>
        //                                         <input
        //                                             type="email"
        //                                             id="email"
        //                                             value={email}
        //                                             onChange={(e) => setemail(e.target.value)}
        //                                             placeholder="Enter your email"
        //                                             style={{
        //                                                 height: "40px",
        //                                                 width: "100%",
        //                                                 paddingLeft: "10px",
        //                                                 border: "1.5px solid #ccc",
        //                                                 borderRadius: "6px",
        //                                                 fontSize: "14px",
        //                                                 outlineColor: "#1976d2"
        //                                             }}
        //                                         />
        //                                     </div>

        //                                     <div style={{ marginBottom: "30px" }}>
        //                                         <label htmlFor="password" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
        //                                             Password
        //                                         </label>
        //                                         <input
        //                                             type="password"
        //                                             id="password"
        //                                             value={password}
        //                                             onChange={(e) => setpassword(e.target.value)}
        //                                             placeholder="Enter your password"
        //                                             style={{
        //                                                 height: "40px",
        //                                                 width: "100%",
        //                                                 paddingLeft: "10px",
        //                                                 border: "1.5px solid #ccc",
        //                                                 borderRadius: "6px",
        //                                                 fontSize: "14px",
        //                                                 outlineColor: "#1976d2"
        //                                             }}
        //                                         />
        //                                     </div>

        //                                     <button
        //                                         onClick={Login}
        //                                         style={{
        //                                             width: "100%",
        //                                             padding: "10px",
        //                                             backgroundColor: "#1976d2",
        //                                             color: "white",
        //                                             border: "none",
        //                                             borderRadius: "6px",
        //                                             fontWeight: "600",
        //                                             fontSize: "16px",
        //                                             cursor: "pointer",
        //                                             transition: "background-color 0.3s",
        //                                         }}
        //                                         onMouseOver={(e) => e.target.style.backgroundColor = "#145ea8"}
        //                                         onMouseOut={(e) => e.target.style.backgroundColor = "#1976d2"}
        //                                     >
        //                                         Log In
        //                                     </button>


        //                                 </div>
        //                             </div>
        //     </>

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} toggleDrawer={toggleDrawer} />
            <Sidebar open={open} />

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 8,
                    minHeight: '100vh',
                    width: `calc(100% - ${open ? '240px' : '60px'})`,
                    // marginLeft: open ? '40px' : '60px',
                    // transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Segoe UI, sans-serif',
                
                }}
            >
                <Box
                    sx={{
                        width: 350,
                        border: '2px solid #ccc',
                        borderRadius: '12px',
                        padding: '30px 25px',
                        backgroundColor: '#edf7f7',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#1976d2' }}>
                        Log In to Admin Dashboard
                    </h3>

                    <div style={{ marginBottom: '25px' }}>
                        <label
                            htmlFor="email"
                            style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter your email"
                            style={{
                                height: '40px',
                                width: '100%',
                                paddingLeft: '10px',
                                border: '1.5px solid #ccc',
                                borderRadius: '6px',
                                fontSize: '14px',
                                outlineColor: '#1976d2',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label
                            htmlFor="password"
                            style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{
                                height: '40px',
                                width: '100%',
                                paddingLeft: '10px',
                                border: '1.5px solid #ccc',
                                borderRadius: '6px',
                                fontSize: '14px',
                                outlineColor: '#1976d2',
                            }}
                        />
                    </div>

                    <button
                        onClick={Login}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#145ea8')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#1976d2')}
                    >
                        Log In
                    </button>
                </Box>
            </Box>
        </Box>
    );

}
