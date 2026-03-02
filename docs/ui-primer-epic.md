# Epic: Primer-Inspired UI Modernization

## Goal
Modernize the current UI using [Primer Product](https://primer.style/product/) as the visual and interaction baseline while preserving the existing curriculum content and CLO generation workflow.

## Success Criteria
- UI is fully responsive from `390px` mobile through desktop with no horizontal overflow.
- Visual system is token-driven and consistent across sections.
- Current inline-style-heavy implementation is replaced by reusable class-based styling.
- CLO generator workflow remains fully functional.
- Final build passes with no regressions in core interactions.

## Sub-Issues

### UI-1: Design Tokens and Global Foundation
**Description**
Create a shared token system and global styles inspired by Primer (color, spacing, typography, radius, borders, focus states).

**Acceptance Criteria**
- Single source of truth for colors/spacing/typography in global CSS.
- Consistent body typography and section spacing.
- Reusable primitives for cards, buttons, labels, inputs, pills, and grids.

### UI-2: Navigation and Page Shell
**Description**
Introduce a coherent page shell with sticky top navigation and section anchors.

**Acceptance Criteria**
- Top navigation links to major sections.
- Main content structure is semantically grouped (`header`, `main`, `footer`).
- Layout remains readable on mobile and desktop.

### UI-3: Hero and Framework Sections Refactor
**Description**
Refactor hero and PLO framework sections to use responsive, class-based layouts with Primer-like hierarchy and restrained visual treatment.

**Acceptance Criteria**
- No fixed-width layout overflow on mobile.
- PLO framework content remains clear without relying on oversized fixed SVG layout.
- Shared component styling matches token system.

### UI-4: Problem Analysis and Comparison Sections Refactor
**Description**
Refactor "Why CLOs Fail" and before/after comparison sections for responsive behavior and consistent card/tabs styling.

**Acceptance Criteria**
- Tab controls are clear and keyboard-accessible.
- Comparison cards stack on mobile and fan out on desktop.
- Content emphasis is consistent and not over-stylized.

### UI-5: CLO Generator UI Overhaul (No Logic Regression)
**Description**
Restyle the generator with a structured form layout and sectioned panels while preserving provider/model/API logic.

**Acceptance Criteria**
- Inputs, toggles, selectors, and outcome cards use shared UI primitives.
- API generation flow still works for OpenAI/Anthropic/OpenRouter modes.
- Error and loading states are clearly presented.

### UI-6: Prompt Template and Footer Modernization
**Description**
Refactor prompt template and footer to align with the new UI language and responsive patterns.

**Acceptance Criteria**
- Prompt preview and variation cards are responsive and legible.
- Copy interactions remain intact.
- Footer visual style aligns with updated shell and token system.

### UI-7: Responsiveness, Accessibility, and Build Verification
**Description**
Run final quality checks across sections and fix any remaining overflow, focus, or interaction issues.

**Acceptance Criteria**
- No horizontal overflow at `390px` viewport.
- Interactive controls have visible focus states.
- `npm run build` passes successfully.

### UI-8: Framework Mapping Cutoff and Alignment Correction
**Description**
Resolve clipping/cutoff in the PLO mapping table and ensure side-by-side framework cards remain top-aligned at desktop breakpoints.

**Acceptance Criteria**
- PLO mapping content does not clip at desktop widths (including wide viewports).
- Framework panels align on top edge when displayed in two-column layout.
- Small viewports use a non-clipping fallback presentation for mapping data.

### UI-9: DESN PLO Map Content Alignment
**Description**
Align PLO definitions and framework references in the site with `DESN PLO Map.xlsx` while keeping the on-page summary concise.

**Acceptance Criteria**
- PLO labels/descriptions in framework, generator, and prompt template reflect map language.
- The framework section uses a simplified alignment summary rather than an over-detailed spreadsheet replica.
- Source/revision note references the map revision used for alignment.

## Audit Log (2026-03-02)

### Scope
- Full-page responsive sweep from `390px` to `2048px`.
- Focused inspection of Framework section (mapping table + progression panel).
- Build verification.

### Findings
- Framework panel top alignment: **PASS**.
- Horizontal overflow (document level): **PASS** at `390, 430, 480, 768, 1024, 1100, 1280, 1512, 1800, 2048`.
- Clipped content in visible elements (overflow-hidden truncation): **PASS** in framework checks.
- Build status: **PASS** (`vite build`).

### Notes
- Mapping table is hidden on very small widths and replaced with stacked mapping cards for readability.
- Two-column framework layout is gated to `min-width: 1100px` to prevent cramped table behavior.
