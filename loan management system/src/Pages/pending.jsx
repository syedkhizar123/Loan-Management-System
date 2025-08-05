
import { useState } from 'react';
import React from 'react';
// import { Box, CssBaseline } from '@mui/material';
import Header from '../components/adminHeader';
import Sidebar from '../components/adminSidebar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseclient';
import { Container, Row, Col } from "react-bootstrap"
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';



const data = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
];


export const PendingLoans = () => {


    const [AllRequests, setAllRequests] = useState([])
    const [approved, setApproved] = useState([])
    const [rejected, setRejected] = useState([])
    const [pending, setPending] = useState([])


    const fetchAllLoans = async () => {
        try {
            const { data, error } = await supabase
                .from('Loans')
                .select()


            if (error) throw error
            if (data) {
                console.log(data)
                setAllRequests(data)
                setApproved(data.filter(loan => loan.Status === 'Approved'))
                setRejected(data.filter(loan => loan.Status === 'Rejected'))
                setPending(data.filter(loan => loan.Status === 'Pending'))
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const fetchAllUsers = async () => {
       
    }

    useEffect(() => {
        fetchAllLoans()
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


    const navigate = useNavigate()
    let getAdmin = localStorage.getItem("Admin")

    useEffect(() => {
        if (!getAdmin) {
            navigate("/Admin")
        }

    });



    const styles = {
        insightContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '30px',
            gap: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
        card: {
            flex: '1 1 30%',
            textAlign: 'center',
            padding: '15px',
            border: '1px solid #eee',
            borderRadius: '8px',
        },
        label: {
            fontSize: '20px',
            color: 'black',
            marginBottom: '5px',
        },
        value: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#222',
        },
    };

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
    AllRequests.map((loan) => {
        total += Number(loan.LoanAmount);
    })




    return (
        <>
            <style>
                {`
                .paddingContainer{
                    padding-left: 70px;
                }
                    @media (max-width: 576px) {
                        .paddingContainer {
                            padding-left: 47px;
                        } 
                    }
            `}
            </style>
            <Header></Header>
            <Sidebar open={open}></Sidebar>
            <Container className="mt-5 mb-2 container paddingContainer" >
                <Row className='mt-5 mb-2'>
                    <Col className='mt-5 mb-2' xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <div style={styles.insightContainer}>
                            <div style={{ ...styles.card, backgroundColor: 'rgb(209 , 240 , 255)', display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h6 style={styles.label}>Pending</h6>
                                <p style={styles.value}>{pending.length}</p>
                            </div>
                            <div style={{ ...styles.card, backgroundColor: '#e0f7fa', display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h6 style={styles.label}>Approved</h6>
                                <p style={styles.value}>{approved.length}</p>
                            </div>
                            <div style={{ ...styles.card, backgroundColor: '#e6eeff', display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h6 style={styles.label}>Rejected</h6>
                                <p style={styles.value}>{rejected.length}</p>
                            </div>
                        </div>

                    </Col>
                </Row>

                <Row>
                    
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3} className='text-center mb-3 mt-5'>
                        <div style={{ padding: "10px 0px", width: "98%", height: "250px", margin: "0px auto", backgroundColor: "white", borderRadius: '2px' }}>     
                        <img src="https://cdn-icons-gif.flaticon.com/15578/15578935.gif" height="170px" width="170px" style={{marginTop:"5px"}} />
                        <h5 style={{marginTop:"5px" , fontFamily:"monospace"}}> LOANS DETAILS:- </h5>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3} className='text-center mb-3 mt-5'>
                        <div style={{ padding: "10px 0px", width: "99%", height: "250px", margin: "0px auto", backgroundColor: "white", borderRadius: '2px' }}>

                            <p style={{ padding: "10px 0px", borderBottom: "1px solid black", margin: "0 10px" }}>AMOUNT STATUS</p>
                            <Stack width="100%" direction="row" flexWrap="wrap" marginTop="15px">
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: approvedTotal, color: 'lightgreen' },
                                                { id: 1, value: pendingTotal, color: 'yellow' },
                                                { id: 2, value: rejectedTotal, color: 'rgb(250, 73, 73)' },

                                            ],
                                            innerRadius: 60,
                                        },
                                    ]}
                                    width={170}
                                    height={170}

                                />

                            </Stack>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className='text-center mb-3 mt-5'>
                                   

                        <div style={{ height: "250px", width: "98%", margin: "0px auto", backgroundColor: "white", borderRadius: "10px", display: "flex", justifyContent: "space-around", alignItems: "center"  }}>
                                    
                            <div style={{ textAlign: 'center', margin: "10px 0" }}>
                                <CircularProgress variant="determinate" value={(approvedTotal / total) * 100} size={80} thickness={5} style={{ color: "#4caf50" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Approved</p>
                                    <p>{((approvedTotal / total) * 100).toFixed(1)}%</p>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', margin: "10px 0" }}>
                                <CircularProgress variant="determinate" value={(pendingTotal / total) * 100} size={80} thickness={5} style={{ color: "orange" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Pending</p>
                                    <p>{((pendingTotal / total) * 100).toFixed(1)}%</p>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', margin: " 10px 0" }}>
                                <CircularProgress variant="determinate" value={(rejectedTotal / total) * 100} size={80} thickness={5} style={{ color: "#f44336" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Rejected</p>
                                    <p>{((rejectedTotal / total) * 100).toFixed(1)}%</p>
                                </div>
                            </div>


                        </div>
                        
                    </Col>
                </Row>
                <Row className='mt-5 mb-5'>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className='text-center mt-3 mb-5'>
                        <div style={{ padding: "10px", width: "98%", height: "450px", margin: "0px auto", backgroundColor: "white", borderRadius: '2px' }}>
                            <h5 style={{ padding: "10px 0px", borderBottom: "1px solid black", margin: "0 10px", textAlign: "center" }}>
                                MY PROFILE
                            </h5>
                            <div style={{ display: "flex", height: "330px", flexDirection: "column", justifyContent: "space-between", marginTop: "30px" }}>
                                <div style={{ width: "95%", backgroundColor: "rgb(240, 240, 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>ROLE:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>ADMIN</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>EMAIL:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>admin@gmail.com</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240)", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>TOTAL USERS:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}>13</b>
                                </div>
                                <div style={{ width: "95%", backgroundColor: "rgb(240 , 240 , 240 )", borderRadius: "5px", display: "flex", alignItems: "center", height: "70px", margin: "0px auto" }}>
                                    <b style={{ width: "max-content", paddingLeft: "10px", fontSize: "13px" }}>CONFIRMATION:- </b>
                                    <b style={{ width: "max-content", paddingLeft: "5px", fontSize: "13px" }}></b>
                                </div>
                            </div>


                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8} className='mt-3 mb-5'>


                        <div style={{ padding: "5px 5px", width: "98%", height: "450px", margin: "0px auto", backgroundColor: "white", borderRadius: '2px', textAlign: "center" }}>


                            <div style={{ maxHeight: "400px" }}>
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
                                            data: [AllRequests.length],
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
                                    height={400}
                                />


                            </div>

                        </div>
                    </Col>

                </Row>

            </Container>


        </>
    )
}


