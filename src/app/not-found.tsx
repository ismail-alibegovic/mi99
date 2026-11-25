import Link from "next/link";
import "./globals.css";

/** Fallback for requests outside the locale segment. */
export default function RootNotFound() {
  return (
    <html lang="bs">
      <body className="flex min-h-screen items-center justify-center bg-cream-100 p-8 text-center text-forest-900">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-meadow-500">404</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Stranica nije pronađena.</h1>
          <Link href="/" className="mt-6 inline-block rounded-full bg-forest-900 px-6 py-3 font-semibold text-cream-50">
            Početna
          </Link>
        </div>
      </body>
    </html>
  );
}
