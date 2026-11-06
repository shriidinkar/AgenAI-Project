import React from 'react';
import { SkillGapReportSection } from '../types/career';
import { AlertCircle, CheckCircle2, TrendingUp, Lightbulb, Compass, Award } from 'lucide-react';

interface SkillGapReportTabProps {
  gapReport: SkillGapReportSection;
  targetRole: string;
}

export const SkillGapReportTab: React.FC<SkillGapReportTabProps> = ({ gapReport, targetRole }) => {
  const {
    overallReadinessScore,
    targetRoleBenchmarks,
    competencyMatchBreakdown,
    strengthsToHighlight,
    criticalGaps,
    secondaryGaps,
    strategicBridgeAdvise,
  } = gapReport;

  return (
    <div className="space-y-6">
      {/* Top Banner: Benchmark & Readiness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Readiness Score
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-mono text-indigo-600 tabular-nums">
                {overallReadinessScore}
              </span>
              <span className="text-slate-400 font-mono text-sm">/100</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Calculated against current market hiring benchmarks for entry-level and new-grad {targetRole} roles.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Readiness Tier:</span>
            <span className="font-semibold text-emerald-700">Interview Competitive</span>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Target Role Benchmark Profile
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {targetRoleBenchmarks.roleTitle}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {targetRoleBenchmarks.typicalExpectations}
          </p>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Key Industry Hiring Criteria
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {targetRoleBenchmarks.keyHiringCriteria.map((item, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competency Match Breakdown Bars */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
          Competency Match Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Theoretical & Technical Foundations</span>
              <span className="font-mono tabular-nums">{competencyMatchBreakdown.technicalSkillsPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${competencyMatchBreakdown.technicalSkillsPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Practical & Project Experience</span>
              <span className="font-mono tabular-nums">{competencyMatchBreakdown.practicalExperiencePct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${competencyMatchBreakdown.practicalExperiencePct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Industry Tooling & Production Deployment</span>
              <span className="font-mono tabular-nums">{competencyMatchBreakdown.industryToolingPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${competencyMatchBreakdown.industryToolingPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Communication & Collaborative Execution</span>
              <span className="font-mono tabular-nums">{competencyMatchBreakdown.communicationSoftSkillsPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${competencyMatchBreakdown.communicationSoftSkillsPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strengths to Highlight */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
            Validated Strengths to Leverage
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strengthsToHighlight.map((str, idx) => (
            <div
              key={idx}
              className="p-4 bg-emerald-50/40 border border-emerald-200/60 rounded-xl space-y-2 text-xs"
            >
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{str.skill}</span>
              </div>
              <p className="text-slate-600 leading-normal">
                <span className="font-medium text-slate-700">Profile Evidence: </span>
                {str.evidenceFromProfile}
              </p>
              <p className="text-emerald-900 leading-normal bg-white/80 p-2 rounded border border-emerald-100">
                <span className="font-medium">Interview Strategy: </span>
                {str.howToLeverage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical & Secondary Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Gaps */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                High-Priority Gaps (Immediate Focus)
              </h3>
            </div>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              Blocks Screening
            </span>
          </div>

          <div className="space-y-3">
            {criticalGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="text-sm">{gap.skill}</span>
                  <span className="text-slate-500 font-mono text-[11px] uppercase">
                    Status: {gap.currentStudentStatus}
                  </span>
                </div>
                <p className="text-slate-600 leading-normal">
                  <span className="font-medium text-slate-700">Market Context: </span>
                  {gap.marketDemandContext}
                </p>
                <div className="p-2 bg-indigo-50 border border-indigo-100 rounded text-indigo-900 leading-normal">
                  <span className="font-semibold">Actionable Remedy: </span>
                  {gap.remedyAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Gaps */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Secondary Growth Competencies
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              High-Yield Upskill
            </span>
          </div>

          <div className="space-y-3">
            {secondaryGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="text-sm">{gap.skill}</span>
                  <span className="text-slate-500 font-mono text-[11px] uppercase">
                    Status: {gap.currentStudentStatus}
                  </span>
                </div>
                <p className="text-slate-600 leading-normal">
                  <span className="font-medium text-slate-700">Market Context: </span>
                  {gap.marketDemandContext}
                </p>
                <div className="p-2 bg-amber-50/70 border border-amber-200/60 rounded text-amber-900 leading-normal">
                  <span className="font-semibold">Actionable Remedy: </span>
                  {gap.remedyAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Bridge Advice Callout */}
      <div className="p-5 bg-indigo-900 text-white rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-200 font-semibold">
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span>Strategic Career Bridge Recommendation</span>
        </div>
        <p className="text-sm text-indigo-50 leading-relaxed">
          {strategicBridgeAdvise}
        </p>
      </div>
    </div>
  );
};
