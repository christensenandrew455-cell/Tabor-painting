import Link from "next/link";
import config from "../homeConfig";
import siteConfig from "../siteConfig";
import servicesConfig from "../servicesConfig";

export default function ServicesPage() {
  return (
    <main className={`${config.font} ${config.theme.pageBg} ${config.theme.pageText}`}>
      <header className={`sticky top-0 z-50 border-b ${config.theme.headerBg} ${config.theme.headerBorder} backdrop-blur`}><div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"><h1 className={`text-2xl font-bold ${config.theme.accentText}`}>{config.businessName}</h1><div className="hidden md:flex items-center gap-6"><Link href="/" className="font-medium hover:opacity-80">Home</Link><Link href="/services" className="font-medium hover:opacity-80">Services</Link><Link href="/about" className="font-medium hover:opacity-80">About Us</Link><Link href={siteConfig.contactPageRoute} className={config.theme.button}>{config.headerButtonText || "Contact Us"}</Link></div><div className="md:hidden"><Link href={siteConfig.contactPageRoute} className={config.theme.button}>{config.headerButtonText || "Contact Us"}</Link></div></div></header>
      <div className="max-w-7xl mx-auto p-4 md:p-12">
        <div className="text-center mb-10 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-5 md:mb-6 leading-tight">{servicesConfig.pageTitle}</h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-300 leading-relaxed">{servicesConfig.pageSubtitle}</p>
        </div>
        <div className="space-y-8 md:space-y-12">
          {servicesConfig.services.map((service, index) => (
            <section key={service.title} className={`${config.theme.sectionBg} grid md:grid-cols-2 gap-6 md:gap-10 items-center p-5 md:p-12`}>
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className={`inline-block ${config.theme.button} mb-5 md:mb-6`}>{service.title}</div>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">{service.description}</p>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <img src={service.image} alt={service.title} className="w-full rounded-3xl shadow-lg" />
              </div>
            </section>
          ))}
        </div>
        <section className="text-center mt-12 md:mt-20">
          <Link href={siteConfig.contactPageRoute} className={config.theme.button}>{servicesConfig.contactButtonText}</Link>
        </section>
      </div>
      <footer className="border-t border-blue-500/20 py-8 text-center px-4">
        <p>{config.email}</p>
        {config.phone && <p className="mt-1">{config.phone}</p>}
        <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">ARK Websites</a></p>
        <Link href={siteConfig.privacyPageRoute} className="inline-block mt-4 text-blue-400 hover:text-blue-300">Privacy Policy</Link>
      </footer>
    </main>
  );
}
