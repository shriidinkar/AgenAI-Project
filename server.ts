import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { StudentProfileInput, GeneratedCareerDossier, InterviewAnswerFeedback } from './src/types/career';
import { INITIAL_PRECOMPUTED_DOSSIER } from './src/data/sampleProfiles';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Generate full personalized career profile
  app.post('/api/generate-profile', async (req, res) => {
    try {
      const studentInput: StudentProfileInput = req.body;
      if (!studentInput || !studentInput.fullName || !studentInput.targetRole) {
        res.status(400).json({ error: 'Missing required student profile fields' });
        return;
      }

      if (!ai) {
        console.warn('GEMINI_API_KEY is not configured. Falling back to dynamic template synthesis.');
        const synthetic = generateSyntheticDossier(studentInput);
        res.json(synthetic);
        return;
      }

      const prompt = `
You are the world's foremost AI Career Strategy Architect for university students, recent graduates, and career transitioners.
Analyze the following student profile and generate a comprehensive, highly personalized, and internally consistent career profile dossier.

CRITICAL REQUIREMENT - FORMAT CONSISTENCY:
All generated outputs (Professional Summary, ATS Resume block, LinkedIn About, Elevator Pitch, Cover Letter hook, Skill-Gap Report, Learning Recommendations, and Interview Prep) MUST maintain absolute thematic and narrative consistency. They must anchor around the exact same core strengths, positioning pillars, target trajectory, and student voice.

STUDENT PROFILE DATA:
- Full Name: ${studentInput.fullName}
- Academic Level: ${studentInput.academicLevel}
- Institution: ${studentInput.institution}
- Major: ${studentInput.major}
- Specialization / Minor: ${studentInput.minorOrSpecialization || 'None specified'}
- Expected Graduation: ${studentInput.graduationYear}
- GPA: ${studentInput.gpa || 'Not provided'}
- Skills Provided: ${JSON.stringify(studentInput.skills)}
- Academic Interests & Focus: ${studentInput.academicInterests.join(', ')}
- Key Projects / Coursework: ${studentInput.keyProjectsOrCoursework}
- Target Role: ${studentInput.targetRole}
- Target Industry: ${studentInput.targetIndustry}
- Target Company Type: ${studentInput.targetCompanyType}
- Hiring Timeline: ${studentInput.targetTimeline}
- Career Aspirations: ${studentInput.careerAspirationSummary}
- Tone Preference: ${studentInput.preferredTone || 'Balanced & Professional'}
${studentInput.existingResumeText ? `\n- EXISTING RESUME CONTENT PROVIDED BY USER (PRIORITIZE THIS ACTUAL RECORD OF EXPERIENCE):\n"""\n${studentInput.existingResumeText.slice(0, 10000)}\n"""` : ''}

OUTPUT JSON SCHEMA:
Return ONLY valid JSON matching this exact structure:
{
  "brandAnchor": {
    "positioningPillars": ["string (3 key pillars)"],
    "coreCompetencyKeywords": ["string (6-8 keywords)"],
    "signatureValueProposition": "string",
    "narrativeTone": "string"
  },
  "professionalSummary": {
    "atsResumeSummary": "string (tight, high-impact paragraph)",
    "atsKeywords": ["string (8-12 keywords)"],
    "linkedInAbout": {
      "hook": "string (engaging 1-2 sentence opener)",
      "narrative": "string (2-3 paragraphs with student journey)",
      "skillsHighlight": ["string (3-4 bullet strings)"],
      "callToAction": "string"
    },
    "elevatorPitch30s": "string (30-second conversational pitch)",
    "coverLetterHook": {
      "openingSalutation": "Dear Hiring Team,",
      "hookParagraph": "string",
      "academicBridgeParagraph": "string",
      "closingImpact": "string"
    }
  },
  "skillGapReport": {
    "overallReadinessScore": number (50 to 92 based on actual alignment),
    "targetRoleBenchmarks": {
      "roleTitle": "string",
      "typicalExpectations": "string",
      "keyHiringCriteria": ["string (4-5 items)"]
    },
    "competencyMatchBreakdown": {
      "technicalSkillsPct": number (0-100),
      "practicalExperiencePct": number (0-100),
      "industryToolingPct": number (0-100),
      "communicationSoftSkillsPct": number (0-100)
    },
    "strengthsToHighlight": [
      {
        "skill": "string",
        "evidenceFromProfile": "string",
        "howToLeverage": "string"
      }
    ],
    "criticalGaps": [
      {
        "skill": "string",
        "category": "technical | domain | tools | soft",
        "importance": "Critical",
        "marketDemandContext": "string",
        "currentStudentStatus": "Missing | Emerging",
        "remedyAction": "string"
      }
    ],
    "secondaryGaps": [
      {
        "skill": "string",
        "category": "technical | domain | tools | soft",
        "importance": "Important | Nice-to-have",
        "marketDemandContext": "string",
        "currentStudentStatus": "Missing | Emerging",
        "remedyAction": "string"
      }
    ],
    "strategicBridgeAdvise": "string"
  },
  "learningRecommendations": {
    "weeklyTimeCommitmentHours": number (e.g. 8-15),
    "learningPhases": [
      {
        "phaseNumber": 1,
        "phaseName": "string",
        "timeframe": "Weeks 1–4",
        "focusGoal": "string",
        "keyTopics": ["string"],
        "recommendedResources": [
          {
            "name": "string",
            "type": "Course | Documentation | Book | Repository",
            "platformOrSource": "string",
            "description": "string"
          }
        ],
        "weeklyMilestones": ["string (4 milestones)"]
      },
      {
        "phaseNumber": 2,
        "phaseName": "string",
        "timeframe": "Weeks 5–8",
        "focusGoal": "string",
        "keyTopics": ["string"],
        "recommendedResources": [
          {
            "name": "string",
            "type": "Course | Documentation | Book | Repository",
            "platformOrSource": "string",
            "description": "string"
          }
        ],
        "weeklyMilestones": ["string (4 milestones)"]
      },
      {
        "phaseNumber": 3,
        "phaseName": "string",
        "timeframe": "Weeks 9–12",
        "focusGoal": "string",
        "keyTopics": ["string"],
        "recommendedResources": [
          {
            "name": "string",
            "type": "Course | Documentation | Book | Repository",
            "platformOrSource": "string",
            "description": "string"
          }
        ],
        "weeklyMilestones": ["string (4 milestones)"]
      }
    ],
    "recommendedProjects": [
      {
        "title": "string",
        "subtitle": "string",
        "problemStatement": "string",
        "techStack": ["string"],
        "estimatedWeeks": number,
        "expectedDeliverables": ["string"],
        "resumeBulletPoints": ["string (2-3 strong quantified bullets)"],
        "gapsAddressed": ["string"]
      },
      {
        "title": "string",
        "subtitle": "string",
        "problemStatement": "string",
        "techStack": ["string"],
        "estimatedWeeks": number,
        "expectedDeliverables": ["string"],
        "resumeBulletPoints": ["string (2-3 strong quantified bullets)"],
        "gapsAddressed": ["string"]
      }
    ],
    "certificationsOrCredentials": [
      {
        "title": "string",
        "issuer": "string",
        "valueProposition": "string",
        "urgency": "Recommended Soon | Optional Post-Hire"
      }
    ]
  },
  "interviewPrep": {
    "customizedIntroScript": "string (Tell me about yourself answer tailored to student and target role)",
    "technicalQuestions": [
      {
        "id": "tech-1",
        "topic": "string",
        "difficulty": "Foundational | Intermediate | Advanced",
        "question": "string",
        "whyAsked": "string",
        "idealAnswerBreakdown": {
          "coreConcept": "string",
          "keyTerminology": ["string"],
          "commonStudentPitfalls": "string",
          "sampleStrongAnswer": "string"
        }
      },
      {
        "id": "tech-2",
        "topic": "string",
        "difficulty": "Intermediate | Advanced",
        "question": "string",
        "whyAsked": "string",
        "idealAnswerBreakdown": {
          "coreConcept": "string",
          "keyTerminology": ["string"],
          "commonStudentPitfalls": "string",
          "sampleStrongAnswer": "string"
        }
      },
      {
        "id": "tech-3",
        "topic": "string",
        "difficulty": "Intermediate | Advanced",
        "question": "string",
        "whyAsked": "string",
        "idealAnswerBreakdown": {
          "coreConcept": "string",
          "keyTerminology": ["string"],
          "commonStudentPitfalls": "string",
          "sampleStrongAnswer": "string"
        }
      }
    ],
    "behavioralQuestions": [
      {
        "id": "beh-1",
        "competency": "string",
        "question": "string",
        "contextBridge": "string (how this connects to their project/academic background)",
        "starModelAnswer": {
          "situation": "string",
          "task": "string",
          "action": "string",
          "result": "string"
        },
        "interviewerLooksFor": "string"
      },
      {
        "id": "beh-2",
        "competency": "string",
        "question": "string",
        "contextBridge": "string",
        "starModelAnswer": {
          "situation": "string",
          "task": "string",
          "action": "string",
          "result": "string"
        },
        "interviewerLooksFor": "string"
      }
    ],
    "smartQuestionsForInterviewer": [
      {
        "question": "string",
        "context": "string"
      },
      {
        "question": "string",
        "context": "string"
      },
      {
        "question": "string",
        "context": "string"
      }
    ],
    "interviewDayStrategyTips": ["string (4 practical tips)"]
  },
  "formatConsistency": {
    "brandConsistencyScore": number (95-100),
    "consistencyChecks": [
      {
        "aspect": "Technical Pillar Alignment",
        "status": "Aligned",
        "explanation": "string"
      },
      {
        "aspect": "Tone & Voice Synchronicity",
        "status": "Aligned",
        "explanation": "string"
      },
      {
        "aspect": "Academic-to-Industry Bridge",
        "status": "Aligned",
        "explanation": "string"
      },
      {
        "aspect": "Gap Remediation Continuity",
        "status": "Aligned",
        "explanation": "string"
      }
    ],
    "crossFormatAlignmentNotes": "string"
  }
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an expert career advisory system specializing in university talent development, technical recruiting, and resume/interview preparation. You provide highly realistic, actionable, and non-generic career materials. Always respond with strict, valid JSON without markdown fences.',
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text ? response.text.trim() : '';
      let parsedDossier: any;

      try {
        parsedDossier = JSON.parse(responseText);
      } catch (parseErr) {
        // Fallback cleanup if response had subtle wrapper
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          parsedDossier = JSON.parse(match[0]);
        } else {
          throw new Error('Could not parse Gemini JSON response');
        }
      }

      const completeDossier: GeneratedCareerDossier = {
        id: 'dossier-' + Date.now(),
        generatedAt: new Date().toISOString(),
        studentInput,
        brandAnchor: parsedDossier.brandAnchor,
        professionalSummary: parsedDossier.professionalSummary,
        skillGapReport: parsedDossier.skillGapReport,
        learningRecommendations: parsedDossier.learningRecommendations,
        interviewPrep: parsedDossier.interviewPrep,
        formatConsistency: parsedDossier.formatConsistency,
      };

      res.json(completeDossier);
    } catch (err: any) {
      console.error('Error generating profile with Gemini:', err);
      // Resilient fallback with user input adapted dynamically
      const fallback = generateSyntheticDossier(req.body);
      res.json(fallback);
    }
  });

  // API Route: Evaluate user's mock interview response
  app.post('/api/evaluate-interview-answer', async (req, res) => {
    try {
      const { question, answer, targetRole, questionType, idealAnswer } = req.body;
      if (!question || !answer) {
        res.status(400).json({ error: 'Question and answer are required' });
        return;
      }

      if (!ai) {
        const mockFeedback: InterviewAnswerFeedback = {
          score: Math.min(94, Math.max(65, Math.floor(68 + answer.length / 25))),
          strengths: [
            'Directly addresses the premise of the prompt with good initial clarity.',
            'Reflects relevant terminology aligned with the ' + (targetRole || 'target') + ' role.',
          ],
          areasToImprove: [
            questionType === 'behavioral'
              ? 'Could quantify outcomes more explicitly (e.g. metrics, percentage reduction in latency or errors).'
              : 'Include deeper theoretical trade-offs or memory/runtime complexity bounds.',
            'Conclude with a punchier final synthesis sentence.',
          ],
          starEvaluation: questionType === 'behavioral' ? {
            situationPresent: true,
            taskClear: true,
            actionsSpecific: answer.length > 150,
            resultsQuantified: /\d+%|\d+x|\d+ seconds|\$\d+/i.test(answer),
          } : undefined,
          refinedAnswerSuggestion:
            'A stronger version could state: "In my recent project, I approached this by first scoping the core constraint... By implementing [key technique], we achieved [quantified metric] while maintaining system stability."',
          encouragement: 'Strong conversational start! Practice timing yourself to keep this under 90 seconds.',
        };
        res.json(mockFeedback);
        return;
      }

      const prompt = `
You are an expert technical and behavioral interviewer evaluating a candidate for the role of "${targetRole || 'Target Role'}".

QUESTION ASKED:
"${question}"

QUESTION TYPE: ${questionType} (technical or behavioral)
IDEAL REFERENCE CONTEXT: ${idealAnswer ? JSON.stringify(idealAnswer) : 'Standard industry expectations'}

CANDIDATE ANSWER SUBMITTED:
"${answer}"

Evaluate the candidate's answer with rigor and empathy.
Return JSON matching:
{
  "score": number (0 to 100),
  "strengths": ["string (2-3 concrete positive elements)"],
  "areasToImprove": ["string (2-3 concrete opportunities)"],
  "starEvaluation": {
    "situationPresent": boolean,
    "taskClear": boolean,
    "actionsSpecific": boolean,
    "resultsQuantified": boolean
  },
  "refinedAnswerSuggestion": "string (rewritten version highlighting how they can phrase it like a top 5% candidate)",
  "encouragement": "string (short motivational coaching advice)"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an executive hiring bar raiser who evaluates answers for structure, precision, technical depth, and authenticity. Return valid JSON only.',
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text ? response.text.trim() : '';
      const feedback: InterviewAnswerFeedback = JSON.parse(responseText);
      res.json(feedback);
    } catch (err: any) {
      console.error('Error evaluating interview answer:', err);
      res.status(500).json({ error: 'Failed to evaluate answer' });
    }
  });

  // API Route: Refine specific section with instructions
  app.post('/api/refine-section', async (req, res) => {
    try {
      const { sectionKey, studentInput, currentData, userInstruction } = req.body;
      if (!sectionKey || !userInstruction) {
        res.status(400).json({ error: 'Missing refinement parameters' });
        return;
      }

      if (!ai) {
        res.json({ updatedContent: currentData, note: 'Gemini API key not attached; current content preserved.' });
        return;
      }

      const prompt = `
Student: ${studentInput?.fullName || 'Student'} (${studentInput?.major || 'Major'} targeting ${studentInput?.targetRole || 'Target Role'})
Section to Refine: ${sectionKey}

Current Section Content:
${JSON.stringify(currentData, null, 2)}

User's Refinement Instruction:
"${userInstruction}"

Refine this specific section to reflect the user's instructions while maintaining strict consistency with the student's background and target role.
Return the updated JSON object for this section directly.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a career advisor. Return ONLY the refined JSON object matching the section structure.',
          responseMimeType: 'application/json',
        },
      });

      const updated = JSON.parse(response.text ? response.text.trim() : '{}');
      res.json({ updatedContent: updated });
    } catch (err: any) {
      console.error('Error in refine-section:', err);
      res.status(500).json({ error: 'Failed to refine section' });
    }
  });

  // API Route: Parse existing resume text (Optional resume input)
  app.post('/api/parse-resume', async (req, res) => {
    try {
      const { resumeText } = req.body;
      if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
        res.status(400).json({ error: 'Resume text is required' });
        return;
      }

      if (!ai) {
        const parsed = extractBasicResumeInfo(resumeText);
        res.json(parsed);
        return;
      }

      const prompt = `
You are an expert resume parser and student career counselor.
Analyze this user's existing resume text and extract their profile details into a clean, structured JSON object:

RESUME TEXT:
"""
${resumeText.slice(0, 15000)}
"""

Extract and return JSON strictly matching this schema:
{
  "fullName": "string (candidate's name, or empty string if not found)",
  "institution": "string (university or college name)",
  "academicLevel": "Undergraduate | Master's Student | PhD Candidate | Recent Graduate | Bootcamp Graduate | High School Senior",
  "major": "string (major or degree subject)",
  "minorOrSpecialization": "string (minor or concentration, or empty string)",
  "graduationYear": "string (e.g. 2026 or 2027)",
  "gpa": "string (e.g. 3.8 or empty string)",
  "skills": [
    {
      "name": "string (e.g. Python, SQL, React, Project Management)",
      "category": "technical | soft | domain | tools",
      "level": "Beginner | Intermediate | Advanced"
    }
  ],
  "academicInterests": ["string (3-5 academic or technical focus areas)"],
  "keyProjectsOrCoursework": "string (summary of key projects, internships, or courses found on the resume)",
  "targetRole": "string (inferred target role or title based on their experience and skills, e.g. Software Engineer, Data Analyst, Product Manager)",
  "confidenceScore": 90
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You extract factual resume information into structured JSON. Never invent facts not supported by the resume. Return strictly valid JSON.',
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text ? response.text.trim() : '{}';
      let parsedData: any = {};
      try {
        parsedData = JSON.parse(responseText);
      } catch (e) {
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) parsedData = JSON.parse(match[0]);
      }

      res.json(parsedData);
    } catch (err: any) {
      console.error('Error parsing resume with Gemini:', err);
      const fallback = extractBasicResumeInfo(req.body.resumeText || '');
      res.json(fallback);
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) return next();
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PathCraft server running at http://0.0.0.0:${PORT}`);
  });
}

