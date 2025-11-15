# QA Testing Micro-Task Architecture - Master Plan

## Overview

This plan breaks down QA testing into atomic, non-overlapping micro-tasks focused on **fundamental issues that ALL websites face**: pages loading, buttons working, navigation functioning, and responsive scaling.

**Core Principles:**
- ✅ **Atomic**: Each task does ONE thing only
- ✅ **Clear**: Explicit instructions - "Do X, Y, Z. If A, report B."
- ✅ **Non-overlapping**: No duplicate testing between tasks
- ✅ **Scoped**: Well-defined pass/fail criteria
- ✅ **Minimal**: As small as possible while remaining useful
- ✅ **Fundamental**: Focus on issues that affect ALL websites

---

## New Architecture: Test Execution vs Improvement Analysis

**Key Principle:** *Test now, improve later with complete context.*

### Phase 1: Test Execution (Fast, Focused)
Each micro-task:
- Executes its test (page load, button click, navigation, etc.)
- Returns JSON result with pass/fail
- Optionally notes `painPoint` (1 sentence) if task was confusing
- **Does NOT provide detailed instruction feedback**

Browsing history is captured automatically and saved to `results/<run>/stage-X/histories/<task-id>.history.json`

### Phase 2: Improvement Analysis (Deep, Holistic)
After all tests complete (via `--analyze` flag):
- Improvement Agent analyzes ALL browsing histories from the stage
- Cross-references instruction files, shared prompt, and stage config
- Identifies patterns: conflicts, duplications, missing steps, performance issues
- Outputs top 3 specific, actionable changes
- Saved to `results/<run>/stage-X/improvement-analysis.md`

### Why This Approach?
- **QA agents focus on testing** - Not meta-analysis of instructions
- **Better pattern detection** - Improvement Agent sees cross-task patterns
- **Cost reduction** - Stage-specific caching reduces costs 40-60%
- **Evidence-based** - Uses actual browsing history, not agent opinions

---

## Core Testing Stages (Fundamental for ALL Websites)

These stages test the basics that EVERY website must get right:

### ✅ Stage 1: Initial Load Testing (COMPLETE)
**Status:** 6/6 micro-tasks implemented and working
**Location:** `skills/qa-tester/instructions/stage-1-initial-load/`
**Duration:** ~30-45 seconds

| Task ID | File | Severity | Status | What It Tests |
|---------|------|----------|--------|---------------|
| `page-load-check` | 01-page-load-check.txt | CRITICAL | ✅ | Page loaded without 404/500/network errors |
| `extract-title` | 02-extract-title.txt | INFO | ✅ | Page title exists and is meaningful |
| `find-headings` | 03-find-headings.txt | INFO | ✅ | Page has proper heading structure |
| `identify-sections` | 04-identify-sections.txt | INFO | ✅ | Main page sections are identifiable |
| `console-errors` | 05-console-errors.txt | MEDIUM | ✅ | No JavaScript errors in console |
| `visual-problems` | 06-visual-problems.txt | HIGH | ✅ | No critical layout/visual issues |

**Why This Stage:**
Every website needs to load correctly, have proper structure, and not have console errors.

---

### ✅ Stage 2: Navigation Testing (COMPLETE)
**Status:** 5/5 micro-tasks implemented
**Location:** `skills/qa-tester/instructions/stage-2-navigation/`
**Duration:** ~2-3 minutes

| Task ID | File | Severity | Status | What It Tests |
|---------|------|----------|--------|---------------|
| `discover-nav-elements` | 01-discover-nav-elements.txt | INFO | ✅ | Find all navigation links/buttons |
| `test-header-nav` | 02-test-header-nav.txt | HIGH | ✅ | Click each header navigation link |
| `test-logo-link` | 03-test-logo-link.txt | HIGH | ✅ | Logo click returns to home |
| `test-footer-nav` | 04-test-footer-nav.txt | MEDIUM | ✅ | Click each footer link |
| `test-dropdown-menus` | 05-test-dropdown-menus.txt | MEDIUM | ✅ | Open/close dropdowns, test nested links |

