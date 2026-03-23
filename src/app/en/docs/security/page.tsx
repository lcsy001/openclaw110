"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Users, Globe } from "lucide-react";

export default function SecurityPage() {
  const securityTips = [
    { icon: Key, title: "Token Management", desc: "Use strong tokens and rotate them regularly" },
    { icon: Users, title: "Allowlist", desc: "Limit who can access your Gateway" },
    { icon: Globe, title: "Network Access", desc: "Prefer loopback binding for local usage" },
    { icon: Eye, title: "Audit Logs", desc: "Regularly review gateway activity" },
  ];

  return (
    <DocLayout>
      <h1>Security Settings</h1>
      
      <p>OpenClaw includes several security features to protect your Gateway and data.</p>

      <h2>Security Best Practices</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {securityTips.map((tip, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <tip.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {tip.title}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>Token Authentication</h2>
      
      <p>Configure token-based authentication for your Gateway:</p>

      <CodeBlock code={`{
  "gateway": {
    "auth": {
      "token": "your-secure-token-here"
    }
  }
}`} />

      <h2>Access Control</h2>
      
      <p>Restrict access to specific users or channels:</p>

      <CodeBlock code={`{
  "channels": {
    "telegram": {
      "allowFrom": ["123456789", "987654321"],
      "denyFrom": ["111222333"]
    }
  }
}`} />

      <h2>Network Binding</h2>
      
      <p>For maximum security, bind Gateway to loopback:</p>

      <CodeBlock code={`{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789
  }
}`} />

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">Important</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• Never expose Gateway to the public internet without authentication</li>
              <li>• Keep your API keys in environment variables, not in config files</li>
              <li>• Rotate tokens periodically</li>
            </ul>
          </div>
        </div>
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
