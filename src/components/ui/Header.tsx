export default function Header({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
}
