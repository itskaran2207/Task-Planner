import React from 'react'
import '../App.css';
import { useState } from 'react';

const DropArea = ({onDrop}) => {
    const [showdrop,setShowDrop] = useState(false);
  return (
    <div
     onDragEnter={()=>{ setShowDrop(true)}}
     onDragLeave={()=> setShowDrop(false)}
     onDrop={(e)=>{
        e.preventDefault(); 
        onDrop();
        setShowDrop(false);
     }}
     onDragOver={(e)=> e.preventDefault()}
     className={showdrop ? 'drop_area' : "hide_drop"}>
        drop area
    </div>
  )
}

export default DropArea