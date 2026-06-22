"use client";

import { useState } from "react";
import Link from "next/link";
import config from "./contactConfig";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", contact: "", address: "", size: "", date: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        alert(config.successMessage);
        setForm({ firstName: "", lastName: "", contact: "", address: "", size: "", date: "", message: "" });
      } else {
        alert(config.errorMessage);
      }
    } catch {
      alert(config.errorMessage);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="sticky top-0 z-50 border-b border-yellow-600/30 bg-white/95 backdrop-blur"><div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"><h1 className="text-2xl font-bold text-yellow-700">Tabor Painting</h1><div className="hidden md:flex items-center gap-6"><Link href="/" className="font-medium hover:opacity-80">Home</Link><Link href="/services" className="font-medium hover:opacity-80">Services</Link><Link href="/about" className="font-medium hover:opacity-80">About Us</Link><Link href="/contact" className="bg-black hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-semibold transition">Contact Us</Link></div><div className="md:hidden"><Link href="/contact" className="bg-black hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-semibold transition">Contact Us</Link></div></div></header>
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-3">{config.pageTitle}</h1>
          <p className="text-gray-600 mb-8">{config.subtitle}</p>
          <div className="mb-8 space-y-2">
            <p><strong>Phone:</strong> {config.phone}</p>
            <p><strong>Email:</strong> {config.email}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input required name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-3 rounded-lg" />
            <input required name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-3 rounded-lg" />
            <input required name="contact" placeholder="Email or Phone" value={form.contact} onChange={handleChange} className="border p-3 rounded-lg" />
            {config.showAddressField && <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-3 rounded-lg" />}
            {config.showSizeField && <input name="size" placeholder="Size of job" value={form.size} onChange={handleChange} className="border p-3 rounded-lg" />}
            {config.showDateField && <input name="date" placeholder="Date when available" value={form.date} onChange={handleChange} className="border p-3 rounded-lg" />}
            {config.showMessageField && <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="border p-3 rounded-lg h-40" />}
            <button type="submit" className="bg-black text-white py-3 rounded-lg hover:bg-yellow-700 transition">Send Message</button>
            <p className="text-sm text-gray-500 text-center mt-2">By submitting this form, you agree to be contacted by Tabor Painting regarding your request for services.</p>
          </form>
        </div>
      </div>
      <footer className="border-t border-yellow-600/30 py-8 text-center px-4 text-black">
        <p>{config.email}</p>
        {config.phone && <p className="mt-1">{config.phone}</p>}
        <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-black">ARK Websites</a></p>
        <Link href="/privacy" className="inline-block mt-4 text-yellow-700 hover:text-black">Privacy Policy</Link>
      </footer>
    </main>
  );
}
