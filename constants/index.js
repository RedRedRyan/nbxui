const navLinks = [
	{
		id: "home",
		title: "Home",
		imgPath: "/icons/home.png",
		path: "/"  // Add path property
	},
	{
		id: "market",
		title: "Markets",
		imgPath: "/icons/market.png",
		path: "/market"  // Simplified path
	},
	{
		id: "profile",
		title: "Earn",
		imgPath: "/icons/receipt.png",
		path: "/profile"
	},
	{
		id: "wallet",
		title: "Wallet",
		imgPath: "/icons/user.png",
		path: "/wallet"  // Simplified path
	},
];

const accountTypes = [
	{
		type: 'investor',
		icon: '/images/wallet.png',
		title: 'Individual',
		description: 'Personal trading account for retail investors',

	},
	{
		type: 'institution',
		icon: '/images/sacco.png',
		title: 'Institution',
		description: 'Trading account for investment firms and banks',

	},
	{
		type: 'company',
		icon: '/images/rocket.png',
		title: 'Company',
		description: 'Account for publicly traded companies',
		features: ['Share issuance management', 'Corporate actions', 'Investor relations'],
	},
];






const profileLists = [
 {
	imgPath: "/images/profile1.png",
 },
 {
	imgPath: "/images/profile2.png",
 },
 {
	imgPath: "/images/profile3.png",
 },
 {
	imgPath: "/images/profile4.png",
 },
];



const storeInfo = {
 heading: "Where to Find Us",
 address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
 contact: {
	phone: "(555) 987-6543",
	email: "hello@jsmcocktail.com",
 },
};

const openingHours = [
 { day: "Mon–Thu", time: "11:00am – 12am" },
 { day: "Fri", time: "11:00am – 2am" },
 { day: "Sat", time: "9:00am – 2am" },
 { day: "Sun", time: "9:00am – 1am" },
];

const socials = [
 {
	name: "Instagram",
	icon: "/images/insta.png",
	url: "#",
 },
 {
	name: "X (Twitter)",
	icon: "/images/x.png",
	url: "#",
 },
 {
	name: "Facebook",
	icon: "/images/fb.png",
	url: "#",
 },
];



export {
 navLinks,
 
 
 profileLists,

 
 openingHours,
 storeInfo,
 socials,
	accountTypes,

};
