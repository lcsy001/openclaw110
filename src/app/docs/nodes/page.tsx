"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Smartphone, Camera, Monitor, Bell, Mic, MapPin, Wifi, CheckCircle, AlertCircle } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function NodesPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const nodeFeatures = [
    { icon: Camera, title: "camera", titleEn: "Camera", desc: "cameraDesc", descEn: "Take photos and record videos directly from your device" },
    { icon: Monitor, title: "canvas", titleEn: "Canvas", desc: "canvasDesc", descEn: "Capture and analyze screen content" },
    { icon: Bell, title: "notifications", titleEn: "Notifications", desc: "notificationsDesc", descEn: "Send push notifications to your device" },
    { icon: Mic, title: "voice", titleEn: "Voice", desc: "voiceDesc", descEn: "Voice wake and audio input capabilities" },
    { icon: MapPin, title: "location", titleEn: "Location", desc: "locationDesc", descEn: "Get device location information" },
    { icon: Wifi, title: "network", titleEn: "Network", desc: "networkDesc", descEn: "Network status and diagnostics" },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Mobile Nodes" : "移动节点"}</h1>
      
      <p>{lang === "en" 
        ? "Nodes are companion devices (iOS/Android) that connect to the Gateway and expose additional capabilities like camera, canvas, and notifications."
        : "节点是配套设备（iOS/Android），连接到 Gateway 并提供相机、画布、通知等额外功能。"}
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">{lang === "en" ? "What is a Node?" : "什么是节点？"}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {lang === "en"
                ? "A node is a peripheral device that connects to your Gateway via WebSocket. It doesn't run the gateway service - it's an extension of your AI assistant."
                : "节点是通过 WebSocket 连接到 Gateway 的外围设备。它不运行 Gateway 服务，而是作为 AI 助手的扩展。"}
            </p>
          </div>
        </div>
      </div>

      <h2>{lang === "en" ? "Supported Capabilities" : "支持的功能"}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {nodeFeatures.map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <feature.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {lang === "en" ? feature.titleEn : feature.title}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? feature.descEn : feature.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "Pairing a Node" : "配对节点"}</h2>
      
      <p>{lang === "en"
        ? "Nodes use device pairing to connect to the Gateway. Here's how to pair your device:"
        : "节点使用设备配对连接到 Gateway。以下是配对设备的步骤："}
      </p>

      <h3>{lang === "en" ? "Step 1: Check Pending Requests" : "步骤1：查看待处理的请求"}</h3>
      <CodeBlock code="openclaw devices list" />

      <h3>{lang === "en" ? "Step 2: Approve the Device" : "步骤2：批准设备"}</h3>
      <CodeBlock code="openclaw devices approve <requestId>" />

      <h3>{lang === "en" ? "Step 3: Check Node Status" : "步骤3：查看节点状态"}</h3>
      <CodeBlock code="openclaw nodes status" />

      <h2>{lang === "en" ? "Running a Node Host" : "运行节点主机"}</h2>
      
      <p>{lang === "en"
        ? "You can run a node host on any machine to execute commands remotely:"
        : "你可以在任何机器上运行节点主机来远程执行命令："}
      </p>

      <CodeBlock code={`# On the node machine
openclaw node run --host <gateway-host> --port 18789 --display-name "My Node"`} />

      <h2>{lang === "en" ? "Remote Node via SSH Tunnel" : "通过 SSH 隧道远程节点"}</h2>
      
      <p>{lang === "en"
        ? "If the Gateway binds to loopback, create an SSH tunnel to connect remote nodes:"
        : "如果 Gateway 绑定到 loopback，请创建 SSH 隧道来连接远程节点："}
      </p>

      <CodeBlock code={`# Terminal A: Create SSH tunnel
ssh -N -L 18790:127.0.0.1:18789 user@gateway-host

# Terminal B: Connect node through tunnel
export OPENCLAW_GATEWAY_TOKEN="<token>"
openclaw node run --host 127.0.0.1 --port 18790 --display-name "Remote Node"`} />

      <h2>{lang === "en" ? "Available Commands" : "可用命令"}</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">
                {lang === "en" ? "Command" : "命令"}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">
                {lang === "en" ? "Description" : "描述"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes list</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "List all paired nodes" : "列出所有已配对的节点"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes status</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "Show node connection status" : "显示节点连接状态"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes describe</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "Describe node capabilities" : "描述节点功能"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">openclaw nodes invoke</td>
              <td className="px-4 py-2 text-sm text-slate-600">
                {lang === "en" ? "Invoke a node command directly" : "直接调用节点命令"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>{lang === "en" ? "Troubleshooting" : "故障排除"}</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">{lang === "en" ? "Common Issues" : "常见问题"}</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• {lang === "en" ? "Node can't connect - check firewall and network" : "节点无法连接 - 检查防火墙和网络"}</li>
              <li>• {lang === "en" ? "Pairing rejected - verify device identity" : "配对被拒绝 - 验证设备身份"}</li>
              <li>• {lang === "en" ? "Camera not working - check permissions" : "相机不工作 - 检查权限"}</li>
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
