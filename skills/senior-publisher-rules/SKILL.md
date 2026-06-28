---
name: senior-publisher-rules
description: Use this skill for ThinkWare user publishing work under user/publishing when creating or editing HTML, CSS, or Vanilla JS. Apply senior publisher standards: semantic HTML5, shallow DOM, accessible markup, maintainable CSS, no inline styles, no duplicated selectors, and production-ready output.
---

# Senior Publisher Rules

Apply these rules to every `user/publishing/` HTML/CSS/JS change in this project.

## Core Standards

- Write production-ready code that looks human-crafted by a senior publisher, not over-explained or decorative.
- Use semantic HTML5 first.
- Keep DOM depth at 5 levels or less for new or modified markup. If existing markup exceeds this, do not deepen it; simplify the touched area when practical.
- Remove unnecessary wrappers, duplicated selectors, unused CSS, and unused JS in the touched scope.
- Use BEM or clear role-based naming for new classes. Preserve established project prefixes such as `.twc-*`, `.publish-*`, `.flow-*`, and `.sheet-*` when editing existing code.
- Use design tokens and maintainable component patterns instead of one-off styling.
- Keep accessibility mandatory for buttons, links, forms, dialogs, tabs, modals, and dynamic states.

## Markup Rules

- One section should have one clear responsibility.
- Use headings in a logical order. Do not skip heading levels for visual styling.
- Buttons must be real `<button type="button">` unless they submit a form.
- Links must be real `<a>` only when navigation is intended.
- Form controls must have explicit labels or accessible names.
- JS hooks must use `data-*` or clearly named behavior classes; do not bind behavior to purely visual utility classes.
- Repeated UI must use the same markup pattern across states and screens.
- Do not add inline styles.

## CSS Rules

- Design values must come from `user/publishing/css/tokens.css`.
- CSS nesting is prohibited.
- Avoid complex expressions: no nested `calc()`, `min()`, `max()`, `clamp()`, or hard-to-read grid formulas.
- If a value needs explanation, create a meaningful token instead of hiding the reason in a formula.
- Keep content sections visually inset by `20px` via `.twc-content`; backgrounds, borders, and radii must not touch the shell edge.
- Fixed shape elements must not stretch with viewport width: icons, circular buttons, square media, and status icons keep token sizes.
- Prefer `width: 100%` plus `max-width` over compact function expressions.
- Keep selectors shallow and specific enough. Avoid selector chains that depend on fragile DOM depth.
- Remove duplicated selectors in the touched file unless merging would require unrelated refactoring.

## JavaScript Rules

- Use Vanilla JS and event delegation where it keeps behavior simple.
- Keep state changes explicit with classes and `aria-*` updates.
- Write only the minimum JS needed for the feature.
- Use jQuery only when the existing project surface already depends on it. Do not introduce jQuery to `user/publishing/`.
- Do not create global variables unless needed by the integration contract.
- Do not add network calls, authentication, storage, or backend assumptions unless explicitly requested.
- Remove unused JS in the touched scope.
- Validate changed JS with `node --check`.

## Review Checklist

Before finishing a publishing change, verify:

- HTML uses semantic tags and no unnecessary wrappers were added.
- New or modified DOM depth stays within 5 levels where practical.
- No inline styles or CSS nesting were introduced.
- No duplicated selectors, unused code, or complex CSS formulas remain in touched files.
- Layout uses design tokens and existing component classes.
- Interactive controls work by keyboard and have accessible names.
- Text wraps by word and does not overlap at mobile width.
- Code is concise and avoids AI-like over-explanation or decorative structure.
- `node --check user/publishing/js/chatbot.js` passes when JS changed.
