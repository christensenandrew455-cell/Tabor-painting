const config = {
// BUSINESS INFO
businessName: "Tabor Painting",
phone: "(774)-245-3383",
email: "Taborpainting508@gmail.com",

// LOGO
logoUrl: "",
showLogo: true,

// BUTTONS
contactButtonText: "contact us",

// THEME
theme: {
pageBg: "bg-black",
pageText: "text-white",

headerBg: "bg-black",
headerBorder: "border-blue-500/20",
headerText: "text-white",

heroBg:
  "bg-gradient-to-br from-black via-gray-950 to-blue-950",

sectionBg:
  "bg-gray-900 border border-blue-500/20 rounded-3xl shadow-2xl",

cardBg:
  "bg-black border border-blue-500/20 rounded-2xl shadow-lg hover:border-blue-500 transition-all",

testimonialBg:
  "bg-black border border-blue-500/20 rounded-2xl",

button:
  "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition",

accentText: "text-blue-400",

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
"Founded by Jason Beirne after working with Student Painters, Tabor Painting was built on hard work, quality craftsmanship, and a commitment to delivering outstanding results.",

mission:
"To provide professional, high-quality painting services with excellent workmanship, reliable communication, and customer satisfaction on every project.",

whatWeDo:
"JTB Painting specializes in delivering high-quality painting services with precision strokes, attention to detail, and lasting results that enhance the beauty of every property.",

whyChooseUs:
"We deliver exceptional painting results, complete projects on time, and treat every property with the care and attention it deserves.",

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
