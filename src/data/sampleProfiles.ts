import { StudentProfileInput, GeneratedCareerDossier } from '../types/career';

export const SAMPLE_PROFILES: {
  id: string;
  label: string;
  badge: string;
  avatar: string;
  profile: StudentProfileInput;
}[] = [
  {
    id: 'elena-ml',
    label: 'Elena Vance — AI & Machine Learning Engineer',
    badge: 'CS Senior · UC Berkeley',
    avatar: '/src/assets/images/student_avatar_tech_1793897953690.jpg',
    profile: {
      fullName: 'Elena Vance',
      academicLevel: 'Undergraduate',
      institution: 'UC Berkeley',
      major: 'Computer Science',
      minorOrSpecialization: 'Data & Cognitive Science',
      graduationYear: '2027',
      gpa: '3.88',
      skills: [
        { name: 'Python', category: 'technical', level: 'Advanced' },
        { name: 'PyTorch', category: 'technical', level: 'Intermediate' },
        { name: 'Data Structures & Algorithms', category: 'technical', level: 'Advanced' },
        { name: 'SQL', category: 'technical', level: 'Intermediate' },
        { name: 'Docker', category: 'tools', level: 'Beginner' },
        { name: 'Git & GitHub', category: 'tools', level: 'Advanced' },
        { name: 'Statistical Modeling', category: 'domain', level: 'Intermediate' },
        { name: 'Technical Writing', category: 'soft', level: 'Intermediate' },
        { name: 'Cross-functional Collaboration', category: 'soft', level: 'Intermediate' },
      ],
      academicInterests: [
        'Large Language Model Alignment',
        'Efficient Inference & Quantization',
        'Distributed Machine Learning Systems',
        'Applied Computer Vision',
      ],
      keyProjectsOrCoursework:
        'CS189 Machine Learning course project: Built a multi-modal semantic image retriever using CLIP embeddings. Undergraduate Research Assistant at Berkeley AI Lab fine-tuning Llama models with LoRA for synthetic clinical notes reasoning.',
      targetRole: 'Machine Learning Engineer',
      targetIndustry: 'Artificial Intelligence / Cloud Infrastructure',
      targetCompanyType: 'High-growth Tech',
      targetTimeline: 'Upcoming New Grad Cycle (6-12 mos)',
      careerAspirationSummary:
        'Transitioning from academic ML experimentation into production-grade ML engineering, building reliable distributed model training pipelines and latency-optimized deployment architectures.',
      preferredTone: 'Technical & Rigorous',
    },
  },
  {
    id: 'marcus-quant',
    label: 'Marcus Chen — Quantitative Risk & Data Analyst',
    badge: 'Econ & Stats Junior · NYU',
    avatar: '/src/assets/images/student_avatar_analyst_1793897952669.jpg',
    profile: {
      fullName: 'Marcus Chen',
      academicLevel: 'Undergraduate',
      institution: 'New York University',
      major: 'Economics & Statistics',
      minorOrSpecialization: 'Financial Mathematics',
      graduationYear: '2027',
      gpa: '3.82',
      skills: [
        { name: 'Python (Pandas / NumPy / Scipy)', category: 'technical', level: 'Advanced' },
        { name: 'R', category: 'technical', level: 'Intermediate' },
        { name: 'SQL & Database Querying', category: 'technical', level: 'Intermediate' },
        { name: 'Econometric Modeling', category: 'domain', level: 'Advanced' },
        { name: 'Time Series Forecasting', category: 'domain', level: 'Intermediate' },
        { name: 'Tableau', category: 'tools', level: 'Intermediate' },
        { name: 'Excel / VBA Modeling', category: 'tools', level: 'Advanced' },
        { name: 'Stakeholder Presentations', category: 'soft', level: 'Intermediate' },
      ],
      academicInterests: [
        'Algorithmic Execution & Order Book Microstructure',
        'Portfolio Value-at-Risk (VaR) Simulations',
        'Bayesian Inference in Macroeconomics',
      ],
      keyProjectsOrCoursework:
        'Developed a Monte Carlo simulation in Python to stress-test high-yield credit portfolios under shifting Fed interest rate regimes. Capstone in Empirical Finance examining momentum factor degradation in volatile equity regimes.',
      targetRole: 'Quantitative Risk Analyst',
      targetIndustry: 'Fintech & Quantitative Trading',
      targetCompanyType: 'Global Enterprise / Fortune 500',
      targetTimeline: 'Summer Internship',
      careerAspirationSummary:
        'Leveraging empirical econometric modeling and statistical programming to evaluate systemic liquidity risks and automate risk mitigation algorithms in institutional capital markets.',
      preferredTone: 'Balanced & Professional',
    },
  },
  {
    id: 'amina-pm',
    label: 'Amina Patel — Associate Product Manager (APM)',
    badge: 'HCI Master\'s · Georgia Tech',
    avatar: '/src/assets/images/student_avatar_tech_1793897953690.jpg',
    profile: {
      fullName: 'Amina Patel',
      academicLevel: 'Master\'s Student',
      institution: 'Georgia Institute of Technology',
      major: 'Human-Computer Interaction',
      minorOrSpecialization: 'Product Design & Analytics',
      graduationYear: '2026',
      gpa: '3.91',
      skills: [
        { name: 'Product Discovery & Wireframing', category: 'domain', level: 'Advanced' },
        { name: 'Figma & Design Systems', category: 'tools', level: 'Advanced' },
        { name: 'User Research & Synthesis', category: 'domain', level: 'Advanced' },
        { name: 'SQL & Cohort Retention Analysis', category: 'technical', level: 'Intermediate' },
        { name: 'Agile & Scrum Sprints', category: 'soft', level: 'Intermediate' },
        { name: 'Executive Storytelling', category: 'soft', level: 'Advanced' },
        { name: 'Basic React & Next.js Prototyping', category: 'technical', level: 'Beginner' },
      ],
      academicInterests: [
        'B2B SaaS Onboarding Friction Reduction',
        'Data-Informed Experimentation & A/B Testing',
        'Ethical UX Architecture in AI Copilots',
      ],
      keyProjectsOrCoursework:
        'Led student cross-functional team of 4 engineers building a campus accessibility navigation app with 1,200 active student testers. Conducted 24 qualitative usability studies to pivot user onboarding flow.',
      targetRole: 'Associate Product Manager (APM)',
      targetIndustry: 'B2B Enterprise Software & Productivity',
      targetCompanyType: 'High-growth Tech',
      targetTimeline: 'Immediate (0-3 mos)',
      careerAspirationSummary:
        'Bridging human-centered user empathy with rigorous metrics-driven roadmap prioritization to ship scalable features that solve high-friction user problems.',
      preferredTone: 'Ambitious & Impact-Focused',
    },
  },
];

