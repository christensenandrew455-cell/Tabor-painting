"use client";

import { useState } from "react";
import Link from "next/link";
import config from "./contactConfig";
import SiteHeader from "../components/SiteHeader";

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  jobType: "",
  notes: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);

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
        setForm(emptyForm);
      } else {
        alert(config.errorMessage);
      }
    } catch {
      alert(config.errorMessage);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <SiteHeader />
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-3">{config.pageTitle}</h1>
          <p className="text-gray-600 mb-8">{config.subtitle}</p>
          <div className="mb-8 space-y-2">
            <p><strong>Phone:</strong> {config.phone}</p>
            <p><strong>Email:</strong> {config.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input required name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="border p-3 rounded-lg" />
            <input required name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border p-3 rounded-lg" />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-3 rounded-lg" />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-3 rounded-lg" />
            <input required name="jobType" placeholder="Job Type" value={form.jobType} onChange={handleChange} className="border p-3 rounded-lg" />
            <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="border p-3 rounded-lg h-40" />
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
