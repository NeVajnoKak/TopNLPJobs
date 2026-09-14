export type Platform = {
  name: string;
  focus: string;
  highlight: string;
  location: string;
  note: string;
  href: string;
  accent: string;
};

export type Job = {
  platform: string;
  company: string;
  role: string;
  location: string;
  compensation?: string;
  strengths: string[];
  href: string;
};

export const platforms: Platform[] = [
  {
    name: "LinkedIn",
    focus: "Professional network + broad technical hiring",
    highlight: "Senior NLP Engineer — Zest for Tech",
    location: "New York / Remote",
    note: "$150k–$260k base range shown in the posting",
    href: "https://www.linkedin.com/jobs/view/natural-language-processing-engineer-at-zest-for-tech-4461717676",
    accent: "#0A66C2",
  },
  {
    name: "Indeed",
    focus: "High-volume search across employers and staffing firms",
    highlight: "Applied Scientist — NLP / Deep Learning — Solventum",
    location: "Pennsylvania",
    note: "Clinical text, transformers, PyTorch, model evaluation",
    href: "https://www.indeed.com/",
    accent: "#2557A7",
  },
  {
    name: "Handshake",
    focus: "Student, campus, early-career and flexible AI work",
    highlight: "AI Evaluation Specialist",
    location: "United States / flexible",
    note: "Current Handshake page advertises AI evaluation work up to $40/hr",
    href: "https://joinhandshake.com/",
    accent: "#D54B9F",
  },
  {
    name: "Dice",
    focus: "Technical roles, contracts and enterprise engineering",
    highlight: "Python / PySpark / NLP / MLOps Engineer",
    location: "New York, NY — hybrid",
    note: "End-to-end data processing, NLP, deployment and monitoring",
    href: "https://www.dice.com/job-detail/4ca1ad74-ac9c-4bee-ba67-836976baf5da",
    accent: "#C31F3A",
  },
  {
    name: "ZipRecruiter",
    focus: "Broad U.S. market with fast role discovery",
    highlight: "Applied Scientist — Amazon / Audible",
    location: "Newark, NJ",
    note: "NLP, deep learning, GenAI and production systems",
    href: "https://www.ziprecruiter.com/c/Amazon/Job/Applied-Scientist/-in-Newark%2CNJ?jid=bd7739fcd5d19a38",
    accent: "#6750A4",
  },
  {
    name: "Glassdoor",
    focus: "Role discovery with employer and pay context",
    highlight: "Natural Language Processing Engineer — Tietronix",
    location: "Houston, TX",
    note: "$69k–$111k Glassdoor estimate shown in current results",
    href: "https://www.glassdoor.com/Job/us-computational-linguistics-jobs-SRCH_IL.0,2_IN1_KO3,28.htm",
    accent: "#0CAA41",
  },
  {
    name: "Wellfound",
    focus: "Startup and early-stage technology hiring",
    highlight: "Machine Learning Engineer — Apiphany AI",
    location: "San Francisco, CA",
    note: "$120k–$180k range shown in the current NLP search results",
    href: "https://wellfound.com/role/l/natural-language-processing/united-states",
    accent: "#111111",
  },
  {
    name: "Company Careers",
    focus: "Primary source for role requirements and official details",
    highlight: "Applied Scientist II — Amazon Search",
    location: "Seattle, WA",
    note: "$142.8k–$193.2k base range shown by Amazon Jobs",
    href: "https://www.amazon.jobs/en/jobs/10471620/applied-scientist-ii-amazon-search",
    accent: "#FF9900",
  },
];

export const jobs: Job[] = [
  {
    platform: "LinkedIn",
    company: "Zest for Tech",
    role: "Senior NLP Engineer",
    location: "New York / Remote",
    compensation: "$150k–$260k",
    strengths: ["Python", "Hugging Face", "PyTorch / TensorFlow", "spaCy / NLTK", "RAG", "Embeddings", "Entity extraction", "Text classification", "Elasticsearch", "Fine-tuning"],
    href: "https://www.linkedin.com/jobs/view/natural-language-processing-engineer-at-zest-for-tech-4461717676",
  },
  {
    platform: "Indeed",
    company: "Solventum",
    role: "Applied Scientist — NLP / Deep Learning",
    location: "Pennsylvania",
    strengths: ["PyTorch", "Transformers", "Natural language understanding", "Representation learning", "Generative models", "Model training", "Evaluation", "Production systems"],
    href: "https://www.indeed.com/",
  },
  {
    platform: "Dice",
    company: "Application Management Services LLC",
    role: "Python / PySpark / NLP / MLOps Engineer",
    location: "New York, NY — hybrid",
    strengths: ["Python", "PySpark", "Apache Spark", "NLP", "Data pipelines", "MLOps", "CI/CD", "APIs", "Deployment", "Monitoring"],
    href: "https://www.dice.com/job-detail/4ca1ad74-ac9c-4bee-ba67-836976baf5da",
  },
  {
    platform: "ZipRecruiter",
    company: "Amazon / Audible",
    role: "Applied Scientist",
    location: "Newark, NJ",
    strengths: ["NLP", "Deep learning", "LLMs / GenAI", "Python", "SQL", "AWS", "SageMaker", "Production ML", "Recommendation systems"],
    href: "https://www.ziprecruiter.com/c/Amazon/Job/Applied-Scientist/-in-Newark%2CNJ?jid=bd7739fcd5d19a38",
  },
  {
    platform: "Glassdoor",
    company: "Tietronix Software",
    role: "Natural Language Processing Engineer",
    location: "Houston, TX",
    compensation: "$69k–$111k est.",
    strengths: ["NLP applications", "Model training", "Evaluation", "Testing", "Computer science / computational linguistics"],
    href: "https://www.glassdoor.com/Job/us-computational-linguistics-jobs-SRCH_IL.0,2_IN1_KO3,28.htm",
  },
  {
    platform: "LinkedIn",
    company: "Thomson Reuters",
    role: "Senior Applied Scientist — Document Understanding",
    location: "New York, NY",
    strengths: ["Semantic chunking", "Classification", "Information extraction", "NER", "Entity linking", "Knowledge graphs", "RAG", "Synthetic data", "Distillation", "Evaluation", "Python", "PyTorch", "Hugging Face"],
    href: "https://www.linkedin.com/jobs/view/senior-applied-scientist-nlp-genai-at-thomson-reuters-4329767608",
  },
  {
    platform: "Amazon Jobs",
    company: "Amazon Search",
    role: "Applied Scientist II",
    location: "Seattle, WA",
    compensation: "$142.8k–$193.2k",
    strengths: ["Python / Java / C++", "Deep learning", "NLP", "Semantic matching", "Ranking", "Query understanding", "Training data", "Hard-negative mining", "A/B testing", "Production ML"],
    href: "https://www.amazon.jobs/en/jobs/10471620/applied-scientist-ii-amazon-search",
  },
];

