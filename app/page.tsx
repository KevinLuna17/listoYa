import Image from "next/image";

export default function Home() {
  return (
    <main className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    {/* Header */}
    <header className="sticky h-16 px-4 py-4 backdrop-blur-sm border-b border-white/20">
      <nav className="flex justify-between list-none text-white">
        <li>
          <a className="text-3xl font-medium">Listo Ya!</a>
        </li>
        <li>
          <a>Sign In</a>
        </li>
      </nav>
    </header>
    {/* Content */}
    <h1 className="text-white">listoYa!</h1>
    </main>
  );
}
