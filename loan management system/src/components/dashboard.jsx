import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

function DashboardContent() {
  return (
    <>
      <Typography variant="h4" >
        DASHBOARD OVERVIEW
      </Typography>
      
      
      
      <Grid container spacing={3}>
       
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: 100,
              width: 200, 
              marginTop: 8,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Active Loans<br></br>
            7
          </Paper>
        </Grid>

       
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: 100,
              width: 200,
              marginTop: 8,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Approved<br></br>
            5
          </Paper>
        </Grid>

       
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              height: 100,
              width: 200,
              marginTop: 8,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Pending<br></br>
            2
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardContent;