export const skillFrequency = [
  { label: "Python / programming", value: 6, total: 7, group: "Programming" },
  { label: "Production ML / deployment", value: 6, total: 7, group: "Deployment" },
  { label: "NLP / language understanding", value: 7, total: 7, group: "Techniques" },
  { label: "Model evaluation / testing", value: 6, total: 7, group: "Techniques" },
  { label: "Transformers / deep learning", value: 5, total: 7, group: "Frameworks" },
  { label: "Retrieval / RAG / search", value: 4, total: 7, group: "Techniques" },
  { label: "PyTorch", value: 4, total: 7, group: "Frameworks" },
  { label: "Embeddings / semantic matching", value: 4, total: 7, group: "Data Processing" },
  { label: "MLOps / CI/CD / monitoring", value: 3, total: 7, group: "Deployment" },
  { label: "Hugging Face", value: 3, total: 7, group: "Frameworks" },
];

export const categorySummary = [
  {
    number: "01",
    title: "Frameworks / Libraries",
    items: ["PyTorch", "Hugging Face Transformers", "spaCy", "NLTK", "Scikit-learn", "TensorFlow", "Spark / PySpark"],
    note: "The strongest recurring signal is not one library by itself, but comfort moving between model frameworks and production tooling.",
  },
  {
    number: "02",
    title: "Techniques",
    items: ["Text classification", "Named entity recognition", "Information extraction", "Semantic search", "RAG", "Fine-tuning", "Ranking", "Document understanding", "LLM evaluation"],
    note: "Employers increasingly pair classical NLP tasks with retrieval, transformers, and LLM-centered workflows.",
  },
  {
    number: "03",
    title: "Data Processing",
    items: ["Tokenization", "Embeddings", "Semantic chunking", "Vector retrieval", "Training-data creation", "Hard-negative mining", "Synthetic data", "PySpark pipelines"],
    note: "The job is rarely just model training. Data preparation, retrieval quality, and evaluation datasets are part of the core work.",
  },
  {
    number: "04",
    title: "Programming & Deployment",
    items: ["Python", "REST APIs", "SQL", "AWS / SageMaker", "Docker", "CI/CD", "Model monitoring", "MLOps", "Production testing"],
    note: "The clearest difference between coursework and industry is operational ownership: shipping, measuring, and maintaining models.",
  },
];

export const courseCoverage = [
  { skill: "NLP fundamentals & text preprocessing", level: 95, label: "Strong" },
  { skill: "Classification, NER & evaluation", level: 90, label: "Strong" },
  { skill: "Embeddings & transformer concepts", level: 82, label: "Strong" },
  { skill: "PyTorch / Hugging Face practice", level: 72, label: "Good" },
  { skill: "RAG & modern retrieval", level: 58, label: "Partial" },
  { skill: "Production APIs & deployment", level: 48, label: "Partial" },
  { skill: "Cloud, CI/CD & MLOps", level: 32, label: "Limited" },
];

export const sources = [
  "LinkedIn — Zest for Tech, Senior NLP Engineer — reviewed Sep. 13, 2026",
  "Indeed — current NLP / Deep Learning search result featuring Solventum — reviewed Sep. 13, 2026",
  "Handshake — current AI specialist opportunities page — reviewed Sep. 13, 2026",
  "Dice — Python / PySpark / NLP / MLOps Engineer — current posting reviewed Sep. 13, 2026",
  "ZipRecruiter — Amazon / Audible Applied Scientist — current listing reviewed Sep. 13, 2026",
  "Glassdoor — current U.S. computational linguistics results featuring Tietronix — reviewed Sep. 13, 2026",
  "Wellfound — current U.S. NLP jobs page — reviewed Sep. 13, 2026",
  "Amazon Jobs — Applied Scientist II, Amazon Search — current official posting reviewed Sep. 13, 2026",
];
