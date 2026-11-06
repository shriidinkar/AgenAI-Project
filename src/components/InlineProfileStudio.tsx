import React, { useState } from 'react';
import { StudentProfileInput, StudentSkill, ParsedResumeData } from '../types/career';
import { ResumeImportCard } from './ResumeImportCard';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { Sparkles, Plus, X, Check, FileText, Sliders, ArrowRight, GraduationCap, ChevronRight, ChevronLeft, BookOpen, Clock, Building, User } from 'lucide-react';

interface InlineProfileStudioProps {
  initialProfile?: StudentProfileInput | null;
  onSubmit: (profile: StudentProfileInput) => void;
  onSelectSample: (profile: StudentProfileInput) => void;
  isGenerating: boolean;
}

const ROLE_SKILL_SUGGESTIONS: Record<string, string[]> = {
  'Software Engineer': ['Python', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'Data Structures & Algorithms', 'PostgreSQL', 'REST APIs'],
  'Machine Learning Engineer': ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Docker', 'Distributed Inference', 'Data Structures', 'SQL', 'Git', 'FastAPI'],
  'Data Scientist / Analyst': ['Python (Pandas / NumPy)', 'SQL', 'Tableau', 'R', 'Statistical Modeling', 'Machine Learning', 'Excel / VBA', 'A/B Testing', 'PowerBI'],
  'Product Manager / APM': ['Product Discovery', 'User Research', 'Wireframing & Figma', 'SQL & Metrics', 'Agile & Scrum', 'A/B Testing', 'Stakeholder Communication', 'Roadmap Prioritization'],
  'Security / Cybersecurity Analyst': ['Network Protocols', 'Linux / Bash', 'Python', 'SIEM & Log Analysis', 'Vulnerability Assessment', 'OWASP Top 10', 'Cloud Security (AWS/GCP)', 'Cryptography Basics'],
  'Default': ['Problem Solving', 'Git & GitHub', 'Technical Writing', 'Data Analysis', 'Agile / Scrum', 'Critical Thinking', 'Communication'],
};

