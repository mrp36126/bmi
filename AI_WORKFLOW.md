# AI Software Engineering Workflow

This project uses a 3-phase AI development system.

---

## PHASE 1 — ARCHITECT (PLAN ONLY)

Goal: Understand and design solution.

Prompt:
> Analyze the project
> Identify relevant files
> Design solution
> List required changes
> DO NOT write code

Output:
- File list
- Step-by-step plan
- Risks

---

## PHASE 2 — IMPLEMENTER (CODE)

Goal: Apply approved plan.

Rules:
- Only implement approved changes
- Modify only required files
- Keep code style consistent
- No extra features

---

## PHASE 3 — REVIEWER (VERIFY)

Goal: Ensure correctness.

Checks:
- Imports valid
- No broken references
- No duplicate logic
- Feature works end-to-end

If issues found:
→ Fix only issues, nothing extra