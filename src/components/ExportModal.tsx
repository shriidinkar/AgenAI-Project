import React from 'react';
import { GeneratedCareerDossier } from '../types/career';
import { X, Download, FileText, Code2, Printer, Check } from 'lucide-react';

interface ExportModalProps {
  dossier: GeneratedCareerDossier;
  onClose: () => void;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ dossier, onClose, onPrint }) => {
  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dossier, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${dossier.studentInput.fullName.toLowerCase().replace(/\s+/g, '_')}_career_dossier.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadMarkdown = () => {
    const { studentInput, professionalSummary, skillGapReport, learningRecommendations, interviewPrep } = dossier;

    const mdContent = `# PathCraft Career Profile: ${studentInput.fullName}
**Target Role:** ${studentInput.targetRole} | **Industry:** ${studentInput.targetIndustry}
**Institution:** ${studentInput.institution} (${studentInput.academicLevel} - ${studentInput.major})
**Graduation Year:** ${studentInput.graduationYear} ${studentInput.gpa ? `| **GPA:** ${studentInput.gpa}` : ''}

---

## 1. Professional Summaries

### ATS Resume Summary
> ${professionalSummary.atsResumeSummary}

**Target Keywords:**
${professionalSummary.atsKeywords.map((k) => `- ${k}`).join('\n')}

### LinkedIn "About" Section
**Hook:**
${professionalSummary.linkedInAbout.hook}

**Narrative:**
${professionalSummary.linkedInAbout.narrative}

**Highlights:**
${professionalSummary.linkedInAbout.skillsHighlight.map((h) => `- ${h}`).join('\n')}

**Call to Action:**
${professionalSummary.linkedInAbout.callToAction}

### 30-Second Elevator Pitch
> "${professionalSummary.elevatorPitch30s}"

---

## 2. Skill-Gap Report
- **Readiness Score:** ${skillGapReport.overallReadinessScore} / 100
- **Target Role Benchmark:** ${skillGapReport.targetRoleBenchmarks.roleTitle}
${skillGapReport.targetRoleBenchmarks.typicalExpectations}

### High-Priority Gaps:
${skillGapReport.criticalGaps.map((g) => `- **${g.skill}** (${g.currentStudentStatus}): ${g.marketDemandContext}\n  *Action:* ${g.remedyAction}`).join('\n')}

### Strategic Advice:
${skillGapReport.strategicBridgeAdvise}

---

## 3. Learning Recommendations (12-Week Plan)
${learningRecommendations.learningPhases.map((p) => `### Phase ${p.phaseNumber}: ${p.phaseName} (${p.timeframe})\n**Goal:** ${p.focusGoal}\n**Milestones:**\n${p.weeklyMilestones.map((m) => `- [ ] ${m}`).join('\n')}`).join('\n\n')}

### Recommended Projects:
${learningRecommendations.recommendedProjects.map((proj) => `#### ${proj.title}
*${proj.subtitle}*
**Tech Stack:** ${proj.techStack.join(', ')}
**Problem:** ${proj.problemStatement}
**Quantified Resume Bullets:**
${proj.resumeBulletPoints.map((b) => `- ${b}`).join('\n')}`).join('\n\n')}

---

## 4. Interview Preparation

### Customized Intro Script:
> ${interviewPrep.customizedIntroScript}

### Top Technical Questions & Model Approaches:
${interviewPrep.technicalQuestions.map((q) => `#### Q: ${q.question} (${q.topic} - ${q.difficulty})
**Why Asked:** ${q.whyAsked}
**Key Terminology:** ${q.idealAnswerBreakdown.keyTerminology.join(', ')}
**Sample Strong Answer:** ${q.idealAnswerBreakdown.sampleStrongAnswer}`).join('\n\n')}
`;

    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${dossier.studentInput.fullName.toLowerCase().replace(/\s+/g, '_')}_career_dossier.md`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Export Synchronized Career Profile
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Choose your preferred format for job applications, career coaching, or offline review.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              downloadMarkdown();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Markdown Dossier (.md)</div>
                <div className="text-[11px] text-slate-500">
                  Formatted for GitHub READMEs, Obsidian, Notion, or text editors.
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              downloadJSON();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Complete JSON Profile (.json)</div>
                <div className="text-[11px] text-slate-500">
                  Raw structured schema for database persistence or system ingestion.
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onPrint();
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Printable PDF Dossier View</div>
                <div className="text-[11px] text-slate-500">
                  Launches browser print dialog configured with clean print stylesheets.
                </div>
              </div>
            </div>
            <Printer className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
