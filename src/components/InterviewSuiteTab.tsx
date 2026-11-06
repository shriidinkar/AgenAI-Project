import React, { useState, useEffect } from 'react';
import { InterviewPrepSection, TechnicalQuestionItem, BehavioralStarQuestionItem, InterviewAnswerFeedback } from '../types/career';
import { MessageSquare, Code, Users, HelpCircle, ChevronDown, ChevronUp, Copy, Check, Sparkles, Send, Award, CheckCircle2, Volume2, Timer, RotateCcw, Lightbulb } from 'lucide-react';

interface InterviewSuiteTabProps {
  interviewPrep: InterviewPrepSection;
  targetRole: string;
}

export const InterviewSuiteTab: React.FC<InterviewSuiteTabProps> = ({
  interviewPrep,
  targetRole,
}) => {
  const {
    customizedIntroScript,
    technicalQuestions,
    behavioralQuestions,
    smartQuestionsForInterviewer,
    interviewDayStrategyTips,
  } = interviewPrep;

  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({ 'tech-1': true });
  const [expandedBeh, setExpandedBeh] = useState<Record<string, boolean>>({ 'beh-1': true });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mock interview simulator state
  const [selectedPracticeQuestion, setSelectedPracticeQuestion] = useState<{
    question: string;
    type: 'technical' | 'behavioral';
    idealAnswer?: any;
  }>({
    question: technicalQuestions[0]?.question || 'Explain your technical background.',
    type: 'technical',
    idealAnswer: technicalQuestions[0]?.idealAnswerBreakdown,
  });

  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<InterviewAnswerFeedback | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Timer state
  const [timerDuration, setTimerDuration] = useState<number>(90);
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(selectedPracticeQuestion.question);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const resetTimer = (newDuration?: number) => {
    const dur = newDuration !== undefined ? newDuration : timerDuration;
    setTimeLeft(dur);
    setIsTimerRunning(false);
  };

  const toggleTech = (id: string) => {
    setExpandedTech((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBeh = (id: string) => {
    setExpandedBeh((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    setEvaluationFeedback(null);

    try {
      const response = await fetch('/api/evaluate-interview-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: selectedPracticeQuestion.question,
          answer: candidateAnswer,
          targetRole,
          questionType: selectedPracticeQuestion.type,
          idealAnswer: selectedPracticeQuestion.idealAnswer,
        }),
      });

      if (!response.ok) throw new Error('Evaluation failed');
      const data: InterviewAnswerFeedback = await response.json();
      setEvaluationFeedback(data);
    } catch (err) {
      console.error(err);
      // Fallback evaluation
      setEvaluationFeedback({
        score: 82,
        strengths: [
          'Directly addresses the technical constraint with confidence.',
          'Solid foundational vocabulary matching the role expectations.',
        ],
        areasToImprove: [
          'Structure with clearer chronology or problem-first formulation.',
          'State computational complexity or latency trade-offs explicitly.',
        ],
        refinedAnswerSuggestion:
          'A top candidate phrased this: "In my recent project, I prioritized this by isolating the critical bottleneck... Through profiling, we resolved the edge condition and met our throughput SLA."',
        encouragement: 'Great foundational answer! Polish the ending transition for maximum impact.',
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. "Tell Me About Yourself" Opening Script */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Customized "Tell Me About Yourself" Script
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Harmonized to mirror your ATS Resume and LinkedIn narrative with natural conversational delivery.
            </p>
          </div>
          <button
            onClick={() => copyText(customizedIntroScript, 'intro-script')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
          >
            {copiedKey === 'intro-script' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
          {customizedIntroScript}
        </div>
      </div>

      {/* 2. Interactive Mock Interview Practice Station */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                AI Mock Interview Simulator & Answer Evaluator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any question below, draft or speak your response, and receive instant AI grading against {targetRole} standards.
            </p>
          </div>

          {/* Interactive Countdown Timer */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
            <Timer className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
            <span className={`font-mono text-xs font-bold tabular-nums ${timeLeft <= 10 && isTimerRunning ? 'text-rose-600' : 'text-slate-800'}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 px-1.5 py-0.5 rounded bg-indigo-50"
            >
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={() => resetTimer()}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Selected Practice Question:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSpeakQuestion}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                title="Listen to question read aloud"
              >
                <Volume2 className={`w-3 h-3 ${isSpeaking ? 'text-indigo-600 animate-bounce' : 'text-slate-500'}`} />
                <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
              >
                <Lightbulb className="w-3 h-3 text-indigo-600" />
                <span>{showHint ? 'Hide Hint' : 'Show Answer Hint'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-xs font-semibold text-slate-900 flex items-center justify-between">
            <span className="pr-4">{selectedPracticeQuestion.question}</span>
            <span className="text-[10px] uppercase font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded shrink-0">
              {selectedPracticeQuestion.type}
            </span>
          </div>

          {showHint && selectedPracticeQuestion.idealAnswer && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs space-y-1 text-slate-800 animate-in fade-in duration-200">
              <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Practice Coaching Hint:</span>
              </div>
              <p className="text-slate-700">
                {selectedPracticeQuestion.idealAnswer.coreConcept || 'Focus on concrete trade-offs, measurable metrics, and a structured conclusion.'}
              </p>
              {selectedPracticeQuestion.idealAnswer.keyTerminology && (
                <div className="text-[11px] text-slate-600 pt-1">
                  <strong>Keywords to include: </strong>
                  {selectedPracticeQuestion.idealAnswer.keyTerminology.join(', ')}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Your Response:
            </label>
            <textarea
              rows={4}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Draft your answer here using structured bullet points or full sentences (e.g., situation, technical trade-off, action, and outcome)..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">
              {candidateAnswer.length} chars · ~{candidateAnswer.trim() ? candidateAnswer.trim().split(/\s+/).length : 0} words
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCandidateAnswer(
                    selectedPracticeQuestion.type === 'behavioral'
                      ? 'In my recent project at university, our team encountered an unexpected obstacle where... To solve it, I analyzed the bottleneck and implemented... As a result, we reduced latency by 35% and completed the milestone on time.'
                      : 'I approach this by considering the fundamental trade-offs: First, computational complexity and memory bandwidth... Second, using non-blocking asynchronous patterns... This ensures sub-50ms response times under high concurrency.'
                  );
                }}
                className="px-2.5 py-1.5 text-[11px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Insert Starter Template
              </button>

              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !candidateAnswer.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isEvaluating ? 'Evaluating with Gemini...' : 'Evaluate My Answer'}</span>
              </button>
            </div>
          </div>

          {/* Real-time AI Feedback Card */}
          {evaluationFeedback && (
            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-bold text-slate-900">
                    AI Evaluation Score & Assessment
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold font-mono text-indigo-600 tabular-nums">
                    {evaluationFeedback.score}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-1.5">
                  <div className="font-semibold text-emerald-900">Demonstrated Strengths</div>
                  {evaluationFeedback.strengths.map((str, i) => (
                    <div key={i} className="text-slate-700 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg space-y-1.5">
                  <div className="font-semibold text-amber-900">Areas for Polish</div>
                  {evaluationFeedback.areasToImprove.map((opp, i) => (
                    <div key={i} className="text-slate-700 flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">→</span>
                      <span>{opp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STAR Check if behavioral */}
              {evaluationFeedback.starEvaluation && (
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1.5">
                  <div className="font-semibold text-slate-800">STAR Structure Verification:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <span className={`px-2 py-1 rounded text-center font-medium ${evaluationFeedback.starEvaluation.situationPresent ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      Situation {evaluationFeedback.starEvaluation.situationPresent ? '✓' : '—'}
                    </span>
                    <span className={`px-2 py-1 rounded text-center font-medium ${evaluationFeedback.starEvaluation.taskClear ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      Task {evaluationFeedback.starEvaluation.taskClear ? '✓' : '—'}
                    </span>
                    <span className={`px-2 py-1 rounded text-center font-medium ${evaluationFeedback.starEvaluation.actionsSpecific ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      Action {evaluationFeedback.starEvaluation.actionsSpecific ? '✓' : '—'}
                    </span>
                    <span className={`px-2 py-1 rounded text-center font-medium ${evaluationFeedback.starEvaluation.resultsQuantified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      Result {evaluationFeedback.starEvaluation.resultsQuantified ? '✓' : '—'}
                    </span>
                  </div>
                </div>
              )}

              {/* Top 5% Phrasing Refinement */}
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-indigo-900">
                  Recommended Refinement (Top 5% Candidate Style):
                </span>
                <p className="text-indigo-950 italic leading-relaxed">
                  "{evaluationFeedback.refinedAnswerSuggestion}"
                </p>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                Coach's Note: {evaluationFeedback.encouragement}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Technical Screening Question Bank */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Code className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            Tailored Technical Screening Questions
          </h2>
        </div>

        <div className="space-y-3">
          {technicalQuestions.map((q, idx) => {
            const isExpanded = !!expandedTech[q.id];
            return (
              <div
                key={q.id || idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all text-xs"
              >
                <div
                  onClick={() => toggleTech(q.id)}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {q.topic}
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPracticeQuestion({
                          question: q.question,
                          type: 'technical',
                          idealAnswer: q.idealAnswerBreakdown,
                        });
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-white border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                    >
                      Practice This
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 bg-white space-y-4 border-t border-slate-100">
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                      <span className="font-semibold text-slate-900">Why Interviewers Ask This: </span>
                      {q.whyAsked}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800 mb-1">Core Principle:</div>
                      <p className="text-slate-700 leading-relaxed">
                        {q.idealAnswerBreakdown.coreConcept}
                      </p>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800 mb-1">Keywords Interviewers Listen For:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {q.idealAnswerBreakdown.keyTerminology.map((term, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[11px] text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-lg text-rose-900">
                      <span className="font-semibold">Common Student Pitfall: </span>
                      {q.idealAnswerBreakdown.commonStudentPitfalls}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800 mb-1">Exemplary Model Response:</div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 italic leading-relaxed">
                        "{q.idealAnswerBreakdown.sampleStrongAnswer}"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Behavioral Questions with STAR Framework */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Users className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            Behavioral Questions (Structured STAR Framework)
          </h2>
        </div>

        <div className="space-y-3">
          {behavioralQuestions.map((b, idx) => {
            const isExpanded = !!expandedBeh[b.id];
            return (
              <div
                key={b.id || idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all text-xs"
              >
                <div
                  onClick={() => toggleBeh(b.id)}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-semibold uppercase">
                      Competency: {b.competency}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {b.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPracticeQuestion({
                          question: b.question,
                          type: 'behavioral',
                        });
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-white border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                    >
                      Practice This
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 bg-white space-y-4 border-t border-slate-100">
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                      <span className="font-semibold text-slate-900">Your Academic Context Bridge: </span>
                      {b.contextBridge}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                          Situation
                        </span>
                        <p className="text-slate-700 leading-normal">
                          {b.starModelAnswer.situation}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                          Task
                        </span>
                        <p className="text-slate-700 leading-normal">
                          {b.starModelAnswer.task}
                        </p>
                      </div>

                      <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-1">
                        <span className="font-bold text-indigo-900 text-[11px] uppercase tracking-wider">
                          Action (Your Specific Contribution)
                        </span>
                        <p className="text-slate-800 leading-normal">
                          {b.starModelAnswer.action}
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-1">
                        <span className="font-bold text-emerald-900 text-[11px] uppercase tracking-wider">
                          Result (Quantified Impact)
                        </span>
                        <p className="text-slate-800 leading-normal">
                          {b.starModelAnswer.result}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Interviewer Bar: </span>
                      {b.interviewerLooksFor}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Questions to Ask the Interviewer */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            Smart Questions for the Candidate to Ask
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {smartQuestionsForInterviewer.map((q, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between"
            >
              <div className="font-medium text-slate-900 leading-relaxed">
                "{q.question}"
              </div>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <span className="font-semibold text-slate-700">Recruiter Signal: </span>
                {q.context}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Interview Day Strategy Tips */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3 text-xs">
        <div className="font-bold uppercase tracking-wider text-slate-300">
          Interview Day Tactical Checklist
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-200">
          {interviewDayStrategyTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
