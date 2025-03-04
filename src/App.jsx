
import './App.css'

function App() {
  
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <input type="text" id='input1' className='input' placeholder='Search here for a task...'/>
          <div className="nav-box">
            <input type="text" id='input2' className='input'placeholder='Filter by Assignee'/>
            <input type="text" id='input3' className='input' placeholder='Filter by Priority'/>
            <button className='nav-button'>Add Task</button>
          </div>
        </nav>


        <div className="second-container">

          <div className="task-boxes">
            <div className="box-title" id="box-title1">Backlog</div>
            <div className="box-items"></div>
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
            <div className="box-items"></div>
          </div>

        </div>

        
     
      </div>
    </>
  )
}

export default App
