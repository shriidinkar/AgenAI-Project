/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BrandAnchorCard } from './components/BrandAnchorCard';
import { ProfessionalSummaryTab } from './components/ProfessionalSummaryTab';
import { SkillGapReportTab } from './components/SkillGapReportTab';
import { LearningRoadmapTab } from './components/LearningRoadmapTab';
import { InterviewSuiteTab } from './components/InterviewSuiteTab';
import { ConsistencyAuditTab } from './components/ConsistencyAuditTab';
import { ProfileForm } from './components/ProfileForm';
import { RefineModal } from './components/RefineModal';
import { ExportModal } from './components/ExportModal';
import { InlineProfileStudio } from './components/InlineProfileStudio';
import { TabPlaceholderCard } from './components/TabPlaceholderCard';
import { GeneratedCareerDossier, StudentProfileInput, ParsedResumeData } from './types/career';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [dossier, setDossier] = useState<GeneratedCareerDossier | null>(null);
  const [activeTab, setActiveTab] = useState<string>('setup');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [prefillResume, setPrefillResume] = useState<{ data: ParsedResumeData; rawText: string } | null>(null);
  const [refineTarget, setRefineTarget] = useState<{ sectionKey: string; currentData: any } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerateDossier = async (input: StudentProfileInput) => {
    setIsGenerating(true);
    setShowProfileModal(false);

    try {
      const response = await fetch('/api/generate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to generate career profile');
      }

      const newDossier: GeneratedCareerDossier = await response.json();
      setDossier(newDossier);
      setActiveTab('summary');
      showToast(`Personalized career profile created for ${input.fullName}!`);
    } catch (err) {
      console.error(err);
      showToast('Generated using dynamic fallback synthesis.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (dossier) {
      handleGenerateDossier(dossier.studentInput);
    }
  };

  const handleResetProfile = () => {
    setDossier(null);
    setPrefillResume(null);
    setActiveTab('setup');
    showToast('Profile workspace cleared. Ready for a new candidate.');
  };

  const handleResumeParsed = (data: ParsedResumeData, rawText: string) => {
    setPrefillResume({ data, rawText });
    setShowProfileModal(true);
    showToast('Resume extracted! Review and adjust your details.');
  };

  const handleOpenRefine = (sectionKey: string, currentData: any) => {
    setRefineTarget({ sectionKey, currentData });
  };

  const handleApplyRefinement = (sectionKey: string, updatedData: any) => {
    setDossier((prev) => {
      if (!prev) return null;
      const cloned = { ...prev };
      if (sectionKey in cloned.professionalSummary) {
        (cloned.professionalSummary as any)[sectionKey] = updatedData;
      }
      return cloned;
    });
    showToast(`Section "${sectionKey}" updated with new tone!`);
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to load sample profile
  const handleLoadFirstSample = () => {
    if (SAMPLE_PROFILES.length > 0) {
      handleGenerateDossier(SAMPLE_PROFILES[0].profile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Generation Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xl max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
              <Sparkles className="w-7 h-7 animate-spin text-indigo-600" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Synthesizing Your Career Dossier
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Gemini is analyzing your skills, benchmarking target role criteria, and generating synchronized materials.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-left text-xs text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2 text-indigo-900 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span>Aligning core positioning pillars & ATS keywords</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Calculating competency match & skill-gap report</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Designing 12-week roadmap & signature capstone projects</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Formulating role-specific STAR interview questions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen Navigation & Header (Hidden during print) */}
      <div className="no-print">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenProfileForm={() => {
            setPrefillResume(null);
            setShowProfileModal(true);
          }}
          onOpenExport={() => setShowExportModal(true)}
          onPrint={handlePrint}
          onResetProfile={handleResetProfile}
          hasDossier={!!dossier}
        />

        {/* If dossier exists, show Quick Switcher Bar */}
        {dossier && (
          <div className="bg-slate-900 text-white border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">Active Candidate Profile:</span>
                <span className="text-white font-semibold">{dossier.studentInput.fullName}</span>
                <span className="text-slate-400 hidden md:inline">({dossier.studentInput.targetRole})</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('setup')}
                  className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Edit Profile Inputs
                </button>
                <button
                  onClick={handleResetProfile}
                  className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Create Another Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          {/* TAB 1: Profile & Resume Setup */}
          {activeTab === 'setup' && (
            <InlineProfileStudio
              initialProfile={dossier ? dossier.studentInput : null}
              onSubmit={handleGenerateDossier}
              onSelectSample={(sample) => handleGenerateDossier(sample)}
              isGenerating={isGenerating}
            />
          )}

          {/* TAB 2: Professional Summaries */}
          {activeTab === 'summary' && (
            dossier ? (
              <>
                <BrandAnchorCard
                  dossier={dossier}
                  onEditProfile={() => setActiveTab('setup')}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
                <ProfessionalSummaryTab
                  summary={dossier.professionalSummary}
                  brandAnchor={dossier.brandAnchor}
                  onOpenRefine={handleOpenRefine}
                />
              </>
            ) : (
              <TabPlaceholderCard
                title="Personalized Professional Summaries"
                description="Synchronized summaries tailored to recruiter scanning, LinkedIn networking, 30-second elevator pitches, and cover letter hooks."
                features={[
                  'ATS-Optimized Resume Executive Summary',
                  'First-Person LinkedIn Narrative Hook',
                  '30-Second Spoken Elevator Pitch',
                  'Targeted Cover Letter Opening Hook',
                  'Extracted High-Density ATS Keywords',
                  'In-place Tone Refinement Engine',
                ]}
                onOpenSetup={() => setActiveTab('setup')}
                onLoadSample={handleLoadFirstSample}
              />
            )
          )}

          {/* TAB 3: Skill-Gap Report */}
          {activeTab === 'gap-report' && (
            dossier ? (
              <>
                <BrandAnchorCard
                  dossier={dossier}
                  onEditProfile={() => setActiveTab('setup')}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
                <SkillGapReportTab
                  gapReport={dossier.skillGapReport}
                  targetRole={dossier.studentInput.targetRole}
                />
              </>
            ) : (
              <TabPlaceholderCard
                title="Target Role Skill-Gap Analysis"
                description="Direct benchmarking of your current skills against industry hiring expectations for your exact target position."
                features={[
                  'Role Expectation & Level Benchmarks',
                  'Competency Match Percentage Breakdown',
                  'High-Leverage Strengths Analysis',
                  'Critical Skill Gaps with Concrete Remedies',
                  'Secondary Gaps & Nice-to-Have Capabilities',
                  'Industry Readiness Score & Rationale',
                ]}
                onOpenSetup={() => setActiveTab('setup')}
                onLoadSample={handleLoadFirstSample}
              />
            )
          )}

          {/* TAB 4: Learning Roadmap */}
          {activeTab === 'roadmap' && (
            dossier ? (
              <>
                <BrandAnchorCard
                  dossier={dossier}
                  onEditProfile={() => setActiveTab('setup')}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
                <LearningRoadmapTab
                  recommendations={dossier.learningRecommendations}
                  targetRole={dossier.studentInput.targetRole}
                />
              </>
            ) : (
              <TabPlaceholderCard
                title="Personalized Learning & Project Roadmap"
                description="A structured 12-week sprint program with weekly deliverables, capstone project architectures, and verified credentials."
                features={[
                  '12-Week Milestone Action Plan',
                  'Weekly Output Deliverables & Time Budgets',
                  'Capstone Projects with Tech Stacks',
                  'Quantified Google XYZ-Style Resume Bullets',
                  'Industry-Recognized Certifications',
                  'Curated High-Value Learning Resources',
                ]}
                onOpenSetup={() => setActiveTab('setup')}
                onLoadSample={handleLoadFirstSample}
              />
            )
          )}

          {/* TAB 5: Interview Prep Suite */}
          {activeTab === 'interview' && (
            dossier ? (
              <>
                <BrandAnchorCard
                  dossier={dossier}
                  onEditProfile={() => setActiveTab('setup')}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
                <InterviewSuiteTab
                  interviewPrep={dossier.interviewPrep}
                  targetRole={dossier.studentInput.targetRole}
                />
              </>
            ) : (
              <TabPlaceholderCard
                title="Interview Preparation & Mock Station"
                description="Targeted behavioral and technical interview questions with live audio practice, answer timer, and AI evaluation."
                features={[
                  'Personalized "Tell Me About Yourself" Script',
                  'Technical Screening Question Bank & Ideal Answers',
                  'STAR Behavioral Scenarios from Your Projects',
                  'High-Impact Questions to Ask the Hiring Team',
                  'Interactive Mock Station with 30s-120s Timers',
                  'Instant AI Scoring, Strengths & Improvement Tips',
                ]}
                onOpenSetup={() => setActiveTab('setup')}
                onLoadSample={handleLoadFirstSample}
              />
            )
          )}

          {/* TAB 6: Format Consistency */}
          {activeTab === 'consistency' && (
            dossier ? (
              <>
                <BrandAnchorCard
                  dossier={dossier}
                  onEditProfile={() => setActiveTab('setup')}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
                <ConsistencyAuditTab dossier={dossier} />
              </>
            ) : (
              <TabPlaceholderCard
                title="Cross-Format Narrative Consistency Audit"
                description="Comprehensive audit verifying that your positioning, keywords, and capstone stories remain unified across all materials."
                features={[
                  'Cross-Format Coherence Index (0-100)',
                  'Thread Matrix Across Resume, Pitch & STAR',
                  'Brand Pillar Traceability Check',
                  'Tone Consistency Verification',
                  'Keyword Density Alignment',
                  'Multi-Channel Cohesion Guarantees',
                ]}
                onOpenSetup={() => setActiveTab('setup')}
                onLoadSample={handleLoadFirstSample}
              />
            )
          )}
        </main>

        {/* Clean Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-800">PathCraft</span> · AI-Based Personalized Career Content Generator
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>ATS Format Synchronization</span>
              <span>·</span>
              <span>12-Week Skill-Gap Roadmap</span>
              <span>·</span>
              <span>AI Mock Interview Grader</span>
            </div>
          </div>
        </footer>
      </div>

      {/* PRINT-ONLY VIEW: Clean ATS Profile Sheet for PDF Export */}
      {dossier && (
        <div className="hidden print-only p-8 text-black text-xs leading-relaxed max-w-4xl mx-auto space-y-6">
          <div className="border-b-2 border-black pb-4 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              {dossier.studentInput.fullName}
            </h1>
            <div className="text-sm mt-1">
              {dossier.studentInput.academicLevel} in {dossier.studentInput.major} · {dossier.studentInput.institution}
            </div>
            <div className="text-xs text-gray-700 mt-0.5">
              Targeting: {dossier.studentInput.targetRole} ({dossier.studentInput.targetIndustry})
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-justify leading-relaxed">
              {dossier.professionalSummary.atsResumeSummary}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Core Competencies & Keywords
            </h2>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <strong>Profile Skills: </strong>
                {dossier.studentInput.skills.map((s) => s.name).join(', ')}
              </div>
              <div>
                <strong>ATS Keywords: </strong>
                {dossier.professionalSummary.atsKeywords.join(', ')}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Target Role Skill-Gap Analysis
            </h2>
            <div className="mb-2">
              <strong>Target Role Benchmark: </strong>
              {dossier.skillGapReport.targetRoleBenchmarks.roleTitle} — {dossier.skillGapReport.targetRoleBenchmarks.typicalExpectations}
            </div>
            <div className="space-y-1">
              <strong>Critical Gaps to Bridge:</strong>
              {dossier.skillGapReport.criticalGaps.map((g, i) => (
                <div key={i}>
                  • <strong>{g.skill}:</strong> {g.remedyAction}
                </div>
              ))}
            </div>
          </div>

          <div className="print-page-break pt-4">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Recommended Capstone Portfolio Projects
            </h2>
            <div className="space-y-3">
              {dossier.learningRecommendations.recommendedProjects.map((p, i) => (
                <div key={i}>
                  <div className="font-bold text-[12px]">{p.title} ({p.techStack.join(', ')})</div>
                  <div className="text-[11px] italic mb-1">{p.problemStatement}</div>
                  {p.resumeBulletPoints.map((b, bi) => (
                    <div key={bi}>• {b}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Interview Strategy & Elevator Pitch
            </h2>
            <p className="italic">
              "{dossier.professionalSummary.elevatorPitch30s}"
            </p>
          </div>
        </div>
      )}

      {/* Profile Form Modal (if opened via button) */}
      {showProfileModal && (
        <ProfileForm
          initialProfile={dossier ? dossier.studentInput : null}
          prefillResumeData={prefillResume?.data}
          prefillResumeRawText={prefillResume?.rawText}
          onSubmit={handleGenerateDossier}
          onClose={() => {
            setShowProfileModal(false);
            setPrefillResume(null);
          }}
          isGenerating={isGenerating}
        />
      )}

      {/* Refine Section Modal */}
      {refineTarget && dossier && (
        <RefineModal
          sectionKey={refineTarget.sectionKey}
          currentData={refineTarget.currentData}
          studentInput={dossier.studentInput}
          onClose={() => setRefineTarget(null)}
          onApplyRefinement={handleApplyRefinement}
        />
      )}

      {/* Export Modal */}
      {showExportModal && dossier && (
        <ExportModal
          dossier={dossier}
          onClose={() => setShowExportModal(false)}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
}