**Why This Stage:**
Every website has navigation. Every link must work. This is fundamental.

---

### ✅ Stage 3: Button & Interactive Elements (COMPLETE)
**Status:** 5/5 micro-tasks implemented
**Location:** `skills/qa-tester/instructions/stage-3-buttons/`
**Duration:** ~2-3 minutes

| Task ID | File | Severity | Status | What It Tests |
|---------|------|----------|--------|---------------|
| `discover-buttons` | 01-discover-buttons.txt | INFO | ✅ | Find all buttons on page (not nav links) |
| `test-primary-actions` | 02-test-primary-actions.txt | CRITICAL | ✅ | Main action buttons work (submit, save, etc.) |
| `test-modal-triggers` | 03-test-modal-triggers.txt | MEDIUM | ✅ | Buttons that open modals/dialogs work |
| `test-toggle-buttons` | 04-test-toggle-buttons.txt | LOW | ✅ | Toggle switches work (show/hide, expand) |
| `test-disabled-state` | 05-test-disabled-state.txt | LOW | ✅ | Disabled buttons don't respond to clicks |

**Why This Stage:**
Buttons are the primary way users interact with websites. They must work.

---

### ✅ Stage 4: Responsive & Viewport Testing (COMPLETE)
**Status:** 4/4 micro-tasks implemented
**Location:** `skills/qa-tester/instructions/stage-4-responsive/`
**Duration:** ~1-2 minutes

| Task ID | File | Severity | Status | What It Tests |
|---------|------|----------|--------|---------------|
| `test-mobile-viewport` | 01-test-mobile-viewport.txt | HIGH | ✅ | Test at 375x667 (mobile) - content visible |
| `test-tablet-viewport` | 02-test-tablet-viewport.txt | MEDIUM | ✅ | Test at 768x1024 (tablet) - layout OK |
| `test-desktop-viewport` | 03-test-desktop-viewport.txt | LOW | ✅ | Test at 1920x1080 - full desktop |
| `test-mobile-navigation` | 04-test-mobile-navigation.txt | HIGH | ✅ | Hamburger menu works on mobile |

**Why This Stage:**
Every website must work on different screen sizes. Mobile is often majority traffic.

---

## Additional Stages (Conditional/Advanced)

These stages apply to specific types of websites or advanced testing:

### ❌ Stage 5: Form Testing (CONDITIONAL)
**Condition:** Only if website has forms
**Status:** 0/8 micro-tasks planned
**Duration:** ~3-5 minutes

| Task ID | Severity | What It Tests |
|---------|----------|---------------|
| `discover-forms` | INFO | Find all forms/inputs on page |
| `test-text-inputs` | HIGH | Text inputs accept normal data |
| `test-input-validation` | HIGH | Empty/invalid inputs show errors |
| `test-select-dropdowns` | MEDIUM | Dropdowns allow selection |
| `test-checkboxes-radios` | MEDIUM | Checkboxes/radios work |
| `test-form-submission` | HIGH | Form submits with valid data |
| `test-empty-submission` | HIGH | Empty form shows validation errors |
| `test-error-messages` | MEDIUM | Error messages are clear |

**Why Conditional:**
Not all sites have forms. Skip if no forms detected.

---

### ❌ Stage 6: Authentication Testing (CONDITIONAL)
**Condition:** Only if website has login/auth
**Status:** 0/5 micro-tasks planned
**Duration:** ~2-3 minutes

| Task ID | Severity | What It Tests |
|---------|----------|---------------|
| `test-login-valid` | CRITICAL | Login with valid credentials works |
| `test-login-invalid` | HIGH | Invalid login shows error |
| `test-logout` | HIGH | Logout clears session |
| `test-auth-bypass` | CRITICAL | Cannot access protected pages without login |
| `test-password-visibility` | LOW | Password show/hide toggle works |

