import Link from "next/link";

async function FooterCollections() {
  const collections = { data: [] };

  if (collections.data.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">Collections</h3>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 flex flex-col sm:flex-row gap-8 sm:gap-16">
          {/* Brand */}
          <div className="sm:max-w-xs">
            <Link href="/" className="text-xl font-bold text-foreground">
              Didik Priyoga
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Frontend Developer Test.
            </p>
          </div>

          {/* Collections */}
          <FooterCollections />
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Didik Priyoga. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
