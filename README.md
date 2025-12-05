# DESN CLO Toolkit

A comprehensive web-based toolkit for creating measurable, PLO-aligned Course Learning Outcomes (CLOs) for the EWU Design Department.

## Overview

This toolkit helps design faculty write effective Course Learning Outcomes that:
- Align with Program Learning Outcomes (PLOs)
- Use measurable action verbs from Bloom's Taxonomy
- Support student success and accreditation requirements

## Features

### PLO Reference Visualization
Interactive chart showing all 6 Program Learning Outcomes with their progression levels (Learn → Practice → Mastery).

### Why Traditional CLOs Fail
Educational section highlighting common problems with CLOs:
- Unmeasurable language
- Section inconsistency
- Weak PLO alignment

### Before/After Examples
Real course-specific transformations showing how to improve CLOs for DESN 100, 200, and 216.

### AI-Powered CLO Generator
Generate CLOs using AI with your own API key. Supports:
- OpenAI (GPT-4o, GPT-4o-mini)
- Anthropic (Claude Sonnet, Claude Haiku)
- OpenRouter (multiple models)

### Prompt Templates
Copy-ready prompts for generating CLOs with any AI tool, with variations for:
- Foundational courses (100-200 level)
- Intermediate courses (300 level)
- Advanced/Capstone courses (400+ level)

## Tech Stack

- React 18
- TypeScript
- Vite
- Motion (Framer Motion)
- Lucide React Icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/sicxz/desn-clo-toolkit.git

# Navigate to project directory
cd desn-clo-toolkit

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Program Learning Outcomes Reference

| PLO | Title | Description | Level |
|-----|-------|-------------|-------|
| 1 | Visual Vocabulary | Fluency in design language | Learn |
| 2 | Technical Skills | Proficiency in design tools | Practice |
| 3 | Design Methodologies | Apply design systems & methods | Practice |
| 4 | Design Process | Engage in research, ideation, prototyping | Mastery |
| 5 | Career Readiness | Communication, professionalism, problem-solving | Mastery |
| 6 | Well-Being | Principles for self, others, community | Mastery |

## License

Prepared for EWU Design Department curriculum review.
