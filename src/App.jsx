import React from "react";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';

import Hero from "./components/Hero";
import Market from "./market/market.jsx";
import AssetsPage from "./wallet/AssetsPage.jsx";
import Trade from "./trade/trade.jsx";
import Dashboard from "./wallet/Dashboard.jsx";


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
			<Route path='/wallet' element={<Dashboard
				textAutoHide={true}
				enableStars={true}
				enableSpotlight={true}
				enableBorderGlow={true}
				enableTilt={true}
				enableMagnetism={true}
				clickEffect={true}
				spotlightRadius={300}
				particleCount={12}
				glowColor="132, 0, 255"
			/>}/>
		</Routes>
	</Router>
 )
}

export default App
