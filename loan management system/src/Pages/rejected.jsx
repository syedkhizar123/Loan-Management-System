import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/adminHeader';
import Sidebar from '../components/adminSidebar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseclient';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    CircularProgress
} from '@mui/material';


export default function RejectedLoans(){

    const navigate = useNavigate()
    let getAdmin = localStorage.getItem("Admin")

    useEffect(() => {
           if(!getAdmin){
                navigate("/Admin")
           }
            
          });

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [loading, setLoading] = useState(true);

    const [rejectedLoans, setrejectedLoans] = useState([])
    const fetchRejectedLoans = async () => {
        try {
            const { data, error } = await supabase
                .from('Loans')
                .select()
                .eq('Status', 'Rejected')

            if (error) throw error
            if (data) {
                console.log(data)
                setrejectedLoans(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRejectedLoans()
    }, [])

    return(
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} toggleDrawer={toggleDrawer} />
            <Sidebar open={open} />
            <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
            <h4  style={{ textAlign: "center" , fontSize: "40px" , fontFamily: "-moz-initial"}}>Rejected Requests</h4>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

                        <CircularProgress />

                    </Box>
                ) : (
              
                   
                    <Table sx={{ mt: 5 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Loan Amount</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Loan Type</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Duration</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' , textAlign: "center"}}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rejectedLoans.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{textAlign: "center"}}>{data.created_at.slice(0, 10)}</TableCell>
                                    <TableCell sx={{textAlign: "center"}}>{data.LoanAmount}</TableCell>
                                    <TableCell sx={{textAlign: "center"}}>{data.LoanType}</TableCell>
                                    <TableCell sx={{textAlign: "center"}}>{data.Duration}</TableCell>
                                    <TableCell sx={{color:"red" , fontWeight: "bold" , textAlign: "center"}}>{data.Status}</TableCell>
                                   
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>
        </Box>
        </>
        
    )
}