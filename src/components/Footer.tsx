import React from 'react';

const Footer = () => {
  return (
	<footer className="bg-gray-800 text-white py-12">
	  <div className="container mx-auto flex flex-wrap justify-around">
		<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
		  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
		  <p>Email: info@example.com</p>
		  <p>Phone: (123) 456-7890</p>
		</div>
		<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
		  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
		  <p>Facebook</p>
		  <p>Twitter</p>
		  <p>Instagram</p>
		</div>
		<div className="w-full md:w-1/3 lg:w-1/4 mb-8">
		  <h3 className="text-lg font-semibold mb-4">Address</h3>
		  <p>123 Street, City</p>
		  <p>Country</p>
		</div>
	  </div>
	  <p className="text-center mt-8">&copy; 2023 Travel Agency</p>
	</footer>
  );
};

export default Footer;
