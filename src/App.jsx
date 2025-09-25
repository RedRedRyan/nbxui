import React from "react";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';

import Hero from "/src/Hero.jsx";
import Market from "./market/market.jsx";
import AssetsPage from "./wallet/AssetsPage.jsx";
import Trade from "./trade/trade.jsx";
import Dashboard from "./profile/Dashboard.jsx";
import Home from "./screens/Home.jsx";
import Layout from "./screens/Layout.jsx";
import Earn from "./profile/Earn.jsx";


gsap.registerPlugin(ScrollTrigger, SplitText);


const App = () => {
 return (
	 <Router>

		 <Navbar />


		 <Routes>
			 <Route path="/" element={<Hero />}  />
			 <Route path='/market' element={<Market />} />
			 <Route path='/wallet' element={<AssetsPage/>}/>
			 <Route path='/profile' element={<Earn/>}/>
			 <Route path='/trade' element={<Trade/>}/>
		 </Routes>
	 </Router>
 )
}

export default App
