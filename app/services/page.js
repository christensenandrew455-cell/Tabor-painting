import Link from "next/link";
import config from "../homeConfig";
import siteConfig from "../siteConfig";
import servicesConfig from "../servicesConfig";

export default function ServicesPage() {
  return (
    <main className={`${config.font} text-gray-900`}>
      {siteConfig.showHeader && (
        <header
          className={`
            border-b
            ${config.headerBorder}
            ${config.headerBackground}
            p-4
            ${
              siteConfig.stickyHeader
                ? "sticky top-0 bg-white z-50"
                : ""
            }
          `}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {config.showLogo && config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt={config.businessName}
                  className="h-12 w-auto object-contain"
                />
              )}

              <h1
                className={`font-bold text-xl ${config.headerTextColor}`}
              >
                {config.businessName}
              </h1>
            </div>

            {config.showNavLinks && (
              <nav className="hidden md:flex items-center gap-4">
                {config.headerLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      px-4
                      py-2
                      rounded-lg
                      transition
                      hover:bg-gray-100
                      ${config.headerTextColor}
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            )}

            <Link
              href={siteConfig.contactPageRoute}
              className={`
                px-5
                py-2
                rounded-lg
                transition
                font-medium
                ${config.headerButtonBg}
                ${config.headerButtonHover}
                ${config.headerButtonText}
              `}
            >
              {config.contactButtonText}
            </Link>
          </div>
        </header>
      )}

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            {servicesConfig.pageTitle}
          </h1>

          <p className="text-xl max-w-4xl mx-auto">
            {servicesConfig.pageSubtitle}
          </p>
        </div>

        <div className="space-y-20">
          {servicesConfig.services.map((service, index) => (
            <section
              key={service.title}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div
                className={
                  index % 2 === 1
                    ? "md:order-2"
                    : ""
                }
              >
                <div className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg mb-6 font-semibold">
                  {service.title}
                </div>

                <p className="text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div
                className={
                  index % 2 === 1
                    ? "md:order-1"
                    : ""
                }
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </section>
          ))}
        </div>

        <section className="text-center mt-20">
          <Link
            href={siteConfig.contactPageRoute}
            className="inline-block bg-blue-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            {servicesConfig.contactButtonText}
          </Link>
        </section>
      </div>

      {siteConfig.showFooter && (
        <footer
          className={`
            p-6
            border-t
            ${
              siteConfig.footerCentered
                ? "text-center"
                : "text-left"
            }
          `}
        >
          <p>{config.email}</p>

          <p>{config.phone}</p>

          <Link
            href={siteConfig.privacyPageRoute}
            className="block mt-3 text-blue-600 underline"
          >
            Privacy Policy
          </Link>
        </footer>
      )}
    </main>
  );
}
