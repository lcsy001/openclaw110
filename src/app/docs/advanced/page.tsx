"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Rocket, Shield, Zap, Database, Server, Lock, Terminal, Cpu, Network } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function AdvancedPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  return (
    <DocLayout>
      <h1>{t("advanced.title")}</h1>
      
      <p>{t("advanced.desc")}</p>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          {t("advanced.guide")}
        </h3>
        <p className="text-purple-100">
          {t("advanced.guideDesc")}
        </p>
      </div>

      <h2>{t("advanced.perfOptimize")}</h2>
      
      <h3>{t("advanced.modelCache")}</h3>
      <p>{t("advanced.modelCacheDesc")}</p>
      <CodeBlock 
        language="yaml"
        code={`agents:
  default:
    model: bailian/kimi-k2.5
    cache:
      enabled: true
      ttl: 3600  # Cache duration (seconds)
      max_size: 100  # Maximum cache entries`} 
      />

      <h3>{t("advanced.concurrency")}</h3>
      <p>{t("advanced.concurrencyDesc")}</p>
      <CodeBlock 
        language="yaml"
        code={`gateway:
  concurrency:
    max_requests: 10
    queue_size: 100
    timeout: 30000  # milliseconds`} 
      />

      <h3>{t("advanced.connectionPool")}</h3>
      <CodeBlock 
        language="yaml"
        code={`providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}
    pool:
      min: 2
      max: 10
      idle_timeout: 30000`} 
      />

      <h2>{t("advanced.securityConfig")}</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-green-500" />
        <p className="text-slate-700">{t("advanced.securityConfigDesc")}</p>
      </div>

      <h3>{t("advanced.accessControl")}</h3>
      <CodeBlock 
        language="yaml"
        code={`security:
  # Whitelist of allowed users
  allowed_users:
    - telegram_user_id_123456
    - discord_user_id_789012
  
  # Allowed groups
  allowed_groups:
    - "-1001234567890"  # Telegram group ID
    - "9876543210"       # Discord channel ID
  
  # Rate limiting
  rate_limit:
    enabled: true
    max_requests: 30
    window: 60  # seconds
  
  # Content filtering
  content_filter:
    enabled: true
    block_list:
      - "sensitive_word_1"
      - "sensitive_word_2"
    regex_patterns:
      - "pattern1"
      - "pattern2"`} 
      />

      <h3>{t("advanced.apiAuth")}</h3>
      <CodeBlock 
        language="yaml"
        code={`gateway:
  auth:
    enabled: true
    type: bearer
    secret: \${API_SECRET_KEY}
    
  # Optional: JWT authentication
  jwt:
    enabled: true
    secret: \${JWT_SECRET}
    expires_in: "24h"`} 
      />

      <h2>{t("advanced.highAvailability")}</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-6 h-6 text-blue-500" />
        <p className="text-slate-700">{t("advanced.highAvailabilityDesc")}</p>
      </div>

      <h3>{t("advanced.dockerDeploy")}</h3>
      <CodeBlock 
        filename="docker-compose.yml"
        language="yaml"
        code={`version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./workspace:/app/workspace
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    
  redis:
    image: redis:7-alpine
    container_name: openclaw-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_POLL_INTERVAL=3600

volumes:
  redis_data:`} 
      />

      <h3>{t("advanced.systemdConfig")}</h3>
      <CodeBlock 
        filename="/etc/systemd/system/openclaw.service"
        code={`[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/opt/openclaw
ExecStart=/usr/bin/openclaw start
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`} 
      />

      <h2>{t("advanced.monitoring")}</h2>
      
      <h3>{t("advanced.structuredLogs")}</h3>
      <CodeBlock 
        language="yaml"
        code={`logging:
  level: info
  format: json  # json or text
  file: logs/openclaw.log
  max_size: 100m
  max_files: 10
  
  # Log categorization
  categories:
    agent: debug
    provider: info
    skill: warn`} 
      />

      <h3>{t("advanced.metrics")}</h3>
      <CodeBlock 
        language="yaml"
        code={`metrics:
  enabled: true
  port: 9090
  path: /metrics
  
  # Prometheus format metrics
  prometheus:
    enabled: true
    
  # Custom metrics
  custom:
    - name: "requests_total"
      type: counter
      labels: ["provider", "status"]`} 
      />

      <h2>{t("advanced.dataPersistence")}</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-6 h-6 text-purple-500" />
        <p className="text-slate-700">{t("advanced.dataPersistenceDesc")}</p>
      </div>

      <h3>{t("advanced.sqlite")}</h3>
      <CodeBlock 
        language="yaml"
        code={`storage:
  type: sqlite
  path: ./data/openclaw.db
  
memory:
  enabled: true
  storage: sqlite
  connection: ./data/memory.db`} 
      />

      <h3>{t("advanced.postgres")}</h3>
      <CodeBlock 
        language="yaml"
        code={`storage:
  type: postgres
  host: localhost
  port: 5432
  database: openclaw
  username: \${DB_USER}
  password: \${DB_PASSWORD}
  pool:
    min: 2
    max: 10`} 
      />

      <h3>{t("advanced.redisCache")}</h3>
      <CodeBlock 
        language="yaml"
        code={`cache:
  type: redis
  host: localhost
  port: 6379
  password: \${REDIS_PASSWORD}
  db: 0
  ttl: 3600`} 
      />

      <h2>{t("advanced.networkConfig")}</h2>
      
      <h3>{t("advanced.proxySettings")}</h3>
      <CodeBlock 
        language="yaml"
        code={`network:
  proxy:
    enabled: true
    http: http://proxy.example.com:8080
    https: http://proxy.example.com:8080
    no_proxy:
      - localhost
      - 127.0.0.1
      
  # Timeout configuration
  timeout:
    connect: 10000
    read: 30000
    write: 30000`} 
      />

      <h3>{t("advanced.tailscale")}</h3>
      <CodeBlock 
        code={`# Secure remote access via Tailscale
# No public IP needed, end-to-end encryption

# 1. Install Tailscale
# curl -fsSL https://tailscale.com/install.sh | sh

# 2. Login to Tailscale
# sudo tailscale up

# 3. Configure OpenClaw to listen on Tailscale address
gateway:
  host: 100.x.x.x  # Tailscale IP
  port: 3000`} 
      />

      <h2>{t("advanced.customMiddleware")}</h2>
      
      <h3>{t("advanced.messageHooks")}</h3>
      <CodeBlock 
        filename="hooks.js"
        code={`module.exports = {
  // Pre-message processing
  async beforeReceive(message, context) {
    // Log message
    console.log(\`Received message from \${message.user_id}\`);
    
    // Sensitive word filtering
    if (containsSensitiveWords(message.text)) {
      return null; // Block message
    }
    
    // Add metadata
    message.metadata = {
      received_at: Date.now(),
      source_ip: context.ip
    };
    
    return message;
  },
  
  // Pre-reply processing
  async beforeSend(reply, context) {
    // Format reply
    reply.text = formatReply(reply.text);
    
    // Add signature
    reply.text += '\\n\\n— Sent via OpenClaw';
    
    return reply;
  },
  
  // Error handling
  async onError(error, context) {
    // Send alert
    await sendAlert({
      type: 'error',
      message: error.message,
      stack: error.stack,
      context
    });
  }
};`} 
      />

      <h2>{t("advanced.perfTuning")}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {t("advanced.responseSpeed")}
          </h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• {t("advanced.speedTip1")}</li>
            <li>• {t("advanced.speedTip2")}</li>
            <li>• {t("advanced.speedTip3")}</li>
            <li>• {t("advanced.speedTip4")}</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            {t("advanced.resourceUsage")}
          </h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• {t("advanced.resourceTip1")}</li>
            <li>• {t("advanced.resourceTip2")}</li>
            <li>• {t("advanced.resourceTip3")}</li>
            <li>• {t("advanced.resourceTip4")}</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            {t("advanced.security")}
          </h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• {t("advanced.securityTip1")}</li>
            <li>• {t("advanced.securityTip2")}</li>
            <li>• {t("advanced.securityTip3")}</li>
            <li>• {t("advanced.securityTip4")}</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
            <Network className="w-4 h-4" />
            {t("advanced.stability")}
          </h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>• {t("advanced.stabilityTip1")}</li>
            <li>• {t("advanced.stabilityTip2")}</li>
            <li>• {t("advanced.stabilityTip3")}</li>
            <li>• {t("advanced.stabilityTip4")}</li>
          </ul>
        </div>
      </div>

      <h2>{t("advanced.troubleshooting")}</h2>
      
      <h3>{t("advanced.debugMode")}</h3>
      <CodeBlock code={`# Enable verbose logging
DEBUG=openclaw:* openclaw start

# Or set environment variable
export DEBUG=openclaw:*
openclaw start`} />

      <h3>{t("advanced.profiling")}</h3>
      <CodeBlock code={`# Generate performance report
openclaw profile --duration 60

# View memory usage
openclaw status --memory

# View connection status
openclaw gateway connections`} />

      <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          {t("advanced.prodChecklist")}
        </h4>
        <ul className="text-slate-700 text-sm space-y-2">
          <li>✅ {t("advanced.checklist1")}</li>
          <li>✅ {t("advanced.checklist2")}</li>
          <li>✅ {t("advanced.checklist3")}</li>
          <li>✅ {t("advanced.checklist4")}</li>
          <li>✅ {t("advanced.checklist5")}</li>
          <li>✅ {t("advanced.checklist6")}</li>
        </ul>
      </div>
    </DocLayout>
  );
}
