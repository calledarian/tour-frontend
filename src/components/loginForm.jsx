import { useState } from 'react';
import axios from 'axios';
import { LogIn, AlertCircle } from 'lucide-react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useCookiesEnabled } from '../utils/useCookiesEnabled';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const cookiesEnabled = useCookiesEnabled();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [extraField, setExtraField] = useState(''); // honeypot
    const [error, setError] = useState('');
    const [showContact, setShowContact] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!useCookiesEnabled) {
            setError("Cookies are disabled, please enable them to log in.")
            return
        }

        if (extraField) {
            setError('Bot detected.');
            return;
        }

        try {
            await axios.post(
                `${apiUrl}/auth/login`,
                {
                    username,
                    password,
                    extra_field: extraField,
                },
                {
                    withCredentials: true,
                }
            );
            navigate('/dashboard')

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
                    min={8}
                    className="login-input"
                    autoComplete="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    min={8}
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

                <button type="submit" className="login-button" disabled={!cookiesEnabled}>
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
