import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router'
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { supabase } from '../../supabaseclient';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
} from '@mui/material';
import DashboardContent from '../components/dashboard';
export default function LoanRequest() {

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const [loading, setLoading] = useState(true);
    const [loandata , setloandata] = useState([]);

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
                return(
                 <>
                   <Table>
                    <TableBody>
                        {data.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.created_at}</TableCell>
                                <TableCell>{data.loanAmount}</TableCell>
                                <TableCell>{data.loanType}</TableCell>
                                <TableCell>{data.Duration}</TableCell>
                                <TableCell>Pending</TableCell>
                            </TableRow>
                        ))}
                      
                    </TableBody>   
                    </Table> 
                    </>           
                )
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])
    // return (
    //     <div>
    //       <Box sx={{ display: 'flex' }}>
    //         <CssBaseline />
    //         <Header open={open} toggleDrawer={toggleDrawer} />
    //         <Sidebar open={open} />
    //         <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
            
    //           <Table sx={{ mt: -15 }}>
    //             <TableHead>
    //               <TableRow sx={{ backgroundColor: '#1976d2' }}>
    //                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
    //                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Loan Amount</TableCell>
    //                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Loan Type</TableCell>
    //                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
    //                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               {loandata.map((data, index) => (
    //                 <TableRow key={index}>
    //                   <TableCell>{data.created_at.slice(0,10)}</TableCell>
    //                   <TableCell>{data.LoanAmount}</TableCell>
    //                   <TableCell>{data.LoanType}</TableCell>
    //                   <TableCell>{data.Duration}</TableCell>
    //                   <TableCell>Pending</TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </Box>
    //       </Box>
    //     </div>
    //   );
    
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header open={open} toggleDrawer={toggleDrawer} />
          <Sidebar open={open} />
          <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                
               
              </Box>
            ) : (
              <Table sx={{ mt: -17 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Loan Amount</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Loan Type</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loandata.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.created_at.slice(0,10)}</TableCell>
                      <TableCell>{data.LoanAmount}</TableCell>
                      <TableCell>{data.LoanType}</TableCell>
                      <TableCell>{data.Duration}</TableCell>
                      <TableCell>Approved</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      );
}