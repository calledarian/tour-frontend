import { useState } from 'react';
import axios from 'axios';
import { LogIn, AlertCircle } from 'lucide-react';
import '../styles/login.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [extraField, setExtraField] = useState(''); // honeypot
    const [error, setError] = useState('');
    const [showContact, setShowContact] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (extraField) {
            // Honeypot field filled => possible bot
            setError('Bot detected.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                username,
                password,
                extra_field: extraField, // send honeypot value for backend check
            });

            const token = response.data.access_token;
            if (token) {
                localStorage.setItem('token', token);
                window.location.href = '/dashboard';
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Login failed');
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-input"
                    autoComplete="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                    autoComplete="current-password"
                />
                {/* Honeypot field, hidden from users */}
                <input
                    type="text"
                    name="extra_field"
                    value={extraField}
                    onChange={(e) => setExtraField(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1} // prevent tab focus
                    autoComplete="off"
                />

                <button type="submit" className="login-button">
                    <LogIn size={16} /> Login
                </button>
            </form>

            <div className="forgot-text">
                {!showContact ? (
                    <span onClick={() => setShowContact(true)}>Forgot your password?</span>
                ) : (
                    <>
                        <span onClick={() => setShowContact(false)}>Contact your developer:</span>
                        <a
                            href="https://ariankhadem.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            Arian Khadem
                        </a>
                    </>
                )}
            </div>

            {error && (
                <div className="login-error">
                    <AlertCircle size={16} />
                    <span>
                        <strong>Error:</strong> {error}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Login;
