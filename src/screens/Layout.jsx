import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from '../components/Navbar';
import Hero from "../Hero.jsx";
import Market from "../market/market.jsx";
import AssetsPage from "../wallet/AssetsPage.jsx";


gsap.registerPlugin(ScrollTrigger,SplitText);

    const Layout = () => {
        return (
            <Router>
                <Navbar />



                <Routes>

                	<Route path='../market' element={<Market />} />
                	<Route path='../wallet' element={<AssetsPage />} />

                </Routes>
            </Router>


        )
    }

    export default Layout;