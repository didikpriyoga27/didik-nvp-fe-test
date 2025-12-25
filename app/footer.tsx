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
