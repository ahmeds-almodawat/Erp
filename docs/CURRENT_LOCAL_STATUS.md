# Current Local Status

Date: 2026-05-05

## Product Position

The local workspace is now aligned around **v313 Reporting Truth** while retaining the v312 import staging and v311 backend posting foundations.

The visible app now surfaces:

- v312 import staging, mapping, cutover, duplicate-hash, and rollback controls inside Import / Export.
- v313 reporting truth status, score, source explainability, and findings inside Reports.

## Engineering Status

- TypeScript strict project check passes with `npm run typecheck`.
- Production build passes with `npm run build`.
- The largest entry chunk is now about 400 kB after lazy-loading heavy panels/pages and splitting React/icons into vendor chunks.
- v311 posting-engine domain smoke QA passes with `npm run qa:v311:domain`.
- v312/v313 domain smoke QA passes with `npm run qa:v313:domain`.
- Combined domain QA passes with `npm run qa:domain`.
- Full local release gate passes with `npm run qa:local`.
- Package metadata now identifies the app as `restaurant-erp-v313-reporting-truth` at `1.0.13`.
- QA scripts now include `qa:v312` and `qa:v313`.

## Next Professional Push

- Wire the v312 import workflow to Supabase RPCs instead of foundation-only frontend panels.
- Compute v313 report truth from posted v311 batches and v312 cutover batches.
- Continue splitting the large AppShell into module route files so domain pages can evolve independently.
- Follow `docs/ULTRA_ENTERPRISE_ERP_ROADMAP.md` for the full enterprise ERP plan.
- Expand automated QA coverage into AppShell regression checks and Supabase integration tests.
- Add automated tests around posting validation, import rollback, and truth scoring.
