# Universe Lab v2
This feature branch is a preview; main is unchanged.

- Galaxy: CSS planet navigation based on existing project data.
- Terminal: navigation, help, and hidden command `42` (or `sudo universe`).
- GitHub dashboard: public API with 15-minute cache.
- Digital Twin: offline knowledge and optional Cloudflare Workers AI, browser read-aloud; no claim to represent the developer personally.
- Cinematic tour, searchable command palette (Ctrl/Cmd+K), smart room day/night lighting, synthesized interaction sound toggle, existing arcade and Easter eggs, device-local achievements, recruiter summary and career timeline.
- Visitor globe: only counts voluntary country check-ins; approximate markers; no IP stored, no precise location or identity collected. Browser cookie/local storage limits casual repeat check-ins, not fraud-proof. No automatic tracking.
- No additional JS dependencies or WebGL scenes.

## Deployment
1. Use an isolated Cloudflare preview environment. Bind the existing D1 database (binding name DB) or a separate preview DB. Apply migrations/0002_universe_lab.sql to the preview DB using the Cloudflare dashboard or wrangler. The current wrangler.jsonc lacks a DB binding; use the real DB id from the owner rather than inventing one.
2. Optionally bind Cloudflare Workers AI as AI in the preview environment, confirm the configured model is available, and confirm quota/cost. The server has a global 50-request/day cap through D1; visitors must explicitly opt into cloud AI. No credentials are committed. Without AI the assistant uses local portfolio data; without D1 visitor stats show unavailable.
3. Build using the repo's npm run build, test mobile, keyboard, intro, all tabs, day/night, arcade, API failure and success paths, and verify no unwanted data is stored. Check Cloudflare preview configuration separately. Do not merge before review.
4. Close PR to discard, or revert merge commit if merged. D1 migration is additive; retain or remove tables separately only after verifying no needed data.
