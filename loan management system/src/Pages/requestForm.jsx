import React from 'react';
import { useState } from 'react';
import { supabase } from '/supabaseclient';
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router'
// import { Box, CssBaseline } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Personal Information', 'Income Source', 'Loan Details', 'Review'];


export default function RequestForm() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep === 0) {
            if (Name.trim() === "" || Contact.trim() === "") {
                toast.error("Fill all the fields");
                return;
            }
        } else if (activeStep === 1) {
            if (income.trim() === "" || occupation.trim() === "") {
                toast.error("Fill all the fields");
                return;
            }
        } else if (activeStep === 2) {
            if (loanAmount.trim() === "" || duration.trim() === "" || loanType.trim() === "") {
                toast.error("Fill all the fields");
                return;
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };




    const handleReset = () => {
        setActiveStep(0);
    };

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
    const [income, setIncome] = useState("")
    const [occupation, setOccupation] = useState("")
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
                        Status: "Pending",
                        Income: income,
                        Occupation: occupation
                    })

                    .select()


                if (error) throw error
                if (data) {
                    toast.success("Form Submitted Successfully!");
                    console.log(data)
                    setName("")
                    setContact("")
                    setloanAmount("")
                    setduration("")
                    setloanType("")
                    setIncome("")
                    setOccupation("")
                    setActiveStep((prev) => prev + 1);

                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <style>
                {
                    `
                .paddingContainer{
                    padding-left : 70px;
                }
                    @media (max-width: 576px) {
                        .paddingContainer {
                            padding-left: 47px;
                        } 
                    }
            `
                }
            </style>
            <Header></Header>
            <Sidebar></Sidebar>
            <Container className="mt-5 mb-5 paddingContainer">
                <Row className='mt-5 '>
                    <Col className='mt-5'>
                        <Box sx={{ width: '100%' , marginTop: "25px"}}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                        // labelProps.optional = (
                                        //   <Typography variant="caption">Optional</Typography>
                                        // );
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                             {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ my: 4 , mx: 4 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <button onClick={() => {location.href="/App" }} className='mx-4' style={{backgroundColor: "black" , border: "1px solid black" , borderRadius: "10px" , color: "white" , padding: "10px 20px"}}>
                                        Back To Dashboard
                                    </button>
                                    
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        {activeStep === 0 && (<> <div style={{ display: "flex", flexDirection: "column" }}><input type="text" placeholder='Name' value={Name} onChange={(e) => (setName(e.target.value))} style={{ width: '300px', padding: '10px', marginBottom: "20px", border: '1px solid grey', display: "block" }} />  <input type="text" placeholder='Contact No.' value={Contact} onChange={(e) => (setContact(e.target.value))} style={{ width: '300px', padding: '10px', marginBottom: '20px', border: '1px solid grey', display: "block" }} /> </div> </>)}
                                        {activeStep === 1 && (<> <div style={{ display: "flex", flexDirection: "column" }}><input type="text" placeholder='Monthly Income' value={income} onChange={(e) => (setIncome(e.target.value))} style={{ width: '300px', padding: '10px', marginBottom: '20px', border: '1px solid grey' }} />  <select
                                            value={occupation}
                                            onChange={(e) => setOccupation(e.target.value)}
                                            style={{
                                                width: "300px",
                                                padding: "10px",
                                                marginBottom: "20px",
                                                border: "1px solid grey",
                                            }}
                                        >
                                            <option value="">Select Occupation</option>
                                            <option value="Engineer">Engineer</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Doctor">Doctor</option>
                                            <option value="Businessman">Businessman</option>
                                            <option value="Student">Student</option>
                                            <option value="Freelancer">Freelancer</option>
                                            <option value="Other">Other</option>
                                        </select>  </div></>)}
                                        {activeStep === 2 && (<> <div style={{ display: "flex", flexDirection: "column" }}><input type="text" placeholder='Loan Amount' value={loanAmount} onChange={(e) => (setloanAmount(e.target.value))} style={{ width: '300px', padding: '10px', marginBottom: '20px', border: '1px solid grey' }} />   <input type="number" placeholder='Duration (Months)' value={duration} onChange={(e) => (setduration(e.target.value))} style={{ width: '300px', padding: '10px', marginBottom: '20px', border: '1px solid grey' }} /> <select
                                            value={loanType}
                                            onChange={(e) => setloanType(e.target.value)}
                                            style={{
                                                width: "300px",
                                                padding: "10px",
                                                marginBottom: "20px",
                                                border: "1px solid grey",
                                            }}
                                        >
                                            <option value="">Select Loan Type</option>
                                            <option value="Home Loan">Home Loan</option>
                                            <option value="Car Loan">Car Loan</option>
                                            <option value="Education Loan">Education Loan</option>
                                            <option value="Business Loan">Business Loan</option>
                                            <option value="Personal Loan">Personal Loan</option>
                                        </select> </div> </>)}
                                        {activeStep === 3 && (<> <div style={{ height: "300px ", width: "250px", marginBottom: "15px", borderRadius: "5px", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Name:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{Name}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Contact No:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{Contact}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Income:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{income}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Occupation:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{occupation}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Amount:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{loanAmount}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Duration:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{duration}</span></div>
                                            <div style={{ display: "flex", width: "100%", height: "15px" }}><b style={{ width: "50%", paddingLeft: "5px" }}>Type:- </b><span style={{ width: "50%", paddingLeft: "5px" }}>{loanType}</span></div>

                                        </div></>)}




                                    </Box>
                                    <Box>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        
                                        <Button onClick={() => {
                                            if (activeStep === steps.length - 1) {
                                                submitForm();
                                            } else {
                                                handleNext();  
                                            }
                                        }}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )} 
                            
                        </Box>
                        <ToastContainer theme='dark' position="bottom-right" autoClose={3000} />
                    </Col>
                </Row>
            </Container>
        </>

    )
}