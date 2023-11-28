import React from 'react';

type NavbarProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <div>
      <h1>Travel Agency</h1>
      {isLoggedIn && <button onClick={onLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;