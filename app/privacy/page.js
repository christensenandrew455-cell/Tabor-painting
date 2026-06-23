import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export default function PrivacyPolicy() {
return ( <main className="bg-gray-100 min-h-screen"> <SiteHeader /> <div className="py-10 px-4"><div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12"> <h1 className="text-4xl font-bold mb-6">
Privacy Policy </h1>

    <p className="mb-4">
      This Privacy Policy explains how we handle
      information submitted through our website.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">
      Information We Collect
    </h2>

    <p className="mb-4">
      When you use our contact form, we may collect
      basic information such as your name, email
      address, phone number, address, and any message you
      choose to send.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">
      How We Use Information
    </h2>

    <p className="mb-4">
      Information submitted through the contact form
      is used solely to respond to inquiries and
      provide requested services.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">
      Data Storage
    </h2>

    <p className="mb-4">
      We do not sell your personal information.
      Contact form submissions are delivered directly
      to our business email and are not stored in a
      customer database through this website.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">
      Data Sharing
    </h2>

    <p className="mb-4">
      We do not share personal information submitted
      through this website with third parties unless
      required by law.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">
      Contact
    </h2>

    <p>
      If you have questions regarding this Privacy
      Policy, please contact Christensenandrew455@gmail.com.
    </p>
  </div></div>
  <footer className="border-t border-yellow-600/30 py-8 text-center px-4 text-black">
    <p>Taborpainting508@gmail.com</p>
    <p className="mt-1">(774)-245-3383</p>
    <p className="mt-4 text-sm font-semibold text-gray-500">Made and managed by <a href="https://arc-websites.vercel.app" target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-black">ARK Websites</a></p>
    <Link href="/" className="inline-block mt-4 text-yellow-700 hover:text-black">Home</Link>
  </footer>
</main>
);
}