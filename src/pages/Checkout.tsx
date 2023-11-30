import { useRecoilState } from "recoil";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { paramState } from "../store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Checkout = () => {
    const [text] = useRecoilState(paramState);
    const navigate = useNavigate();

    useEffect(() => {
        // if text is empty, redirect to home page
        if (text === '') {
            navigate('/');
        }
    }, [text, navigate]);

    return (
        <>
            <Navbar />
            <div>
                <h1>{text}</h1>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;