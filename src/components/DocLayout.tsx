import Sidebar from "./Sidebar";

interface DocLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <article className="prose prose-slate max-w-none">{children}</article>
        </div>
      </main>
    </div>
  );
}
