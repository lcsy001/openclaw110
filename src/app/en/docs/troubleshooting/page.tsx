"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Wrench, AlertCircle, CheckCircle, Terminal, RefreshCw, MessageSquare, Wifi } from "lucide-react";

export default function TroubleshootingPage() {
  const commonIssues = [
    { 
      title: "Gateway won't start", 
      solutions: ["Check port 18789 is not in use", "Run openclaw doctor to diagnose", "Check config syntax"] 
    },
    { 
      title: "Can't connect to channel", 
      solutions: ["Verify bot token is correct", "Check network connectivity", "Ensure channel is enabled in config"] 
    },
    { 
      title: "Agent not responding", 
      solutions: ["Check API key is valid", "Verify model name is correct", "Review logs for errors"] 
    },
    { 
      title: "Skills not loading", 
      solutions: ["Verify skill is in config", "Check skill directory exists", "Run openclaw skills list"] 
    },
  ];

  return (
    <DocLayout>
      <h1>Troubleshooting</h1>
      
      <p>This page covers common issues and their solutions.</p>

      <h2>Common Issues</h2>
      
      <div className="space-y-4 my-6">
        {commonIssues.map((issue, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">
              {issue.title}
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

      <h2>Diagnostic Commands</h2>
      
      <p>Use these commands to diagnose issues:</p>

      <CodeBlock code={`# Run system diagnostics
openclaw doctor

# Check Gateway status
openclaw gateway status

# View recent logs
openclaw logs --lines 50

# Validate configuration
openclaw config validate`} />

      <h2>Getting Help</h2>
      
      <p>If you're still having issues:</p>

      <ul className="list-disc list-inside space-y-2 my-4 text-slate-600">
        <li>Check the GitHub Issues</li>
        <li>Join our Discord community</li>
        <li>Review the documentation</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Terminal className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Debug Mode</h4>
            <p className="text-blue-800 text-sm mt-1">
              Run Gateway with DEBUG=1 for verbose logging.
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
