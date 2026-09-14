const W = 792;
const H = 612;

function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function text(x: number, y: number, size: number, value: string, color = "0.08 0.13 0.20") {
  return `${color} rg BT /F1 ${size} Tf ${x} ${y} Td (${esc(value)}) Tj ET\n`;
}

function line(x1: number, y1: number, x2: number, y2: number, color = "0.78 0.81 0.84") {
  return `${color} RG 1 w ${x1} ${y1} m ${x2} ${y2} l S\n`;
}

function rect(x: number, y: number, w: number, h: number, color = "0.95 0.96 0.97") {
  return `${color} rg ${x} ${y} ${w} ${h} re f\n`;
}

function wrap(value: string, max = 66) {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
}

function paragraph(x: number, y: number, size: number, value: string, max = 66, leading = 16, color = "0.25 0.29 0.34") {
  return wrap(value, max)
    .map((l, i) => text(x, y - i * leading, size, l, color))
    .join("");
}

function pageHeader(kicker: string, titleValue: string, subtitle?: string) {
  let out = rect(0, H - 8, W, 8, "0.06 0.18 0.30");
  out += text(48, 552, 10, kicker.toUpperCase(), "0.28 0.45 0.58");
  out += text(48, 515, 27, titleValue, "0.05 0.14 0.23");
  if (subtitle) out += paragraph(48, 486, 11, subtitle, 92, 15);
  out += line(48, 458, 744, 458);
  return out;
}

