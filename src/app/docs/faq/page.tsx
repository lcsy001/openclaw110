"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HelpCircle, AlertTriangle, MessageCircle, Server, Key, Bug, RefreshCw } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

const faqsZH = [
  {
    category: "安装与启动",
    icon: Server,
    items: [
      {
        q: "安装时遇到权限错误怎么办？",
        a: "在 Linux/macOS 上，尝试使用 sudo 安装：sudo npm install -g openclaw。或者检查 npm 的全局安装目录权限。"
      },
      {
        q: "启动时提示端口被占用",
        a: "默认使用 3000 端口。可以通过 --port 参数指定其他端口：openclaw start --port 3001"
      },
      {
        q: "如何完全卸载 OpenClaw？",
        a: "运行 npm uninstall -g openclaw，然后删除工作区目录即可。"
      }
    ]
  },
  {
    category: "配置问题",
    icon: Key,
    items: [
      {
        q: "配置文件格式错误怎么办？",
        a: "使用 openclaw validate 命令检查配置文件。注意 YAML 的缩进必须使用空格，不能使用 Tab。"
      },
      {
        q: "环境变量不生效",
        a: "确保 .env 文件位于工作区根目录，且变量名与配置文件中引用的名称一致。重启服务后生效。"
      },
      {
        q: "如何切换不同的模型？",
        a: "修改 config.yaml 中 agents.default.model 字段，格式为 提供商/模型名，如 bailian/kimi-k2.5"
      }
    ]
  },
  {
    category: "消息平台",
    icon: MessageCircle,
    items: [
      {
        q: "Telegram Bot 不回复消息",
        a: "检查：1) Token 是否正确 2) 是否发送了 /start 命令 3) 网络是否能访问 Telegram API 4) 查看日志 openclaw logs"
      },
      {
        q: "Discord Bot 离线",
        a: "检查 Discord Bot Token 是否正确，以及是否在 Discord Developer Portal 中启用了必要的 Intents 权限。"
      },
      {
        q: "飞书机器人收不到消息",
        a: "确认：1) 应用已发布 2) 机器人已添加到群组 3) 订阅了 message 事件 4) 回调地址配置正确"
      }
    ]
  },
  {
    category: "故障排除",
    icon: Bug,
    items: [
      {
        q: "助手回复很慢",
        a: "可能原因：1) 网络延迟 2) 模型响应慢 3) 上下文太长。尝试切换更快的模型或减少 context_window。"
      },
      {
        q: "技能不工作",
        a: "检查：1) 技能是否在 config.yaml 中启用 2) 技能所需的 API Key 是否配置 3) 查看日志获取详细错误"
      },
      {
        q: "内存占用过高",
        a: "尝试：1) 减少 context_window 2) 关闭不必要的技能 3) 重启服务 4) 使用更轻量的模型"
      }
    ]
  }
];

