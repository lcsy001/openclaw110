"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Globe, Server, Laptop, Terminal, Shield, Wifi, Cloud } from "lucide-react";

export default function RemotePage() {
  const scenarios = [
    { 
      icon: Cloud, 
      title: "Always-on Gateway", 
      desc: "Run Gateway on a VPS or home server, access via Tailscale or SSH"
    },
    { 
      icon: Laptop, 
      title: "Home Desktop + Remote Laptop", 
      desc: "Desktop runs agent, laptop connects remotely via SSH tunnel"
    },
    { 
      icon: Server, 
      title: "Local Gateway + Remote Access", 
      desc: "Run Gateway locally but expose it safely via SSH or Tailscale"
    },
  ];

  return (
    <DocLayout>
      <h1>Remote Access</h1>
      
      <p>OpenClaw can be accessed remotely through various methods. This is useful when running Gateway on a different machine or network.</p>

      <h2>Use Cases</h2>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        {scenarios.map((scenario, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <scenario.icon className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">
              {scenario.title}
            </h4>
            <p className="text-slate-600 text-sm">
              {scenario.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>SSH Tunnel</h2>
      
      <p>The simplest way to access a remote Gateway is through an SSH tunnel:</p>

      <CodeBlock code={`# On your local machine
ssh -N -L 18789:127.0.0.1:18789 user@gateway-host

# Now you can connect to the remote Gateway locally
openclaw chat --gateway http://127.0.0.1:18789`} />

      <h2>Tailscale</h2>
      
      <p>Tailscale provides a secure mesh VPN. After installing Tailscale on both machines:</p>

      <CodeBlock code={`# On the Gateway machine, bind to Tailscale IP
openclaw gateway --host 100.x.x.x --port 18789

# Connect from anywhere on your Tailscale network
openclaw chat --gateway http://100.x.x.x:18789`} />

      <h2>Configuration</h2>
      
      <p>Configure remote access in your config.yaml:</p>

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
            <h4 className="font-semibold text-yellow-900">Security</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• Always use authentication tokens</li>
              <li>• Prefer Tailscale over exposing ports publicly</li>
              <li>• Use SSH tunnels on untrusted networks</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>CLI Commands</h2>
      
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
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Start the Gateway server</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw chat</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Start an interactive chat session</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">openclaw config</td>
              <td className="px-4 py-2 text-sm text-slate-600">Edit configuration</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href="/en/docs/configuration"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Back to Configuration
        </a>
      </div>
    </DocLayout>
  );
}
