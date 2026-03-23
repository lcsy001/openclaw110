"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Users, Globe } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function SecurityPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const securityTips = [
    { icon: Key, title: "Token Management", titleZh: "Token 管理", desc: "Use strong tokens and rotate them regularly", descZh: "使用强 Token 并定期更换" },
    { icon: Users, title: "Allowlist", titleZh: "白名单", desc: "Limit who can access your Gateway", descZh: "限制谁可以访问你的 Gateway" },
    { icon: Globe, title: "Network Access", titleZh: "网络访问", desc: "Prefer loopback binding for local usage", descZh: "本地使用优先使用 loopback 绑定" },
    { icon: Eye, title: "Audit Logs", titleZh: "审计日志", desc: "Regularly review gateway activity", descZh: "定期查看 Gateway 活动" },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Security Settings" : "安全设置"}</h1>
      
      <p>{lang === "en"
        ? "OpenClaw includes several security features to protect your Gateway and data."
        : "OpenClaw 包含多个安全功能来保护你的 Gateway 和数据。"}
      </p>

      <h2>{lang === "en" ? "Security Best Practices" : "安全最佳实践"}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {securityTips.map((tip, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <tip.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {lang === "en" ? tip.title : tip.titleZh}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? tip.desc : tip.descZh}
            </p>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "Token Authentication" : "Token 认证"}</h2>
      
      <p>{lang === "en"
        ? "Configure token-based authentication for your Gateway:"
        : "为你的 Gateway 配置基于 Token 的认证："}
      </p>

      <CodeBlock code={`{
  "gateway": {
    "auth": {
      "token": "your-secure-token-here"
    }
  }
}`} />

      <h2>{lang === "en" ? "Access Control" : "访问控制"}</h2>
      
      <p>{lang === "en"
        ? "Restrict access to specific users or channels:"
        : "限制特定用户或通道的访问："}
      </p>

      <CodeBlock code={`{
  "channels": {
    "telegram": {
      "allowFrom": ["123456789", "987654321"],
      "denyFrom": ["111222333"]
    }
  }
}`} />

      <h2>{lang === "en" ? "Network Binding" : "网络绑定"}</h2>
      
      <p>{lang === "en"
        ? "For maximum security, bind Gateway to loopback:"
        : "为了最大安全性，将 Gateway 绑定到 loopback："}
      </p>

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
            <h4 className="font-semibold text-yellow-900">{lang === "en" ? "Important" : "重要"}</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• {lang === "en" ? "Never expose Gateway to the public internet without authentication" : "在未启用认证的情况下，切勿将 Gateway 暴露到公共互联网"}</li>
              <li>• {lang === "en" ? "Keep your API keys in environment variables, not in config files" : "将 API 密钥保存在环境变量中，而不是配置文件中"}</li>
              <li>• {lang === "en" ? "Rotate tokens periodically" : "定期更换 Token"}</li>
            </ul>
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
