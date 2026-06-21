"use client";

import { useState } from "react";
import Link from "next/link";
import config from "./contactConfig";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    size: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
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
    <main className="bg-gray-100 min-h-screen py-10 px-4">
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
          <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Send Message</button>
          <p className="text-sm text-gray-500 text-center mt-2">By submitting this form, you agree to be contacted by Tabor Painting regarding your request for services.</p>
        </form>
      </div>
      <footer className="border-t border-blue-500/20 py-8 text-center px-4 mt-10 text-black">
        <p>{config.email}</p>
        {config.phone && <p className="mt-1">{config.phone}</p>}
        <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">ARK Websites</a></p>
        <Link href="/privacy" className="inline-block mt-4 text-blue-600 hover:text-blue-700">Privacy Policy</Link>
      </footer>
    </main>
  );
}