const faqsEN = [
  {
    category: "Installation & Startup",
    icon: Server,
    items: [
      {
        q: "How to fix permission errors during installation?",
        a: "On Linux/macOS, try using sudo: sudo npm install -g openclaw. Or check npm's global installation directory permissions."
      },
      {
        q: "Port already in use when starting",
        a: "Default port is 3000. Use --port parameter to specify another port: openclaw start --port 3001"
      },
      {
        q: "How to completely uninstall OpenClaw?",
        a: "Run npm uninstall -g openclaw, then delete the workspace directory."
      }
    ]
  },
  {
    category: "Configuration Issues",
    icon: Key,
    items: [
      {
        q: "How to fix configuration file format errors?",
        a: "Use openclaw validate command to check the config file. Note: YAML indentation must use spaces, not tabs."
      },
      {
        q: "Environment variables not taking effect",
        a: "Make sure .env file is in the workspace root directory, and variable names match what's referenced in config. Restart service after changes."
      },
      {
        q: "How to switch between different models?",
        a: "Modify agents.default.model field in config.yaml, format: provider/model-name, e.g., bailian/kimi-k2.5"
      }
    ]
  },
  {
    category: "Messaging Platforms",
    icon: MessageCircle,
    items: [
      {
        q: "Telegram Bot not responding to messages",
        a: "Check: 1) Token is correct 2) /start command sent 3) Network can access Telegram API 4) View logs: openclaw logs"
      },
      {
        q: "Discord Bot offline",
        a: "Check if Discord Bot Token is correct, and if necessary Intents permissions are enabled in Discord Developer Portal."
      },
      {
        q: "Feishu robot not receiving messages",
        a: "Confirm: 1) App is published 2) Bot is added to group 3) Subscribed to message event 4) Callback URL configured correctly"
      }
    ]
  },
  {
    category: "Troubleshooting",
    icon: Bug,
    items: [
      {
        q: "Assistant responds slowly",
        a: "Possible causes: 1) Network latency 2) Slow model response 3) Context too long. Try switching to faster model or reducing context_window."
      },
      {
        q: "Skills not working",
        a: "Check: 1) Skill is enabled in config.yaml 2) Required API Key is configured 3) View logs for detailed errors"
      },
      {
        q: "High memory usage",
        a: "Try: 1) Reduce context_window 2) Disable unnecessary skills 3) Restart service 4) Use lighter model"
      }
    ]
  }
];

export default function FAQPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const faqs = lang === "en" ? faqsEN : faqsZH;

  return (
    <DocLayout>
      <h1>{t("faq.title")}</h1>
      
      <p>{t("faq.desc")}</p>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          {t("faq.problemTitle")}
        </h3>
        <p className="text-amber-100">
          {t("faq.problemDesc")}
        </p>
      </div>

      {faqs.map((category, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
            <category.icon className="w-6 h-6 text-blue-500" />
            {category.category}
          </h2>
          <div className="space-y-4">
            {category.items.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-500">Q:</span>
                  {item.q}
                </h3>
                <p className="text-slate-600 ml-6">
                  <span className="text-green-500 font-semibold">A:</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>{t("faq.debugTips")}</h2>
      
      <h3>{t("faq.viewLogs")}</h3>
      <CodeBlock code={`# View logs in real-time
openclaw logs -f

# View last 100 lines
openclaw logs -n 100

# Start in debug mode
openclaw start --debug`} />

      <h3>{t("faq.checkStatus")}</h3>
      <CodeBlock code={`# View overall status
openclaw status

# View Gateway status
openclaw gateway status

# Validate configuration
openclaw validate`} />

      <h3>{t("faq.quickRef")}</h3>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {t("faq.connectionError")}
          </h4>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• {t("faq.connTip1")}</li>
            <li>• {t("faq.connTip2")}</li>
            <li>• {t("faq.connTip3")}</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            {t("faq.perfIssue")}
          </h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• {t("faq.perfTip1")}</li>
            <li>• {t("faq.perfTip2")}</li>
            <li>• {t("faq.perfTip3")}</li>
          </ul>
        </div>
      </div>

      <h2>{t("faq.getHelp")}</h2>
      <p>{t("faq.getHelpDesc")}</p>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <a 
          href="https://discord.com/invite/clawd" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <h4 className="font-semibold text-indigo-900 mb-2">{t("faq.discord")}</h4>
          <p className="text-indigo-700 text-sm">{t("faq.discordDesc")}</p>
        </a>
        <a 
          href="https://github.com/openclaw/openclaw/issues" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <h4 className="font-semibold text-slate-900 mb-2">{t("faq.github")}</h4>
          <p className="text-slate-700 text-sm">{t("faq.githubDesc")}</p>
        </a>
        <a 
          href="https://docs.openclaw.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h4 className="font-semibold text-blue-900 mb-2">{t("faq.docs")}</h4>
          <p className="text-blue-700 text-sm">{t("faq.docsDesc")}</p>
        </a>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2">💡 {t("faq.submitTip")}</h4>
        <p className="text-slate-700 text-sm">
          {t("faq.submitTipDesc")}
        </p>
      </div>
    </DocLayout>
  );
}