function buildPdf(pageStreams: string[]) {
  const objects: string[] = [];
  const fontId = 3;
  const kids = pageStreams.map((_, i) => `${4 + i * 2} 0 R`).join(" ");
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Count ${pageStreams.length} /Kids [${kids}] >>`;
  objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  pageStreams.forEach((stream, i) => {
    const pageId = 4 + i * 2;
    const contentId = pageId + 1;
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

function makePages() {
  const pages: string[] = [];

  let p = pageHeader("Current U.S. job review - September 2026", "7 current postings. One clear hiring pattern.", "NLP roles now combine language modeling with retrieval, data pipelines, evaluation, and production engineering.");
  p += rect(48, 300, 210, 118, "0.93 0.95 0.97") + text(66, 378, 30, "7", "0.05 0.14 0.23") + text(66, 352, 12, "detailed postings reviewed") + text(66, 326, 10, "Across major U.S. job platforms", "0.35 0.39 0.43");
  p += rect(291, 300, 210, 118, "0.93 0.95 0.97") + text(309, 378, 30, "8", "0.05 0.14 0.23") + text(309, 352, 12, "platforms scanned") + text(309, 326, 10, "LinkedIn to company careers", "0.35 0.39 0.43");
  p += rect(534, 300, 210, 118, "0.89 0.93 0.96") + text(552, 378, 20, "Python + NLP", "0.05 0.14 0.23") + text(552, 352, 12, "strongest shared signal") + text(552, 326, 10, "Then evaluation, DL and deployment", "0.35 0.39 0.43");
  p += text(48, 245, 13, "Most important observation", "0.05 0.14 0.23");
  p += paragraph(48, 220, 12, "Employers are not separating NLP research from engineering. The strongest postings expect candidates to prepare data, build or adapt models, evaluate them, and move them into reliable production workflows.", 100, 17);
  pages.push(p);

  p = pageHeader("Job boards", "Where the search happened", "The platforms serve different parts of the market, so using several of them produces a more realistic picture of current demand.");
  const platforms = [
    ["LinkedIn", "Senior NLP Engineer", "network + direct hiring"], ["Indeed", "Applied Scientist - NLP / DL", "high-volume search"],
    ["Handshake", "AI Evaluation Specialist", "student / early career"], ["Dice", "NLP / MLOps Engineer", "technical contracts"],
    ["ZipRecruiter", "Applied Scientist", "broad U.S. market"], ["Glassdoor", "NLP Engineer", "pay + employer context"],
    ["Wellfound", "ML Engineer", "startup roles"], ["Amazon Jobs", "Applied Scientist II", "official requirements"],
  ];
  platforms.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 48 + col * 352;
    const y = 405 - row * 86;
    p += rect(x, y, 326, 68, row % 2 === 0 ? "0.96 0.97 0.98" : "0.93 0.95 0.97");
    p += text(x + 16, y + 44, 12, item[0], "0.05 0.14 0.23");
    p += text(x + 16, y + 25, 10, item[1], "0.25 0.29 0.34");
    p += text(x + 198, y + 25, 9, item[2], "0.40 0.44 0.48");
  });
  pages.push(p);

  p = pageHeader("Representative posting", "Senior NLP Engineer - Zest for Tech", "This LinkedIn role is the best single representative of the repeated skills found across the broader sample.");
  const bullets = [
    "Python engineering plus Hugging Face, spaCy / NLTK, PyTorch or TensorFlow",
    "Search and retrieval using embeddings, graph databases and Elasticsearch",
    "Entity extraction and text classification",
    "RAG and LLM-powered applications",
    "Fine-tuning and experimentation for robustness and accuracy",
    "Production ownership from prototype to scalable system",
  ];
  bullets.forEach((b, i) => {
    const y = 407 - i * 48;
    p += rect(48, y, 18, 18, "0.10 0.29 0.42") + text(52, y + 5, 9, String(i + 1), "1 1 1");
    p += paragraph(82, y + 5, 11, b, 82, 14);
  });
  p += rect(566, 112, 178, 280, "0.93 0.95 0.97");
  p += text(584, 356, 11, "WHY IT REPRESENTS THE MARKET", "0.28 0.45 0.58");
  p += paragraph(584, 328, 11, "It combines classical NLP, transformer tooling, retrieval, data pipelines and production engineering in one role - the same pattern that appears repeatedly in the other postings.", 27, 16);
  pages.push(p);

  p = pageHeader("1 / 4", "Frameworks / Libraries", "The market rewards flexibility across model, NLP, and data-processing tools.");
  [
    ["PyTorch", 4], ["Hugging Face", 3], ["Transformers / DL toolkits", 5], ["spaCy / NLTK", 2], ["Spark / PySpark", 2], ["TensorFlow", 2]
  ].forEach((item, i) => {
    const y = 414 - i * 54;
    p += text(48, y + 8, 11, item[0] as string);
    p += rect(220, y, 410, 20, "0.91 0.93 0.95");
    p += rect(220, y, 410 * ((item[1] as number) / 7), 20, "0.10 0.29 0.42");
    p += text(650, y + 6, 10, `${item[1]}/7`, "0.35 0.39 0.43");
  });
  p += text(48, 75, 10, "Also present: Scikit-learn, NumPy / Pandas, AWS ML tooling and vector-search libraries.", "0.35 0.39 0.43");
  pages.push(p);

  p = pageHeader("2 / 4", "Techniques", "Modern NLP postings mix established language tasks with retrieval and LLM-centered methods.");
  const tech = ["Text classification", "NER / information extraction", "Semantic search and retrieval", "RAG", "Fine-tuning", "Document understanding", "Ranking / relevance", "LLM evaluation"];
  tech.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 48 + col * 352;
    const y = 397 - row * 80;
    p += rect(x, y, 326, 58, row % 2 ? "0.94 0.96 0.97" : "0.97 0.97 0.98");
    p += text(x + 18, y + 22, 12, t, "0.05 0.14 0.23");
  });
  pages.push(p);

  p = pageHeader("3 / 4", "Data Processing", "The pipeline is a hiring skill, not a background task.");
  const pipe = [
    ["1", "Raw text", "documents, logs, queries"], ["2", "Prepare", "clean, tokenize, chunk"], ["3", "Represent", "embeddings, features"],
    ["4", "Retrieve", "vector / semantic search"], ["5", "Train", "labels, hard negatives"], ["6", "Evaluate", "offline + online tests"],
  ];
  pipe.forEach((item, i) => {
    const x = 48 + i * 116;
    p += rect(x, 330, 96, 104, i % 2 ? "0.93 0.95 0.97" : "0.96 0.97 0.98");
    p += text(x + 12, 404, 18, item[0], "0.28 0.45 0.58");
    p += text(x + 12, 376, 11, item[1], "0.05 0.14 0.23");
    p += paragraph(x + 12, 352, 9, item[2], 14, 12);
  });
  p += paragraph(48, 250, 12, "Repeated requirements include embeddings, semantic chunking, training-data creation, synthetic data, PySpark pipelines, and evaluation datasets. This makes data quality and retrieval quality part of the core NLP skill set.", 100, 17);
  pages.push(p);

  p = pageHeader("4 / 4", "Programming & Deployment", "Production readiness is the clearest industry requirement that extends beyond model notebooks.");
  const deploy: Array<[string, string]> = [["Python", "6/7"], ["REST / APIs", "3/7"], ["SQL", "2/7"], ["Cloud / AWS", "3/7"], ["CI/CD", "3/7"], ["Monitoring / MLOps", "3/7"]];
  deploy.forEach((d, i) => {
    const y = 416 - i * 52;
    p += text(48, y, 12, d[0]);
    p += line(176, y + 5, 620, y + 5, "0.88 0.90 0.92");
    p += text(652, y, 11, d[1], "0.28 0.45 0.58");
  });
  p += rect(48, 72, 696, 86, "0.91 0.94 0.96") + paragraph(66, 126, 11, "Industry expectation: build, expose, deploy, monitor, test, and improve. Model quality matters, but reliability and maintainability are part of the role.", 92, 16);
  pages.push(p);

  p = pageHeader("Frequency", "What appears most often", "Counts are based on the seven detailed postings in this review.");
  const freq: Array<[string, number]> = [["NLP / language understanding", 7], ["Python / programming", 6], ["Production / deployment", 6], ["Evaluation / testing", 6], ["Transformers / deep learning", 5], ["Retrieval / RAG / search", 4], ["PyTorch", 4], ["Embeddings / semantic matching", 4]];
  freq.forEach((f, i) => {
    const y = 420 - i * 42;
    p += text(48, y + 3, 10, f[0]);
    p += rect(250, y, 390, 15, "0.91 0.93 0.95");
    p += rect(250, y, 390 * (f[1] / 7), 15, i < 4 ? "0.08 0.25 0.38" : "0.28 0.45 0.58");
    p += text(654, y + 2, 9, `${f[1]}/7`, "0.35 0.39 0.43");
  });
  pages.push(p);

  p = pageHeader("Reflection", "What can be practiced in this course?", "Most core NLP skills can be practiced directly. Production infrastructure will need extra work outside the course.");
  const cov: Array<[string, number]> = [["Text preprocessing", 95], ["Classification / NER / evaluation", 90], ["Embeddings / transformers", 82], ["PyTorch / Hugging Face", 72], ["RAG / retrieval", 58], ["APIs / deployment", 48], ["Cloud / CI/CD / MLOps", 32]];
  cov.forEach((c, i) => {
    const y = 414 - i * 44;
    p += text(48, y + 2, 10, c[0]);
    p += rect(238, y, 390, 14, "0.91 0.93 0.95");
    p += rect(238, y, 390 * ((c[1] as number) / 100), 14, "0.10 0.29 0.42");
    p += text(644, y + 1, 9, `${c[1]}%`, "0.35 0.39 0.43");
  });
  p += paragraph(48, 82, 11, "My main takeaway is that this course can build the language-modeling foundation employers expect: preprocessing, classification, NER, embeddings, transformers and evaluation. To match the full job descriptions, I would add a small production project with an API, cloud deployment and monitoring.", 100, 16);
  pages.push(p);

  p = rect(0, 0, W, H, "0.05 0.14 0.23");
  p += text(48, 522, 10, "KEY TAKEAWAY", "0.55 0.70 0.80");
  p += text(48, 466, 28, "NLP hiring now rewards end-to-end ownership.", "1 1 1");
  p += paragraph(48, 420, 13, "The strongest candidate is not only able to train a language model. They can prepare data, choose the right technique, evaluate it rigorously, connect it to retrieval, and ship it as a reliable system.", 88, 20, "0.76 0.82 0.86");
  p += line(48, 230, 744, 230, "0.25 0.39 0.49");
  p += text(48, 166, 22, "Thank you for watching.", "1 1 1");
  p += text(48, 128, 10, "Current job-market review - September 13, 2026", "0.60 0.70 0.78");
  pages.push(p);

  return pages;
}

export async function GET() {
  const pdf = buildPdf(makePages());
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="NLP_Job_Market_Analysis_2026.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
