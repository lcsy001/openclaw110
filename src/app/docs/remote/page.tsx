"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Globe, Server, Laptop, Terminal, Shield, Wifi, Cloud } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function RemotePage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const scenarios = [
    { 
      icon: Cloud, 
      title: "Always-on Gateway", 
      titleZh: "始终在线的 Gateway",
      desc: "Run Gateway on a VPS or home server, access via Tailscale or SSH",
      descZh: "在 VPS 或家庭服务器上运行 Gateway，通过 Tailscale 或 SSH 访问"
    },
    { 
      icon: Laptop, 
      title: "Home Desktop + Remote Laptop", 
      titleZh: "家用台式机 + 远程笔记本",
      desc: "Desktop runs agent, laptop connects remotely via SSH tunnel",
      descZh: "台式机运行 agent，笔记本通过 SSH 隧道远程连接"
    },
    { 
      icon: Server, 
      title: "Local Gateway + Remote Access", 
      titleZh: "本地 Gateway + 远程访问",
      desc: "Run Gateway locally but expose it safely via SSH or Tailscale",
      descZh: "在本地运行 Gateway，但通过 SSH 或 Tailscale 安全暴露"
    },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Remote Access" : "远程访问"}</h1>
      
      <p>{lang === "en"
        ? "OpenClaw can be accessed remotely through various methods. This is useful when running Gateway on a different machine or network."
        : "OpenClaw 可以通过各种方法远程访问。当在不同的机器或网络上运行 Gateway 时，这很有用。"}
      </p>

      <h2>{lang === "en" ? "Use Cases" : "使用场景"}</h2>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        {scenarios.map((scenario, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <scenario.icon className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">
              {lang === "en" ? scenario.title : scenario.titleZh}
            </h4>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? scenario.desc : scenario.descZh}
            </p>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "SSH Tunnel" : "SSH 隧道"}</h2>
      
      <p>{lang === "en"
        ? "The simplest way to access a remote Gateway is through an SSH tunnel:"
        : "访问远程 Gateway 最简单的方式是通过 SSH 隧道："}
      </p>

      <CodeBlock code={`# On your local machine
ssh -N -L 18789:127.0.0.1:18789 user@gateway-host

# Now you can connect to the remote Gateway locally
openclaw chat --gateway http://127.0.0.1:18789`} />

      <h2>{lang === "en" ? "Tailscale" : "Tailscale"}</h2>
      
      <p>{lang === "en"
        ? "Tailscale provides a secure mesh VPN. After installing Tailscale on both machines:"
        : "Tailscale 提供安全的网状 VPN。在两台机器上安装 Tailscale 后："}
      </p>

      <CodeBlock code={`# On the Gateway machine, bind to Tailscale IP
openclaw gateway --host 100.x.x.x --port 18789

# Connect from anywhere on your Tailscale network
openclaw chat --gateway http://100.x.x.x:18789`} />

      <h2>{lang === "en" ? "Configuration" : "配置"}</h2>
      
      <p>{lang === "en"
        ? "Configure remote access in your config.yaml:"
        : "在 config.yaml 中配置远程访问："}
      </p>

      <CodeBlock code={`{
  "gateway": {
    "host": "0.0.0.0",
    "port": 18789,
    "auth": {
      "token": "your-gateway-token"
    }
  }
}`} />

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">{lang === "en" ? "Security" : "安全"}</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• {lang === "en" ? "Always use authentication tokens" : "始终使用认证令牌"}</li>
              <li>• {lang === "en" ? "Prefer Tailscale over exposing ports publicly" : "优先使用 Tailscale 而不是公开暴露端口"}</li>
              <li>• {lang === "en" ? "Use SSH tunnels on untrusted networks" : "在不受信任的网络上使用 SSH 隧道"}</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>{lang === "en" ? "CLI Commands" : "CLI 命令"}</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Command</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw gateway</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">{lang === "en" ? "Start the Gateway server" : "启动 Gateway 服务器"}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw chat</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">{lang === "en" ? "Start an interactive chat session" : "启动交互式聊天会话"}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">openclaw config</td>
              <td className="px-4 py-2 text-sm text-slate-600">{lang === "en" ? "Edit configuration" : "编辑配置"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href={lang === "en" ? "/en/docs/configuration" : "/docs/configuration"}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {lang === "en" ? "← Back to Configuration" : "← 返回配置"}
        </a>
      </div>
    </DocLayout>
  );
}
