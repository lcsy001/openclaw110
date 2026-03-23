"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Puzzle, Code, Package, FileJson, ArrowRight, BookOpen } from "lucide-react";

export default function PluginsPage() {
  const pluginFeatures = [
    { title: "feishu", desc: "Feishu/Lark bot with docs, wiki, bitable support" },
    { title: "mattermost", desc: "Self-hosted enterprise chat" },
    { title: "slack", desc: "Enterprise workspace integration" },
    { title: "line", desc: "LINE Messaging API bot" },
    { title: "matrix", desc: "Decentralized communication protocol" },
  ];

  return (
    <DocLayout>
      <h1>Plugin System</h1>
      
      <p>Plugins extend OpenClaw's capabilities by adding new channels, providers, and features.</p>

      <h2>Available Plugins</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {pluginFeatures.map((plugin, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">
              {plugin.title}
            </h4>
            <p className="text-slate-600 text-sm">
              {plugin.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>Installing Plugins</h2>
      
      <p>Install plugins via npm:</p>

      <CodeBlock code={`# Install a plugin
npm install @openclaw/plugin-feishu

# Or use the CLI
openclaw plugins install feishu`} />

      <h2>Configuration</h2>
      
      <p>Configure plugins in your config.yaml:</p>

      <CodeBlock code={`{
  "plugins": {
    "feishu": {
      "enabled": true,
      "appId": "your-app-id",
      "appSecret": "your-app-secret"
    }
  }
}`} />

      <h2>Developing Plugins</h2>
      
      <p>Create your own plugins using the OpenClaw plugin API:</p>

      <CodeBlock code={`import { Plugin } from '@openclaw/plugin';

export default class MyPlugin extends Plugin {
  name = 'my-plugin';
  version = '1.0.0';
  
  async onMessage(message) {
    // Handle incoming messages
    return message;
  }
  
  async onSend(message) {
    // Handle outgoing messages
    return message;
  }
}`} />

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Learn More</h4>
            <p className="text-blue-800 text-sm mt-1">
              Check out the plugin development guide for detailed instructions.
            </p>
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
