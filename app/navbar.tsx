import Link from "next/link";

export async function Navbar() {
  const collections = { data: [] };

  if (collections.data.length === 0) {
    return null;
  }

  return (
    <nav className="hidden sm:flex items-center gap-6">
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
    </nav>
  );
}
