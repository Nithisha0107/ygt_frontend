import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import GenerateToken from './components/GenerateToken';
import QueueManagement from './components/QueueManagement';
import BarcodeScan from './components/BarcodeScan';
import GenerateReportForm from './components/GenerateReport';
import ImageBarcodeScan from './components/ImageBarcodescan';
import Charts from './components/Charts';
import './App.css'
import Home from './components/Home';
 
function App() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
 
    return (
        <Router>
        <div className='main'>
            <div style={{backgroundColor:'#ffc107' ,display:'flex',flexDirection: 'row',justifyContent: 'end',alignItems: 'center',width:'100%',}}><span>date:-</span><span>{formattedDate}</span></div>
        <div className='head'>
            <div className='head-container'>
        <div class="image">
            <img src='https://yadadritemple.telangana.gov.in/img/Picsart_23-06-16_00-46-36-438.png'
             alt='temple'/>
        </div>
        <div class="headding">
            <h2 style={{fontWeight:'bolder',color:'white'}}>శ్రీ లక్ష్మీ నరసింహ స్వామివారి దేవస్థానం</h2>
            <span>యాదగిరిగుట్ట</span>
        </div>
        <div class="imaget">
            <img src="https://online.yadadrionline.in/assets/images/LogoSmall.png"
            alt="temple" />
        </div>
        </div>
        <img src='https://yadadritemple.telangana.gov.in/img/tri.png'
        style={{width:'100%',height:'50%'}}
        alt='line'/>
      </div>
 
      <div className='navbarone'>
        <span className='links'><NavLink to='/' style={{color:'white',textDecoration:'none'}}>HOME</NavLink></span>
       <span className='links'> <NavLink to='/generate-token' style={{color:'white',textDecoration:'none'}}>GENERATE BAR CODE</NavLink></span>
       <span className='links'> <NavLink to='/queues' style={{color:'white',textDecoration:'none'}}>QUEUE MANAGEMENT</NavLink></span>
        <span className='links'><NavLink to='/scan-token' style={{color:'white',textDecoration:'none'}}>SCAN TOKEN</NavLink></span>
        <span className='links'><NavLink to='/scan-image' style={{color:'white',textDecoration:'none'}}>SCAN IMAGE</NavLink></span>
        <span className='links'><NavLink to='/generate-report' style={{color:'white',textDecoration:'none'}}>REPORT</NavLink></span>
        <span className='links'><NavLink to='/charts' style={{color:'white',textDecoration:'none'}}>CHARTS</NavLink></span>
      </div>
 
    <div style={{padding:'10px'}}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/generate-token" element={<GenerateToken />} />
                <Route path = "/queues" element = {<QueueManagement />} />
                <Route path="/scan-token" element={<BarcodeScan />} />
                <Route path = "/scan-image" element = {<ImageBarcodeScan />} /> 
                <Route path = "/generate-report" element = {<GenerateReportForm />} />
                <Route path = '/charts' element={<Charts/>} />
            </Routes>
    </div>
    </div>
    </Router>
    );
}
 
export default App;