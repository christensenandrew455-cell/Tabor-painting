import Link from "next/link";

export default function PrivacyPolicy() {
return ( <main className="bg-gray-100 min-h-screen py-10 px-4"> <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12"> <h1 className="text-4xl font-bold mb-6">
Privacy Policy </h1>

```
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
      address, phone number, and any message you
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
      Policy, please contact us through our contact
      page.
    </p>

    <div className="mt-10 text-center">
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  </div>
</main>
```

);
}
