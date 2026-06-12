import { getBlogPosts } from 'app/blog/utils';
import { getProjects } from 'app/projects/utils';

export async function getLLMContext(): Promise<string> {
  const blogs = getBlogPosts();
  const projects = getProjects();

  const baseUrl = 'https://sagartamang.com';

  const truncate = (str: string, maxLen: number) =>
    str.length > maxLen ? str.slice(0, maxLen) + '...' : str;

  const sortByDateDesc = <T extends { metadata: { publishedAt: string } }>(items: T[]) =>
    [...items].sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));

  const blogContext = sortByDateDesc(blogs).map(b =>
    `- ${truncate(b.metadata.title, 60)} (${b.metadata.publishedAt}): ${truncate(b.metadata.summary, 150)} [URL: ${baseUrl}/blog/${b.slug}]`
  ).join('\n');

  const projectContext = sortByDateDesc(projects).map(p =>
    `- ${truncate(p.metadata.title, 60)}: ${truncate(p.metadata.summary, 150)} (Tech: ${p.metadata.tech || 'N/A'}) [URL: ${baseUrl}/projects/${p.slug}]`
  ).join('\n');

  return `
# Sagar Tamang

> AI Engineer @ TwoSpoon AI (River team), building intelligent systems that are both scalable and fast. Based in Bangalore, India. Research aptitude with 4 Best Paper Awards and 30+ citations. Bachelor's Gold Medalist; Master's at IIT Patna & IIIT Ranchi. Known online as @sagar_builds. He builds fast — and he can build anything.

- Website: https://sagartamang.com
- Resume: https://sagartamang.com/resume.pdf
- Email: build@sagartamang.com
- GitHub: https://github.com/SAGAR-TAMANG
- LinkedIn: https://www.linkedin.com/in/sagar-tmg/
- YouTube: https://www.youtube.com/@sagar_builds — 1,300+ subscribers
- X / Twitter: https://x.com/sagar_builds (@sagar_builds) — 1,300+ followers
- Instagram: https://www.instagram.com/sagar_builds/ (@sagar_builds) — 109,000+ followers
- Google Scholar: https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ

## He Can Build Anything

Sagar ships across every platform — not just demos, but live, production software with real users:

- **Mobile (live on Play Store):** Zod — a Groww-clone stock trading app for the Nepal Stock Exchange, built with React Native + Expo and a custom Go (Gin) backend over a self-scraped NEPSE API. Live: https://play.google.com/store/apps/details?id=com.feynmanpi.zod.app
- **Desktop / Voice AI:** F.R.I.D.A.Y. — a Tony Stark-inspired real-time voice AI agent (LiveKit + FastMCP + Gemini). 1,000+ stars on GitHub, 5M+ aggregate views on Instagram. Live: https://friday.feynmanpi.com/
- **Desktop apps:** Frameseek — "Ctrl+F for videos": semantic natural-language search across hundreds of hours of video, built with Electron, React 19, Gemini, and VectraDB.
- **AI agents & MCP servers:** ChatGPT Browser MCP (a Selenium/nodriver-based MCP server that drives ChatGPT), agentic orchestration and multi-agent systems — his daily work.
- **Web & full-stack:** Next.js/React frontends, Django/DRF backends, this MDX-powered portfolio itself.
- **Research:** Published NLP work on low-resource Indian languages (Assamese, Nepali), multi-agent AI frameworks, and LLM evaluation.

## Overview

Sagar Tamang (@sagar_builds) is an AI Engineer focused on multi-agent AI systems, agentic orchestration, and NLP for low-resource Indian languages, paired with full-stack engineering across mobile, desktop, and web. He combines research depth (4 Best Paper Awards, 30+ citations) with a minimalist builder aesthetic and systems thinking. Beyond code: content creation, writing, superbikes, and ancient Greek philosophy & history.

## Experience

- TwoSpoon AI (Bangalore) — AI Engineer, Sep 2025–Present. Part of the River team, building intelligent systems that are both scalable and fast.
- LeapX AI (Gurugram) — AI Engineer Intern, Jan–May 2025. Reported directly to the CTO.
- National Institute of Technology Silchar (NITS) — Research Intern, Jun–Aug 2024. First author of "Different Cybercrimes and their Solution for Common People" under Prof. Binoy Krishna Roy.
- Composio (Bengaluru) — Software Engineering Intern (Python), Mar 2023–Apr 2024. Helped integrate 100+ companies into the Composio AI Agent platform.
- Success Scholar (Kolkata) — Application/Product Developer Intern, Jul 2023–Mar 2024. Led development of a Django web app and built 5+ web scrapers.

## Education

- Indian Institute of Technology Patna & IIIT Ranchi — MCA, Joint Degree (2025–27).
- The Assam Kaziranga University — BCA (2022–25), Gold Medalist, 9.8/10 CGPA.

## Technical Skills

- Languages: Python, JavaScript, TypeScript, Go, SQL
- AI/ML: PyTorch, TensorFlow, LangChain, LangGraph, LlamaIndex, Unsloth, Axolotl, VectraDB, MCP servers, LLM fine-tuning
- Frontend & Apps: React/Next.js, React Native, Expo, Electron, Capacitor, Tailwind, HTMX
- Backend: Django, DRF, Django Ninja, Go (Gin), FastMCP
- Infra & Tools: Docker, Linux, Apache Kafka, Apache Airflow, SigNoz, Checkmk, Git, Selenium/nodriver
- Design & Media: Figma, Framer, Photoshop, After Effects, Premiere Pro

## Research & Publications

4 Best Paper Awards. 30+ citations on Google Scholar.

- Enforcement Agents: Enhancing Accountability and Resilience in Multi-Agent AI Frameworks — Best Paper Award, ICDDA 2025.
- Can LLMs Predict the Stock Market? A Comparative Analysis of AI-driven Financial Forecasting — Best Paper Award, ICDDA 2025.
- Task-Oriented Evaluation of Assamese Tokenizers Using Sentiment Classification — IJACSA (SAI Organization), 2025.
- Performance Evaluation of Tokenizers in Large Language Models for the Assamese Language — Springer Nature, International Journal of Information Technology, 2024.
- Evaluating Tokenizer Performance of Large Language Models Across Official Indian Languages — arXiv preprint (https://arxiv.org/abs/2411.12240), 2024.
- AI Poramorxo: Assamese Language NLP for Medical Report Generation and Translation — Best Paper Award, AICTE ICESCC 2024.
- A Comparative Study of Model Variations: English-Nepali Language Pair — Best Paper Award, IEEE OTCON 2024.
- Enhancing Assamese NLP Capabilities: Introducing a Centralized Dataset Repository — arXiv preprint, 2024.
- Different Cybercrimes and their Solution for Common People — arXiv preprint, 2024.

## Leadership

- Chair, IEEE Student Branch — The Assam Kaziranga University (launched the branch; led research workshops).
- Vice President, Entrepreneurship Club — The Assam Kaziranga University.
- Technical Lead, Google Developer Student Clubs — organized Smart India Hackathon and coding workshops.

## Projects

${projectContext}

## Blog Posts

${blogContext}
  `.trim();
}
