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
          className={`flex justify-between items-center p-6 border-b ${
            siteConfig.stickyHeader
              ? "sticky top-0 bg-white z-50"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {config.logoUrl ? (
              <img src={config.logoUrl} className="h-10" />
            ) : (
              <h1 className="text-xl font-bold">
                {config.businessName}
              </h1>
            )}
          </div>

          <a
            href={`tel:${config.phone}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {config.buttonName}
          </a>
        </header>
      )}

      <div
        className={`mx-auto ${siteConfig.maxWidth} ${siteConfig.pagePadding}`}
      >
        <section className="space-y-4">
          <h1 className="text-4xl font-bold">{config.slogan}</h1>
          <p>{config.companyStory}</p>

          <h2 className="text-2xl font-semibold mt-6">
            Mission
          </h2>
          <p>{config.mission}</p>

          <h2 className="text-2xl font-semibold mt-6">
            Why Choose Us
          </h2>
          <p>{config.whyChooseUs}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Our Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.images.map((img, i) => (
              <img
                key={i}
                src={img}
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

        <section className="mt-10 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Testimonials
          </h2>

          <div className="space-y-4">
            {config.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow"
              >
                <p className="font-semibold">{t.name}</p>
                <p>{"⭐".repeat(t.stars)}</p>
                <p>{t.review}</p>
              </div>
            ))}
          </div>

          {config.googleReviewsLink && (
            <a
              href={config.googleReviewsLink}
              className="text-blue-600 underline mt-4 block"
            >
              View Google Reviews
            </a>
          )}
        </section>
      </div>

      {siteConfig.showFooter && (
        <footer
          className={`p-6 border-t ${
            siteConfig.footerCentered
              ? "text-center"
              : "text-left"
          }`}
        >
          <p>{config.email}</p>
          <p>{config.phone}</p>
        </footer>
      )}
    </main>
  );
}
