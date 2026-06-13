import React ,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Schedule from './Schedule';
import Notice from './Notice';
import Login from './accounts/Login'
import { Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css'
import {apiGet, apiPost} from './services/api.js'
import Dashboard from './dashboard/Dashboard.jsx'
function Layout() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('access_token');
    const [dialog, setDialog] = useState(false)

    const handleLogout = () => {
        localStorage.clear();
        navigate('/account/Login');
    };
    
    useEffect(() => {
      
         
      return () => {
        return
      }
    }, [])
    
    const handleAccountDialog = () => {
      setDialog(true)
  }

    return (
        <div>

            <nav className="navbar"><> 
                <Link to="/s/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/s/schedule" style={{ color: 'white', textDecoration: 'none' }}>Schedule</Link>
                <Link to="/s/notice" style={{ color: 'white', textDecoration: 'none' }}>Notice</Link></>
               <span> 
               <Link to="/dashboard"> 
                    <button onClick={null}  style={{ marginLeft: 'auto',  backgroundColor:'transparent', border:'none' }}>  </button></Link></span>


            </nav>
            <div style={{ padding: '20px' }}>
                <Outlet />             
            </div>

            { dialog && (
              <div className="backdrop" style={{'fontFamily':'\'JetBrains Mono\', monospace'}}
        onClick={(e)=>{
            e.target.classList[0]=="backdrop" ? setDialog(false):null
          }} onKeyDown={(e)=>console.log(e.key) }>
                <div className="account_dialog">
                  Username: {JSON.parse(localStorage.getItem('profile') || '{}')?.username || 'N/A'}
<br />
Email: {JSON.parse(localStorage.getItem('profile') || '{}')?.['email'] || 'N/A'}
<br />
School: {JSON.parse(localStorage.getItem('profile') || '{}')?.school || 'N/A'}
<br />
Class: {JSON.parse(localStorage.getItem('profile') || '{}')?.class_grade || 'N/A'}
<br />
You are: {JSON.parse(localStorage.getItem('profile') || '{}')?.role || 'Participant'}
<br />
{JSON.parse(localStorage.getItem('profile') || '{}')?.role === "executive" && (
    <Link to="/dashboard">Go to Dashboard</Link>
)}
                </div>
              </div>
            )}
        </div>
    );
}

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/account/Login" />;
};

function App() {
    return (
    <div className='mainapp'>
        <BrowserRouter>
            <Routes>
                <Route path="/account/Login" element={<Login />} />
                <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard />  </ProtectedRoute>} />

                <Route path="/s" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="notice" element={<Notice />} />
                </Route>
                

                <Route path="/" element={<Navigate to="/s/home" />} />
                <Route path="*" element={<Navigate to="/s/home" />} />
            </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
