# Conflict 2: Dynamic Project Showcase

**Conflict Type:** Modify vs. Delete

**Why this conflict was triggered:**
This conflict occurred because two feature branches (`feat/5-structured-data` and `feat/6-dynamic-injection`) diverged from the same historical commit on the `main` branch and applied directly opposing changes to the `ProjectShowcase.vue` component.

* **Branch A (`feat/5-structured-data`)** actively modified the existing static HTML elements (e.g., updating the text within the hardcoded `<article>` tags to say "Version 2.0").
* **Branch B (`feat/6-dynamic-injection`)** completely deleted those exact same static HTML elements to replace them with a dynamic Vue `v-for` loop.

When Branch A was merged first, it locked its modifications into the `main` branch. When attempting to merge Branch B immediately afterward, Git recognized that Branch B was attempting to delete the exact lines of code that Branch A had just intentionally updated. 

Because Git cannot safely guess whether the new modifications should be preserved or if the deletion should override them, it halted the automatic merge. It flagged a `modify/delete` conflict, requiring a human developer to manually intervene and confirm that the dynamic Vue loop should take precedence and the modified static HTML should be permanently removed.