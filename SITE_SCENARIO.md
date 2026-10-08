# Portfolio experience — scenario and evidence map

## Purpose

An English-first, Russian-optional interactive introduction for a recruiter or hiring manager. The first screen must identify Nikolay as an Applied AI Engineer and provide direct contact. The experience should still make sense if the visitor never plays the game.

## Visitor journey

1. **Opening / 10 seconds.** Name, role and one clear promise: turning operational problems into AI tools that people can actually use. Controls: scroll, chapter dots, direct `Work`, `Skills`, and contact.
2. **Three proof scenes / under one minute.** Each scene changes the 3D environment while the content stays in one reading area: retail assistant (`ZalAssist`), operator automation (`operator-card-bot` plus `aws-brand-site`), and evaluation / human review (`assistant-hub`). Each scene offers a repository link and distinguishes shipped code from architecture.
3. **Career and education.** Use the current CV as the approved source: backend work at Macy's, Sharp Decisions and Turing; AI automation at Nelson Connects; independent Applied AI work. Show electronics engineering at Immanuel Kant Baltic Federal University and AI engineering coursework / professional training at Beihang University. Beihang must not be presented as a degree.
4. **Invitation.** One more scroll after the final story scene slides the presentation left and reveals Skill match from the right. Closing the game reverses the transition. The recruiter can swipe right for needed skills or left for less relevant ones. Button and keyboard equivalents are always available. Every skill card answers where it was learned and where it was used, with a project link where public evidence exists.
5. **Match report.** Summarize chosen capabilities and show the most relevant public projects. Never manufacture a percentage of “compatibility” or claim that the employer and candidate match automatically. For unfamiliar requirements, offer to discuss the gap and a concrete learning plan, without claiming prior experience.
6. **Action.** Telegram, LinkedIn, GitHub, email. Restart or revisit selections. The site does not collect or transmit the recruiter’s choices.

## Copy rules

- Nikolay confirmed that the current attached CV is correct and older local versions are obsolete. The site may use its experience, employers, and metrics. Project links supply additional evidence where available. Do not import claims that appear only in old local drafts.
- Where public repositories exist, link to implemented code. Do not present a solution-design repository as a shipped production system.
- The “match” result is based only on the visitor’s selections. Left means “not needed for this role,” not “Nikolay lacks this skill.”
- Education wording follows the latest attached CV, without a Beihang degree claim.
- Keep all substantive text in semantic HTML so search engines and assistive technology can read it without WebGL.

## Visual and interaction direction

- Editorial typography and calm dark surfaces, with warm coral for selections and cool cyan for systems engineering.
- One persistent content frame; scenes shift color, depth, and 3D objects rather than moving the reader through a long document.
- Procedural rings, nodes, glass blocks, and connection lines reflect the work: systems, workflow, and evaluation. No stock avatars or borrowed portfolio assets.
- Low-motion path and mobile performance fallback. All essential interactions work without 3D.

## Open-source research

- [`react-tinder-card`](https://github.com/3DJakob/react-tinder-card) — MIT; swipe gestures, button-driven swipe and undo pattern. We use its interaction model, with a small dependency-free implementation suitable for a static GitHub Pages site.
- [`r3f-portfolio`](https://github.com/nothingnothings/r3f-portfolio) — MIT; persistent 3D world, scene transitions and reduced-motion fallback informed the presentation architecture. We do not reuse its personal assets, text, or 3D models.
- [`Swing`](https://github.com/gajus/swing) — BSD-3-Clause; stack and throw-in/throw-out interaction conventions informed the skill deck.

The site is new artwork and code; these projects are credited as architectural and interaction references. The 3D runtime uses Three.js, which is MIT licensed.
