import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from "../services/api.js";
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const res = await apiPost('/auth/login/', { username, password });
            console.log(res) 
            if (res.access) {
                localStorage.setItem('access_token', res.access);
                localStorage.setItem('refresh_token', res.refresh);
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h3 style={{'color':'#cad6ff'}}>Login Form</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="login-button"
                    
                    disabled={loading}
                    style={{ padding: '10px', marginTop: '20px' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

        <button 
                    onClick={()=>navigate('/')}
                    className="login-button"
                    
                    disabled={loading}
                    style={{ padding: '10px', marginTop: '20px' }}
                >
                    {loading ? 'Logging in...' : 'Exit'}
                </button>

            </form>
            
        </div>
    );
}

export default Login;
