import React from "react";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';

import Hero from "./components/Hero";
import Market from "./market/market.jsx";
import AssetsPage from "./wallet/AssetsPage.jsx";
import Trade from "./trade/trade.jsx";


gsap.registerPlugin(ScrollTrigger, SplitText);


const App = () => {
 return (
	<Router>

		<Navbar />
		<Routes>
			<Route path="/" element={<Hero />}  />
			<Route path='/market' element={<Market />} />
			<Route path='/trade' element={<Trade />} />
			<Route path='/wallet' element={<AssetsPage/>}/>
		</Routes>
	</Router>
 )
}

export default App
