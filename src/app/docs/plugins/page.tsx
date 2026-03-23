"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Puzzle, Code, Package, FileJson, ArrowRight, BookOpen } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function PluginsPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const pluginFeatures = [
    { title: "feishu", titleZh: "飞书", desc: "Feishu/Lark bot with docs, wiki, bitable support", descZh: "飞书/Lark bot，支持文档、wiki、表格" },
    { title: "mattermost", titleZh: "Mattermost", desc: "Self-hosted enterprise chat", descZh: "自托管企业通讯" },
    { title: "slack", titleZh: "Slack", desc: "Enterprise workspace integration", descZh: "企业工作区集成" },
    { title: "line", titleZh: "LINE", desc: "LINE Messaging API bot", descZh: "LINE 消息 API bot" },
    { title: "matrix", titleZh: "Matrix", desc: "Decentralized communication protocol", descZh: "去中心化通讯协议" },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Plugin System" : "插件系统"}</h1>
      
      <p>{lang === "en"
        ? "Plugins extend OpenClaw's capabilities by adding new channels, providers, and features."
        : "插件通过添加新的通道、提供商和功能来扩展 OpenClaw 的能力。"}
      </p>

      <h2>{lang === "en" ? "Available Plugins" : "可用插件"}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {pluginFeatures.map((plugin, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">
              {lang === "en" ? plugin.title : plugin.titleZh}
            </h4>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? plugin.desc : plugin.descZh}
            </p>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "Installing Plugins" : "安装插件"}</h2>
      
      <p>{lang === "en"
        ? "Install plugins via npm:"
        : "通过 npm 安装插件："}
      </p>

      <CodeBlock code={`# Install a plugin
npm install @openclaw/plugin-feishu

# Or use the CLI
openclaw plugins install feishu`} />

      <h2>{lang === "en" ? "Configuration" : "配置"}</h2>
      
      <p>{lang === "en"
        ? "Configure plugins in your config.yaml:"
        : "在 config.yaml 中配置插件："}
      </p>

      <CodeBlock code={`{
  "plugins": {
    "feishu": {
      "enabled": true,
      "appId": "your-app-id",
      "appSecret": "your-app-secret"
    }
  }
}`} />

      <h2>{lang === "en" ? "Developing Plugins" : "开发插件"}</h2>
      
      <p>{lang === "en"
        ? "Create your own plugins using the OpenClaw plugin API:"
        : "使用 OpenClaw 插件 API 创建自己的插件："}
      </p>

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
            <h4 className="font-semibold text-blue-900">{lang === "en" ? "Learn More" : "了解更多"}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {lang === "en"
                ? "Check out the plugin development guide for detailed instructions."
                : "查看插件开发指南获取详细说明。"}
            </p>
          </div>
        </div>
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
