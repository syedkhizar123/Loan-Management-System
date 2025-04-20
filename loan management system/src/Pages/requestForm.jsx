import React from 'react';
import { useState } from 'react';
import { supabase } from '/supabaseclient';
import { Link } from 'react-router'
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import DashboardContent from '../components/dashboard';
export default function RequestForm() {

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };


    let session = JSON.parse(localStorage.getItem("Session"))
    // console.log(session.id)


    const [Name, setName] = useState("")
    const [Contact, setContact] = useState("")
    const [loanAmount, setloanAmount] = useState("")
    const [duration, setduration] = useState("")
    const [loanType, setloanType] = useState("")
    const submitForm = async () => {
        if (Name.trim() === "" || Contact.trim() === "" || loanAmount.trim() === "" || duration.trim() === "" || loanType.trim() === "") {
            alert("Please Fill all the Fields")
        }
        else {
            try {
                const { data, error } = await supabase
                    .from('Loans')
                    .insert({
                        UserID: session.id,
                        Name: Name,
                        Contact: Contact,
                        Duration: duration,
                        LoanAmount: loanAmount,
                        LoanType: loanType,
                    })

                    .select()


                if (error) throw error
                if (data) {
                    console.log(data)
                    setName("")
                    setContact("")
                    setloanAmount("")
                    setduration("")
                    setloanType("")

                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggleDrawer={toggleDrawer} />
                <Sidebar open={open} />
                <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
                </Box>
            </Box>

            <h2 style={{ marginTop: "40px", marginBottom: "30px" }}>Loan Form</h2>
            <div sx={{ justifyContent: 'center' }}>
                <input value={Name} onChange={(e) => (setName(e.target.value))} style={{ height: "45px", width: "300px", border: "2px solid grey", margin: "0px auto", paddingLeft: "10px", marginBottom: "15px" }} type="text" name="Name" placeholder='Name' id="name" /><br></br>

                <input value={Contact} onChange={(e) => (setContact(e.target.value))} style={{ height: "45px", width: "300px", border: "2px solid grey", margin: "0px auto", paddingLeft: "10px", marginBottom: "15px" }} type="number" placeholder='Contact No' name="Contact" id="contact" /><br></br>

                <input value={loanAmount} onChange={(e) => (setloanAmount(e.target.value))} style={{ height: "45px", width: "300px", border: "2px solid grey", margin: "0px auto", paddingLeft: "10px", marginBottom: "15px" }} type="Number" placeholder='Loan Amount' name="Loan Amount" id="loanamount" /><br></br>

                <input value={duration} onChange={(e) => (setduration(e.target.value))} style={{ height: "45px", width: "300px", border: "2px solid grey", margin: "0px auto", paddingLeft: "10px", marginBottom: "15px" }} type="Number" placeholder='Duration (in months)' name="Duration" id="duration" /><br></br>

                <input value={loanType} onChange={(e) => (setloanType(e.target.value))} style={{ height: "45px", width: "300px", border: "2px solid grey", margin: "0px auto", paddingLeft: "10px", marginBottom: "15px" }} type="text" placeholder='Loan Type' name="Loan Type" id="loantype" /><br></br>

                <button onClick={submitForm} style={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "Green", color: "white", padding: "10px 30px" }}>  Submit </button>

            </div>
        </div>
    )
}