function generateSyntheticDossier(input: StudentProfileInput): GeneratedCareerDossier {
  const topSkills = input.skills.map((s) => s.name).slice(0, 5);
  const primarySkill = topSkills[0] || 'Software Engineering';

  return {
    id: 'dossier-' + Date.now(),
    generatedAt: new Date().toISOString(),
    studentInput: input,
    brandAnchor: {
      positioningPillars: [
        `Grounded academic expertise in ${input.major} at ${input.institution}`,
        `Hands-on proficiency in ${topSkills.join(', ')} applied to ${input.targetRole} challenges`,
        `Direct focus on ${input.targetIndustry} standard practices and rapid execution`,
      ],
      coreCompetencyKeywords: [...topSkills, input.targetRole, 'Systems Design', 'Collaborative Delivery'],
      signatureValueProposition: `${input.academicLevel} candidate at ${input.institution} combining strong fundamentals in ${input.major} with practical competency in ${primarySkill} to drive immediate value as a ${input.targetRole}.`,
      narrativeTone: input.preferredTone || 'Balanced & Professional',
    },
    professionalSummary: {
      atsResumeSummary: `${input.institution} ${input.academicLevel} specializing in ${input.major}${input.gpa ? ` (${input.gpa} GPA)` : ''} with demonstrable technical capability across ${topSkills.join(', ')}. Experienced in ${input.keyProjectsOrCoursework.slice(0, 160)}. Seeking a ${input.targetRole} role within ${input.targetIndustry} to apply structured problem-solving and modern engineering practices.`,
      atsKeywords: [input.targetRole, ...topSkills, input.major, 'Agile', 'System Optimization', 'Data Analysis'],
      linkedInAbout: {
        hook: `Building the intersection of ${input.major} and high-impact ${input.targetIndustry} solutions.`,
        narrative: `As a ${input.academicLevel} at ${input.institution}, I focus on turning academic theory into reliable, scalable solutions.\n\nThroughout my coursework and projects, I have worked extensively with ${topSkills.join(', ')}. My recent work includes: ${input.keyProjectsOrCoursework}\n\nI am motivated by complex systems and passionate about joining a high-performing team as a ${input.targetRole}.`,
        skillsHighlight: [
          `Core Competencies: ${topSkills.join(' · ')}`,
          `Domain Focus: ${input.academicInterests.slice(0, 3).join(' · ')}`,
          `Target Environment: ${input.targetCompanyType} in ${input.targetIndustry}`,
        ],
        callToAction: `Targeting ${input.targetTimeline} opportunities. Feel free to connect or reach out!`,
      },
      elevatorPitch30s: `Hi, I'm ${input.fullName}, a ${input.academicLevel} studying ${input.major} at ${input.institution}. I specialize in ${topSkills.slice(0, 3).join(' and ')}, where I recently built ${input.keyProjectsOrCoursework.slice(0, 120)}. I'm preparing for ${input.targetRole} opportunities where I can contribute to high-velocity development and robust problem solving.`,
      coverLetterHook: {
        openingSalutation: 'Dear Hiring Manager,',
        hookParagraph: `I am writing to express my strong interest in the ${input.targetRole} position. As a ${input.academicLevel} studying ${input.major} at ${input.institution}, I have built a rigorous technical foundation in ${primarySkill} that aligns directly with your team's mission.`,
        academicBridgeParagraph: `During my academic tenure, I led projects such as: ${input.keyProjectsOrCoursework}. This experience honed my ability to bridge theoretical principles with functional implementation while meeting tight deadlines.`,
        closingImpact: `I would welcome the opportunity to discuss how my academic background and dedication to craft will bring fresh momentum to your engineering initiatives.`,
      },
    },
    skillGapReport: {
      overallReadinessScore: 74,
      targetRoleBenchmarks: {
        roleTitle: input.targetRole,
        typicalExpectations: `Industry employers expect strong fundamentals in ${topSkills.slice(0, 2).join(' & ')}, end-to-end testing, modern CI/CD practices, and clear technical communication.`,
        keyHiringCriteria: [
          `Mastery of core ${input.targetRole} tooling and frameworks`,
          'Production-level code hygiene and Git collaboration',
          'System architecture and modular design patterns',
          'Cross-functional problem solving and ownership',
        ],
      },
      competencyMatchBreakdown: {
        technicalSkillsPct: 78,
        practicalExperiencePct: 68,
        industryToolingPct: 64,
        communicationSoftSkillsPct: 86,
      },
      strengthsToHighlight: [
        {
          skill: primarySkill,
          evidenceFromProfile: `Self-assessed advanced proficiency with supporting coursework at ${input.institution}.`,
          howToLeverage: `Highlight quantitative project outcomes and algorithmic clarity during technical screenings.`,
        },
        {
          skill: 'Academic Foundation & Learning Agility',
          evidenceFromProfile: `Pursuing ${input.major} with key projects in ${input.academicInterests.slice(0, 2).join(', ')}.`,
          howToLeverage: `Demonstrate fast ramp-up speed on new libraries and protocols.`,
        },
      ],
      criticalGaps: [
        {
          skill: 'Production Deployment & Cloud Tooling (CI/CD, Cloud Providers)',
          category: 'tools',
          importance: 'Critical',
          marketDemandContext: 'Modern teams require engineers to ship code via automated pipelines rather than running locally.',
          currentStudentStatus: 'Emerging',
          remedyAction: 'Build a containerized deployment workflow on GitHub Actions and deploy to a free cloud container.',
        },
        {
          skill: 'System Design & Scalability Patterns',
          category: 'technical',
          importance: 'Critical',
          marketDemandContext: 'Screening rounds at tech firms test caching, database indexes, and API rate limiting.',
          currentStudentStatus: 'Missing',
          remedyAction: 'Study 5 standard system design scenarios and practice drawing architecture diagrams.',
        },
      ],
      secondaryGaps: [
        {
          skill: 'Automated Testing & Integration Suites (Jest / PyTest)',
          category: 'technical',
          importance: 'Important',
          marketDemandContext: 'Testing coverage separates student prototypes from enterprise-ready pull requests.',
          currentStudentStatus: 'Emerging',
          remedyAction: 'Add 80%+ unit and integration test coverage to your primary repository.',
        },
      ],
      strategicBridgeAdvise: `Your core foundation in ${input.major} is strong. To close the remaining gap for the ${input.targetRole} role, elevate your project portfolio from local scripts to deployed, monitored web services with clear documentation and tests.`,
    },
    learningRecommendations: {
      weeklyTimeCommitmentHours: 10,
      learningPhases: [
        {
          phaseNumber: 1,
          phaseName: 'Core Competency Consolidation',
          timeframe: 'Weeks 1–4',
          focusGoal: `Master industry-standard tooling and production testing around ${primarySkill}.`,
          keyTopics: ['Automated Testing (PyTest/Jest)', 'Docker Containerization', 'Git Branching & GitHub Actions'],
          recommendedResources: [
            {
              name: 'Industry Tooling & CI/CD Guide',
              type: 'Documentation',
              platformOrSource: 'GitHub Guides & Official Docs',
              description: 'Step-by-step best practices for automating builds and lint checks.',
            },
          ],
          weeklyMilestones: [
            'Week 1: Set up automated unit test suite on a core repository.',
            'Week 2: Containerize an application using multi-stage Docker build.',
            'Week 3: Configure CI pipeline that executes tests on every pull request.',
            'Week 4: Measure code coverage and document API specifications.',
          ],
        },
        {
          phaseNumber: 2,
          phaseName: 'Signature Portfolio Capstone',
          timeframe: 'Weeks 5–8',
          focusGoal: `Build an end-to-end project tailored directly to ${input.targetRole} requirements.`,
          keyTopics: ['Architecture Design', 'Database Optimization', 'Cloud Hosting & Telemetry'],
          recommendedResources: [
            {
              name: 'Designing Data-Intensive Applications',
              type: 'Book',
              platformOrSource: "O'Reilly Media",
              description: 'Comprehensive guide to reliable, scalable system architecture.',
            },
          ],
          weeklyMilestones: [
            'Week 5: Finalize architecture diagram and data schema.',
            'Week 6: Implement backend API and business logic.',
            'Week 7: Deploy live instance with health check telemetry.',
            'Week 8: Record a 2-minute walkthrough video and publish GitHub README.',
          ],
        },
        {
          phaseNumber: 3,
          phaseName: 'Interview Readiness & Narrative Polish',
          timeframe: 'Weeks 9–12',
          focusGoal: 'Convert technical capability into offer-generating interview performance.',
          keyTopics: ['Technical Whiteboarding', 'STAR Behavioral Framework', 'Target Company Deep Dives'],
          recommendedResources: [
            {
              name: 'Tech Interview Handbook',
              type: 'Repository',
              platformOrSource: 'yangshun.github.io/tech-interview-handbook',
              description: 'Curated curriculum for coding screening and behavioral mastery.',
            },
          ],
          weeklyMilestones: [
            'Week 9: Practice 10 role-specific technical problem sets.',
            'Week 10: Script 5 STAR behavioral stories based on course and lab projects.',
            'Week 11: Conduct 2 recorded mock interviews with timed feedback.',
            'Week 12: Submit applications to top 15 target roles in ' + input.targetIndustry + '.',
          ],
        },
      ],
      recommendedProjects: [
        {
          title: `${input.targetRole} Production Showcase Platform`,
          subtitle: `End-to-end cloud-native microservice highlighting ${primarySkill} and telemetry`,
          problemStatement: `Construct a robust system solving a real problem in ${input.targetIndustry}, incorporating automated CI/CD and observability.`,
          techStack: [primarySkill, 'Docker', 'PostgreSQL', 'GitHub Actions', 'FastAPI/Express'],
          estimatedWeeks: 4,
          expectedDeliverables: [
            'Fully containerized multi-tier web service',
            'Automated CI/CD pipeline with 85%+ test coverage',
            'Live interactive documentation with performance benchmark data',
          ],
          resumeBulletPoints: [
            `Architected and deployed full-lifecycle ${input.targetRole} platform using ${primarySkill} and Docker, achieving sub-100ms response times.`,
            'Configured automated CI/CD pipeline on GitHub Actions, cutting release deployment cycle from manual steps to under 4 minutes.',
          ],
          gapsAddressed: ['Production Deployment & Cloud Tooling', 'Automated Testing'],
        },
      ],
      certificationsOrCredentials: [
        {
          title: `Associate Cloud Developer / Solutions Certificate`,
          issuer: 'AWS / Google Cloud',
          valueProposition: `Validates cloud architectural competence to technical recruiters.`,
          urgency: 'Recommended Soon',
        },
      ],
    },
    interviewPrep: {
      customizedIntroScript: `\"I'm ${input.fullName}, currently completing my ${input.academicLevel} in ${input.major} at ${input.institution}. Throughout my academic career, I have dedicated myself to mastering ${topSkills.slice(0, 3).join(', ')} through hands-on project work and research.\n\nMost recently, I built ${input.keyProjectsOrCoursework.slice(0, 150)}, where I learned firsthand the importance of reliable architecture and rigorous testing. I'm targeting this ${input.targetRole} position at your company because of your team's standard of engineering excellence, and I'm eager to bring my strong technical foundation and curiosity to solve real user challenges from day one.\"`,
      technicalQuestions: [
        {
          id: 'tech-gen-1',
          topic: `Core Principles of ${primarySkill}`,
          difficulty: 'Intermediate',
          question: `In the context of ${primarySkill}, explain how you handle concurrency, resource management, and error handling in high-traffic applications.`,
          whyAsked: `Assesses fundamental operational knowledge of ${primarySkill} beyond toy scripts.`,
          idealAnswerBreakdown: {
            coreConcept: 'Proper thread/process allocation, asynchronous non-blocking I/O, and structured error boundaries.',
            keyTerminology: ['Async/Await', 'Event Loop', 'Connection Pooling', 'Graceful Degradation'],
            commonStudentPitfalls: 'Forgetting to close database connections or handling exceptions with bare try/except blocks.',
            sampleStrongAnswer: `I design services with non-blocking asynchronous patterns and explicit connection pools to prevent thread exhaustion. All edge-case exceptions are caught at service boundaries with structured error codes and logging.`,
          },
        },
        {
          id: 'tech-gen-2',
          topic: 'System Architecture & Database Indexing',
          difficulty: 'Intermediate',
          question: 'How do database indexes improve query performance, and what are the trade-offs on write throughput?',
          whyAsked: 'Tests understanding of backend data access layers and computational complexity.',
          idealAnswerBreakdown: {
            coreConcept: 'B-Tree or Hash indexes accelerate read lookups from O(N) to O(log N) but introduce overhead on inserts and updates as the index must be kept balanced.',
            keyTerminology: ['B-Tree Index', 'Time Complexity O(log N)', 'Write Amplification', 'Covering Index'],
            commonStudentPitfalls: 'Suggesting indexing every single column without acknowledging storage and write penalties.',
            sampleStrongAnswer: 'Indexes maintain balanced trees that allow logarithmically bounded searches. While they dramatically accelerate filtering and join operations, each INSERT or UPDATE requires updating the index structure, which adds write latency and disk overhead.',
          },
        },
      ],
      behavioralQuestions: [
        {
          id: 'beh-gen-1',
          competency: 'Handling Project Deadlines & Priorities',
          question: 'Describe a situation during your university projects where unexpected obstacles threatened a project deadline. How did you respond?',
          contextBridge: `Connect to ${input.keyProjectsOrCoursework.slice(0, 80)}`,
          starModelAnswer: {
            situation: `During our major course project at ${input.institution}, a critical dependency broke 48 hours before our submission deadline.`,
            task: 'I needed to triage the remaining features and ensure our core deliverable remained functional without sacrificing quality.',
            action: 'I organized a 15-minute emergency sync, prioritized the MVP user flows, and refactored the broken component into a resilient fallback.',
            result: 'We delivered the project on time with 100% test pass rate and received top marks for engineering adaptability.',
          },
          interviewerLooksFor: 'Calm triage, prioritization, and proactive communication under pressure.',
        },
      ],
      smartQuestionsForInterviewer: [
        {
          question: 'How does your engineering team manage the onboarding ramp for new grads or junior team members in their first 90 days?',
          context: 'Demonstrates foresight and commitment to integrating smoothly into team processes.',
        },
        {
          question: 'What does the code review and pull request feedback culture look like on a day-to-day basis?',
          context: 'Shows you care about mentorship, software craft, and team standards.',
        },
      ],
      interviewDayStrategyTips: [
        'Test your microphone, camera, and code environment 15 minutes prior to the call.',
        'Clarify requirements and edge cases before jumping into solution code.',
        'Speak your thought process aloud so the interviewer can guide your logic.',
        'Follow up within 24 hours with a thoughtful thank-you note referencing a specific discussion topic.',
      ],
    },
    formatConsistency: {
      brandConsistencyScore: 96,
      consistencyChecks: [
        {
          aspect: 'Core Competency Positioning',
          status: 'Aligned',
          explanation: `Consistent emphasis on ${topSkills.join(', ')} across all summary formats and interview scripts.`,
        },
        {
          aspect: 'Target Role Alignment',
          status: 'Aligned',
          explanation: `Narrative voice matches requirements for ${input.targetRole} in ${input.targetIndustry}.`,
        },
        {
          aspect: 'Actionable Remediation Mapping',
          status: 'Aligned',
          explanation: `Report gaps directly match the portfolio projects and phased 12-week roadmap.`,
        },
      ],
      crossFormatAlignmentNotes: 'Unified brand identity ensures the candidate presents a consistent, professional trajectory.',
    },
  };
}