**Why Conditional:**
Only applies to sites with authentication. Many public sites don't have login.

---

### ❌ Stage 7: Performance Basics (OPTIONAL)
**Status:** 0/3 micro-tasks planned
**Duration:** ~1-2 minutes

| Task ID | Severity | What It Tests |
|---------|----------|---------------|
| `check-page-load-time` | MEDIUM | Page loads in reasonable time (<5s) |
| `check-console-errors` | MEDIUM | No console errors after interactions |
| `check-failed-requests` | HIGH | No failed network requests |

**Why Optional:**
Basic performance is important but not always critical for initial testing.

---

## Summary Statistics

### Core Stages (Run on ALL Websites) - ✅ COMPLETE!
| Stage | Tasks | Status | Duration | Priority |
|-------|-------|--------|----------|----------|
| Stage 1: Initial Load | 6 | ✅ Complete | 30-45s | 🔴 CRITICAL |
| Stage 2: Navigation | 5 | ✅ Complete | 2-3m | 🔴 CRITICAL |
| Stage 3: Buttons | 5 | ✅ Complete | 2-3m | 🔴 CRITICAL |
| Stage 4: Responsive | 4 | ✅ Complete | 1-2m | 🟡 HIGH |
| **Core Total** | **20** | **20/20 (100%)** ✅ | **~6-9 minutes** | |

### Conditional Stages (Run if Features Present)
| Stage | Tasks | Condition | Duration |
|-------|-------|-----------|----------|
| Stage 5: Forms | 8 | If forms detected | 3-5m |
| Stage 6: Auth | 5 | If login detected | 2-3m |
| Stage 7: Performance | 3 | Optional | 1-2m |
| **Conditional Total** | **16** | | **~6-10 minutes** |

### Grand Total
**36 micro-tasks** covering fundamental website testing in **12-19 minutes**

---

## File Structure

```
skills/qa-tester/instructions/
├── plan.md (this file)
├── _shared-system-prompt.md          # Shared across all stages
│
├── stage-1-initial-load/              ✅ COMPLETE
│   ├── _stage-config.json
│   ├── 01-page-load-check.txt
│   ├── 02-extract-title.txt
│   ├── 03-find-headings.txt
│   ├── 04-identify-sections.txt
│   ├── 05-console-errors.txt
│   └── 06-visual-problems.txt
│
├── stage-2-navigation/                ✅ COMPLETE
│   ├── _stage-config.json
│   ├── 01-discover-nav-elements.txt
│   ├── 02-test-header-nav.txt
│   ├── 03-test-logo-link.txt
│   ├── 04-test-footer-nav.txt
│   └── 05-test-dropdown-menus.txt
│
├── stage-3-buttons/                   ✅ COMPLETE
│   ├── _stage-config.json
│   ├── 01-discover-buttons.txt
│   ├── 02-test-primary-actions.txt
│   ├── 03-test-modal-triggers.txt
│   ├── 04-test-toggle-buttons.txt
│   └── 05-test-disabled-state.txt
│
├── stage-4-responsive/                ✅ COMPLETE
│   ├── _stage-config.json
│   ├── 01-test-mobile-viewport.txt
│   ├── 02-test-tablet-viewport.txt
│   ├── 03-test-desktop-viewport.txt
│   └── 04-test-mobile-navigation.txt
│
├── stage-5-forms/                     ❌ TO BUILD (CONDITIONAL)
│   ├── _stage-config.json
│   └── 01-08 (8 micro-tasks)
│
├── stage-6-auth/                      ❌ TO BUILD (CONDITIONAL)
│   ├── _stage-config.json
│   └── 01-05 (5 micro-tasks)
│
└── stage-7-performance/               ❌ TO BUILD (OPTIONAL)
    ├── _stage-config.json
    └── 01-03 (3 micro-tasks)
```

