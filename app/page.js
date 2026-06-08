import Link from "next/link";
import config from "./homeConfig";
import siteConfig from "./siteConfig";

export default function Home() {
  return (
    <main
      className={`
        ${config.font}
        text-gray-900
        ${
          siteConfig.contentAlignment === "center"
            ? "text-center"
            : "text-left"
        }
      `}
    >
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
            {/* LEFT: Logo and Business Name */}
            <div className="flex items-center gap-3">
              {config.showLogo && config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt={config.businessName}
                  className="h-12 w-auto object-contain"
                />
              )}
              <div>
                <h1 className={`font-bold text-xl ${config.headerTextColor}`}>
                  {config.businessName}
                </h1>
              </div>
            </div>

            {/* NAVIGATION LINKS (conditional) */}
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

            {/* RIGHT: Contact Button */}
            <div>
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
          </div>
        </header>
      )}

      <div className={`mx-auto ${siteConfig.maxWidth} ${siteConfig.pagePadding}`}>
        {/* HERO SECTION */}
        <section
          className={`relative overflow-hidden rounded-2xl mb-12 ${
            !config.heroUseImage ? config.heroBackgroundColor : ""
          }`}
        >
          {config.heroUseImage && (
            <>
              <img
                src={config.heroImage}
                alt={config.businessName}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
          <div className="relative z-10 px-8 py-32 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold">
              {config.heroTitle}
            </h1>
            <p className="text-xl mt-4 max-w-4xl mx-auto">
              {config.heroSubtitle}
            </p>
            <Link
              href={siteConfig.contactPageRoute}
              className="inline-block mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              {config.contactButtonText}
            </Link>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Company Story</h3>
              <p>{config.companyStory}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p>{config.mission}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">What We Do</h3>
              <p>{config.whatWeDo}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Areas We Serve</h3>
              <p>{config.serviceAreas.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Why Choose Us</h3>
              <p>{config.whyChooseUs}</p>
            </div>
          </div>
        </section>

        {/* OUR WORK SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Work ${i + 1}`}
                className="rounded-xl shadow"
              />
            ))}
          </div>
          {config.video && (
            <video
              src={config.video}
              controls
              className="mt-6 w-full rounded-xl"
            />
          )}
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <div className="space-y-4">
            {config.testimonials.map((t, i) => (
              <div key={i} className="p-4 bg-white rounded-xl shadow">
                <p className="font-semibold">{t.name}</p>
                <p>{"⭐".repeat(t.stars)}</p>
                <p>{t.review}</p>
              </div>
            ))}
          </div>
          {config.googleReviewsLink && (
            <a
              href={config.googleReviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-4 block"
            >
              View Google Reviews
            </a>
          )}
        </section>

        {/* CONTACT CTA SECTION */}
        <section className="mt-12 text-center">
          <Link
            href={siteConfig.contactPageRoute}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
          >
            {config.contactButtonText}
          </Link>
        </section>
      </div>

      {siteConfig.showFooter && (
        <footer
          className={`
            p-6
            border-t
            ${siteConfig.footerCentered ? "text-center" : "text-left"}
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
