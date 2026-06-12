import { getBlogPosts } from 'app/blog/utils';
import { getProjects } from 'app/projects/utils';

export async function getLLMContext(): Promise<string> {
  const blogs = getBlogPosts();
  const projects = getProjects();

  const baseUrl = 'https://sagartamang.com';
  
  const truncate = (str: string, maxLen: number) => 
    str.length > maxLen ? str.slice(0, maxLen) + '...' : str;

  const blogContext = blogs.map(b => 
    `- ${truncate(b.metadata.title, 60)} (${b.metadata.publishedAt}): ${truncate(b.metadata.summary, 150)} [URL: ${baseUrl}/blog/${b.slug}]`
  ).join('\n');
  
  const projectContext = projects.map(p => 
    `- ${truncate(p.metadata.title, 60)}: ${truncate(p.metadata.summary, 150)} (Tech: ${p.metadata.tech || 'N/A'}) [URL: ${baseUrl}/projects/${p.slug}]`
  ).join('\n');

  return `
# Sagar Tamang

> Personal portfolio of Sagar Tamang — a 19-year-old AI Engineer based in Bengaluru, India. Specializes in agentic orchestration, multi-agent AI systems, and natural language processing for low-resource (Indian) languages, alongside full-stack software engineering.

- Website: https://sagartamang.com
- Resume: https://sagartamang.com/resume.pdf
- Email: build@sagartamang.com
- GitHub: https://github.com/SAGAR-TAMANG
- LinkedIn: https://www.linkedin.com/in/sagar-tmg/
- YouTube: https://www.youtube.com/@sagar_builds - 1300+ subscribers
- X / Twitter: https://x.com/sagar_builds (@sagar_builds) - 1,300+ followers
- Instagram: https://www.instagram.com/sagar_builds/ (@sagar_builds) - 109,000+ followers
- Google Scholar: https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ

## Overview

Sagar Tamang (also known online as @sagar_builds) is an AI Engineer focused on AI multi-agent systems and modern web development. He pairs research aptitude with a minimalist builder aesthetic and systems-thinking. Technical stack: Python, Java, SQL, React / Next.js, Django, PyTorch, LangChain, and Docker.

## Experience

- TwoSpoon AI — AI Engineer, working on the River team.
- LeapX AI — AI Engineer Intern, reporting directly to the CTO.
- Composio — Software Engineering Intern (Python); helped integrate 100+ companies into the AI Agent platform.
- National Institute of Technology Silchar (NITS) — Research Intern; analyzed cybercrime trends and proposed practical solutions.

## Education

- Indian Institute of Technology Patna & IIIT Ranchi — MCA (2025–27).
- The Assam Kaziranga University — BCA (2022–25), Gold Medalist with a 9.8/10 CGPA.

## Research & Publications

- Enforcement Agents: Enhancing Accountability and Resilience in Multi-Agent AI Frameworks — Best Paper Award, ICDDA 2025.
- Can LLMs Predict the Stock Market? A Comparative Analysis of AI-driven Financial Forecasting — Best Paper Award, ICDDA 2025.
- Task-Oriented Evaluation of Assamese Tokenizers Using Sentiment Classification — published in IJACSA (SAI Organization).
- AI Poramorxo: Assamese Language NLP for Medical Report Generation and Translation — Best Paper Award, AICTE ICESCC 2024.

## Projects

${projectContext}

## Blog Posts

${blogContext}
  `.trim();
}
