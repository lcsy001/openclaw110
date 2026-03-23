"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Smartphone, Camera, Monitor, Bell, Mic, MapPin, Wifi, CheckCircle, AlertCircle } from "lucide-react";

export default function NodesPage() {
  const nodeFeatures = [
    { icon: Camera, title: "Camera", desc: "Take photos and record videos directly from your device" },
    { icon: Monitor, title: "Canvas", desc: "Capture and analyze screen content" },
    { icon: Bell, title: "Notifications", desc: "Send push notifications to your device" },
    { icon: Mic, title: "Voice", desc: "Voice wake and audio input capabilities" },
    { icon: MapPin, title: "Location", desc: "Get device location information" },
    { icon: Wifi, title: "Network", desc: "Network status and diagnostics" },
  ];

  return (
    <DocLayout>
      <h1>Mobile Nodes</h1>
      
      <p>Nodes are companion devices (iOS/Android) that connect to the Gateway and expose additional capabilities like camera, canvas, and notifications.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">What is a Node?</h4>
            <p className="text-blue-800 text-sm mt-1">
              A node is a peripheral device that connects to your Gateway via WebSocket. It doesn't run the gateway service - it's an extension of your AI assistant.
            </p>
          </div>
        </div>
      </div>

      <h2>Supported Capabilities</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {nodeFeatures.map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <feature.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {feature.title}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>Pairing a Node</h2>
      
      <p>Nodes use device pairing to connect to the Gateway. Here's how to pair your device:</p>

      <h3>Step 1: Check Pending Requests</h3>
      <CodeBlock code="openclaw devices list" />

      <h3>Step 2: Approve the Device</h3>
      <CodeBlock code="openclaw devices approve <requestId>" />

      <h3>Step 3: Check Node Status</h3>
      <CodeBlock code="openclaw nodes status" />

      <h2>Running a Node Host</h2>
      
      <p>You can run a node host on any machine to execute commands remotely:</p>

      <CodeBlock code={`# On the node machine
openclaw node run --host <gateway-host> --port 18789 --display-name "My Node"`} />

      <h2>Remote Node via SSH Tunnel</h2>
      
      <p>If the Gateway binds to loopback, create an SSH tunnel to connect remote nodes:</p>

      <CodeBlock code={`# Terminal A: Create SSH tunnel
ssh -N -L 18790:127.0.0.1:18789 user@gateway-host

# Terminal B: Connect node through tunnel
export OPENCLAW_GATEWAY_TOKEN="<token>"
openclaw node run --host 127.0.0.1 --port 18790 --display-name "Remote Node"`} />

      <h2>Available Commands</h2>
      
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
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes list</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">List all paired nodes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes status</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Show node connection status</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw nodes describe</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Describe node capabilities</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">openclaw nodes invoke</td>
              <td className="px-4 py-2 text-sm text-slate-600">Invoke a node command directly</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Troubleshooting</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">Common Issues</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• Node can't connect - check firewall and network</li>
              <li>• Pairing rejected - verify device identity</li>
              <li>• Camera not working - check permissions</li>
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
