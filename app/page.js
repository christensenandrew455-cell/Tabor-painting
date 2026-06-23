import Link from "next/link";
import config from "./homeConfig";
import siteConfig from "./siteConfig";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
const instagramUrl = "https://www.instagram.com/taborpainting?igsh=YnRkeGxxbDZwNnds";
const faqItems = [
  ["Do you offer free estimates?", "Yes. Contact Tabor Painting with your project details and we can talk through the next step."],
  ["What areas do you serve?", "Tabor Painting is based in Berlin, MA and serves nearby Central Massachusetts communities."],
  ["What services do you offer?", "We offer interior painting, exterior painting, and wood staining."],
  ["How do I get started?", "Reach out through the contact page with your name, phone number, location, and a short description of the project."],
];

return (
<main className={`${config.font} ${config.theme.pageBg} ${config.theme.pageText}`}>
  {siteConfig.showHeader && <SiteHeader />}

  <section className={`min-h-screen flex items-center justify-center text-center px-6 ${config.theme.heroBg}`}>
    <div><h1 className="text-6xl md:text-8xl font-extrabold mb-6">{config.heroTitle}</h1><p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">{config.heroSubtitle}</p><Link href={siteConfig.contactPageRoute} className={`inline-block mt-10 ${config.theme.button}`}>{config.contactButtonText}</Link></div>
  </section>

  <div className={`mx-auto ${siteConfig.maxWidth} ${siteConfig.pagePadding}`}>
    <section className={`${config.theme.sectionBg} p-8 mb-12`}>
      <h2 className={`text-4xl font-bold mb-8 ${config.theme.accentText}`}>About Us</h2>
      <div className="grid md:grid-cols-2 gap-6"><div className={`${config.theme.cardBg} p-6`}><h3 className="text-2xl font-semibold mb-3">Our Story</h3><p className="text-gray-700 leading-relaxed">{config.companyStory}</p></div><div className={`${config.theme.cardBg} p-6`}><h3 className="text-2xl font-semibold mb-3">Our Mission</h3><p className="text-gray-700 leading-relaxed">{config.mission}</p></div><div className={`${config.theme.cardBg} p-6`}><h3 className="text-2xl font-semibold mb-3">What We Do</h3><p className="text-gray-700 leading-relaxed">{config.whatWeDo}</p></div><div className={`${config.theme.cardBg} p-6`}><h3 className="text-2xl font-semibold mb-3">Areas We Serve</h3><p className="text-gray-700">{config.serviceAreas.join(", ")}</p></div><div className={`${config.theme.cardBg} p-6 md:col-span-2`}><h3 className="text-2xl font-semibold mb-3">Why Choose Us</h3><p className="text-gray-700 leading-relaxed">{config.whyChooseUs}</p></div><div className={`${config.theme.cardBg} p-6 md:col-span-2`}><h3 className="text-2xl font-semibold mb-3">Socials</h3><p className="text-gray-700 mb-4">Follow Tabor Painting on Instagram.</p><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-yellow-600/30 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-800 hover:bg-yellow-100">Instagram</a></div></div>
      <p className="mt-6 text-center text-gray-700">Want to learn more about Tabor Painting? <Link href="/about" className="font-semibold text-yellow-700 underline hover:text-black">Click here to visit our About Us page.</Link></p>
    </section>
    <section className={`${config.theme.sectionBg} p-8 mb-12`}><h2 className={`text-4xl font-bold mb-8 ${config.theme.accentText}`}>Our Work</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{config.images.map((img, i) => (<img key={i} src={img} alt={`Tabor Painting project example ${i + 1}`} className="rounded-2xl shadow-xl hover:scale-105 transition duration-300" />))}</div>{config.video && <video src={config.video} controls className="mt-6 w-full rounded-2xl" />}<p className="mt-6 text-center text-gray-700">Want to see what services we offer? <Link href="/services" className="font-semibold text-yellow-700 underline hover:text-black">Click here to view our Services page.</Link></p></section>
    <section className={`${config.theme.sectionBg} p-8 mb-12`}><h2 className={`text-4xl font-bold mb-8 ${config.theme.accentText}`}>Testimonials</h2><div className="space-y-6">{config.testimonials.map((t, i) => (<div key={i} className={`${config.theme.testimonialBg} p-6`}><p className="font-semibold text-lg">{t.name}</p><p className="text-yellow-600 mb-2">{"★".repeat(t.stars)}</p><p className="text-gray-700">{t.review}</p></div>))}</div>{config.googleReviewsLink && <p className="mt-6 text-center text-gray-700">Want to read more reviews? <a href={config.googleReviewsLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-yellow-700 underline hover:text-black">Click here to view our Google reviews.</a></p>}</section>
    <section className={`${config.theme.sectionBg} p-8 mb-12`}><h2 className={`text-4xl font-bold mb-8 ${config.theme.accentText}`}>FAQ</h2><div className="space-y-4">{faqItems.map(([question, answer]) => (<div key={question} className={`${config.theme.cardBg} p-6`}><h3 className="text-xl font-semibold mb-2">{question}</h3><p className="text-gray-700 leading-relaxed">{answer}</p></div>))}</div><p className="mt-6 text-center text-gray-700">Still have questions or want to get started? <Link href={siteConfig.contactPageRoute} className="font-semibold text-yellow-700 underline hover:text-black">Click here to contact us.</Link></p></section>
    <section className="text-center py-20"><h2 className="text-5xl font-bold mb-4">Ready To Transform Your Property?</h2><p className="text-gray-700 mb-8 text-lg">Contact Tabor Painting today for a free estimate.</p><Link href={siteConfig.contactPageRoute} className={config.theme.button}>{config.contactButtonText}</Link></section>
  </div>
  {siteConfig.showFooter && <footer className="border-t border-yellow-600/30 py-8 text-center"><p>{config.email}</p>{config.phone && <p className="mt-1">{config.phone}</p>}<p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-black">ARK Websites</a></p><Link href={siteConfig.privacyPageRoute} className="inline-block mt-4 text-yellow-700 hover:text-black">Privacy Policy</Link></footer>}
</main>
);
}
