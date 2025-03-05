import { Box } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

function ItemCard() {
  return (
    <div>
        <Box sx={{width: "100%", height: "130px",  margin: "4px", borderRadius: "3px", border: "0.5px solid black",display: "flex",flexDirection:'column', gap: '10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', padding:'5px'}}>
                <Box sx={{fontSize: '1.25rem', width:'25%',textAlign:'center',backgroundColor:'burlywood', border:'0.5px solid black', borderRadius:'3px'}}>High</Box>
                <EditIcon/>
            </Box>
            <Box sx={{fontSize:'1.5rem',padding:'5px', }}>Task-title</Box>
            <Box sx={{fontSize: '1.25rem',padding:'5px'}}>Task-description</Box>
        </Box>
    </div>
  )
}

export default ItemCard