export const InlineProfileStudio: React.FC<InlineProfileStudioProps> = ({
  initialProfile,
  onSubmit,
  onSelectSample,
  isGenerating,
}) => {
  const [showResumeDrop, setShowResumeDrop] = useState(false);
  const [profile, setProfile] = useState<StudentProfileInput>(() => {
    if (initialProfile) return initialProfile;
    return {
      fullName: '',
      academicLevel: 'Undergraduate',
      institution: '',
      major: '',
      minorOrSpecialization: '',
      graduationYear: '2026',
      gpa: '',
      skills: [],
      academicInterests: [],
      keyProjectsOrCoursework: '',
      targetRole: 'Software Engineer',
      targetIndustry: 'Technology',
      targetCompanyType: 'High-growth Tech',
      targetTimeline: 'Upcoming New Grad Cycle (6-12 mos)',
      careerAspirationSummary: '',
      preferredTone: 'Balanced & Professional',
      existingResumeText: '',
    };
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'domain' | 'tools'>('technical');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newInterest, setNewInterest] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  // Completeness score
  const getCompleteness = () => {
    let score = 0;
    if ((profile?.fullName || '').trim()) score += 15;
    if ((profile?.institution || '').trim()) score += 15;
    if ((profile?.major || '').trim()) score += 15;
    if ((profile?.skills || []).length >= 3) score += 20;
    else if ((profile?.skills || []).length > 0) score += 10;
    if ((profile?.keyProjectsOrCoursework || '').trim()) score += 20;
    if ((profile?.targetRole || '').trim()) score += 15;
    return Math.min(100, score);
  };

  const completeness = getCompleteness();

  const handleAddSkill = (name?: string, category: 'technical' | 'soft' | 'domain' | 'tools' = 'technical') => {
    const skillToAdd = name || newSkillName;
    if (!skillToAdd.trim()) return;

    if ((profile.skills || []).some((s) => s.name.toLowerCase() === skillToAdd.trim().toLowerCase())) {
      if (!name) setNewSkillName('');
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        {
          name: skillToAdd.trim(),
          category: name ? category : newSkillCategory,
          level: newSkillLevel,
        },
      ],
    }));

    if (!name) setNewSkillName('');
  };

  const handleRemoveSkill = (idx: number) => {
    setProfile((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    if ((profile.academicInterests || []).includes(newInterest.trim())) {
      setNewInterest('');
      return;
    }
    setProfile((prev) => ({
      ...prev,
      academicInterests: [...(prev.academicInterests || []), newInterest.trim()],
    }));
    setNewInterest('');
  };

  const handleRemoveInterest = (idx: number) => {
    setProfile((prev) => ({
      ...prev,
      academicInterests: (prev.academicInterests || []).filter((_, i) => i !== idx),
    }));
  };

  const handleResumeParsed = (data: ParsedResumeData, rawText: string) => {
    setProfile((prev) => ({
      ...prev,
      fullName: data.fullName || prev.fullName,
      institution: data.institution || prev.institution,
      major: data.major || prev.major,
      minorOrSpecialization: data.minorOrSpecialization || prev.minorOrSpecialization,
      graduationYear: data.graduationYear || prev.graduationYear,
      gpa: data.gpa || prev.gpa,
      skills: data.skills && data.skills.length > 0 ? data.skills : (prev.skills || []),
      academicInterests: data.academicInterests && data.academicInterests.length > 0 ? data.academicInterests : (prev.academicInterests || []),
      keyProjectsOrCoursework: data.keyProjectsOrCoursework || prev.keyProjectsOrCoursework,
      targetRole: data.targetRole || prev.targetRole,
      existingResumeText: rawText,
    }));
    setShowResumeDrop(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!(profile.fullName || '').trim() || !(profile.targetRole || '').trim()) {
      setFormError('Please enter your full name and target role to generate your profile.');
      return;
    }
    onSubmit(profile);
  };

  const suggestedSkills = (profile.targetRole && ROLE_SKILL_SUGGESTIONS[profile.targetRole]) || ROLE_SKILL_SUGGESTIONS['Default'] || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Studio Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Personalized Career Content Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your Synchronized Career Profile
        </h1>
        <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
          Input your academic background, skills, and target role—or optionally import your existing resume—to generate an ATS summary, skill gap report, roadmap, and interview suite.
        </p>
      </div>

      {/* Optional Resume Import Toggle & Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  Import Existing Resume
                </span>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Have a draft resume, CV, or LinkedIn export? Paste or drop it in to auto-fill your fields with AI.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowResumeDrop(!showResumeDrop)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>{showResumeDrop ? 'Hide Resume Uploader' : 'Paste / Upload Resume'}</span>
          </button>
        </div>

        {showResumeDrop && (
          <div className="pt-2 border-t border-slate-100 animate-in fade-in duration-200">
            <ResumeImportCard
              onParsed={handleResumeParsed}
              onCancel={() => setShowResumeDrop(false)}
            />
          </div>
        )}

        {profile.existingResumeText && !showResumeDrop && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Resume attached ({profile.existingResumeText.length} characters) — Data pre-filled below.</span>
            </div>
            <button
              type="button"
              onClick={() => setShowResumeDrop(true)}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline"
            >
              Update Resume
            </button>
          </div>
        )}
      </div>

      {/* Main Interactive Profile Intake Form */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Stepper Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Guided Profile Questionnaire
            </h2>
            <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-semibold">
              Step {activeStep} of 3
            </span>
          </div>

          {/* Completeness Meter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Completeness:</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span className="font-mono font-bold text-indigo-600">{completeness}%</span>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-6 pt-3 bg-white text-xs font-medium text-slate-600 gap-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`pb-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 1
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            1. Identity & Academics
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`pb-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 2
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            2. Skills & Projects ({profile.skills.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`pb-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 3
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            3. Target Role & Tone
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <span className="font-bold">Notice:</span>
              <span>{formError}</span>
            </div>
          )}
          {/* STEP 1: Academic Background */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Academic Level *</label>
                  <select
                    value={profile.academicLevel}
                    onChange={(e) => setProfile({ ...profile, academicLevel: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value="Undergraduate">Undergraduate Student</option>
                    <option value="Master's Student">Master's Student</option>
                    <option value="PhD Candidate">PhD Candidate</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Bootcamp Graduate">Bootcamp Graduate</option>
                    <option value="High School Senior">High School Senior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">University / Institution *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of California, Berkeley"
                    value={profile.institution}
                    onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Major / Discipline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science, Data Science, Economics"
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Minor / Specialization (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Machine Learning, Statistics, or Product Design"
                    value={profile.minorOrSpecialization || ''}
                    onChange={(e) => setProfile({ ...profile, minorOrSpecialization: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Graduation Year</label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={profile.graduationYear}
                      onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">GPA (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.85"
                      value={profile.gpa || ''}
                      onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills & Projects */}
          {activeStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Quick-Add Recommended Skills */}
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-900 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Quick-Add Skills for {profile.targetRole}:</span>
                  </span>
                  <span className="text-[10px] text-indigo-700">Click to add with 1 tap</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suggestedSkills.map((skillName, idx) => {
                    const isAlreadyAdded = profile.skills.some(
                      (s) => s.name.toLowerCase() === skillName.toLowerCase()
                    );
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleAddSkill(skillName, 'technical')}
                        disabled={isAlreadyAdded}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                          isAlreadyAdded
                            ? 'bg-indigo-100/70 text-indigo-400 cursor-default'
                            : 'bg-white hover:bg-indigo-600 hover:text-white text-indigo-950 border border-indigo-200 shadow-2xs'
                        }`}
                      >
                        {isAlreadyAdded ? <Check className="w-3 h-3 text-emerald-600" /> : <Plus className="w-3 h-3" />}
                        <span>{skillName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Skills Inventory */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1.5">
                  Your Current Skills ({profile.skills.length})
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-16">
                  {profile.skills.length === 0 ? (
                    <span className="text-slate-400 text-xs italic self-center">
                      No skills added yet. Click any suggested skill above or enter one manually below.
                    </span>
                  ) : (
                    profile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({skill.level})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(idx)}
                          className="text-slate-400 hover:text-rose-600 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Manual Add Skill Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Type custom skill (e.g. PyTorch, Rust)"
                  className="p-2.5 rounded-lg border border-slate-200 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                >
                  <option value="technical">Technical</option>
                  <option value="tools">Tooling</option>
                  <option value="domain">Domain</option>
                  <option value="soft">Soft Skill</option>
                </select>
                <div className="flex gap-2">
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="p-2.5 rounded-lg border border-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shrink-0 font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Key Coursework / Projects */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-slate-700 font-semibold mb-1">
                  Key Projects, Coursework, or Research Experience:
                </label>
                <textarea
                  rows={3}
                  value={profile.keyProjectsOrCoursework}
                  onChange={(e) => setProfile({ ...profile, keyProjectsOrCoursework: e.target.value })}
                  placeholder="e.g. Built a multi-modal semantic retrieval system with CLIP embeddings. Course project on distributed consensus in Go..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs leading-relaxed"
                />
              </div>

              {/* Academic Focus Interests */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Academic & Technical Focus Areas:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {profile.academicInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                    >
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(idx)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                    placeholder="e.g. Cloud Infrastructure, LLM Fine-Tuning, Behavioral Economics"
                    className="p-2 rounded-lg border border-slate-200 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Target Role & Goals */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Target Job Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer, Machine Learning Engineer"
                    value={profile.targetRole}
                    onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Target Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Infrastructure, FinTech, Healthcare"
                    value={profile.targetIndustry}
                    onChange={(e) => setProfile({ ...profile, targetIndustry: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Company Environment</label>
                  <select
                    value={profile.targetCompanyType}
                    onChange={(e) => setProfile({ ...profile, targetCompanyType: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value="High-growth Tech">High-growth Tech Scaleup</option>
                    <option value="Global Enterprise / Fortune 500">Global Enterprise / Fortune 500</option>
                    <option value="Early-stage Startup">Early-stage Startup</option>
                    <option value="Research Lab / Academic">Research Lab / Academic</option>
                    <option value="Consulting / Agency">Consulting / Agency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Hiring Timeline</label>
                  <select
                    value={profile.targetTimeline}
                    onChange={(e) => setProfile({ ...profile, targetTimeline: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value="Upcoming New Grad Cycle (6-12 mos)">Upcoming New Grad Cycle (6–12 mos)</option>
                    <option value="Summer Internship">Summer Internship</option>
                    <option value="Immediate (0-3 mos)">Immediate (0–3 mos)</option>
                    <option value="Long-term (1-2 yrs)">Long-term (1–2 yrs)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 mb-1 font-semibold">Narrative Tone Preference</label>
                  <select
                    value={profile.preferredTone}
                    onChange={(e) => setProfile({ ...profile, preferredTone: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value="Balanced & Professional">Balanced & Professional (General tech & business)</option>
                    <option value="Technical & Rigorous">Technical & Rigorous (Deep systems, research labs)</option>
                    <option value="Ambitious & Impact-Focused">Ambitious & Impact-Focused (Startups, fast scaling)</option>
                    <option value="Creative & Visionary">Creative & Visionary (Design, product innovation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">
                  Personal Career Aspirations & Ambitions:
                </label>
                <textarea
                  rows={2}
                  value={profile.careerAspirationSummary}
                  onChange={(e) => setProfile({ ...profile, careerAspirationSummary: e.target.value })}
                  placeholder="What excites you most about this career path? Where do you want to be in 3 years?"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <div>
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                >
                  <span>Continue to Step {activeStep + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isGenerating || !profile.fullName.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Synthesizing Career Dossier...' : 'Generate Career Profile'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* 1-Click Demo Profiles Strip */}
      <div className="bg-slate-100 border border-slate-200/80 rounded-2xl p-5 text-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900">
            Explore Pre-configured Demo Candidate Profiles:
          </span>
          <span className="text-[11px] text-slate-500">Instant 1-Click Synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PROFILES.map((samp) => (
            <button
              key={samp.id}
              onClick={() => onSelectSample(samp.profile)}
              disabled={isGenerating}
              className="text-left p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-sm transition-all group"
            >
              <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {samp.label.split('—')[0].trim()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {samp.badge}
              </div>
              <div className="text-[11px] text-indigo-700 font-semibold mt-2 flex items-center gap-1">
                <span>Load {samp.profile.targetRole}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
