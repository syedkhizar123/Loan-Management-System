import { useEffect, useState } from "react";
import { Link } from "react-router"
import { supabase } from '/supabaseclient';
import { useNavigate } from "react-router";


let data;
let dataarr = [];
export default function Home() {
    const navigate = useNavigate()

    let session = localStorage.getItem("Session")
    useEffect(() => {
        if(session){
            navigate("/App")
             return
           }
        
      }, []);
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const array = [
        {
            id: 1,
            name: "My id is 1",
        },
        {
            id: 2,
            name: "My id is 2",
        },
        {
            id: 3,
            name: "My id is 3",
        }
    ]

    const signUp = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) throw error
        if (data) {
            console.log(data)
        }
        setemail("")
        setpassword("")
    }


    return (
        <>
            <div>
                <h1>Sign Up Page</h1>
                <div style={{ height: "400px", width: "300px", border: "2px solid black", borderRadius: "10px" }}>
                    <div style={{ marginTop: "60px" }}>
                        <label htmlFor="email" ><b style={{ marginRight: "200px" }}>Email</b></label>
                        <br></br>
                        <input type="email" onChange={(e) => (setemail(e.target.value))} value={email} id="email" placeholder="Enter your email" style={{ height: "40px", width: "80%", paddingLeft: "10px", border: "2px solid black", borderRadius: "5px", marginTop: "10px" }} />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <label htmlFor="password" ><b style={{ marginRight: "180px" }}>Password</b></label>
                        <br></br>
                        <input type="password" id="password" onChange={(e) => (setpassword(e.target.value))} placeholder="Enter your password" style={{ height: "40px", border: "2px solid black", width: "80%", paddingLeft: "10px", borderRadius: "5px", marginTop: "10px" }} />
                    </div>
                    <button onClick={signUp} style={{ marginTop: "40px" , marginBottom: "20px", backgroundColor: "black" , color: "white", borderRadius: "10px", padding: "10px 100px" }}>
                        Sign Up
                    </button>
                    <div>
                    <span >Already have an account?</span>
                <Link to={"/about"}>
                    <span>Log In</span>
                </Link>
                </div>
                </div>
              
            </div>



        </>
    )
}