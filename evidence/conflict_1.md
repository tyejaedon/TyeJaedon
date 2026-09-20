# Conflict 1: Global CSS Variables

**Conflict Type:** Concurrent Modification (Same Line)

**Why this conflict was triggered:**
This conflict occurred because two separate feature branches (`style/3-color-palette` and `style/3-typography`) were created from the exact same historical state of the `main` branch. 

In both isolated branches, modifications were made to the exact same line (Line 2) within the same file (`src/style.css`):
* **Branch A (`style/3-color-palette`)** modified the line to add: `--primary-accent: #ff6a3d;`
* **Branch B (`style/3-typography`)** modified the line to add: `--primary-accent: #1ca6a4;` and `--font-main: 'Avenir Next', sans-serif;`

When Branch A was successfully merged, it updated the `main` branch with its specific color variable. When attempting to merge Branch B immediately afterward, Git detected that Branch B was trying to overwrite a line that had already been altered by Branch A. 

Because Git cannot intuitively know which CSS variable should take precedence, it halted the automatic merge process and flagged a conflict, requiring manual human intervention to safely combine both the color palette and typography variables into the final root selector.