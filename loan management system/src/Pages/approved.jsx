import { useState } from 'react';
import Header from '../components/adminHeader';
import Sidebar from '../components/adminSidebar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseclient';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Row, Col } from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



export default function ApprovedLoans() {

    const navigate = useNavigate()
    let getAdmin = localStorage.getItem("Admin")

    const [open, setOpen] = useState(false)

    const rejectLoan = async (loanId) => {
        try {
            setOpen(true)
            const { data, error } = await supabase
                .from('Loans')
                .update({ Status: 'Rejected' })
                .eq('id', loanId)
                .select()

            if (error) throw error

            if (data) {
                setOpen(false)
                console.log(data)
            }

        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

    const approveLoan = async (loanId) => {
        try {
            setOpen(true)
            const { data, error } = await supabase
                .from('Loans')
                .update({ Status: 'Approved' })
                .eq('id', loanId)
                .select()

            if (error) throw error

            if (data) {
                console.log(data)
                setOpen(false)
            }

        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

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
            field: 'Action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                if (params.row.Status === 'Pending') {
                    return (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => approveLoan(params.row.id)}
                                style={{
                                    // backgroundColor: 'lightgreen',
                                    backgroundColor: "green",
                                    border: 'none',
                                    borderRadius: '5px',
                                    height: "40px",
                                    width: "80px",
                                    marginTop: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "13px",
                                    color: "white"
                                }}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => rejectLoan(params.row.id)}
                                style={{
                                    // backgroundColor: 'rgb(243, 101, 101)',
                                    backgroundColor: "red",
                                    border: 'none',
                                    borderRadius: '5px',
                                    height: "40px",
                                    width: "80px",
                                    marginTop: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "19px",
                                    color: "white"
                                }}
                            >
                                Reject
                            </button>
                        </div >
                    );
                } else {
                    return <span style={{ margin: "0px auto" }}>—</span>;
                }
            }
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

    const [rows, setRows] = useState([]);


    useEffect(() => {
        if (!getAdmin) {
            navigate("/Admin")
        }

    });

    // const [open, setOpen] = useState(true);
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };

    const [loading, setLoading] = useState(true);
    const [Loans, setLoans] = useState([])
    const fetchAllLoans = async () => {
        try {
            const { data, error } = await supabase
                .from('Loans')
                .select()


            if (error) throw error
            if (data) {
                console.log(data)
                setLoans(data)
                const formatted = data.map((item) => ({
                    id: item.id,
                    ...item,
                }));
                setRows(formatted)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllLoans()
        const loanChannel = supabase
            .channel('loan-updates')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'Loans' },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchAllLoans();
                    setOpen(false)
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(loanChannel);
        };

    }, [])

    return (
        // <>
        //   <Box sx={{ display: 'flex' }}>
        //     <CssBaseline />
        //     <Header open={open} toggleDrawer={toggleDrawer} />
        //     <Sidebar  ></Sidebar> 
        //     <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
        //     <h4 style={{textAlign: "center" , fontSize: "40px" , fontFamily: "-moz-initial"}}>Approved Requests</h4>

        //         {loading ? (
        //             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

        //                 <CircularProgress />

        //             </Box>
        //         ) : (
        //             <Table sx={{ mt: 5 }}>
        //                 <TableHead>
        //                     <TableRow sx={{ backgroundColor: '#1976d2' }}>
        //                         <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Date</TableCell>
        //                         <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Loan Amount</TableCell>
        //                         <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Loan Type</TableCell>
        //                         <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Duration</TableCell>
        //                         <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Status</TableCell>
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                     {approvedLoans.map((data, index) => (
        //                         <TableRow key={index}>
        //                             <TableCell sx={{textAlign: "center"}}>{data.created_at.slice(0, 10)}</TableCell>
        //                             <TableCell sx={{textAlign: "center"}}>{data.LoanAmount}</TableCell>
        //                             <TableCell sx={{textAlign: "center"}}>{data.LoanType}</TableCell>
        //                             <TableCell sx={{textAlign: "center"}}>{data.Duration}</TableCell>
        //                             <TableCell sx={{color:"green" , fontWeight: "bold" , textAlign: "center"}}>{data.Status}</TableCell>

        //                         </TableRow>
        //                     ))}
        //                 </TableBody>
        //             </Table>
        //         )}
        //     </Box>
        // </Box>
        // </>
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
            <Sidebar></Sidebar>
            <Container className='mt-5 mb-5 paddingContainer' style={{ textAlign: "center" }} >
                <Row className='mt-5 mb-5'>
                    <Col className='mt-5 pt-3'>
                        <h3 className='mb-4' style={{ textAlign: "start" }}>LOAN REQUESTS</h3>
                        <Box sx={{ height: 400, width: '100%', marginTop: "20px" }}>
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
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={open}

                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Col>
                </Row>
            </Container>
        </>

    )
}