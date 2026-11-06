import React, { useState } from 'react';
import { Compass, Sparkles, FileText, Upload, ArrowRight, CheckCircle2, Sliders, ShieldCheck, BookOpen, Layers } from 'lucide-react';
import { ResumeImportCard } from './ResumeImportCard';
import { ParsedResumeData, StudentProfileInput } from '../types/career';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';

interface EmptyStateWorkspaceProps {
  onStartManual: () => void;
  onSelectSample: (profile: StudentProfileInput) => void;
  onResumeParsed: (data: ParsedResumeData, rawText: string) => void;
  isGenerating: boolean;
}

export const EmptyStateWorkspace: React.FC<EmptyStateWorkspaceProps> = ({
  onStartManual,
  onSelectSample,
  onResumeParsed,
  isGenerating,
}) => {
  const [showResumeDrop, setShowResumeDrop] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Hero Welcome */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI-Powered Career Content & Readiness Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
          Craft your personalized, consistent student career profile.
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generate an ATS-ready professional summary, in-depth skill-gap analysis, 12-week learning roadmap, and tailored interview prep—all synchronized with a unified career identity.
        </p>
      </div>

      {/* Primary Interaction Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Build from Scratch */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Option A: Build Step-by-Step
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Enter your university, major, self-assessed skills, and career goals using our interactive builder with smart one-tap skill suggestions.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Interactive skill inventory with proficiency tags</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Target role, industry, and tone customization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Live profile readiness calculation</span>
              </div>
            </div>
          </div>

          <button
            onClick={onStartManual}
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-sm transition-all"
          >
            <span>Start Building Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Option 2: Upload / Paste Resume (Optional) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Option B: Import Existing Resume
                </h2>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Already have a resume draft, CV, or LinkedIn export? Paste or drop it in to let Gemini extract your experience and skills automatically.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Auto-populates education, projects & technical skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Full editing control before final profile generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Supports .txt, .md, Word docs, or direct paste</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResumeDrop(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600" />
            <span>Paste / Upload Resume (Optional)</span>
          </button>
        </div>
      </div>

      {/* Expandable Resume Import Area */}
      {showResumeDrop && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <ResumeImportCard
            onParsed={onResumeParsed}
            onCancel={() => setShowResumeDrop(false)}
          />
        </div>
      )}

      {/* Or Explore a Sample Archetype */}
      <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-5 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="font-bold text-slate-900 block">
              Want to see how it works first?
            </span>
            <span className="text-slate-500">
              Explore a completed sample profile across different student disciplines with one click:
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PROFILES.map((samp) => (
            <button
              key={samp.id}
              onClick={() => onSelectSample(samp.profile)}
              disabled={isGenerating}
              className="text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-sm transition-all group"
            >
              <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {samp.label.split('—')[0].trim()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {samp.badge}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium mt-2 flex items-center gap-1">
                <span>View {samp.profile.targetRole} Dossier</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Steps Overview */}
      <div className="border-t border-slate-200 pt-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            How PathCraft Works
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Engineered for Career Consistency
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-[11px]">
                1
              </span>
              <span>Input or Import Experience</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Provide your coursework, projects, and target role—or optionally paste an existing resume to auto-populate.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-[11px]">
                2
              </span>
              <span>AI Anchors Brand Pillars</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Gemini synthesizes a core career identity that aligns your ATS summary, LinkedIn narrative, and interview talking points.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-[11px]">
                3
              </span>
              <span>Interactive Upskill & Practice</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Track 12-week milestones, copy quantified capstone bullets, and practice mock interviews with real-time AI scoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
