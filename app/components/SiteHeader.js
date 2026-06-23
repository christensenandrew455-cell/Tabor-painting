import Link from "next/link";
import config from "../homeConfig";
import siteConfig from "../siteConfig";

function LogoMark() {
  if (config.showLogo && config.logoUrl) {
    return (
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-yellow-600/30 overflow-hidden">
        <img
          src={config.logoUrl}
          alt={config.businessName}
          className="h-10 w-10 object-contain"
        />
      </span>
    );
  }

  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-extrabold tracking-tight text-white shadow-md ring-1 ring-yellow-600/30">
      TP
    </span>
  );
}

export default function SiteHeader() {
  const mobileLinks = [
    ...config.headerLinks,
    { name: "Contact", href: siteConfig.contactPageRoute },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b ${config.theme.headerBg} ${config.theme.headerBorder} backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="/" className="hidden items-center gap-3 md:flex">
          {config.showLogo && config.logoUrl && (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-yellow-600/30 overflow-hidden">
              <img
                src={config.logoUrl}
                alt={config.businessName}
                className="h-12 w-12 object-contain"
              />
            </span>
          )}

          <h1 className={`text-2xl font-bold ${config.theme.accentText}`}>
            {config.businessName}
          </h1>
        </Link>

        <div className="relative md:hidden">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl bg-white p-1 shadow-sm outline-none ring-1 ring-yellow-600/30">
              <LogoMark />
              <span className="text-xs font-semibold text-gray-700">Menu</span>
            </summary>

            <div className="absolute left-0 mt-3 w-52 overflow-hidden rounded-2xl border border-yellow-600/30 bg-white shadow-xl">
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-5 py-4 text-base font-semibold text-black hover:bg-yellow-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </details>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6">
            {config.headerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium transition hover:opacity-80"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link href={siteConfig.contactPageRoute} className={config.theme.button}>
            {config.headerButtonText || "Contact Us"}
          </Link>
        </div>
      </div>
    </header>
  );
}
