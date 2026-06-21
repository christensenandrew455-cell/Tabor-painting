import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-blue-400">About Tabor Painting</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-10 leading-relaxed">Learn more about Tabor Painting, our mission, and the quality workmanship behind every project.</p>
        <div className="space-y-6">
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">Tabor Painting was built on hard work, quality craftsmanship, and a commitment to delivering outstanding results.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">To provide professional, high-quality painting services with excellent workmanship, reliable communication, and customer satisfaction on every project.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-300 leading-relaxed">JTB Painting specializes in delivering high-quality painting services with precision strokes, attention to detail, and lasting results that enhance the beauty of every property.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-300 leading-relaxed">We deliver exceptional painting results, complete projects on time, and treat every property with the care and attention it deserves.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Areas We Serve</h2>
            <p className="text-gray-300 leading-relaxed">All of Massachusetts</p>
          </section>
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">contact us</Link>
        </div>
      </div>
    </main>
  );
}
