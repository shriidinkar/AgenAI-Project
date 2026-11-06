import React, { useState } from 'react';
import { LearningRecommendationsSection } from '../types/career';
import { Calendar, CheckSquare, Square, FolderGit2, BookOpen, Clock, Award, Copy, Check } from 'lucide-react';

interface LearningRoadmapTabProps {
  recommendations: LearningRecommendationsSection;
  targetRole: string;
}

export const LearningRoadmapTab: React.FC<LearningRoadmapTabProps> = ({
  recommendations,
  targetRole,
}) => {
  const {
    learningPhases,
    recommendedProjects,
    certificationsOrCredentials,
    weeklyTimeCommitmentHours,
  } = recommendations;

  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<string | null>(null);

  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const copyBullet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(id);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            12-Week Strategic Upskilling Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Phased milestones designed to systematically bridge identified skill gaps for {targetRole}.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-medium text-indigo-900">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target Commitment: <strong className="font-mono">{weeklyTimeCommitmentHours} hrs/wk</strong></span>
          </div>
        </div>
      </div>

      {/* 3-Phase Interactive Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {learningPhases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Phase 0{phase.phaseNumber}
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {phase.timeframe}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                {phase.phaseName}
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {phase.focusGoal}
              </p>

              {/* Weekly Milestones Checklist */}
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Weekly Deliverables
              </div>
              <div className="space-y-2 mb-4">
                {phase.weeklyMilestones.map((m, mIdx) => {
                  const mKey = `phase-${phase.phaseNumber}-m-${mIdx}`;
                  const isDone = !!completedMilestones[mKey];
                  return (
                    <button
                      key={mIdx}
                      onClick={() => toggleMilestone(mKey)}
                      className={`w-full text-left p-2 rounded-lg border text-xs flex items-start gap-2.5 transition-colors ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                          : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-snug">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-slate-400" />
                <span>Curated Resources</span>
              </div>
              <div className="space-y-1.5">
                {phase.recommendedResources.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-2 bg-slate-50 border border-slate-200/60 rounded text-[11px] text-slate-700"
                  >
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span className="truncate">{res.name}</span>
                      <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 rounded shrink-0">
                        {res.type}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[10px] mt-0.5">{res.platformOrSource}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Signature Portfolio Projects */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Recommended Capstone Portfolio Projects
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              High-yield portfolio systems architected to prove production competence and replace missing job experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendedProjects.map((proj, pIdx) => (
            <div
              key={pIdx}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                  <span className="font-mono text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    ~{proj.estimatedWeeks} Weeks
                  </span>
                </div>
                <div className="text-slate-500 font-medium mt-0.5">{proj.subtitle}</div>
              </div>

              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/70">
                {proj.problemStatement}
              </p>

              <div>
                <div className="font-semibold text-slate-700 mb-1">Tech Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantified Resume Bullet Points (Ready to copy) */}
              <div>
                <div className="font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Resume-Ready Action Bullets:</span>
                  <span className="text-[10px] text-slate-400">XYZ-Formula Quantified</span>
                </div>
                <div className="space-y-1.5">
                  {proj.resumeBulletPoints.map((bullet, bIdx) => {
                    const bulletId = `proj-${pIdx}-bullet-${bIdx}`;
                    const isCopied = copiedBulletIdx === bulletId;
                    return (
                      <div
                        key={bIdx}
                        className="group flex items-start justify-between gap-2 p-2 bg-white rounded border border-slate-200/80 hover:border-indigo-200 transition-colors"
                      >
                        <span className="text-slate-700 leading-normal">{bullet}</span>
                        <button
                          onClick={() => copyBullet(bullet, bulletId)}
                          className="shrink-0 p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                          title="Copy bullet"
                        >
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-medium">Eliminates Gaps:</span>
                {proj.gapsAddressed.map((gap, gIdx) => (
                  <span
                    key={gIdx}
                    className="text-emerald-800 bg-emerald-50 border border-emerald-200 text-[10px] px-1.5 py-0.5 rounded"
                  >
                    ✓ {gap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Credentials */}
      {certificationsOrCredentials && certificationsOrCredentials.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Recommended Industry Credentials & Certifications
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsOrCredentials.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>{cert.title}</span>
                  <span className="text-[10px] text-slate-500">{cert.urgency}</span>
                </div>
                <div className="text-slate-500 text-[11px]">{cert.issuer}</div>
                <div className="text-slate-700 pt-1">{cert.valueProposition}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
