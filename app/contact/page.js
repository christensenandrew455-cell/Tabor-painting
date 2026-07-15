"use client";

import { useState } from "react";
import Link from "next/link";
import config from "./contactConfig";
import SiteHeader from "../components/SiteHeader";

const serviceOptions = [
  { value: "interior painting", label: "Interior Painting" },
  { value: "exterior painting", label: "Exterior Painting" },
  { value: "wood staining", label: "Wood Staining" },
  { value: "small paint repair", label: "Small Paint Repair" },
];

const contactOptions = [
  { value: "call", label: "Phone Call" },
  { value: "text", label: "Text Message" },
  { value: "email", label: "Email" },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  streetAddress: "",
  townOrCity: "",
  serviceType: "",
  contactMethod: "",
  notes: "",
};

const inputClass = "w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-yellow-700 focus:ring-2 focus:ring-yellow-100";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        alert(config.successMessage);
        setForm(emptyForm);
      } else {
        alert(data.error || config.errorMessage);
      }
    } catch {
      alert(config.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <SiteHeader />
      <div className="px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg md:p-12">
          <h1 className="mb-3 text-4xl font-bold">{config.pageTitle}</h1>
          <p className="mb-8 text-gray-600">{config.subtitle}</p>
          <div className="mb-8 space-y-2">
            <p><strong>Phone:</strong> {config.phone}</p>
            <p><strong>Email:</strong> {config.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="First Name">
                <input required autoComplete="given-name" name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Last Name">
                <input required autoComplete="family-name" name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Phone Number">
                <input required autoComplete="tel" type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Email Address">
                <input required autoComplete="email" type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Street Address">
                <input required autoComplete="street-address" name="streetAddress" value={form.streetAddress} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Town or City">
                <input required autoComplete="address-level2" name="townOrCity" value={form.townOrCity} onChange={handleChange} className={inputClass} />
              </Field>
              <Field label="Service Type">
                <select required name="serviceType" value={form.serviceType} onChange={handleChange} className={inputClass}>
                  <option value="">Select a service…</option>
                  {serviceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </Field>
              <Field label="Best Form of Contact">
                <select required name="contactMethod" value={form.contactMethod} onChange={handleChange} className={inputClass}>
                  <option value="">Select a contact method…</option>
                  {contactOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Project Notes">
              <textarea name="notes" placeholder="Tell us anything helpful about the project." value={form.notes} onChange={handleChange} className={`${inputClass} min-h-40 resize-y`} />
            </Field>

            <button disabled={isSubmitting} type="submit" className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
            <p className="text-center text-sm text-gray-500">By submitting this form, you agree to be contacted by Tabor Painting regarding your request for services.</p>
          </form>
        </div>
      </div>
      <footer className="border-t border-yellow-600/30 px-4 py-8 text-center text-black">
        <p>{config.email}</p>
        {config.phone && <p className="mt-1">{config.phone}</p>}
        <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-black">ARK Websites</a></p>
        <Link href="/privacy" className="mt-4 inline-block text-yellow-700 hover:text-black">Privacy Policy</Link>
      </footer>
    </main>
  );
}