---

## Micro-Task Template

Every micro-task file must follow this structure:

```markdown
---
title = "Task Name"
version = "1.0.0"
description = "One-line description"
taskId = "task-id"
severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO"
terminatesOnFailure = true | false
---

# Micro-Task: Task Name

**Task ID:** `task-id`
**Severity:** CRITICAL/HIGH/MEDIUM/LOW/INFO
**Terminates on Failure:** YES/NO

---

## Objective
[What this task tests - one sentence]

---

## What to Do/Check
- [ ] Step 1: Clear, specific action
- [ ] Step 2: Clear, specific action
- [ ] Step 3: Clear, specific action

---

## Return Format

**IMPORTANT: YOU MUST RETURN ONLY VALID JSON.**

```json
{
  "success": true,
  "field1": "value",
  "field2": "value",
  "painPoint": "Optional: 1-sentence note if task was confusing/difficult"
}
```

**Note:** Your browsing history is captured automatically. You do NOT need to provide detailed feedback. If something was confusing or the instructions were unclear, just add a brief painPoint.

---

## Field Definitions
- **success**: true if task completed, false if failed
- **field1**: description of what this field contains
- **painPoint**: (optional) 1-sentence note if the task was confusing or instructions were unclear
- ...

---

## Examples

### Example 1: Success with no issues
```json
{
  "success": true,
  "pageTitle": "Buy Time - Longevity Tech",
  "isErrorTitle": false
}
```

### Example 2: Success but confusing instructions
```json
{
  "success": true,
  "pageTitle": "Buy Time",
  "isErrorTitle": false,
  "painPoint": "Unclear what counts as an 'error title' - needed more examples"
}
```

### Example 3: Failure
```json
{
  "success": false,
  "error": "Page returned 404 Not Found"
}
```

---

## Important Notes
- Critical context or edge cases
- What to avoid
- Special considerations

---

## Time Estimate
X-Y seconds
```

---

## Design Decisions & Rationale

### Why Focus on Fundamentals?
Every website, regardless of complexity, must get these basics right:
1. **Pages load** - No 404s, 500s, network errors
2. **Navigation works** - All links go where they should
3. **Buttons work** - Primary interactions function correctly
4. **Responsive** - Works on mobile, tablet, desktop

Everything else (forms, auth, performance, security) is secondary or conditional.

### Why Browsing History Instead of Agent Feedback?
**Old approach (inefficient):**
- Each agent analyzes instruction quality during execution
- Takes 20-30% of agent time
- Each agent sees only its own execution
- Cannot detect cross-task patterns

**New approach (efficient):**
- Agent focuses 100% on testing
- Browsing history captured automatically
- Improvement Agent analyzes ALL histories together
- Detects conflicts, duplications, missing steps across tasks
- Generates top 3 specific, actionable changes

### Why Stage Grouping?
1. **Logical flow** - Test in order of importance (load → nav → buttons → responsive)
2. **Early termination** - Critical failures stop testing immediately
3. **Conditional execution** - Skip stages that don't apply (e.g., forms if no forms)
4. **Time-boxed** - Each stage has duration estimate

