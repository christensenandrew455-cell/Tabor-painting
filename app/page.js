import config from "./homeConfig";

export default function Home() {
  return (
    <main style={{ fontFamily: config.font, color: config.primaryColor }}>
      
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: `2px solid ${config.secondaryColor}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="logo" style={{ height: "40px" }} />
          ) : (
            <h2>{config.businessName}</h2>
          )}
        </div>

        <a
          href={`tel:${config.phone}`}
          style={{
            background: config.primaryColor,
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {config.buttonName}
        </a>
      </header>

      {/* HERO / ABOUT */}
      <section style={{ padding: "40px" }}>
        <h1>{config.slogan}</h1>
        <p>{config.companyStory}</p>

        <h3>Mission</h3>
        <p>{config.mission}</p>

        <h3>Why choose us</h3>
        <p>{config.whyChooseUs}</p>
      </section>

      {/* IMAGES / VIDEO */}
      <section style={{ padding: "40px" }}>
        <h2>Our Work</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {config.images.map((img, i) => (
            <img
              key={i}
              src={img}
              style={{ width: "250px", borderRadius: "10px" }}
            />
          ))}
        </div>

        {config.video && (
          <div style={{ marginTop: "20px" }}>
            <video src={config.video} controls width="400" />
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "40px" }}>
        <h2>Testimonials</h2>

        {config.testimonials.map((t, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <strong>{t.name}</strong> - {"⭐".repeat(t.stars)}
            <p>{t.review}</p>
          </div>
        ))}

        {config.googleReviewsLink && (
          <a href={config.googleReviewsLink} target="_blank">
            View Google Reviews
          </a>
        )}
      </section>

      {/* CONTACT FORM */}
      <section style={{ padding: "40px" }}>
        <h2>Contact Us</h2>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Best way to contact you" />

          <input placeholder="Address (optional)" />
          <input placeholder="Size (optional)" />
          <input placeholder="Date (optional)" />

          <textarea placeholder="Message (optional)" />

          <button
            type="submit"
            style={{
              background: config.primaryColor,
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Send
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: `2px solid ${config.secondaryColor}`,
        }}
      >
        <p>{config.email}</p>
        <p>{config.phone}</p>
      </footer>
    </main>
  );
}
