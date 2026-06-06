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
            p-4
            ${
              siteConfig.stickyHeader
                ? "sticky top-0 bg-white z-50"
                : ""
            }
          `}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
            <div>
              {config.logoUrl && (
                <img
                  src={config.logoUrl}
                  alt={config.businessName}
                  className="h-12 object-contain"
                />
              )}
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold">
                {config.businessName}
              </h1>
            </div>

            <div className="flex justify-end">
              <Link
                href={siteConfig.contactPageRoute}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                {config.contactButtonText}
              </Link>
            </div>
          </div>
        </header>
      )}

      <div
        className={`mx-auto ${siteConfig.maxWidth} ${siteConfig.pagePadding}`}
      >
        {/* HERO */}
        <section
          className={`relative overflow-hidden rounded-2xl mb-12 ${
            !config.heroUseImage
              ? config.heroBackgroundColor
              : ""
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

          <div className="relative z-10 px-8 py-28 text-center text-white">
            <h1 className="text-5xl font-bold">
              {config.heroTitle}
            </h1>

            <p className="text-xl mt-4 max-w-3xl mx-auto">
              {config.heroSubtitle}
            </p>

            <Link
              href={siteConfig.contactPageRoute}
              className="inline-block mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold"
            >
              {config.contactButtonText}
            </Link>
          </div>
        </section>

        {/* ABOUT */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            About Us
          </h2>

          <p>{config.companyStory}</p>

          <h3 className="text-2xl font-semibold mt-6">
            Our Mission
          </h3>

          <p>{config.mission}</p>
        </section>

        {/* SERVICE AREAS */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Areas We Service
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {config.serviceAreas.map((area, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 text-center shadow-sm"
              >
                {area}
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Us
          </h2>

          <p>{config.whyChooseUs}</p>
        </section>

        {/* OUR WORK */}
        <section className="mt-10">
          <h2 className="text-3xl font-bold mb-4">
            Our Work
          </h2>

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

        {/* TESTIMONIALS */}
        <section className="mt-10 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            Testimonials
          </h2>

          <div className="space-y-4">
            {config.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow"
              >
                <p className="font-semibold">
                  {t.name}
                </p>

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

        {/* CONTACT CTA */}
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
