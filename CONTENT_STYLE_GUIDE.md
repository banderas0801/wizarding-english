# Content Style Guide (Question Quality)

Purpose: reduce QA warnings from `107` to `<25` with consistent authoring rules.

## 1) Answer Length Balance (Rule: `answer_length_outlier`)
- Target: correct answer length should be close to distractors.
- Recommended threshold: keep answer length within `+-30%` of median distractor length.
- Avoid:
  - One very short answer among long distractors.
  - One long sentence answer when others are single words.
- Pass example:
  - Q: "Which word means happy?"
  - Options: `joyful`, `excited`, `cheerful`, `hopeful`
- Fail example:
  - Options: `joyful`, `a person who has a very positive emotional state all day`, `cheerful`, `hopeful`

## 2) Token Overlap Risk (Rule: `suspicious_answer_overlap`, `semantic_mismatch_heuristic`)
- Target: avoid leaking answer clues inside the stem or making distractors look more semantically aligned than the key.
- Hard rule:
  - Do not copy unique keyword phrases from question stem into only one option unless that option is the correct one.
- Recommended threshold:
  - Overlap of rare tokens between stem and any wrong option should be `<20%`.
- Pass example:
  - Stem: "Why is Florence called 'The Lady with a Lamp'?"
  - Correct: "She carried a lamp while helping soldiers at night."
  - Wrong options: unrelated plausible alternatives, no direct keyword leakage.
- Fail example:
  - Stem includes "with a lamp"
  - Wrong option includes "she holds up a lantern"
  - Correct answer is unrelated ("she has nice furniture")

## 3) Formatting Consistency (Question/Answer Surface)
- Use sentence case, end questions with `?`.
- Avoid random capitalization and inconsistent punctuation.
- Keep options parallel in grammar form (all noun phrases or all clauses).
- Normalize apostrophes and quotes:
  - Prefer `'` and `"` consistently.
- Avoid noisy prefixes/suffixes:
  - No `A)`, `B)` inside option text if UI already renders labels.

## 4) Exercise-Type Specific Rules
- `multiple_choice`:
  - Exactly 1 correct option.
  - Minimum 3 options.
  - Distractors should be plausible but clearly wrong.
- `fill_blank`:
  - Question must include explicit blank marker (`___` or `{blank}`).
  - `answer` / `acceptableAnswers` must be non-empty.
- `matching`:
  - 3 to 6 pairs.
  - Unique left/right values (case-insensitive).

## 5) Author Checklist (Before Submit)
- Is the correct answer semantically best, not just grammatically possible?
- Do wrong options avoid keyword leakage from the question stem?
- Is option length balanced?
- Is punctuation/capitalization clean and consistent?
- For fill-blank/matching, does schema meet QA gate constraints?

## 6) Review Workflow
1. Run `npm run qa:content`.
2. Run `npm run qa:batch`.
3. Fix by batch priority:
   - `P1` first (`suspicious_answer_overlap`)
   - `P2` next (`semantic_mismatch_heuristic`)
   - `P3` last (`answer_length_outlier`)
4. Re-run QA until target is met (`<25` warnings for public launch).

