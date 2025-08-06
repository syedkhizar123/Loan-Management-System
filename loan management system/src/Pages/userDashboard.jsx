import { useEffect, useState } from 'react'
import '../App.css'
import { supabase } from '../../supabaseclient'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header';
import Sidebar from '../components/Sidebar';
import { Container, Row, Col } from "react-bootstrap"
import Typewriter from "typewriter-effect"
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { CircularProgress } from '@mui/material';






export const UserDashboard = () => {
    const [loandata, setloandata] = useState([])
    const [approved, setApproved] = useState([])
    const [rejected, setRejected] = useState([])
    const [pending, setPending] = useState([])


    const navigate = useNavigate()
    let session = JSON.parse(localStorage.getItem("Session"))
    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('Loans')
                .select()
                .eq('UserID', session.id)

            if (error) throw error
            if (data) {
                console.log(data)
                setloandata(data)
                console.log(loandata)
                setApproved(data.filter(loan => loan.Status === 'Approved'))
                setRejected(data.filter(loan => loan.Status === 'Rejected'))
                setPending(data.filter(loan => loan.Status === 'Pending'))
            }
        } catch (error) {
            console.log(error)
        } finally {

        }
    }




    useEffect(() => {
        fetchData()
        const subscription = supabase
            .channel('Loans-table-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'Loans' }, (payload) => {
                console.log('Change received!', payload);
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [])



    useEffect(() => {
        if (!session) {
            navigate("/about")
            return
        }

    }, []);

    const logOut = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        } else {
            navigate("/")
            localStorage.removeItem("Session")
        }
    }





    let approvedTotal = 0;
    approved.map((loan) => {
        approvedTotal += Number(loan.LoanAmount);
    });

    let rejectedTotal = 0;
    rejected.map((loan) => {
        rejectedTotal += Number(loan.LoanAmount);
    });

    let pendingTotal = 0;
    pending.map((loan) => {
        pendingTotal += Number(loan.LoanAmount);
    });
    let total = 0
    loandata.map((loan) => {
        total += Number(loan.LoanAmount);
    })



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

            <Header className='mb-5' ></Header>
            <Sidebar  ></Sidebar>
            <Container style={{ marginTop: "100px" }} className='paddingContainer mb-3'>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <div style={{ backgroundColor: "white", height: "max-content", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", padding: "20px", borderRadius: "10px" }}>
                            <div style={{
                                backgroundColor: 'rgb(209 , 240 , 255)', display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 10px", padding: "15px 25px", borderRadius: "8px", flex: '1 1 30%',
                                textAlign: 'center',
                                padding: '15px',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                height: "100px",
                                fontFamily: "serif",
                                gap: "10px"
                            }}>
                                <h4 >Pending Loans:-</h4>
                                <h3 >{pending.length}</h3>
                            </div>
                            <div style={{ backgroundColor: '#e0f7fa', fontFamily: "serif", display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 10px", padding: "15px 25px", borderRadius: "8px", flex: '1 1 30%', textAlign: 'center', padding: '15px', gap: "10px", border: '1px solid #eee', borderRadius: '8px', height: "100px" }}>
                                <h4 >Approved Loans:-</h4>
                                <h3 >{approved.length}</h3>
                            </div>
                            <div style={{
                                backgroundColor: '#e6eeff', display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 10px", padding: "15px 25px", borderRadius: "8px", flex: '1 1 30%',
                                textAlign: 'center',
                                padding: '15px',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                height: "100px",
                                fontFamily: "serif",
                                gap: "10px"
                            }}>
                                <h4 >Rejected Loans:- </h4>
                                <h3 >{rejected.length}</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-5 mb-3'>
                    <Col xs={12} sm={12} md={12} lg={7} xl={7} xxl={7}>
                        <div style={{ width: "98%", height: "120px", backgroundColor: "white", margin: "0px auto", borderRadius: " 10px", marginBottom: "30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <h4 style={{ fontFamily: "Poppins , sans-serif", fontWeight: " bolder", color: " #34495e", marginLeft: "15px" }}>Hi ! Great to see you </h4>
                            <div style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", color: "#009688", paddingLeft: "15px", fontFamily: "Roboto" }}>

                                <Typewriter
                                    options={{
                                        strings: [
                                            "Keeping your credit score high increases approval chances!",
                                            "A good credit score means faster approvals.",
                                            "Consistent payments improve your chances."
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        delay: 50,
                                        deleteSpeed: 30,
                                        pauseFor: 2500
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ height: "250px", width: "98%", margin: "0px auto", backgroundColor: "white", borderRadius: "10px", marginBottom: "30px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>



                            <div style={{ textAlign: 'center', margin: "10px 0" }}>
                                <CircularProgress variant="determinate" value={(approved.length / loandata.length) * 100} size={80} thickness={5} style={{ color: "#4caf50" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Approved</p>
                                    <p>{((approved.length / loandata.length) * 100).toFixed(1)}%</p>
                                </div>
                            </div>


                            <div style={{ textAlign: 'center', margin: "10px 0" }}>
                                <CircularProgress variant="determinate" value={(pending.length / loandata.length) * 100} size={80} thickness={5} style={{ color: "orange" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Pending</p>
                                    <p>{((pending.length / loandata.length) * 100).toFixed(1)}%</p>
                                </div>
                            </div>


                            <div style={{ textAlign: 'center', margin: " 10px 0" }}>
                                <CircularProgress variant="determinate" value={(rejected.length / loandata.length) * 100} size={80} thickness={5} style={{ color: "#f44336" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Rejected</p>
                                    <p>{((rejected.length / loandata.length) * 100).toFixed(1)}%</p>
                                </div>
                            </div>


                        </div>
                        <div style={{ height: "330px", width: "98%", margin: "0px auto", backgroundColor: "white", borderRadius: "10px", marginBottom: "30px" }}>
                            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                                <BarChart
                                    xAxis={[
                                        {
                                            scaleType: 'band',
                                            data: ['Loans Status'],
                                            categoryGapRatio: 0,
                                            barGapRatio: 0.1,
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: [loandata.length],
                                            label: 'Requests',
                                            color: '#2196f3',
                                        },
                                        {
                                            data: [pending.length],
                                            label: 'Pending',
                                            color: 'yellow',
                                        },
                                        {
                                            data: [approved.length],
                                            label: 'Approved',
                                            color: "#4ca520"
                                        },
                                        {
                                            data: [rejected.length],
                                            label: 'Rejected',
                                            color: '#f44336'
                                        },
                                    ]}
                                    height={300}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} >

                        <div style={{ height: "270px", width: "98%", margin: "0px auto", borderRadius: "10px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "start", flexWrap: "wrap" }}>

                            <div style={{ height: "270px ", width: "98%", backgroundColor: "white", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                <h6 style={{ textAlign: "center", paddingTop: "20px" }}>Amounts Status </h6>

                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: approvedTotal, label: 'Approved', color: 'lightgreen' },
                                                { id: 1, value: pendingTotal, label: 'Pending', color: 'yellow' },
                                                { id: 2, value: rejectedTotal, label: 'Rejected', color: 'rgb(250, 73, 73)' },

                                            ],
                                            innerRadius: 60,
                                        },
                                    ]}
                                    width={200}
                                    height={200}
                                />

                            </div>

                        </div>
                        <div style={{ padding: "10px", width: "98%", height: "460px", margin: "0px auto", backgroundColor: "white", borderRadius: '10px', marginBottom: "30px", }}>
                            <h5 style={{ padding: "10px 0px", borderBottom: "1px solid black", margin: "0 10px", textAlign: "center" }}>
                                MY PROFILE
                            </h5>
                            <div style={{ display: "flex", height: "330px", flexDirection: "column", justifyContent: "space-between", marginTop: "30px" }}>
                                <div style={{ width: "95%", backgroundColor: "rgb(240, 240, 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>USER ID:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>{session.id}</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>EMAIL:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>{session.email}</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>CREATION:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>{session.created_at.slice(0, 10)} at {session.created_at.slice(12, 16)}</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240 )", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>CONFIRMATION:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>{session.confirmed_at.slice(0, 10)} at {session.confirmed_at.slice(12, 16)}</b>
                                </div>
                            </div>

                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
