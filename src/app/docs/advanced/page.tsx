import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Rocket, Shield, Zap, Database, Server, Lock, Terminal, Cpu, Network } from "lucide-react";

export const metadata = {
  title: "高级主题 - OpenClaw 教程",
};

export default function AdvancedPage() {
  return (
    <DocLayout>
      <h1>高级主题</h1>
      
      <p>
        本章涵盖 OpenClaw 的高级配置和进阶用法，适合已经掌握基础使用的用户。
      </p>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          进阶指南
        </h3>
        <p className="text-purple-100">
          掌握这些高级特性，让你的 OpenClaw 助手更加强大和灵活。
        </p>
      </div>

      <h2>性能优化</h2>
      
      <h3>模型缓存</h3>
      <p>启用响应缓存，减少 API 调用和费用：</p>
      <CodeBlock 
        language="yaml"
        code={`agents:
  default:
    model: bailian/kimi-k2.5
    cache:
      enabled: true
      ttl: 3600  # 缓存时间（秒）
      max_size: 100  # 最大缓存条目数`} 
      />

      <h3>并发控制</h3>
      <p>限制并发请求数，避免触发 API 限流：</p>
      <CodeBlock 
        language="yaml"
        code={`gateway:
  concurrency:
    max_requests: 10
    queue_size: 100
    timeout: 30000  # 毫秒`} 
      />

      <h3>连接池配置</h3>
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

      <h2>安全配置</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-green-500" />
        <p className="text-slate-700">保护你的 OpenClaw 实例免受未授权访问：</p>
      </div>

      <h3>访问控制</h3>
      <CodeBlock 
        language="yaml"
        code={`security:
  # 允许访问的用户白名单
  allowed_users:
    - telegram_user_id_123456
    - discord_user_id_789012
  
  # 允许访问的群组
  allowed_groups:
    - "-1001234567890"  # Telegram 群组 ID
    - "9876543210"       # Discord 频道 ID
  
  # 速率限制
  rate_limit:
    enabled: true
    max_requests: 30
    window: 60  # 秒
  
  # 内容过滤
  content_filter:
    enabled: true
    block_list:
      - "敏感词1"
      - "敏感词2"
    regex_patterns:
      - "pattern1"
      - "pattern2"`} 
      />

      <h3>API 认证</h3>
      <CodeBlock 
        language="yaml"
        code={`gateway:
  auth:
    enabled: true
    type: bearer
    secret: \${API_SECRET_KEY}
    
  # 可选：JWT 认证
  jwt:
    enabled: true
    secret: \${JWT_SECRET}
    expires_in: "24h"`} 
      />

      <h2>高可用部署</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-6 h-6 text-blue-500" />
        <p className="text-slate-700">生产环境部署建议：</p>
      </div>

      <h3>Docker Compose 部署</h3>
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

      <h3>systemd 服务配置</h3>
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

      <h2>监控与日志</h2>
      
      <h3>结构化日志</h3>
      <CodeBlock 
        language="yaml"
        code={`logging:
  level: info
  format: json  # json 或 text
  file: logs/openclaw.log
  max_size: 100m
  max_files: 10
  
  # 日志分类
  categories:
    agent: debug
    provider: info
    skill: warn`} 
      />

      <h3>指标监控</h3>
      <CodeBlock 
        language="yaml"
        code={`metrics:
  enabled: true
  port: 9090
  path: /metrics
  
  # Prometheus 格式指标
  prometheus:
    enabled: true
    
  # 自定义指标
  custom:
    - name: "requests_total"
      type: counter
      labels: ["provider", "status"]`} 
      />

      <h2>数据持久化</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-6 h-6 text-purple-500" />
        <p className="text-slate-700">配置持久化存储方案：</p>
      </div>

      <h3>SQLite 存储</h3>
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

      <h3>PostgreSQL 存储</h3>
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

      <h3>Redis 缓存</h3>
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

      <h2>网络配置</h2>
      
      <h3>代理设置</h3>
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
      
  # 超时配置
  timeout:
    connect: 10000
    read: 30000
    write: 30000`} 
      />

      <h3>Tailscale 集成</h3>
      <CodeBlock 
        code={`# 通过 Tailscale 实现安全的远程访问
# 无需公网 IP，端到端加密

# 1. 安装 Tailscale
# curl -fsSL https://tailscale.com/install.sh | sh

# 2. 登录 Tailscale
# sudo tailscale up

# 3. 配置 OpenClaw 监听 Tailscale 地址
gateway:
  host: 100.x.x.x  # Tailscale IP
  port: 3000`} 
      />

      <h2>自定义中间件</h2>
      
      <h3>消息处理钩子</h3>
      <CodeBlock 
        filename="hooks.js"
        code={`module.exports = {
  // 消息接收前处理
  async beforeReceive(message, context) {
    // 记录消息日志
    console.log(\`Received message from \${message.user_id}\`);
    
    // 敏感词过滤
    if (containsSensitiveWords(message.text)) {
      return null; // 阻止消息
    }
    
    // 添加元数据
    message.metadata = {
      received_at: Date.now(),
      source_ip: context.ip
    };
    
    return message;
  },
  
  // 回复发送前处理
  async beforeSend(reply, context) {
    // 格式化回复
    reply.text = formatReply(reply.text);
    
    // 添加签名
    reply.text += '\\n\\n— 由 OpenClaw 发送';
    
    return reply;
  },
  
  // 错误处理
  async onError(error, context) {
    // 发送告警
    await sendAlert({
      type: 'error',
      message: error.message,
      stack: error.stack,
      context
    });
  }
};`} 
      />

      <h2>性能调优建议</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            响应速度
          </h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• 启用模型响应缓存</li>
            <li>• 使用流式响应</li>
            <li>• 减少 context_window</li>
            <li>• 选择响应更快的模型</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            资源占用
          </h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• 限制并发连接数</li>
            <li>• 定期清理旧日志</li>
            <li>• 使用外部缓存服务</li>
            <li>• 关闭不必要的技能</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            安全性
          </h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• 启用访问白名单</li>
            <li>• 配置速率限制</li>
            <li>• 使用 HTTPS</li>
            <li>• 定期轮换 API Key</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
            <Network className="w-4 h-4" />
            稳定性
          </h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>• 配置健康检查</li>
            <li>• 设置自动重启</li>
            <li>• 使用进程管理器</li>
            <li>• 配置监控告警</li>
          </ul>
        </div>
      </div>

      <h2>故障排查进阶</h2>
      
      <h3>调试模式</h3>
      <CodeBlock code={`# 启用详细日志
DEBUG=openclaw:* openclaw start

# 或设置环境变量
export DEBUG=openclaw:*
openclaw start`} />

      <h3>性能分析</h3>
      <CodeBlock code={`# 生成性能报告
openclaw profile --duration 60

# 查看内存使用
openclaw status --memory

# 查看连接状态
openclaw gateway connections`} />

      <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          生产环境检查清单
        </h4>
        <ul className="text-slate-700 text-sm space-y-2">
          <li>✅ 配置了自动重启和监控</li>
          <li>✅ 启用了访问控制和认证</li>
          <li>✅ 配置了日志轮转和归档</li>
          <li>✅ 设置了备份策略</li>
          <li>✅ 配置了告警通知</li>
          <li>✅ 定期更新到最新版本</li>
        </ul>
      </div>
    </DocLayout>
  );
}
