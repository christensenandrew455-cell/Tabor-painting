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
            <p className="text-gray-300 leading-relaxed">Tabor Painting was built on hard work, quality craftsmanship, and a commitment to delivering outstanding results. The business was shaped by hands-on painting experience and a clear understanding of what customers expect from a reliable contractor. Every project is treated as a chance to prove that careful prep, steady communication, and clean work make a real difference. Our goal is to leave each customer confident in the finished result.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">Our mission is to provide professional, high-quality painting services with excellent workmanship and reliable communication. We want every customer to feel informed, respected, and confident from the first conversation to the final walkthrough. Tabor Painting focuses on doing the job the right way instead of rushing through the details. Customer satisfaction is the standard we work toward on every project.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-300 leading-relaxed">Tabor Painting specializes in high-quality painting services that improve the look and feel of a property. We focus on clean lines, smooth finishes, proper preparation, and attention to the small details that make a project look professional. Whether the job is simple or more involved, the same level of care is put into the work. Our goal is to deliver lasting results that make each space look fresh, clean, and well cared for.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-300 leading-relaxed">Customers choose Tabor Painting because we take pride in showing up, communicating clearly, and treating every property with respect. We understand that painting is not just about changing a color; it is about trusting someone to work inside or around your home or business. That is why we focus on clean work, reliable timelines, and a professional finish. We want every customer to feel like they made the right choice when the project is complete.</p>
          </section>
          <section className="bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Socials</h2>
            <p className="text-gray-300 leading-relaxed">Social pages can be added here once they are ready.</p>
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
      <footer className="border-t border-blue-500/20 py-8 text-center mt-12">
        <p>Taborpainting508@gmail.com</p>
        <p className="mt-1">(774)-245-3383</p>
        <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">ARK Websites</a></p>
        <Link href="/privacy" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Privacy Policy</Link>
      </footer>
    </main>
  );
}
