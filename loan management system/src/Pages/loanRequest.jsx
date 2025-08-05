import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import Header from '../components/header';
import Sidebar from '../components/Sidebar';
import { supabase } from '../../supabaseclient';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export default function LoanRequest() {


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,

        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                let bgColor = '';
                let textColor = 'black';

                switch (params.value) {
                    case 'Approved':
                        bgColor = 'lightgreen'; 
                        break;
                    case 'Rejected':
                        bgColor = 'rgb(243, 101, 101)'; 
                        break;
                    case 'Pending':
                        bgColor = 'rgb(250, 235, 99)'; 
                        break;
                    default:
                        bgColor = 'white';
                }
                return (
                    <span
                        style={{
                            backgroundColor: bgColor,
                            padding: '6px 12px',
                            borderRadius: '6px',
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: textColor,
                        }}
                    >
                        {params.value}
                    </span>
                );
            }

        },
        {
            field: 'Income',
            headerName: 'Income',
            width: 110,

        },
        {
            field: 'Duration',
            headerName: 'Time (Months)',
            width: 110,

        },
        {
            field: 'LoanAmount',
            headerName: 'Loan Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            width: 110,
            renderCell: (params) => (
                <IconButton
                    color="primary"
                >
                    <DeleteIcon />
                </IconButton>
            )

        },
    ];


    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loandata, setloandata] = useState([]);

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
                const formatted = data.map((item) => ({
                    id: item.id,
                    ...item,
                }));
                setRows(formatted)
                console.log(formatted)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
         const loanChannel = supabase
                    .channel('loan-updates')
                    .on(
                        'postgres_changes',
                        { event: '*', schema: 'public', table: 'Loans' },
                        (payload) => {
                            console.log('Change received!', payload);
                            fetchData();
                        }
                    )
                    .subscribe();
        
                return () => {
                    supabase.removeChannel(loanChannel);
                };
    }, [])



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
            <Header />
            <Sidebar />
            <Container className='mt-5 mb-5 paddingContainer' style={{ textAlign: "center" }} >
                <Row className='mt-5 mb-5'>
                    <Col className='mt-5 pt-3'>
                        <h3 className='mb-4' style={{textAlign: "start"}}>LOAN REQUESTS</h3>
                        <Box sx={{ height: 400, width: '100%' , marginTop: "20px" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                loading={loading}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 },
                                    },
                                    sorting: {
                                        sortModel: [{ field: 'id', sort: 'asc' }]
                                    }
                                }}
                                pageSizeOptions={[5]}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Col>
                </Row>
            </Container>
        </>
    )
}



