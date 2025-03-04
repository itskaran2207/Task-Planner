
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

        
        <div className="task-containers"></div>
        <div className="task-containers"></div>
        <div className="task-containers"></div>
        <div className="task-containers"></div>
      </div>
    </>
  )
}

export default App
