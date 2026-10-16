# Vaeltrix landing page

A Next.js presentation of the proposed Vaeltrix payment reliability protocol on Stellar and Soroban. Includes an animated blueprint hero, scroll-triggered GSAP text reveals, an interactive payment journey, SLA template tabs, payment examples, and a protocol brief at `/docs`.

## Development

```sh
npm ci
npm run dev -- --port 3001
```

Open http://localhost:3001. Fonts and illustration assets are hosted locally.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test
npm audit
```

Smoke tests require a running server. They check both pages, local resources, fragment links, the PDF, and missing-page behavior. Set `TEST_BASE_URL` to test another server. For production verification, run `npm start -- --port 3002` after building, then `TEST_BASE_URL=http://localhost:3002 npm test`.

## Scope

This is a protocol presentation, with illustrative testnet parameters. Contracts, observers, APIs, wallet connections, and live payment data are not implemented. The technical specification is available at `/vaeltrix-specification.pdf`.

## Stack

Next.js App Router, React, TypeScript, Tailwind PostCSS, GSAP SplitText and ScrollTrigger. Animation respects reduced-motion preferences. Dependencies are locked in `package-lock.json`.

## Dependency audit

As of October 16, 2026, the production dependency audit reports no known vulnerabilities. The full audit reports five high-severity findings from one unpatched development dependency, `braces`, through the Next.js ESLint tooling. The latest published `braces` version is affected. Recheck `npm audit` before releases; do not apply its proposed Next.js tooling downgrade blindly.

Design research and implementation notes are in `docs/`. Local screenshots, generated review PDFs, and temporary files are excluded from Git.
