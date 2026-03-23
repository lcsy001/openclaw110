"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Wrench, AlertCircle, CheckCircle, Terminal, RefreshCw, MessageSquare, Wifi } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function TroubleshootingPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const commonIssues = [
    { 
      title: "Gateway won't start", 
      titleZh: "Gateway 无法启动",
      solutions: ["Check port 18789 is not in use", "Run openclaw doctor to diagnose", "Check config syntax"] 
    },
    { 
      title: "Can't connect to channel", 
      titleZh: "无法连接到通道",
      solutions: ["Verify bot token is correct", "Check network connectivity", "Ensure channel is enabled in config"] 
    },
    { 
      title: "Agent not responding", 
      titleZh: "Agent 无响应",
      solutions: ["Check API key is valid", "Verify model name is correct", "Review logs for errors"] 
    },
    { 
      title: "Skills not loading", 
      titleZh: "技能无法加载",
      solutions: ["Verify skill is in config", "Check skill directory exists", "Run openclaw skills list"] 
    },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Troubleshooting" : "故障排除"}</h1>
      
      <p>{lang === "en"
        ? "This page covers common issues and their solutions."
        : "此页面涵盖常见问题及其解决方案。"}
      </p>

      <h2>{lang === "en" ? "Common Issues" : "常见问题"}</h2>
      
      <div className="space-y-4 my-6">
        {commonIssues.map((issue, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">
              {lang === "en" ? issue.title : issue.titleZh}
            </h4>
            <ul className="text-slate-600 text-sm space-y-1">
              {issue.solutions.map((solution, sidx) => (
                <li key={sidx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "Diagnostic Commands" : "诊断命令"}</h2>
      
      <p>{lang === "en"
        ? "Use these commands to diagnose issues:"
        : "使用以下命令诊断问题："}
      </p>

      <CodeBlock code={`# Run system diagnostics
openclaw doctor

# Check Gateway status
openclaw gateway status

# View recent logs
openclaw logs --lines 50

# Validate configuration
openclaw config validate`} />

      <h2>{lang === "en" ? "Getting Help" : "获取帮助"}</h2>
      
      <p>{lang === "en"
        ? "If you're still having issues:"
        : "如果仍然遇到问题："}
      </p>

      <ul className="list-disc list-inside space-y-2 my-4 text-slate-600">
        <li>{lang === "en" ? "Check the GitHub Issues" : "查看 GitHub Issues"}</li>
        <li>{lang === "en" ? "Join our Discord community" : "加入我们的 Discord 社区"}</li>
        <li>{lang === "en" ? "Review the documentation" : "查看文档"}</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Terminal className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">{lang === "en" ? "Debug Mode" : "调试模式"}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {lang === "en"
                ? "Run Gateway with DEBUG=1 for verbose logging."
                : "运行 Gateway 时设置 DEBUG=1 以获取详细日志。"}
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
