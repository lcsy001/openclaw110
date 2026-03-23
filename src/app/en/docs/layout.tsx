import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "OpenClaw Docs - English",
  description: "OpenClaw documentation - Learn how to build AI assistants with multi-platform messaging, skills, and memory management.",
};

export default function EnDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="alternate" hrefLang="en" href="https://docs.openclaw.ai/en/docs" />
      <link rel="alternate" hrefLang="zh-CN" href="https://docs.openclaw.ai/docs" />
      {children}
    </>
  );
}
