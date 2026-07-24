# Blueprint 11-Destination Separability Audit (BP-001)

**Status:** Audit and design only. No production file was modified — `recommendationEngine.js`, `scoringEngine.js`, `cityProfiles.js`, `questions.js`, and every UI component are unchanged from `8e634110727f109503419c1a90f1dd5eac5e0691`. All findings below come from exhaustively enumerating the real questionnaire's answer space and replaying it through a byte-for-byte replica of the production ranking formula (parity-checked against the real `buildRecommendation()` — 0 mismatches across 29 spot checks).

## Method

The six-question Blueprint (`src/features/blueprint/data/questions.js`) has a small, fully enumerable answer space:

| Question | Options |
|---|---|
| `timeline` | 4 |
| `lifeStage` | 5 |
| `budget` | 4 |
| `lifestyle` | 4 |
| `household` | 4 |
| `residencyFamiliarity` | 3 |

**4 × 5 × 4 × 4 × 4 × 3 = 3,840 total valid combinations.** Every one was generated programmatically by iterating the real `QUESTIONS` array's own options — no hand-written tag object was used anywhere in this audit. Each combination was run through the real `computeScores()` (`scoringEngine.js`), then ranked across all 11 `CITY_PROFILES` entries using the exact formula `recommendationEngine.js`'s `rankCityMatches()` uses (`matchScore = Σ tagCounts[tag]` for each of a city's own tags, stable sort descending). This replica was verified against the real `buildRecommendation()` output at 29 sample points with zero mismatches, confirming it faithfully reproduces production behavior, including the tie-break: JavaScript's `Array.prototype.sort` is stable, so when two cities tie on `matchScore`, whichever appears earlier in `CITY_PROFILES` (`playa-del-carmen` → `tulum` → `riviera-maya` → `merida` → `progreso` → `chicxulub-puerto` → `telchac-puerto` → `celestun` → `sisal` → `dzilam-de-bravo` → `santa-elena`) is what the real app displays as the winner.

Three metrics were tracked per combination:
- **Strict #1**: one city's score strictly exceeds every other city's.
- **Tied #1**: two or more cities share the top score (the app still shows exactly one "winner," decided purely by array position).
- **Displayed #1**: whichever city the real app actually shows as the top match — `strictFirst` plus whichever tied city happens to win the array-order tie-break.

All three temporary scripts that produced this data (`__bp001_enumerate.test.js`, `__bp001_alternatives.test.js`, and the generated `__bp001_output__.json`) were deleted before this commit — see the closing section.

## 1–3. Winner-distribution table

All 3,840 real combinations, full 11-city ranking, `displayedFirst` = what a real visitor would actually see as their top match.

| Destination | Strict #1 | Tied #1 | **Displayed #1** | % of all combos | Top-2 | Top-3 |
|---|---:|---:|---:|---:|---:|---:|
| Playa del Carmen | 468 | 584 | **1,052** | 27.4% | 1,396 | 1,598 |
| Tulum | 540 | 1,132 | **1,268** | 33.0% | 2,348 | 2,798 |
| Riviera Maya | 140 | 512 | **480** | 12.5% | 734 | 1,040 |
| Mérida | 70 | 288 | **116** | 3.0% | 412 | 664 |
| Progreso | 0 | 196 | **12** | 0.3% | 138 | 734 |
| Chicxulub Puerto | 36 | 346 | **70** | 1.8% | 358 | 578 |
| Telchac Puerto | 130 | 942 | **212** | 5.5% | 1,084 | 1,784 |
| Celestún | 12 | 380 | **24** | 0.6% | 106 | 336 |
| **Sisal** | 0 | 182 | **0** | **0.0%** | 36 | 142 |
| Dzilam de Bravo | 86 | 548 | **212** | 5.5% | 404 | 678 |
| Santa Elena | 394 | 1,034 | **394** | 10.3% | 664 | 1,168 |
| **Total** | | | **3,840** | 100% | | |

(`Displayed #1` sums to exactly 3,840 — every combination has exactly one displayed winner, confirmed programmatically.)

**Strongest realistic profile, tags produced, and matchReason honesty** — for each city, the real answer combination that maximizes its margin over 2nd place (or, where no clear win exists, its best tied result):

| Destination | Profile (answers) | Tags produced | Margin over 2nd | `matchReason` (real output) | Honest? |
|---|---|---|---:|---|---|
| Playa del Carmen | asap / remote / premium / cityEnergy / solo / researched | urgent:2, remoteWork:1, urban:2, premium:1, beach:1 | +2 | "Matches your pull toward walkable city energy and love of beach life." | ✅ |
| Tulum | exploring / entrepreneur / premium / beachTown / solo / none | exploratory:2, urban:1, premium:2, beach:2, quiet:1 | +2 | "Matches your love of beach life and preference for a slower pace." | ✅ |
| Riviera Maya | asap / retiree / lean / cityEnergy / familyKids / researched | urgent:2, retirement:1, quiet:1, budgetConscious:1, urban:1, family:1 | +1 | "Matches your preference for a slower pace and family-first priorities." | ✅ |
| Mérida | asap / remote / lean / cityEnergy / solo / researched | urgent:2, remoteWork:1, urban:2, budgetConscious:1 | +1 | "Matches your pull toward walkable city energy and need for remote-work flexibility." | ✅ |
| Progreso | *(no clear win exists)* asap / family / premium / cityEnergy / familyKids / researched | urgent:2, family:2, quiet:1, premium:1, beach:1, urban:1 | tied w/ Chicxulub, score 4 | "Matches your love of beach life and pull toward walkable city energy." | ✅ (but only ever shown via tie luck) |
| Chicxulub Puerto | asap / family / comfortable / beachTown / familyKids / researched | urgent:2, family:2, quiet:2, comfortable:1, beach:1 | +1 | "Matches your love of beach life and preference for a slower pace." | ✅ |
| Telchac Puerto | asap / retiree / lean / notSure / solo / none | urgent:1, retirement:1, quiet:1, budgetConscious:1, exploratory:2 | +1 | "Matches your preference for a slower pace and still-exploring mindset." | ✅ |
| Celestún | asap / retiree / lean / beachTown / solo / researched | urgent:2, retirement:1, quiet:2, budgetConscious:1, beach:1 | +1 | "Matches your love of beach life and preference for a slower pace." | ✅ |
| **Sisal** | *(no clear win exists, ever)* asap / retiree / comfortable / beachTown / solo / researched | urgent:2, retirement:1, quiet:2, comfortable:1, beach:1 | **tied w/ Celestún, score 4 — Celestún always wins the tie-break** | "Matches your love of beach life and preference for a slower pace." | ✅ (honest, but never actually shown as the top pick) |
| Dzilam de Bravo | asap / remote / lean / notSure / familyKids / none | urgent:1, remoteWork:1, urban:1, budgetConscious:1, exploratory:2, family:1 | +1 | "Matches your still-exploring mindset and family-first priorities." | ✅ |
| Santa Elena | asap / family / notSure / quietNature / familyKids / none | urgent:1, family:2, quiet:2, exploratory:2 | +2 | "Matches your preference for a slower pace and still-exploring mindset." | ✅ |

**Every `matchReason` that does get shown is honest** — it's mechanically derived from the visitor's own real overlapping tags (`buildMatchReason()` just picks the first two), so there is no dishonesty risk in the copy itself. The dishonesty risk is structural, not textual: **Sisal's card, when it does surface, correctly and honestly explains why it fits — the problem is it can never surface as the featured #1 pick, no matter how well it actually fits.**

## 4. Findings — dominance, collisions, and expressive gaps

### Destinations that can never rank first

**Sisal — confirmed, exhaustively, with zero exceptions.** Across all 3,840 real combinations, Sisal's `displayedFirst` count is **0**. Its absolute ceiling score, reachable through any real answer path, is 4 (`beach:1 + quiet:2 + comfortable:1`) — and every single one of the 182 combinations where it reaches that ceiling, at least one earlier-array city (`celestun`, `chicxulub-puerto`, or `riviera-maya`, depending on exact profile) reaches the same score and wins the tie-break by array position. This is not a near-miss; Sisal has no code path to victory under the current tag vocabulary and city-profile design.

**Progreso — functionally the same problem.** `strictFirst = 0`; its only 12 displayed wins (0.3%) come entirely from lucky tie-break positioning against `chicxulub-puerto`, which shares its full `{beach, urban, family}` set as a subset relationship in practice (Progreso never has a profile where it isn't tied with something).

### Destinations that only win through weak/implausible margins

Several destinations technically "can" win but only barely, or only via a somewhat coincidental profile: **Celestún** (24 displayed wins, 0.6%, margin +1) and **Chicxulub Puerto** (70 displayed wins, 1.8%, margin +1) both depend on a fairly specific `family`-inflected profile that isn't their core stated identity (Celestún is nature/retirement-first; the winning profile leans on an incidental `family` overlap with `chicxulub-puerto`'s own set rather than Celestún's own distinguishing signal). None of the found winning profiles are internally *contradictory* (e.g., no city's win required simultaneously selecting mutually exclusive lifestyle preferences), so nothing here rises to "implausible" — but several are thin.

### Pairs with nearly indistinguishable scoring

Measured as "score difference ≤ 1" among combinations where at least one of the pair is in the real top 3:

| Pair | Exact ties | Near-ties (≤1) |
|---|---:|---:|
| **Telchac Puerto ↔ Tulum** | 1,332 (34.7%) | **2,958 (77.0%)** |
| Santa Elena ↔ Tulum | 902 (23.5%) | 2,224 (57.9%) |
| Santa Elena ↔ Telchac Puerto | 822 (21.4%) | 2,120 (55.2%) |
| Dzilam de Bravo ↔ Tulum | 638 (16.6%) | 1,696 (44.2%) |
| Playa del Carmen ↔ Tulum | 532 (13.9%) | 1,526 (39.7%) |

Telchac Puerto and Tulum are nearly indistinguishable across more than three-quarters of the entire answer space — both share `{beach, quiet, exploratory}`, differing only in `premium` (Tulum) vs. `budgetConscious` (Telchac). The existing `recommendationEngine.test.js` regression test ("Telchac Puerto beats Tulum on an otherwise identical profile") already documents and intentionally accepts this specific collision as *correct* — Telchac is deliberately positioned as "the budget-conscious Telchac vs. the premium Tulum" — so this pair's overlap is partly by design, not purely a defect. It's flagged here because 77% co-occurrence is still very high and worth being aware of, not because it needs to be eliminated.

### Dominant cities suppressing more specific destinations

**Playa del Carmen + Tulum together capture 60.4% of all 3,840 real combinations' displayed #1 result.** Tulum alone (33.0%) is the single largest winner in the system. Both draw from the most common, least-specific tag combinations (`beach`, `urban`, `quiet`, `premium`) — any visitor whose answers don't strongly signal something more specific (retirement, remote work, family, exploration) defaults to one of these two almost automatically, crowding out the 8 more specific destinations by sheer structural gravity.

### Questions/tags carrying excessive influence

- **`beach` and `quiet` are each used by 7 of 11 destinations (63.6%)** — the two most overloaded tags in the system, and the direct cause of most collisions above.
- **`exploratory` can reach a count of 5** (one point from *each* of `timeline=exploring`, `lifeStage=freshStart`, `budget=notSure`, `lifestyle=notSure`, `residencyFamiliarity=none`) — a visitor who answers "not sure" to nearly everything stacks this single tag far higher than any other, giving outsized weight to the four cities that use it (`tulum`, `telchac-puerto`, `dzilam-de-bravo`, `santa-elena`) whenever a visitor is simply undecided rather than genuinely signaling any of those four's actual identity.
- **`urgent` is used by zero city profiles** (confirmed — this is intentional design, not an oversight: urgency is a timeline signal, not a place-fit signal, and correctly stays out of the matching layer).

### Destination attributes the questionnaire currently cannot express

None of the following real, distinguishing identities have *any* dedicated tag — they're currently approximated only through incidental overlap with generic tags (`quiet`, `beach`, `exploratory`, `retirement`) that are already claimed by several other cities:

- **Conservation/nature-first orientation** (Celestún's biosphere reserve, Dzilam de Bravo's mangrove estuary) — currently invisible; both compete purely on `beach`/`quiet`/`exploratory`, indistinguishable from any other coastal town.
- **Heritage/Pueblo Mágico/historic-place identity** (Sisal's restored 19th-century port, Santa Elena's living Maya culture) — currently invisible; this is the single biggest reason Sisal specifically has no winnable path (its actual differentiator, history and heritage, has no signal to attach to).
- **Genuine remoteness/self-sufficiency as a *positive* pull** (Dzilam de Bravo, Telchac Puerto) — currently approximated only by `quiet` + `exploratory` + `budgetConscious`, none of which specifically mean "I want to be far from everything," just "I'm undecided and price-sensitive."
- **Colonial-city / established-urban-hub identity distinct from beach-town urban** (Mérida) — currently shares the generic `urban` tag with Playa del Carmen, with nothing capturing "I want a real city with culture and healthcare, not a resort town."

## 5. Regression stability check

The three established profiles in `recommendationEngine.test.js` ("Premium-Solo-Urban → Playa del Carmen," "Unknown-Couple-Quiet → Tulum," "Comfortable-Family-Quiet → Riviera Maya") were re-run against the current codebase — **all 15 tests in the suite pass**, including all DEST-001/DEST-002 "wins its own signal profile" cases. These three profiles also appear, unchanged, inside the 3,840-combination enumeration above and resolve to the same winners the tests assert. No drift.

## Sisal conclusion

**Confirmed, not disproven.** Sisal cannot win the #1 spot through *any* of the 3,840 real answer combinations reachable via the actual six-question UI — not a rare edge case, not a near-miss, a mathematical zero. Its existing `recommendationEngine.test.js` test ("Sisal wins for beach + quiet + comfortable signals") passes only because it calls `buildRecommendation()` with a **hand-constructed synthetic `tagCounts` object** (`{beach:1, quiet:1, comfortable:3}`) that no real questionnaire path can ever produce — `comfortable` can only ever reach a real count of 1 (it comes from exactly one option, `budget=comfortable`), never 3. That test is not wrong on its own terms (it does prove Sisal's tag *set* isn't a strict subset of any other city's, which was the DEST-002-era design goal), but it does not — and structurally cannot — demonstrate real-world reachability. This audit closes that gap conclusively: **Sisal's real-world reachability is 0%, both for a strict win and for a tie-break win.**

## 6–7. Recommended minimal solution, and what was tested to get there

Three alternatives were built and run through the same exhaustive enumeration, entirely offline (deep-cloned in-memory overrides of `QUESTIONS`/`CITY_PROFILES` — no production file touched):

| Alternative | Change | Sisal displayed #1 | Playa+Tulum share | Telchac↔Tulum near-tie | Regression |
|---|---|---:|---:|---:|---|
| **Baseline** (current production) | — | 0 / 3,840 (0.0%) | 60.4% | 95.0% | passes |
| **A** — tag-only: add `urban` to Sisal | No new question/tag | 44 / 3,840 (1.1%) | n/a (side effect: Playa drops to 26.5%) | n/a | passes, but **side effects ripple into Playa/Mérida's own win counts** (Playa 1,052→1,018) via new ties, and Sisal's wins partly come from `quiet`+`urban` co-occurring — a thematically odd combination for a real visitor (city-energy *and* slow-paced quiet in the same answer set) |
| **B** — tag-mapping: reuse `lifeStage=freshStart` to also grant a new `heritage` tag, given to Sisal + Santa Elena | No new question, 1 new tag piggybacked on an existing option | 36 / 3,840 (0.9%) | not isolated | not isolated | passes, but the semantic link ("wanting a fresh start" → "heritage/history interest") is a stretch, and the gain is small since `freshStart` only ever contributes 1 point |
| **C** — one new, 4-option question ("place character": culture/heritage, nature/wildlife, established-coastal, true-remoteness), tags assigned to the cities that actually have that identity | +1 question | **316 / 15,360 (2.1%)** | **48.1%** (from 60.4%) | 91.3% (from 95.0%) | **passes** |

**Alternative A** and **B** were rejected: A works only by giving Sisal a tag (`urban`) that isn't true to its identity and has visible ripple effects on unrelated cities' win counts; B's gain is marginal and its tag-to-question mapping isn't honestly motivated. Neither meaningfully touches the real root cause — **the tag vocabulary has no way to express heritage, nature-first orientation, or genuine remoteness as positive pulls**, which is precisely the gap identified in section 4.

**Recommendation: Alternative C — add exactly one new question.** It is the smallest change that addresses the actual structural gap rather than working around it, and the numbers back it decisively:

- **Sisal becomes reachable** (0% → 2.1%) for the first time, via its genuine identity (Pueblo Mágico heritage), not a borrowed one.
- **Every previously-weak destination improves**: Progreso 0.3%→2.8%, Celestún 0.6%→2.7%, Telchac Puerto 5.5%→12.1%, Dzilam de Bravo 5.5%→9.9%.
- **The dominant pair's grip loosens substantially**: Playa+Tulum's combined share drops from 60.4% to 48.1% — Tulum alone drops from 33.0% to 21.2%.
- **The three established regression profiles are unaffected** (re-verified with a neutral 7th answer appended).
- A second question was evaluated as unnecessary: one question already resolves the primary failures (Sisal/Progreso non-reachability, dominant-pair concentration). The residual Telchac↔Tulum near-tie (still 91.3%) is a *known, previously accepted* design choice (see the existing "Telchac beats Tulum on budget" regression test) rather than a new problem this audit needs to force-fix with more questionnaire length — adding a second question purely to chase that number down would trade conversion-cost (a 7th question already adds ~15% more length; an 8th would add ~30%) for a marginal, already-intentional distinction.

### Exact proposed question (Alternative C)

**Important scope note:** the Blueprint questionnaire currently has **no Spanish localization at all** (`src/features/blueprint/data/questions.js` is English-only; unlike `GuidesPage.js`, no EN/ES toggle exists for this feature). The Spanish wording below is provided as forward-ready content per this ticket's request, not as a drop-in for an existing toggle — wiring Spanish into the Blueprint questionnaire is a separate, larger scope decision this audit does not make.

**English:**

> **Question:** Beyond the basics, what pulls you most toward a specific place?
> **Helper:** This helps us understand what actually makes somewhere feel right to you.
>
> - Immersing in local culture, history, and tradition
> - Access to nature, wildlife, and conservation areas
> - A well-known, well-connected coastal town
> - True remoteness, away from almost everything

**Spanish (forward-ready, not yet wired to any UI):**

> **Pregunta:** Más allá de lo básico, ¿qué es lo que más te atrae de un lugar en particular?
> **Ayuda:** Esto nos ayuda a entender qué es lo que realmente hace que un lugar se sienta adecuado para ti.
>
> - Sumergirme en la cultura, historia y tradición local
> - Acceso a la naturaleza, la vida silvestre y áreas de conservación
> - Un pueblo costero conocido y bien conectado
> - Verdadero aislamiento, lejos de casi todo

**Proposed tag mapping** (reusing the existing `comfortable` tag where a fit already exists; introducing exactly two new tags, `heritage` and `natureFirst`/`remote`, only where no existing tag honestly applies):

| Option | Tag(s) granted | Readiness points |
|---|---|---:|
| Immersing in local culture, history, and tradition | `heritage` (new) | 5 |
| Access to nature, wildlife, and conservation areas | `natureFirst` (new) | 5 |
| A well-known, well-connected coastal town | `comfortable` (existing) | 5 |
| True remoteness, away from almost everything | `remote` (new) | 5 |

**Proposed city-profile additions** (append-only; no existing tag removed from any city, so no destination's current reachability regresses):

| Destination | New tag(s) added |
|---|---|
| Sisal | `heritage` |
| Santa Elena | `heritage` |
| Celestún | `natureFirst` |
| Dzilam de Bravo | `natureFirst`, `remote` |
| Telchac Puerto | `remote` |
| Progreso | `comfortable` |

Every addition matches that destination's own already-published positioning (its `cityDetails.js` tagline/honest-truth content, and its DEST-001/DEST-002 brief) — none of this is a new claim invented for scoring purposes; it's the existing published identity finally given a way to be *matched on*, not just described after the fact.

## 8. Files created

- `docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md` (this document)

No other file was created or modified. The two temporary analysis scripts used to generate every number in this document (`src/decisionEngine/logic/__bp001_enumerate.test.js`, `src/decisionEngine/logic/__bp001_alternatives.test.js`) and their generated data file (`src/decisionEngine/logic/__bp001_output__.json`) were deleted before commit — they were one-time data-generation tools, not standing regression assertions, and a strict "every destination must be reachable" guard would fail today by design (Sisal is currently unreachable; that failure is the documented finding of this audit, not a bug to quarantine with a red test until Alternative C — or an equivalent fix — is actually implemented in a future, separately-scoped ticket).
