"use client";

import { useState } from "react";
import Link from "next/link";
import config from "./contactConfig";
import siteConfig from "../siteConfig";

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert(config.successMessage);

      setForm({
        firstName: "",
        lastName: "",
        contact: "",
        address: "",
        size: "",
        date: "",
        message: "",
      });
    } else {
      alert(config.errorMessage);
    }
  };

  return (
    <main
      className={`
        ${config.font}
        text-gray-900
        ${siteConfig.pagePadding}
        ${
          siteConfig.contentAlignment === "center"
            ? "text-center"
            : "text-left"
        }
      `}
    >
      <div className={`mx-auto ${siteConfig.maxWidth}`}>
        <header className="mb-10">
          <h1 className="text-4xl font-bold">
            {config.pageTitle}
          </h1>

          <p className="text-gray-600 mt-2">
            {config.subtitle}
          </p>

          <Link
            href="/"
            className="inline-block mt-4 text-blue-600 underline"
          >
            Back to Home
          </Link>
        </header>

        <section className="mb-10 space-y-2">
          <h2 className="text-2xl font-semibold">
            Contact Details
          </h2>

          <p>📞 {config.phone}</p>

          <p>📧 {config.email}</p>

          {config.address && (
            <p>📍 {config.address}</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Send a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-xl"
          >
            <input
              required
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={form.firstName}
              className="border p-3 rounded-lg"
            />

            <input
              required
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={form.lastName}
              className="border p-3 rounded-lg"
            />

            <input
              required
              name="contact"
              placeholder="Email or Phone"
              onChange={handleChange}
              value={form.contact}
              className="border p-3 rounded-lg"
            />

            {config.showAddress && (
              <input
                name="address"
                placeholder="Address (optional)"
                onChange={handleChange}
                value={form.address}
                className="border p-3 rounded-lg"
              />
            )}

            {config.showSize && (
              <input
                name="size"
                placeholder="Size (optional)"
                onChange={handleChange}
                value={form.size}
                className="border p-3 rounded-lg"
              />
            )}

            <input
              name="date"
              placeholder="Date (optional)"
              onChange={handleChange}
              value={form.date}
              className="border p-3 rounded-lg"
            />

            <textarea
              required
              name="message"
              placeholder="Message"
              onChange={handleChange}
              value={form.message}
              className="border p-3 rounded-lg h-32"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
