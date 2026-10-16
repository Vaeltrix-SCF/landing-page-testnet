# Heron AI landing-page inspection

Reference: https://heronaiapp.com/
Inspected: October 14, 2026. Live browser at 837 × 898, from preloader through footer. This records observations, not a reconstruction of the original source.

## Shared design system

Warm paper surface with fine grain; dark charcoal; restrained red-orange. Thin ruled borders create continuous columns across sections. Solid boundaries, dashed technical dividers, corner crosses, ruler ticks, and coordinate labels. BT Grotesk headings/body confirmed from computed styles; tight negative tracking, uppercase headings, smaller technical labels. Images combine monochrome architectural renderings and floor plans with orange issue highlights. Header remains fixed; its wordmark condenses to an icon while scrolling. A small orange square follows the pointer, with a canvas overlay and animated connecting lines visible during interaction. Buttons use duplicate text layers and a separated arrow compartment; text rollover mechanism is inferred from markup, not independently hover-tested.

## Section inventory and behavior

1. Preloader: percentage, thin orange progress line, architectural wire outline, technical initialization list, agency credit. Observed in the initial visit, including 97% stage. Resolves to hero.
2. Header/navigation: divided logo, menu, contact cells. Menu opens a bordered dropdown with Product, Pricing, Resources, About. Opening/closing observed. Product/resources are nested controls; links point to separate pages.
3. Hero: architectural building illustration inside a ruler frame, two orange markers, oversized uppercase proposition below, adjacent descriptive copy and Discover More link. Benefits form a moving, repeated horizontal strip. Building rendering should not be assumed to be real-time 3D; DOM exposes an image. Clicking a hero marker produced no independently verified callout in this pass.
4. Intro: split architectural tower image and short statement/outlined Learn More button. Text reveals on entry. Client logo strip below has Previous/Next controls; Next was activated and different logo positions observed. Platform compatibility caption completes the strip.
5. Problems: heading/copy split followed by four two-column tiles: Manual, Disjointed, Blind, Slow. Numbered top labels; large line-art geometric illustrations; short heading and description. Illustrations progressively draw/reveal while scrolling. Geometry rendering implementation is not established.
6. Pinned story: long scroll region (~4854 px at inspected viewport). Framed stage remains in place as two large introductory headlines change, followed by progressively revealed floor-plan layers, furniture, dimensions and code markers. Small black-headed Introduction panel changes its paragraph with progress and prompts scrolling. Scroll-back reverses stages. Three orange numbered markers reveal local callout panels with orange borders, code IDs and explanations. All three activated and visually verified: Exit Access Travel Distance; Door Swing Direction; Accessible Toilet Clearance. Active marker highlights corresponding area; prior panel fades away. Exact hover-only versus click handling was not isolated.
7. Connected-tools section: split title/body on left; four compatibility/capability rows with icon cells on right. The content explains software integration, geometry understanding, suggestions, approval.
8. Product previews: two horizontal image/copy rows. Chat Widget and Dashboard have bracketed numbers, large titles, descriptions and full-width Learn More footers. These previews are images, not live working product interfaces.
9. Why-us/process: split heading/body, then alternating image and charcoal-caption cells for Observe, Advise, Act, Learn. Red-orange lines and markers connect the sequence. Images and labels reveal as sections enter view. Animated plan/interface illustrations demonstrate each stage.
10. Architectural visual break: full-width monochrome plaza/building scene with large orange circle and vertical shape, before audience list.
11. Use cases: title followed by eight ruled rows: Architects, Interior Designers, Landscape Architects, Engineers, BIM Managers, Drafters, Design Leads, Small Firms. Plus/minus indicators. Opening a new row collapses previous row, exposes short explanatory copy, adjusts height. Architects and Landscape Architects expanded states observed.
12. Final CTA: centered heading, supporting sentence and filled orange Contact Us button, all inside coordinate/dashed grid; architectural sketch below. Entry text reveal and orange decorative motion.
13. Footer: split proposition/newsletter region, email field and arrow submit; ruled information grid with Company, Product, Resources, business email, address, general inquiry, social links and large outlined mark. Oversized HERON AI wordmark below, ruler borders, copyright/credit/legal row. Newsletter was inspected without submitting.
14. Cookie banner: bottom-right bordered panel, Learn More and duplicated-text Accept/Reject buttons. Reject dismissed it. Awwwards ribbon stays on right edge while browsing.

## Confirmed implementation clues

Rendered document exposes Webflow stylesheet/runtime; loaded scripts include GSAP, ScrollTrigger, SplitText, TextPlugin, Lenis, Swiper, Barba core/prefetch. One canvas was present at 2× viewport pixel dimensions. These establish available libraries, not which library owns every individual effect. Observed behavior supports pinned/scrubbed timeline, split-text reveals, smooth scroll, carousel, layered annotations and pointer overlay.

## Inspection limits

No original source repository was accessed. Exact animation durations, easing, shader algorithms and all breakpoint rules remain unverified. Browser control supports scroll and clicks, but no dedicated pointer-hover action was available; pointer-related visuals were observed during clicking. External product/contact/pricing pages are outside this landing-page pass. No forms submitted or project UI changed.
