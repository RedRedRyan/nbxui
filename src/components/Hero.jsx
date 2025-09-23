import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import AccountType from "../auth/register/AccountType.jsx";


const Hero = () => {
 const videoRef = useRef();
 
 const isMobile = useMediaQuery({ maxWidth: 767 });


 
 useGSAP(() => {
	const heroSplit = new SplitText(".title", {
	 type: "chars, words",
	});
	
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	 const titleSplit = SplitText.create('#about h2', {
		 type: 'words'
	 })

	 const scrollTimeline = gsap.timeline({
		 scrollTrigger: {
			 trigger: '#account-type',
			 start: 'top center'
		 }
	 })

	 scrollTimeline
		 .from(titleSplit.words, {
			 opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
		 })
		 .from('.top-grid div, .bottom-grid div', {
			 opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.04,
		 }, '-=0.5')
	
	// Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});
	
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});
	
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	})
	.to(".black-coin", { y: 200 }, 0)
	.to(".white-coin", { y: -400 }, 0)
	.to(".arrow", { y: 100 }, 0);
	
	const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
 }, []);
 
 return (
	<>
	 <section id="hero" className="clear">
		<h1 className="title">nbx</h1>



		<img
		 src="/images/coin.png"
		 alt="white-coin"
		 className="white-coin"
		/>
		<img
		 src="/images/blackcoin.png"
		 alt="black-coin"
		 className="black-coin"
		/>
		
		<div className="body">
		 {/* <img src="/images/arrow.png" alt="arrow" className="arrow" /> */}
		 
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Nairobi Block Exchange</p>
			 <p className="subtitle">
				 Company Shares  <br /> as Tokens
			 </p>
			</div>
			
			<div className="get-started">
			 <p className="subtitle">
				 <button>
					 Sign In
				 </button>
			 </p>
				<button>
			 <a href="#account">Get Started</a>
				</button>
			</div>
		 </div>
		</div>



	 </section>




	 
	 <div className="video absolute inset-0">
		<video
		 ref={videoRef}
		 muted
		 playsInline
		 preload="auto"
		 src="/videos/output.mp4"
		/>
	 </div>
	</>
 );

};

export default Hero;