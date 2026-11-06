import React, { useState } from 'react';
import { ProfessionalSummarySection, ConsistentBrandAnchor } from '../types/career';
import { Copy, Check, Sparkles, FileText, Linkedin, Mic, Mail, Sliders } from 'lucide-react';

interface ProfessionalSummaryTabProps {
  summary: ProfessionalSummarySection;
  brandAnchor: ConsistentBrandAnchor;
  onOpenRefine: (sectionKey: string, currentData: any) => void;
}

export const ProfessionalSummaryTab: React.FC<ProfessionalSummaryTabProps> = ({
  summary,
  brandAnchor,
  onOpenRefine,
}) => {
  const [activeFormat, setActiveFormat] = useState<'resume' | 'linkedin' | 'pitch' | 'coverLetter'>('resume');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getFullLinkedInText = () => {
    return `${summary.linkedInAbout.hook}\n\n${summary.linkedInAbout.narrative}\n\nKey Focus Areas:\n${summary.linkedInAbout.skillsHighlight
      .map((s) => `• ${s}`)
      .join('\n')}\n\n${summary.linkedInAbout.callToAction}`;
  };

  const getFullCoverLetterText = () => {
    return `${summary.coverLetterHook.openingSalutation}\n\n${summary.coverLetterHook.hookParagraph}\n\n${summary.coverLetterHook.academicBridgeParagraph}\n\n${summary.coverLetterHook.closingImpact}`;
  };

  return (
    <div className="space-y-6">
      {/* Format Selector Pills / Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveFormat('resume')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeFormat === 'resume'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>ATS Resume Profile</span>
          </button>

          <button
            onClick={() => setActiveFormat('linkedin')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeFormat === 'linkedin'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-600" />
            <span>LinkedIn About</span>
          </button>

          <button
            onClick={() => setActiveFormat('pitch')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeFormat === 'pitch'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-600" />
            <span>30s Elevator Pitch</span>
          </button>

          <button
            onClick={() => setActiveFormat('coverLetter')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeFormat === 'coverLetter'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cover Letter Hook</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => {
              if (activeFormat === 'resume') onOpenRefine('atsResumeSummary', summary.atsResumeSummary);
              else if (activeFormat === 'linkedin') onOpenRefine('linkedInAbout', summary.linkedInAbout);
              else if (activeFormat === 'pitch') onOpenRefine('elevatorPitch30s', summary.elevatorPitch30s);
              else onOpenRefine('coverLetterHook', summary.coverLetterHook);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Refine Tone / Content</span>
          </button>
        </div>
      </div>

      {/* Format Content Display */}
      {activeFormat === 'resume' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                ATS-Optimized Resume Professional Summary
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Engineered for Applicant Tracking Systems (ATS) parser compliance and 6-second recruiter scanning.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(summary.atsResumeSummary, 'resume')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
            >
              {copiedKey === 'resume' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {summary.atsResumeSummary}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Target ATS Keyword Injections
            </div>
            <div className="flex flex-wrap gap-1.5">
              {summary.atsKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-xs text-indigo-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Consistency Check: </span>
              Uses the exact same technical pillars defined in your brand anchor. Fits neatly within standard 3–4 line resume header restrictions (~65 words).
            </div>
          </div>
        </div>
      )}

      {activeFormat === 'linkedin' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                LinkedIn "About" Storytelling Narrative
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Conversational yet authoritative profile description crafted to engage technical recruiters and peer engineers.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(getFullLinkedInText(), 'linkedin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
            >
              {copiedKey === 'linkedin' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied Full Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full About</span>
                </>
              )}
            </button>
          </div>

          {/* Hook */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              1. The "See More" Hook (First 2 Lines)
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900">
              "{summary.linkedInAbout.hook}"
            </div>
          </div>

          {/* Core Body */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              2. Academic-to-Engineering Narrative
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {summary.linkedInAbout.narrative}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              3. Featured Technical Competencies
            </div>
            <div className="space-y-1.5">
              {summary.linkedInAbout.skillsHighlight.map((item, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-800">
            <span className="font-semibold text-slate-900">Call to Action: </span>
            {summary.linkedInAbout.callToAction}
          </div>
        </div>
      )}

      {activeFormat === 'pitch' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                30-Second Elevator Pitch
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Spoken networking pitch designed for campus career fairs, conference mixers, and recruiter calls.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(summary.elevatorPitch30s, 'pitch')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
            >
              {copiedKey === 'pitch' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Pitch</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 bg-amber-50/40 border border-amber-200/60 rounded-xl">
            <p className="text-sm text-slate-900 leading-relaxed font-normal italic">
              "{summary.elevatorPitch30s}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="font-semibold text-slate-900 mb-1">Spoken Timing</div>
              <div className="text-slate-600">Approx. 28–34 seconds at normal 130 wpm cadence.</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="font-semibold text-slate-900 mb-1">Target Setting</div>
              <div className="text-slate-600">Career fairs, coffee chats, alumni mixers.</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="font-semibold text-slate-900 mb-1">Delivery Cue</div>
              <div className="text-slate-600">Pause slightly after introducing your capstone project.</div>
            </div>
          </div>
        </div>
      )}

      {activeFormat === 'coverLetter' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Tailored Cover Letter Hook & Academic Bridge
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Opening and core narrative blocks bridging academic research into tangible industry contribution.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(getFullCoverLetterText(), 'coverLetter')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
            >
              {copiedKey === 'coverLetter' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied Full Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Cover Letter Block</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800">
            <div className="font-medium text-slate-900">
              {summary.coverLetterHook.openingSalutation}
            </div>
            <p className="leading-relaxed">
              {summary.coverLetterHook.hookParagraph}
            </p>
            <p className="leading-relaxed">
              {summary.coverLetterHook.academicBridgeParagraph}
            </p>
            <p className="leading-relaxed">
              {summary.coverLetterHook.closingImpact}
            </p>
            <div className="pt-2 text-slate-600">
              Sincerely,<br />
              <span className="font-semibold text-slate-900">The Candidate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
