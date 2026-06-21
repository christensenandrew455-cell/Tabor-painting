import Link from "next/link";
import config from "../homeConfig";
import siteConfig from "../siteConfig";

function LogoMark() {
  if (config.showLogo && config.logoUrl) {
    return (
      <img
        src={config.logoUrl}
        alt={config.businessName}
        className="h-11 w-auto object-contain"
      />
    );
  }

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-extrabold tracking-tight text-white shadow-md">
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
    <header
      className={`sticky top-0 z-50 border-b ${config.theme.headerBg} ${config.theme.headerBorder} backdrop-blur`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="hidden items-center gap-3 md:flex">
          {config.showLogo && config.logoUrl && (
            <img
              src={config.logoUrl}
              alt={config.businessName}
              className="h-12 w-auto object-contain"
            />
          )}

          <h1 className={`text-2xl font-bold ${config.theme.accentText}`}>
            {config.businessName}
          </h1>
        </div>

        <div className="relative md:hidden">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl bg-black p-1 shadow-sm outline-none ring-1 ring-blue-500/30">
              <LogoMark />
              <span className="text-xs font-semibold text-gray-300">Menu</span>
            </summary>

            <div className="absolute left-0 mt-3 w-52 overflow-hidden rounded-2xl border border-blue-500/20 bg-black shadow-xl">
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-5 py-4 text-base font-semibold text-white hover:bg-blue-950"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </details>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {config.showNavLinks && (
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
          )}

          <Link href={siteConfig.contactPageRoute} className={config.theme.button}>
            {config.headerButtonText || "Contact Us"}
          </Link>
        </div>
      </div>
    </header>
  );
}
