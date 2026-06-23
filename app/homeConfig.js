const config = {
// BUSINESS INFO
businessName: "Tabor Painting",
phone: "(774)-245-3383",
email: "Taborpainting508@gmail.com",

// LOGO
logoUrl: "/tabor-logo.svg",
showLogo: true,

// BUTTONS
contactButtonText: "contact us",

// THEME
theme: {
pageBg: "bg-white",
pageText: "text-black",

headerBg: "bg-white",
headerBorder: "border-yellow-600/30",
headerText: "text-black",

heroBg:
  "bg-gradient-to-br from-white via-yellow-50 to-yellow-100",

sectionBg:
  "bg-white border border-yellow-600/30 rounded-3xl shadow-2xl",

cardBg:
  "bg-white border border-yellow-600/30 rounded-2xl shadow-lg hover:border-yellow-600 transition-all",

testimonialBg:
  "bg-white border border-yellow-600/30 rounded-2xl shadow-lg",

button:
  "bg-black hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-semibold transition",

accentText: "text-yellow-700",

},

// HEADER
showNavLinks: false,
headerLinks: [
{ name: "Home", href: "/" },
{ name: "Services", href: "/services" },
{ name: "About Us", href: "/about" },
],

// STYLE
font: "font-sans",

// HERO
heroTitle: "Tabor Painting",
heroSubtitle:
"Precision in Every Stroke. Excellence in Every Project.",
heroUseImage: false,
heroImage: "",

// ABOUT
companyStory:
"Tabor Painting is a local painting company based in Berlin, Massachusetts, built on hard work, clean results, and dependable service.",

mission:
"Our mission is to provide professional interior painting, exterior painting, and wood staining with careful prep, clear communication, and quality workmanship.",

whatWeDo:
"We help homeowners refresh and protect their properties with interior painting, exterior painting, and wood staining services in Berlin MA and nearby areas.",

whyChooseUs:
"Homeowners choose Tabor Painting because we show up professionally, respect the property, keep the work clean, and focus on a smooth finished result.",

serviceAreas: ["All of Massachusetts"],

images: [
"https://via.placeholder.com/600x400",
"https://via.placeholder.com/600x400",
"https://via.placeholder.com/600x400",
],

video: "",

testimonials: [
{
name: "Chris",
stars: 5,
review: "The room looks brand new!",
},
{
name: "Mike",
stars: 5,
review: "These guys know what they are doing!",
},
{
name: "Sarah",
stars: 5,
review:
"Jason and his team were respectful, professional, and did amazing work.",
},
],

googleReviewsLink: "",
};

export default config;
