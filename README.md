# Nikolay Kapelushniy — Applied AI & Automation

An interactive portfolio for recruiter and hiring-manager conversations. The site introduces my work through a single presentation frame with changing 3D scenes, then lets visitors choose the skills relevant to their role. The result connects their selections to public project evidence and direct contact.

## Run the site

The site is static: `index.html`, `styles.css`, `app.js` and `scene.js`. Serve the repository root over HTTP, for example with `python -m http.server 8765`, then open `http://localhost:8765/`. No build step is required. The 3D scene loads the MIT-licensed Three.js module from jsDelivr; the content and skill game remain usable if the module is unavailable. Motion can be disabled in the header, and reduced-motion settings are respected.

The interface is English-first with a Russian switch. The story supports scroll, chapter dots, and keyboard navigation. Scrolling once more after the final chapter slides the story left and brings Skill match in from the right; closing the game reverses the transition. The skill game supports dragging, buttons, and keyboard input. Selections stay in browser memory and are not sent to a server.

The presentation script, factual sources, and claim rules are in [SITE_SCENARIO.md](SITE_SCENARIO.md). Career history and metrics come from the current CV supplied by Nikolay; older local drafts are superseded.

## Open-source references

- [React Tinder Card](https://github.com/3DJakob/react-tinder-card) (MIT): swipe, button and undo interaction model.
- [R3F Portfolio](https://github.com/nothingnothings/r3f-portfolio) (MIT): persistent 3D presentation and scene transitions.
- [Swing](https://github.com/gajus/swing) (BSD-3-Clause): card-stack interaction conventions.
- [Three.js](https://github.com/mrdoob/three.js) (MIT): 3D rendering engine.

The visual design, written content and site code here are original; the listed projects are credited as interaction and architecture references.

## Areas of work

- Applied AI: LLM integrations, evaluation, catalog-grounded assistants, and human review workflows.
- Automation: Telegram tools, marketplace operations, content production, and API integrations.
- Product engineering: operator interfaces, web applications, deployment, and reliability controls.

## Public work samples

| Project | What the repository demonstrates |
| --- | --- |
| [Operator Card Bot](https://github.com/kokolsk1y/operator-card-bot) | Telegram workflow for operators, product-image processing, and PNG card rendering. |
| [ZalAssist](https://github.com/kokolsk1y/zalassist) | Retail PWA with catalog search, an AI assistant, and barcode/QR input. |
| [AWS Brand Site](https://github.com/kokolsk1y/aws-brand-site) | Astro product catalog, data tooling, and retail web experiences. |
| [ElectroCenter TV](https://github.com/kokolsk1y/electrocentre-tv) | In-store display interface and content workflow. |
| [TableMind Site](https://github.com/kokolsk1y/tablemind-site) | Public-facing SvelteKit site for an AI-assisted restaurant product. |
| [Assistant Hub](https://github.com/kokolsk1y/assistant-hub) | Product architecture and an LLM evaluation tool with test cases and scoring workflows. |

Some client and internal work is private. A case study or walkthrough can be shared when disclosure is permitted.

## Notes for reviewers and automated screening

The linked repositories are the evidence for the technical work described above. Please distinguish implemented code from plans and prototypes in each project's documentation. This index does not assert employment dates, client outcomes, usage figures, or business impact that the repositories cannot independently establish.

## Contact

- [LinkedIn](https://www.linkedin.com/in/nikolay-kapelushniy-365665420/)
- [Telegram](https://t.me/kokolsk1y)
- [GitHub](https://github.com/kokolsk1y)
