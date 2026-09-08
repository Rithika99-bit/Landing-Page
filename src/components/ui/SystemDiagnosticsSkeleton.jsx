import React from 'react';
import { Activity } from 'lucide-react';

/**
 * SystemDiagnosticsSkeleton:
 * High-tech clinical loading skeleton featuring an animated scanning line,
 * cyan/violet holographic gradients, and "RETRIEVING ENCRYPTED CLINICAL DATA..." telemetry.
 */
export default function SystemDiagnosticsSkeleton({ lines = 3, label = "RETRIEVING CLINICAL TELEMETRY..." }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/60 dark:bg-[#0E2236]/80 backdrop-blur-md border border-cyan-500/20 overflow-hidden shadow-sm space-y-4">
      {/* Top Scanning Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C2CB] to-transparent animate-pulse" />

      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/60 dark:border-cyan-800">
          <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-700 dark:text-cyan-300">
            {label}
          </span>
        </div>
        <span className="font-mono text-[9px] text-gray-400">STATUS // 200 OK</span>
      </div>

      {/* Placeholder bars */}
      <div className="space-y-2.5">
        <div className="h-4 bg-gradient-to-r from-blue-100/70 via-cyan-100/50 to-blue-50/70 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-blue-950/30 rounded-full w-3/4 animate-pulse" />
        {lines > 1 && (
          <div className="h-3 bg-gradient-to-r from-blue-100/50 via-cyan-100/40 to-blue-50/50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-950/20 rounded-full w-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        )}
        {lines > 2 && (
          <div className="h-3 bg-gradient-to-r from-blue-100/40 via-cyan-100/30 to-blue-50/40 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-950/20 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '0.4s' }} />
        )}
      </div>
    </div>
  );
}
