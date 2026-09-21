import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white px-6 text-center">
      <h1 className="text-3xl font-semibold">Page not found.</h1>
      <Link href="/" className="text-accent underline underline-offset-4">Return to Primary Logic</Link>
    </main>
  );
}