export const INITIAL_PRECOMPUTED_DOSSIER: GeneratedCareerDossier = {
  id: 'dossier-sample-elena',
  generatedAt: '2026-11-05T08:30:00Z',
  studentInput: SAMPLE_PROFILES[0].profile,
  brandAnchor: {
    positioningPillars: [
      'Empirical ML Rigor (UC Berkeley AI Lab research pedigree)',
      'Systems-Aware Model Engineering (Bridging PyTorch prototypes to latency-bounded deployments)',
      'Full-Lifecycle Ownership (Fine-tuning, evaluation telemetry, and edge-case benchmarking)',
    ],
    coreCompetencyKeywords: [
      'PyTorch',
      'Distributed Inference',
      'Model Alignment & LoRA',
      'CLIP / Multi-Modal Embeddings',
      'Python Profiling',
      'Dockerized Pipelines',
    ],
    signatureValueProposition:
      'Computer Science scholar combining academic depth in parameter-efficient fine-tuning with practical software engineering discipline to deploy high-throughput, low-latency machine learning solutions.',
    narrativeTone: 'Technically precise, humble yet authoritative, grounded in empirical evidence and measurable benchmarks.',
  },
  professionalSummary: {
    atsResumeSummary:
      'UC Berkeley Computer Science senior (3.88 GPA) with specialized research in multi-modal retrieval and parameter-efficient fine-tuning (LoRA) at the Berkeley AI Lab. Proficient in PyTorch, Python systems profiling, and distributed model architectures. Proven track record transitioning theoretical machine learning models into reproducible, low-latency microservices with automated evaluation benchmarks. Seeking a New Grad Machine Learning Engineer role to build scalable AI infrastructure.',
    atsKeywords: [
      'Machine Learning Engineer',
      'PyTorch',
      'Python',
      'LoRA',
      'Parameter-Efficient Fine-Tuning',
      'Multi-Modal Embeddings',
      'Docker',
      'Inference Optimization',
      'Model Evaluation',
      'Algorithms',
    ],
    linkedInAbout: {
      hook:
        'Training a 7B-parameter model is a computation problem; serving it within 45 milliseconds at 99.9% uptime is an engineering discipline.',
      narrative:
        'As a Computer Science senior at UC Berkeley and undergraduate researcher at the Berkeley AI Lab, I investigate the boundary where theoretical machine learning meets production scale.\n\nMy work centers on parameter-efficient adaptation (PEFT) and multi-modal representation learning. In my research, I developed LoRA fine-tuning pipelines for domain-specific LLM reasoning, cutting memory footprints by 65% while maintaining benchmark fidelity. In applied projects, I built real-time semantic retrieval systems utilizing CLIP embeddings and vector indexing.\n\nI care deeply about algorithmic rigor, reproducible evaluation metrics, and building the robust developer infrastructure that enables modern AI teams to move fast safely.',
      skillsHighlight: [
        'Core Frameworks: PyTorch, Hugging Face Transformers, NumPy, SciPy',
        'Systems & Deployment: Docker, Linux/Bash, Git, ONNX, FastAPI',
        'Specialties: PEFT/LoRA, Semantic Vector Search, CLIP Multi-Modal Retrieval',
      ],
      callToAction:
        'Graduating May 2027. Open to New Grad Machine Learning Engineer and AI Systems roles. Let\'s connect or discuss engineering at elena.vance@berkeley.edu.',
    },
    elevatorPitch30s:
      'Hi, I\'m Elena Vance, a Computer Science senior at UC Berkeley. I conduct research at the Berkeley AI Lab focusing on parameter-efficient fine-tuning and production inference. Recently, I built a multi-modal semantic retrieval engine that cut query latency down to under 50 milliseconds using optimized vector embeddings. I\'m looking for a New Grad Machine Learning Engineer position where I can bridge model development with high-scale infrastructure.',
    coverLetterHook: {
      openingSalutation: 'Dear Engineering Hiring Team,',
      hookParagraph:
        'When evaluating modern machine learning infrastructure, the bottleneck is rarely model depth—it is the engineering friction between experimental weights and resilient, low-latency production execution. As a UC Berkeley Computer Science student and researcher at the Berkeley AI Lab, I have dedicated my academic tenure to solving this exact operational gap.',
      academicBridgeParagraph:
        'Through my work fine-tuning open-weights models via LoRA, I engineered automated evaluation harness tools that measured perplexity shifts against synthetic reasoning benchmarks. Complementing this, my course projects in distributed systems taught me how memory bandwidth constraints and cache coherence directly govern GPU cluster utilization.',
      closingImpact:
        'I am excited by your team\'s commitment to high-throughput inference reliability, and I welcome the opportunity to discuss how my empirical mindset and systems discipline will contribute from day one.',
    },
  },
  skillGapReport: {
    overallReadinessScore: 78,
    targetRoleBenchmarks: {
      roleTitle: 'New Grad / Associate Machine Learning Engineer',
      typicalExpectations:
        'Expected to independently take validated model checkpoints, package them into containerized inference endpoints, implement streaming telemetry, and understand GPU cluster memory management and CI/CD pipelines.',
      keyHiringCriteria: [
        'Production Containerization & Orchestration (Docker, Kubernetes basics)',
        'Inference Serving Frameworks (vLLM, Triton, or ONNX Runtime)',
        'MLOps & Automated CI/CD Testing for Model Drift',
        'Relational & Vector Database Architecture (PostgreSQL + pgvector, Pinecone)',
        'Strong Algorithmic & Data Structure fundamentals in Python/C++',
      ],
    },
    competencyMatchBreakdown: {
      technicalSkillsPct: 85,
      practicalExperiencePct: 70,
      industryToolingPct: 62,
      communicationSoftSkillsPct: 90,
    },
    strengthsToHighlight: [
      {
        skill: 'PyTorch Model Fine-Tuning & Quantization Fundamentals',
        evidenceFromProfile: 'Undergraduate Research Assistant at Berkeley AI Lab fine-tuning Llama models with LoRA.',
        howToLeverage:
          'Emphasize deep understanding of gradient accumulation, attention mechanisms, and memory consumption rather than just using black-box libraries.',
      },
      {
        skill: 'Multi-Modal Representation Learning',
        evidenceFromProfile: 'Built multi-modal semantic image retriever using CLIP embeddings in CS189.',
        howToLeverage:
          'Demonstrate knowledge of cosine similarity search, embedding spaces, and vector quantization trade-offs.',
      },
      {
        skill: 'Algorithmic Rigor & Clean Code',
        evidenceFromProfile: 'CS senior with 3.88 GPA and Advanced Data Structures mastery.',
        howToLeverage:
          'Confidently tackle LeetCode Medium/Hard algorithmic screening rounds focusing on computational complexity.',
      },
    ],
    criticalGaps: [
      {
        skill: 'Production Inference Engines (vLLM / Triton / TensorRT-LLM)',
        category: 'tools',
        importance: 'Critical',
        marketDemandContext:
          'Industry teams do not deploy raw torch.eval() loops due to slow serial throughput. Hiring managers test knowledge of continuous batching and KV caching.',
        currentStudentStatus: 'Missing',
        remedyAction:
          'Benchmark a model using vLLM vs native PyTorch, observing tokens/sec and memory allocation under concurrent requests.',
      },
      {
        skill: 'Containerized Deployment & Cloud Orchestration (Docker / Kubernetes)',
        category: 'tools',
        importance: 'Critical',
        marketDemandContext:
          '95% of job postings require containerizing ML services and deploying behind an API gateway with health probes.',
        currentStudentStatus: 'Emerging',
        remedyAction:
          'Wrap a fine-tuned model into a multi-stage Docker container with FastAPI, optimizing image size under 2GB.',
      },
    ],
    secondaryGaps: [
      {
        skill: 'MLOps Pipeline Monitoring & Drift Detection (Prometheus / Evidently / MLflow)',
        category: 'domain',
        importance: 'Important',
        marketDemandContext:
          'Teams need engineers who instrument data drift and latency SLAs, not just train-and-forget prototypes.',
        currentStudentStatus: 'Missing',
        remedyAction:
          'Integrate MLflow tracking or custom Prometheus latency histograms into your next project repository.',
      },
      {
        skill: 'C++ / CUDA Kernel Basics',
        category: 'technical',
        importance: 'Nice-to-have',
        marketDemandContext:
          'Helpful for high-performance infra roles, though less strictly tested in entry-level ML software positions.',
        currentStudentStatus: 'Emerging',
        remedyAction:
          'Read Triton or write a simple custom PyTorch C++ extension to demonstrate hardware-level curiosity.',
      },
    ],
    strategicBridgeAdvise:
      'Your academic pedigree and PyTorch intuition are top-tier. To turn interviews into offers, your portfolio must prove you know what happens AFTER the model is trained: containerization, batching latency, and API contracts. Frame your lab research as an engineering pipeline rather than purely an exploratory paper.',
  },
  learningRecommendations: {
    weeklyTimeCommitmentHours: 10,
    learningPhases: [
      {
        phaseNumber: 1,
        phaseName: 'Foundation & Production Packaging',
        timeframe: 'Weeks 1–4',
        focusGoal:
          'Close the containerization and API engineering gap by mastering Docker, FastAPI, and inference caching.',
        keyTopics: [
          'Multi-stage Docker builds for PyTorch & CUDA runtimes',
          'FastAPI async request queues and streaming responses',
          'vLLM architecture: PagedAttention, Continuous Batching, and KV Cache dynamics',
          'Locust load testing to determine maximum concurrent queries before latency SLA breach',
        ],
        recommendedResources: [
          {
            name: 'vLLM Official Documentation & Architecture Deep Dive',
            type: 'Documentation',
            platformOrSource: 'vllm.ai',
            description: 'Core reading on continuous batching and memory management.',
          },
          {
            name: 'Full Stack Deep Learning: Deployment & LLMOps',
            type: 'Course',
            platformOrSource: 'fullstackdeeplearning.com (Free)',
            description: 'Industry-standard free curriculum on model packaging and telemetry.',
          },
        ],
        weeklyMilestones: [
          'Week 1: Write a Dockerfile packaging a quantized Hugging Face model under 2.5GB.',
          'Week 2: Build a FastAPI service with Server-Sent Events (SSE) streaming token output.',
          'Week 3: Benchmark latency and throughput across batch sizes of 1, 8, 32.',
          'Week 4: Set up automated GitHub Actions workflow to run unit tests and build Docker images.',
        ],
      },
      {
        phaseNumber: 2,
        phaseName: 'Signature Portfolio Capstone',
        timeframe: 'Weeks 5–8',
        focusGoal:
          'Construct an end-to-end, live-hosted ML microservice showcasing both domain intelligence and systems resilience.',
        keyTopics: [
          'Vector DB indexing and HNSW graph traversal',
          'Distributed worker queues (Celery / Redis)',
          'Monitoring endpoint health and token latency percentiles (p50, p95, p99)',
        ],
        recommendedResources: [
          {
            name: 'Chip Huyen: Designing Machine Learning Systems',
            type: 'Book',
            platformOrSource: 'O\'Reilly Publishing',
            description: 'The definitive text on end-to-end production ML design patterns.',
          },
          {
            name: 'pgvector & Qdrant GitHub Reference Implementations',
            type: 'Repository',
            platformOrSource: 'GitHub Open Source',
            description: 'Production patterns for hybrid keyword and dense vector retrieval.',
          },
        ],
        weeklyMilestones: [
          'Week 5: Architect system design diagram and write technical specification document.',
          'Week 6: Implement indexing pipeline with chunking and embedding generation.',
          'Week 7: Build inference service with Prometheus telemetry and caching.',
          'Week 8: Deploy on Cloud Run or AWS ECS with public demo and comprehensive README.',
        ],
      },
      {
        phaseNumber: 3,
        phaseName: 'Technical & System Design Interview Readiness',
        timeframe: 'Weeks 9–12',
        focusGoal:
          'Sharpen algorithmic coding speed and master ML System Design frameworks for top tech screening.',
        keyTopics: [
          'ML System Design: Video Recommendation, Search Ranking, Real-time Fraud Detection',
          'Attention mechanism derivation and FLOPs arithmetic for transformer training',
          'Behavioral storytelling using the STAR framework mapped to Berkeley AI lab challenges',
        ],
        recommendedResources: [
          {
            name: 'ML System Design Interview Guide by Khang Pham',
            type: 'Documentation',
            platformOrSource: 'GitHub / Substack',
            description: 'Clear templates for 45-minute architectural interview discussions.',
          },
        ],
        weeklyMilestones: [
          'Week 9: Practice 5 core ML system design scenarios on a digital whiteboard.',
          'Week 10: Complete 15 LeetCode Medium problems covering graphs, DP, and heaps.',
          'Week 11: Conduct 2 peer mock interviews focusing on STAR behavioral answers.',
          'Week 12: Polish resume bullet points and submit initial wave of 20 targeted applications.',
        ],
      },
    ],
    recommendedProjects: [
      {
        title: 'SpecInfer: High-Throughput Speculative Decoding Proxy',
        subtitle: 'Production microservice demonstrating 2.4x latency acceleration for LLM inference',
        problemStatement:
          'Standard autoregressive decoding is memory-bandwidth bounded. This service implements a speculative decoding proxy where a lightweight draft model predicts candidate tokens validated in parallel by a larger target model.',
        techStack: ['PyTorch', 'FastAPI', 'Docker', 'Redis', 'Prometheus', 'Locust'],
        estimatedWeeks: 4,
        expectedDeliverables: [
          'Production-ready Docker container with health probes and GPU memory limits',
          'Benchmark dashboard comparing baseline vLLM against speculative decoding under heavy concurrency',
          'Interactive Swagger / OpenAPI docs with SSE streaming responses',
        ],
        resumeBulletPoints: [
          'Engineered speculative decoding inference proxy in PyTorch & FastAPI, boosting generation throughput by 2.4x while maintaining token equivalence.',
          'Architected Redis request buffer and continuous batching scheduler, reducing p99 latency by 38% under 200 concurrent client streams.',
          'Containerized deployment using multi-stage Docker build (1.8GB) and automated CI pipeline with 94% test coverage.',
        ],
        gapsAddressed: [
          'Production Inference Engines (vLLM / Triton)',
          'Containerized Deployment (Docker)',
          'MLOps Telemetry (Prometheus)',
        ],
      },
      {
        title: 'DocuSync: Hybrid Semantic Search & Grounding Engine',
        subtitle: 'Enterprise RAG pipeline with reciprocal rank fusion and hallucination guardrails',
        problemStatement:
          'Naive vector search misses exact keyword identifiers (part numbers, code snippets). Built a hybrid retrieval engine combining BM25 keyword matching with dense CLIP/BGE embeddings.',
        techStack: ['Python', 'pgvector / PostgreSQL', 'Hugging Face', 'Docker', 'FastAPI'],
        estimatedWeeks: 3,
        expectedDeliverables: [
          'Hybrid indexing pipeline supporting PDF/Markdown ingestion',
          'Reciprocal Rank Fusion (RRF) reranking module with evaluation metrics (NDCG@10)',
        ],
        resumeBulletPoints: [
          'Designed hybrid RAG retrieval pipeline combining dense vector embeddings with BM25 sparse search in PostgreSQL/pgvector, improving NDCG@10 by 19%.',
          'Implemented self-reflective verification filter that flags low-confidence assertions, lowering hallucination rate by 42% on technical benchmarks.',
        ],
        gapsAddressed: [
          'Vector Database Architecture',
          'Evaluation Telemetry',
          'Production API Design',
        ],
      },
    ],
    certificationsOrCredentials: [
      {
        title: 'AWS Certified Machine Learning - Specialty (or GCP Professional ML Engineer)',
        issuer: 'Amazon Web Services / Google Cloud',
        valueProposition:
          'Signals verified competence in cloud deployment, SageMaker/Vertex endpoints, and VPC security.',
        urgency: 'Recommended Soon',
      },
      {
        title: 'DeepLearning.AI: MLOps Specialization',
        issuer: 'Coursera / DeepLearning.AI',
        valueProposition: 'Industry-recognized credential proving knowledge of data pipelines and model lifecycle management.',
        urgency: 'Recommended Soon',
      },
    ],
  },
  interviewPrep: {
    customizedIntroScript:
      '\"I\'m Elena Vance, a senior in Computer Science at UC Berkeley. My academic journey has been driven by a fascination with bridging theoretical machine learning models and high-throughput production infrastructure.\n\nOver the past year as an undergraduate researcher at the Berkeley AI Lab, I focused on parameter-efficient fine-tuning with LoRA, discovering how to adapt 7B-parameter models for specialized reasoning while slashing memory overhead by 65%. In my systems coursework and independent engineering, I\'ve concentrated on the operational side—building containerized inference microservices and benchmarking speculative decoding to maximize tokens per second.\n\nWhat excites me most about this role is your team\'s scale. I want to bring my foundation in mathematical modeling and systems discipline to build resilient, low-latency AI services that serve millions of users reliable intelligence every day.\"',
    technicalQuestions: [
      {
        id: 'tech-1',
        topic: 'Attention & KV Caching Mechanics',
        difficulty: 'Intermediate',
        question:
          'Explain why the Key-Value (KV) cache is necessary during autoregressive Transformer inference, and describe how PagedAttention solves KV cache memory fragmentation.',
        whyAsked:
          'Evaluates whether the candidate understands the fundamental hardware bottleneck (memory bandwidth vs compute) during generation, which is central to modern LLM engineering.',
        idealAnswerBreakdown: {
          coreConcept:
            'Autoregressive generation calculates attention across all preceding tokens at each step. Without caching, prior keys and values are redundantly recomputed with O(N^2) complexity.',
          keyTerminology: [
            'Autoregressive Decoding',
            'KV Cache',
            'Memory Bandwidth Bounded',
            'PagedAttention / Virtual Memory',
            'Continuous Batching',
          ],
          commonStudentPitfalls:
            'Focusing purely on the matrix multiplication equation without explaining that generation is memory bandwidth limited, or not knowing why static allocation leads to 60%+ wasted GPU VRAM.',
          sampleStrongAnswer:
            'In autoregressive decoding, each newly generated token requires attending to all prior tokens. To avoid recalculating past token key and value projections at each step, we cache them in VRAM. However, because generation length is unpredictable, traditional systems pre-allocate contiguous chunks of memory for the maximum possible sequence length, wasting up to 60-80% of VRAM in internal and external fragmentation. PagedAttention, introduced by vLLM, borrows the virtual memory paging concept from operating systems: it divides the KV cache into fixed-size physical blocks and maps non-contiguous GPU blocks to logical token sequences, enabling near-zero memory waste and unlocking much larger continuous batch sizes.',
        },
      },
      {
        id: 'tech-2',
        topic: 'Parameter-Efficient Fine-Tuning (PEFT / LoRA)',
        difficulty: 'Advanced',
        question:
          'Mathematically and architecturally, how does Low-Rank Adaptation (LoRA) reduce trainable parameters while preserving full-rank representational capacity? When would you choose rank r=8 vs r=64?',
        whyAsked:
          'Tests deep theoretical grasp of linear algebra applied to neural network optimization and practical fine-tuning trade-offs.',
        idealAnswerBreakdown: {
          coreConcept:
            'Weight matrix update ΔW of size d×k is factorized into two low-rank matrices B (d×r) and A (r×k), where r << min(d,k). The original weights remain frozen.',
          keyTerminology: ['Intrinsic Rank', 'Matrix Decomposition', 'Rank r & Scaling α', 'VRAM Gradient Savings'],
          commonStudentPitfalls:
            'Saying LoRA compresses the original model weights, rather than adding a parallel low-rank bypass adapter that is merged post-training.',
          sampleStrongAnswer:
            'LoRA hypothesizes that the weight updates during task-specific adaptation have a low intrinsic dimension. Instead of updating the full frozen weight matrix W0 of dimension d×k, LoRA represents the update as ΔW = B × A, where A is initialized with Gaussian noise and B with zeros. With r=8 and hidden dimension 4096, trainable parameters drop by over 99%. In practice, r=8 or r=16 is optimal for style adaptation, classification, or narrow domain formatting without overfitting. I would choose a higher rank like r=64 when teaching the model net-new factual reasoning domains or complex multi-step algorithmic tasks where the intrinsic dimensionality of the target distribution is substantively broader.',
        },
      },
      {
        id: 'tech-3',
        topic: 'Inference Latency & Profiling',
        difficulty: 'Intermediate',
        question:
          'If your deployed PyTorch API has an acceptable p50 latency of 30ms but a p99 latency of 450ms under peak load, how would you systematically diagnose and resolve the issue?',
        whyAsked:
          'Assesses production troubleshooting intuition and full-stack systems acumen beyond clean Jupyter notebooks.',
        idealAnswerBreakdown: {
          coreConcept:
            'p99 tail latency spikes usually stem from resource contention, GPU memory page faults, garbage collection, unbatched queue buildup, or cold starts.',
          keyTerminology: ['Tail Latency (p99)', 'PyTorch Profiler / cProfile', 'Queue Congestion', 'CUDA Synchronization', 'Lock Contention'],
          commonStudentPitfalls:
            'Recommending training a smaller model without first checking software bottlenecks, thread locks, or HTTP server configuration.',
          sampleStrongAnswer:
            'I would approach this in three layers: First, network and server queueing: check whether the ASGI/FastAPI event loop is blocked by synchronous CPU operations or if workers are maxed out, causing requests to queue before reaching CUDA. Second, GPU execution: use PyTorch Profiler or NVIDIA Nsight Systems to check for implicit CPU-GPU synchronizations (like tensor.item() or print statements inside the forward pass) which flush the CUDA queue. Third, memory and allocation: check for dynamic memory allocations triggering PyTorch caching allocator spikes. To resolve it, I would enforce asynchronous request batching, pin CUDA memory, and isolate preprocessing onto dedicated CPU threads.',
        },
      },
    ],
    behavioralQuestions: [
      {
        id: 'beh-1',
        competency: 'Overcoming Ambiguity & Technical Roadblocks',
        question:
          'Tell me about a time in your academic or lab projects when an experiment repeatedly failed or produced unexpected results. How did you diagnose the root cause?',
        contextBridge:
          'Map this directly to your Berkeley AI Lab LoRA experiments where fine-tuned models may have suffered from catastrophic forgetting or evaluation score stagnation.',
        starModelAnswer: {
          situation:
            'While fine-tuning a 7B parameter open-weights model for clinical notes reasoning at the Berkeley AI Lab, our adapted model began hallucinating medical entities after the third epoch, dropping benchmark accuracy by 22%.',
          task:
            'I needed to identify whether the degradation was caused by learning rate instability, dataset noise, or catastrophic representation forgetting before our conference submission deadline.',
          action:
            'Instead of blindly modifying hyper-parameters, I wrote an automated slice evaluation script that inspected loss curves per token type. I discovered that clinical shorthand and acronyms were being suboptimally tokenized into rare subwords. I adjusted the LoRA alpha scaling factor, introduced a 15% replay buffer of general domain dialogue, and normalized the token distribution.',
          result:
            'The adjusted training stabilized within 40 minutes of compute. The final model recovered baseline general capabilities while achieving an 18% improvement on domain-specific diagnostic extraction.',
        },
        interviewerLooksFor:
          'Systematic debugging methodology, perseverance under deadline pressure, and data-driven hypothesis testing.',
      },
      {
        id: 'beh-2',
        competency: 'Cross-Functional Collaboration & Technical Communication',
        question:
          'Describe a situation where you had to explain a complex machine learning concept or technical trade-off to non-technical teammates or stakeholders.',
        contextBridge:
          'Leverage your multi-modal CLIP search project where you had to justify why an embedding retrieval system was superior to traditional keyword search for product end-users.',
        starModelAnswer: {
          situation:
            'In my CS189 multi-modal project, our group included peers from business and design who wanted to rely solely on Elasticsearch keyword matching because they understood it easily.',
          task:
            'I needed to demonstrate why semantic vector search was necessary for image queries with zero keyword tags, while remaining transparent about compute costs and latency implications.',
          action:
            'I created a 2-minute visual interactive demo side-by-side: querying "vintage summer aesthetic" returned zero results in keyword search, but returned 15 relevant photos via CLIP embeddings. I used a 2D spatial analogy (cities on a map) to explain cosine distance without overwhelming them with linear algebra, and showed how hybrid caching would keep server costs within our student budget.',
          result:
            'The team enthusiastically approved the hybrid architecture. We completed the project 4 days ahead of schedule and received the highest distinction in our project showcase.',
        },
        interviewerLooksFor:
          'Empathy for different skill sets, clear conceptual analogies, and focusing on user value rather than intellectual vanity.',
      },
    ],
    smartQuestionsForInterviewer: [
      {
        question:
          'How does your team currently balance rapid experimentation with production deployment reliability? What does your automated model evaluation harness look like before a new checkpoint is deployed?',
        context:
          'Shows you care about the entire lifecycle and understand that production is about CI/CD and safety, not just training scripts.',
      },
      {
        question:
          'What is the typical ratio of time your machine learning engineers spend on data engineering and infrastructure versus model architecture exploration?',
        context:
          'Signals maturity and realistic expectations about day-to-day ML engineering responsibilities.',
      },
      {
        question:
          'What is one technical challenge around latency, memory, or throughput that your team encountered recently that surprised you?',
        context:
          'Invites the interviewer to share a real war story and gives you a chance to demonstrate active technical listening.',
      },
    ],
    interviewDayStrategyTips: [
      'Warm up with 1 easy string/array problem before the interview to get your typing rhythm going.',
      'Always state your Big-O time and space complexity BEFORE writing code, not just after.',
      'When asked about machine learning models, always trace the flow of tensors: shapes, batch dimensions, and hardware execution.',
      'If you get stuck, explain your mental model out loud—interviewers evaluate how you think through ambiguity far more than instant rote answers.',
    ],
  },
  formatConsistency: {
    brandConsistencyScore: 98,
    consistencyChecks: [
      {
        aspect: 'Technical Pillar Alignment',
        status: 'Aligned',
        explanation:
          'All formats (Resume summary, LinkedIn, Interview script, and Recommended projects) emphasize parameter-efficient fine-tuning (LoRA), distributed inference, and PyTorch systems optimization.',
      },
      {
        aspect: 'Tone & Voice Synchronicity',
        status: 'Aligned',
        explanation:
          'Consistent rigorous, research-grounded yet engineering-oriented tone maintained across ATS resume bullet points, personal branding, and STAR behavioral answers.',
      },
      {
        aspect: 'Academic-to-Industry Narrative Arc',
        status: 'Aligned',
        explanation:
          'Both the Cover Letter hook and the 30s Elevator Pitch logically bridge Berkeley AI Lab research to scalable cloud infrastructure goals.',
      },
      {
        aspect: 'Skill Gap Remediation Continuity',
        status: 'Aligned',
        explanation:
          'The gaps identified in the report (Docker, vLLM, MLOps telemetry) directly map 1:1 to the Recommended Projects and Phase 1-3 Learning Roadmap.',
      },
    ],
    crossFormatAlignmentNotes:
      'The generated persona maintains a unified career identity. A recruiter reading the resume, checking LinkedIn, or interviewing the candidate will experience an uninterrupted, authentic, and cohesive narrative.',
  },
};
