export interface StudentSkill {
  name: string;
  category: 'technical' | 'soft' | 'domain' | 'tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface StudentProfileInput {
  fullName: string;
  academicLevel: 'Undergraduate' | 'Master\'s Student' | 'PhD Candidate' | 'Bootcamp Graduate' | 'Recent Graduate' | 'High School Senior';
  institution: string;
  major: string;
  minorOrSpecialization?: string;
  graduationYear: string;
  gpa?: string;
  skills: StudentSkill[];
  academicInterests: string[];
  keyProjectsOrCoursework: string;
  targetRole: string;
  targetIndustry: string;
  targetCompanyType: 'Early-stage Startup' | 'High-growth Tech' | 'Global Enterprise / Fortune 500' | 'Research Lab / Academic' | 'Consulting / Agency';
  targetTimeline: 'Immediate (0-3 mos)' | 'Summer Internship' | 'Upcoming New Grad Cycle (6-12 mos)' | 'Long-term (1-2 yrs)';
  careerAspirationSummary: string;
  preferredTone?: 'Balanced & Professional' | 'Technical & Rigorous' | 'Ambitious & Impact-Focused' | 'Creative & Visionary';
  existingResumeText?: string;
}

export interface ParsedResumeData {
  fullName?: string;
  institution?: string;
  major?: string;
  minorOrSpecialization?: string;
  graduationYear?: string;
  gpa?: string;
  skills?: StudentSkill[];
  academicInterests?: string[];
  keyProjectsOrCoursework?: string;
  targetRole?: string;
  confidenceScore?: number;
}

export interface ConsistentBrandAnchor {
  positioningPillars: string[];
  coreCompetencyKeywords: string[];
  signatureValueProposition: string;
  narrativeTone: string;
}

export interface ProfessionalSummarySection {
  atsResumeSummary: string;
  atsKeywords: string[];
  linkedInAbout: {
    hook: string;
    narrative: string;
    skillsHighlight: string[];
    callToAction: string;
  };
  elevatorPitch30s: string;
  coverLetterHook: {
    openingSalutation: string;
    hookParagraph: string;
    academicBridgeParagraph: string;
    closingImpact: string;
  };
}

export interface SkillGapAnalysisItem {
  skill: string;
  category: 'technical' | 'domain' | 'tools' | 'soft';
  importance: 'Critical' | 'Important' | 'Nice-to-have';
  marketDemandContext: string;
  currentStudentStatus: 'Missing' | 'Emerging' | 'Solid Base';
  remedyAction: string;
}

export interface SkillGapReportSection {
  overallReadinessScore: number; // 0-100
  targetRoleBenchmarks: {
    roleTitle: string;
    typicalExpectations: string;
    keyHiringCriteria: string[];
  };
  competencyMatchBreakdown: {
    technicalSkillsPct: number;
    practicalExperiencePct: number;
    industryToolingPct: number;
    communicationSoftSkillsPct: number;
  };
  strengthsToHighlight: {
    skill: string;
    evidenceFromProfile: string;
    howToLeverage: string;
  }[];
  criticalGaps: SkillGapAnalysisItem[];
  secondaryGaps: SkillGapAnalysisItem[];
  strategicBridgeAdvise: string;
}

export interface RecommendedProject {
  title: string;
  subtitle: string;
  problemStatement: string;
  techStack: string[];
  estimatedWeeks: number;
  expectedDeliverables: string[];
  resumeBulletPoints: string[];
  gapsAddressed: string[];
}

export interface LearningPhase {
  phaseNumber: number;
  phaseName: string;
  timeframe: string;
  focusGoal: string;
  keyTopics: string[];
  recommendedResources: {
    name: string;
    type: 'Course' | 'Documentation' | 'Book' | 'Repository' | 'Community Project';
    platformOrSource: string;
    description: string;
  }[];
  weeklyMilestones: string[];
}

export interface LearningRecommendationsSection {
  learningPhases: LearningPhase[];
  recommendedProjects: RecommendedProject[];
  certificationsOrCredentials: {
    title: string;
    issuer: string;
    valueProposition: string;
    urgency: 'Recommended Soon' | 'Optional Post-Hire';
  }[];
  weeklyTimeCommitmentHours: number;
}

export interface TechnicalQuestionItem {
  id: string;
  question: string;
  topic: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  whyAsked: string;
  idealAnswerBreakdown: {
    coreConcept: string;
    keyTerminology: string[];
    commonStudentPitfalls: string;
    sampleStrongAnswer: string;
  };
}

export interface BehavioralStarQuestionItem {
  id: string;
  competency: string;
  question: string;
  contextBridge: string;
  starModelAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  interviewerLooksFor: string;
}

export interface InterviewPrepSection {
  customizedIntroScript: string; // "Tell me about yourself"
  technicalQuestions: TechnicalQuestionItem[];
  behavioralQuestions: BehavioralStarQuestionItem[];
  smartQuestionsForInterviewer: {
    question: string;
    context: string;
  }[];
  interviewDayStrategyTips: string[];
}

export interface FormatConsistencyAudit {
  brandConsistencyScore: number; // 0-100
  consistencyChecks: {
    aspect: string;
    status: 'Aligned' | 'Needs Attention';
    explanation: string;
  }[];
  crossFormatAlignmentNotes: string;
}

export interface GeneratedCareerDossier {
  id: string;
  generatedAt: string;
  studentInput: StudentProfileInput;
  brandAnchor: ConsistentBrandAnchor;
  professionalSummary: ProfessionalSummarySection;
  skillGapReport: SkillGapReportSection;
  learningRecommendations: LearningRecommendationsSection;
  interviewPrep: InterviewPrepSection;
  formatConsistency: FormatConsistencyAudit;
}

export interface InterviewAnswerFeedback {
  score: number; // 0-100
  strengths: string[];
  areasToImprove: string[];
  starEvaluation?: {
    situationPresent: boolean;
    taskClear: boolean;
    actionsSpecific: boolean;
    resultsQuantified: boolean;
  };
  refinedAnswerSuggestion: string;
  encouragement: string;
}