### Why Severity Levels?
1. **CRITICAL** - App completely broken, stop everything (404, 500, auth bypass)
2. **HIGH** - Major feature broken, urgent fix (navigation broken, button doesn't work)
3. **MEDIUM** - Non-critical issue, should fix (console warnings, minor layout issue)
4. **LOW** - Minor cosmetic issue (disabled button styling)
5. **INFO** - Just gathering data (page title, heading count)

---

## Success Criteria

### For Each Micro-Task:
- ✅ Has TOML frontmatter with required fields (NO commonSchema)
- ✅ Clear objective (one sentence)
- ✅ Explicit checklist of what to test
- ✅ Exact JSON return format with examples
- ✅ Clear pass/fail criteria
- ✅ Time estimate
- ✅ Returns only JSON (no extra text)
- ✅ Includes optional painPoint field (1 sentence max)
- ✅ Focuses on TESTING, not meta-analysis of instructions

### For Each Stage:
- ✅ Has _stage-config.json with all tasks
- ✅ Tasks are atomic and non-overlapping
- ✅ Logical task ordering (dependencies first)
- ✅ Duration estimate matches reality
- ✅ Critical tasks marked with terminateOnFailure
- ✅ Tests fundamental issues that apply to ALL websites (or clearly marked as conditional)

### For Overall System:
- ✅ Core stages (1-4) test fundamentals ALL websites need
- ✅ Conditional stages (5-6) only run if features detected
- ✅ No duplicate testing between stages
- ✅ Runnable via micro-task-executor.ts
- ✅ Produces actionable QA reports
- ✅ Improvement Agent generates top 3 changes per stage

---

## Implementation Priority

### Phase 1: Core Fundamentals (CRITICAL)
1. ✅ Stage 1: Initial Load - **DONE**
2. ❌ Stage 2: Navigation - **NEXT** (most important)
3. ❌ Stage 3: Buttons - **NEXT**
4. ❌ Stage 4: Responsive - **NEXT**

**Goal:** Test the absolute basics every website must get right.
**Timeline:** Complete core 4 stages first before any conditional stages.

### Phase 2: Conditional Features (HIGH)
5. ❌ Stage 5: Forms (if forms detected)
6. ❌ Stage 6: Auth (if login detected)

**Goal:** Test common but not universal features.

### Phase 3: Advanced Testing (MEDIUM)
7. ❌ Stage 7: Performance (optional)

**Goal:** Performance and optimization checks.

---

## Next Steps

### ✅ Core Stages - COMPLETE!
1. ✅ Stage 1: Initial Load - COMPLETE
2. ✅ Stage 2: Navigation - COMPLETE
3. ✅ Stage 3: Buttons - COMPLETE
4. ✅ Stage 4: Responsive - COMPLETE

**ALL CORE STAGES COMPLETE!** 🎉

The system can now test ANY website for fundamental issues:
- ✅ Does the page load?
- ✅ Does navigation work?
- ✅ Do buttons/interactions work?
- ✅ Does it work on mobile/tablet/desktop?

**Test execution time:** ~6-9 minutes per website for complete core testing

---

## Completion Checklist

### Core Stages (Run on ALL websites) - ✅ ALL COMPLETE!
- [x] ✅ Stage 1: Initial Load (6 tasks) - COMPLETE
- [x] ✅ Stage 2: Navigation (5 tasks) - COMPLETE
- [x] ✅ Stage 3: Buttons (5 tasks) - COMPLETE
- [x] ✅ Stage 4: Responsive (4 tasks) - COMPLETE

### Conditional Stages (Run if features present)
- [ ] ❌ Stage 5: Forms (8 tasks) - OPTIONAL (build if needed)
- [ ] ❌ Stage 6: Auth (5 tasks) - OPTIONAL (build if needed)

### Advanced Stages (Optional)
- [ ] ❌ Stage 7: Performance (3 tasks) - OPTIONAL (build if needed)

**Core Progress: 20/20 tasks (100%)** ✅ **COMPLETE!**
**Overall Progress: 20/36 tasks (56%)**

**Remaining stages are OPTIONAL** - only build if specific features need testing (forms, auth, performance).

---

## Key Takeaways

1. **Focus on fundamentals first** - Pages, navigation, buttons, responsive
2. **Test now, improve later** - QA agents test, Improvement Agent improves
3. **Keep it simple** - No elaborate security, edge cases, or niche features until core is solid
4. **Make it universal** - Core stages work on ANY website
5. **Make it fast** - Core testing completes in 6-9 minutes

---

**Last Updated:** 2025-11-15
**Version:** 2.0.0 (Updated for new improvement architecture)
**Status:** Core Stage 1 complete, 3 core stages remaining
