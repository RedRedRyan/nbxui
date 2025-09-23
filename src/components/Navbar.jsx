import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../constants/index.js';

const Navbar = () => {
	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: 'nav',
				start: 'bottom top'
			}
		});

		navTween.fromTo('nav', { backgroundColor: '#0c0e4d' }, {
			backgroundColor: '#00000050',
			backgroundFilter: 'blur(10px)',
			duration: 1,
			ease: 'power1.inOut'
		});
	})

	return (
		<nav>
			<div>
				{/*<Link to="/" className="flex items-center gap-2">*/}
				{/*	<img src="/images/logo.png" alt="logo" />*/}
				{/*	<p>.</p>*/}
				{/*</Link>*/}

				<ul>
					{navLinks.map((link) => (
						<li key={link.id}>

								<Link to={link.path}>
									<div className="nav-icon">
								<img src={link.imgPath} alt={link.title} />

								  {/* Use the path property */}
									{link.title}
									</div>
								</Link>

						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar