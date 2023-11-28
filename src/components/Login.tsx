import { useState } from 'react';

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform basic validation
    if (username && password) {
      // Simulate authentication by setting isLoggedIn in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
