import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-blue-400">About Tabor Painting</h1>
        <div className="space-y-6">
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">Tabor Painting was built on hard work, quality craftsmanship, and a commitment to delivering outstanding results.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">To provide professional, high-quality painting services with excellent workmanship, reliable communication, and customer satisfaction on every project.</p>
          </section>
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">contact us</Link>
        </div>
      </div>
    </main>
  );
}
