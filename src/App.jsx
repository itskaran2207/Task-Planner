import TaskForm from './Components/TaskForm'
import SearchIcon from '@mui/icons-material/Search';
import './App.css'
import { useState } from 'react';
import ItemCard from './Components/ItemCard';
function App() {
  const [data,setData] = useState([]);
  const [showForm,setShowForm] = useState(false);

  const handleButtonClick = ()=>{
    setShowForm(true);
  }
  
  return (
    <>
      

      <div className="container">
        <nav className="navbar">
          <div style={{display: 'flex',alignItems:'center',backgroundColor:'white',padding:'3px',borderRadius:'3px'}}>
            <SearchIcon sx={{backgroundColor:'white',fontSize:'1.15rem'}}/>
            <input type="text" id='input1' className='input' placeholder='Search here for a task...'/>
          </div>
          
          
          <div className="nav-box">
            <input type="text" id='input2' className='input'placeholder='Filter by Assignee'/>
            <input type="text" id='input3' className='input' placeholder='Filter by Priority'/>
            <button className='nav-button' onClick={handleButtonClick}>Add Task</button>
          </div>
        </nav>

        {showForm && <TaskForm showForm={showForm} setShowForm={setShowForm} data={data} setData={setData} />}
        

        <div className="second-container">

          <div className="task-boxes">
            <div className="box-title" id="box-title1">Backlog</div>
            <div className="box-items">
              <ItemCard/>
              <ItemCard/>
            </div>
          </div>

          <div className="task-boxes">
            <div className="box-title" id="box-title2">In Progress</div>
            <div className="box-items"></div>
          </div>

          <div className="task-boxes">
            <div className="box-title" id="box-title3">Review</div>
            <div className="box-items"></div>
          </div>

          <div className="task-boxes">
            <div className="box-title" id="box-title4">Complete</div>
            <div className="box-items">
              <ItemCard/>
              <ItemCard/>
            </div>
          </div>

        </div>

      </div>

      
    </>
  )
}

export default App
