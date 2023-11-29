import { useState } from 'react';
import Navbar from './Navbar';

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
	<>
		<Navbar />
		<div className="flex flex-col items-center justify-center">
			<div className="bg-red-500 text-white px-4 py-4 rounded mb-2 mt-2">
				<div>Please login to continue</div>
			</div>
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
				<label>
					Username:
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
					className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</label>
				<label>
					Password:
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
					className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</label>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
 	</>
	);
};

export default Login;
