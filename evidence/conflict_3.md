# Conflict 3: The Stale Branch (Dark Mode Theme Variables)

**Conflict Type:** Stale Branch / Divergent Refactoring (Base Code Collision)

**Why this conflict was triggered:**
This conflict occurred because of a divergent history and refactoring process between two parallel branches (`feat/dark-mode` and `refactor/css-cleanup`) originating from the same baseline state on the `main` branch.

* **Branch A (`feat/dark-mode`)** was created earlier to implement a dark mode theme toggle, writing CSS variables and theme classes using the original naming convention (e.g., `--primary-accent`, `--bg-color`). This branch remained active and untouched ("stale") while other development proceeded.
* **Branch B (`refactor/css-cleanup`)** was subsequently created from `main`, during which a developer completely refactored and renamed the foundational global CSS variables in `src/style.css` to a new naming standard (e.g., `--color-brand-primary`, `--color-background-base`). This branch was reviewed, approved, and successfully merged directly into `main`.

When the stale `feat/dark-mode` branch was finally updated or merged against the new `main` branch, Git detected a direct conflict on the exact lines defining the root selector variables. 

Because the base variable names that the dark mode extension relied upon had been permanently deleted and replaced on `main`, Git could not automatically apply the old theme rules. It flagged a merge conflict, requiring manual developer intervention to update the dark mode styles so they properly targeted the newly refactored variable nomenclature.