function extractBasicResumeInfo(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const candidateName = lines[0] && lines[0].length < 40 ? lines[0] : 'Student Candidate';

  // Extract potential skills
  const commonSkills = [
    'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js',
    'SQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Git', 'AWS', 'PyTorch',
    'TensorFlow', 'Data Structures', 'Machine Learning', 'Figma', 'Tableau', 'Excel'
  ];
  const detectedSkills = commonSkills
    .filter((s) => new RegExp(`\\b${s}\\b`, 'i').test(text))
    .map((name) => ({
      name,
      category: 'technical' as const,
      level: 'Intermediate' as const,
    }));

  return {
    fullName: candidateName,
    institution: 'University',
    academicLevel: 'Undergraduate',
    major: 'Computer Science',
    minorOrSpecialization: '',
    graduationYear: '2026',
    gpa: '',
    skills: detectedSkills.length > 0 ? detectedSkills : [
      { name: 'Problem Solving', category: 'soft' as const, level: 'Intermediate' as const },
      { name: 'Git & Collaboration', category: 'tools' as const, level: 'Intermediate' as const },
    ],
    academicInterests: ['Applied Engineering', 'System Design'],
    keyProjectsOrCoursework: text.slice(0, 300),
    targetRole: 'Software Engineer',
    confidenceScore: 75,
  };
}

startServer();
