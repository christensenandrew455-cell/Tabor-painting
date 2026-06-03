# Business Website Template

A configurable business website with a quote request form powered by Express and Resend.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your Resend settings.

3. Start the server:

   ```sh
   npm start
   ```

4. Open `http://localhost:3000`.

## Configuration

Edit `config.js` to update the business name, logo, colors, gallery, testimonials, and public contact information.

Email delivery is configured with server-side environment variables:

- `RESEND_API_KEY`: your Resend API key.
- `RESEND_TO_EMAIL`: where quote requests should be sent.
- `RESEND_FROM_EMAIL`: the verified sender used by Resend.
