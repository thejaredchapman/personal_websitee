# Meet Users Where They Are

*The example*

---

A support ticket comes in from São Paulo: "minha conta foi bloqueada e não sei porquê." A poorly built AI support tool detects Portuguese, reasons in English internally, resolves the issue — and replies in English, because English is what the model defaults to. The user gets a correct answer they can't read.

A well-built one does the opposite: it detects the input language and always replies in it, Portuguese in, Portuguese out, regardless of what language it reasons in internally. Chat widgets, WhatsApp bots, and ticket-triage systems that skip this step aren't broken technically — they're broken for the roughly 80% of the world that doesn't use English as a first language.

That's the pattern worth generalizing: the model doesn't need one canonical way to respond. It can detect who's on the other end and reply in the form that person can actually use — not just language, but reading level, sensory needs, device, and context. Accessibility research calls the underlying idea the social model of disability: the barrier isn't the person, it's an interface that assumes everyone is the same. LLMs are the first tool cheap enough to drop that assumption at scale. Twenty-one more places it pays off, below.

```
Detect the language of the user's message and always reply in that same language, regardless of what language you reason in internally. If uncertain, default to the language of their most recent message rather than English.
```

**How to use it:** Drop this into your support bot's system prompt, or enforce it in code with a language-ID call that sets a `reply_language` the model must follow. Test it by sending non-English input and checking the reply matches.

*A note on tooling: every prompt below is provider-agnostic. Swap in whatever you're running — Claude, GPT, Gemini, Llama, an open-weight model — the pattern is what matters, not the vendor.*

---

## Language & literacy

### 1. Reading-level adaptation

A patient portal answering "what does my A1C mean" gives a plain-language answer to a first-time diabetes patient and a technical one to a returning patient who's asked before — same question, different scaffolding, based on history rather than a settings toggle nobody finds.

```
Given this user's history below, answer their question in plain language (8th-grade reading level, no jargon) if this is their first time asking about this topic. If they've asked a related question before, answer at a technical level and skip the basics.
History: {history}
Question: {question}
```

**How to use it:** Pull the last few related interactions from your support or CRM system and pass them in as `{history}` — let the model pick the register instead of hardcoding a rule.

### 2. Idiom and metaphor localization

"Let's touch base and run it up the flagpole" translates word-for-word into Japanese and means nothing there. A model that localizes instead of translating swaps in a metaphor the reader's business culture actually uses, or drops it.

```
Rewrite this message for a reader in {country}. Replace any idioms, sports metaphors, or culturally specific references with ones that make sense in that culture, or remove them if there's no good equivalent. Keep the meaning exact.
Message: {message}
```

**How to use it:** Run this as a localization pass on templated marketing or support copy before it ships to a region — separate from, and after, literal translation.

### 3. Jargon-to-plain-language on demand

A loan bot explains APR, amortization, and escrow in full to a first-time homebuyer and skips the explanation for a mortgage broker — detected from how the question is phrased, not asked as a form field.

```
Explain {term} as it applies to this user's situation: {context}. If their phrasing suggests they're unfamiliar with the terminology, explain fully with an example. If their phrasing already uses correct terms, answer at their level and skip the definitions.
```

**How to use it:** Infer expertise from vocabulary in the incoming message rather than a stored user role — a broker asking casually should still get the short answer.

### 4. Right-to-left layout, not just RTL text

Translating a UI into Arabic and leaving the layout left-to-right produces a page that reads correctly and looks broken: numbers, icons, and reading order all need to mirror, which most "add a language" tickets miss.

```
Generate this component with full RTL support for ar, he, fa, and ur locales: mirror the layout direction (not just text alignment), flip directional icons like back/forward arrows, and right-align text. Do not just wrap the output in dir="rtl" — mirror the flex/grid direction too.
```

**How to use it:** Use this as a code-generation prompt when scaffolding a component with an AI pair-programmer, not as a runtime response — it's a build-time fix.

### 5. Character-based and logographic scripts

Not every language swap is alphabet-for-alphabet. Japanese mixes three scripts — kanji, hiragana, katakana — with no spaces between words, so word-wrap, search, and even highlighting a phrase need different logic than a space-delimited language like English or Spanish. A translation that's linguistically correct but rendered with Latin-style line breaks and no furigana for uncommon kanji reads as broken to a beginner, even though the words are right.

```
Translate this into Japanese for a beginner-level reader. Add furigana in parentheses after any kanji above JLPT N3 difficulty. Do not break lines mid-word — Japanese has no spaces, so use standard Japanese line-wrapping rules, not Latin-style breaking.
```

**How to use it:** Pair this with a CJK-aware font stack and `word-break: keep-all` in your CSS — the prompt fixes the text, the stylesheet fixes the rendering.

## Sensory & physical accessibility

### 6. Screen-reader-aware formatting

A response full of emoji, ASCII tables, and "click here" links reads as noise through VoiceOver. Detecting assistive-tech use and switching to plain sentences, real link text, and no decorative markdown is a formatting decision, not a translation.

```
Rewrite this response for a screen-reader user: remove emoji and decorative symbols, spell out abbreviations on first use, replace "click here" links with descriptive link text, and avoid tables unless the data is genuinely tabular.
```

**How to use it:** Trigger this rewrite when the client signals assistive-tech use (an explicit accessibility preference, not a guess from device type).

### 7. Colorblind-safe chart generation

An AI that renders a red/green "at risk / healthy" dashboard is unreadable to roughly 8% of men. Defaulting to a colorblind-safe palette, with pattern or label redundancy instead of color alone, costs nothing and fixes it for everyone.

```
Generate this chart using a colorblind-safe palette — avoid red/green as the only distinguishing signal between series. Add a pattern or a direct label to each series so the data still reads correctly in grayscale.
```

**How to use it:** Bake this into your default charting prompt or template — don't make it a special case only invoked for accessibility-flagged users.

### 8. Voice-first, hands-free answers

A driver asking a car assistant for directions doesn't want a three-paragraph answer with a markdown table of alternate routes — they want one sentence and a next step. Detecting voice input and shortening the response to what's sayable, not just readable, matters.

```
Answer this question in one spoken sentence suitable for a voice assistant. No lists, no tables, no links — just the single most useful fact and, if needed, one follow-up question.
```

**How to use it:** Route voice-channel requests through a shorter, no-markdown system prompt that's distinct from your chat-channel one.

### 9. Structured export for Braille and other AT

A generated report with real headings, lists, and table markup translates cleanly to a Braille display or other assistive device. The same report as one flat paragraph of prose doesn't, even if it looks identical on screen.

```
Format this report using real Markdown headings, real lists, and a proper table — not ASCII art or bold text used as the only way to indicate structure.
```

**How to use it:** Generate in semantic Markdown or HTML, then let your export pipeline convert to Braille-ready formats — AT readers need structure in the markup, not just the visual layout.

## Cognitive load & emotional state

### 10. Chunking for cognitive load

A support answer to "why was I charged twice" as one 200-word paragraph is harder to act on than the same information as three numbered steps. For users who've flagged accessibility needs around ADHD or dyslexia, defaulting to short chunks is the difference between a resolved ticket and a reopened one.

```
Answer this support question in numbered steps of one sentence each, maximum 5 steps. Put the most important action first. No paragraph over 2 sentences.
```

**How to use it:** Set this as the default response shape for your support bot, not a special "simple mode" — most users prefer it, not just those who've flagged a need.

### 11. Tone-matching to frustration or urgency

A user's third message in five minutes, all caps, no punctuation, gets a shorter, more direct reply with an immediate next step — not the same cheerful "Happy to help!" opener the first message got.

```
Here are the user's last 3 messages: {messages}. If the tone indicates frustration or urgency (short sentences, caps, no greeting), respond directly with the fix first and skip pleasantries. Otherwise, respond in your normal friendly tone.
```

**How to use it:** Feed message history, not just the current message, into the prompt — tone is often only visible across a thread.

### 12. Skill-adaptive verbosity

A new user asking "how do I export this" gets a walkthrough. A user who's exported data twelve times this month gets one line: "Settings → Export → CSV." Usage history is the signal, not a setting.

```
This user has performed this action {n} times in the last 30 days. If n > 3, answer in one line with the exact menu path. If n <= 3, give a short walkthrough describing what to expect at each step.
```

**How to use it:** Pull the usage count from your product analytics and pass it in as `{n}`.

### 13. Pictorial or audio-first responses for low literacy

In markets where a meaningful share of users can't reliably read the deployment language, a response backed by icons or a short voice note outperforms the best-written paragraph.

```
Summarize this response as 3 short icon-labeled steps (an icon name plus a 4-word label each), and also write a one-sentence audio script version of the same answer.
```

**How to use it:** Generate both the icon set and a TTS-ready script from one source answer instead of maintaining them as separate content.

## Environment & device

### 14. Low-bandwidth mode

A user on a 2G connection in a market with expensive data doesn't want an AI-generated image or a 40KB rich-HTML response — they want short text. Detecting connection quality and stripping rich media has a real dollar cost when you skip it.

```
Answer in plain text only, under 300 characters, no images, no markdown tables. Assume the user is on a slow connection where every extra kilobyte costs them money.
```

**How to use it:** Trigger this system prompt when you detect a slow connection (the Network Information API's `effectiveType`, or a region/carrier signal) rather than shipping the same rich response to everyone.

### 15. Elder-friendly output

Short paragraphs, no nested menus described in prose, one action per response — reduces the support burden for users who've self-identified as less comfortable with technology, without a separate "senior mode" product.

```
Answer in short paragraphs (2 sentences max), describe only one action per response, and avoid describing multi-level menus in prose — instead say the single next click.
```

**How to use it:** Offer this as a response-style default for a segment that self-identifies as less comfortable with technology during onboarding, not a hidden setting.

### 16. Keyboard-only and switch-access-friendly UI generation

When an LLM generates UI — a form, a set of options — instead of just text, defaulting to a structure fully operable by keyboard or switch, not just mouse hover states, is the difference between usable and decorative.

```
Generate this UI as a form. Every interactive element must be reachable via Tab in a logical order, have a visible focus state, and be operable without a mouse. List the tab order explicitly as a comment.
```

**How to use it:** Use this when prompting an AI code-generation tool for UI scaffolding, and check the tab-order comment against the rendered result.

### 17. Detecting assistive tech and adjusting markdown density

Heavy markdown — nested bullets, bold everywhere, emoji headers — is fine on a screen and painful read aloud word-for-word by a screen reader. Detecting AT use and flattening formatting is a small check with an outsized effect.

```
Rewrite this response with minimal markdown: no nested bullets, no bold on more than one phrase, no emoji headers. Plain sentences and, at most, one flat list.
```

**How to use it:** Apply this as a formatting pass right before sending the final response to a client flagged as screen-reader-driven — same trigger as item 6.

## Locale, legal & context

### 18. Currency and unit conversion

A price quoted in USD to a user browsing from Germany, with no conversion to EUR or metric units, reads as a US-only product even if it isn't.

```
Convert all prices and measurements in this response to the currency and unit system used in {country} (for example, EUR and metric for Germany). Show the original figure in parentheses if useful.
```

**How to use it:** Resolve `{country}` from IP geolocation or account locale, not user input — this should happen without being asked.

### 19. Time-zone-aware scheduling

"We're open 9–5" is meaningless without knowing whose 9–5. An assistant that resolves this from the user's locale instead of asking removes a whole round-trip.

```
The user's timezone is {tz}. Answer "are you open right now" using the support schedule below, converted to their local time.
Support schedule (UTC): {schedule}
```

**How to use it:** Store your support hours in UTC once and always convert at response time — never hardcode a single timezone's hours into the prompt.

### 20. Jurisdiction-aware compliance answers

A data-deletion request answered the same way for a user in California and a user in Frankfurt is wrong for one of them — CCPA and GDPR don't agree on the details, and the model can detect region and answer accordingly instead of hedging with both.

```
The user's account region is {region}. Answer this data-deletion request according to {region}'s applicable regulation (GDPR for the EU, CCPA for California, etc). State which regulation you're applying and the specific timeline it requires.
```

**How to use it:** Maintain a small lookup table of region → regulation → specifics, verified by your legal team, and pass the resolved rule into the prompt — don't rely on the model's own knowledge of compliance law.

### 21. Business-hours and support-availability awareness

"Is anyone there right now" answered correctly requires knowing the user's time zone and the actual support schedule, not a static FAQ line that's wrong for half the audience reading it.

```
The current time in the user's timezone is {local_time}. Using the support schedule {schedule}, answer whether a human is available right now, and if not, when the next available window opens.
```

**How to use it:** Compute `{local_time}` server-side from the request's locale/timezone header — don't rely on the model to reason about time zones unassisted.

## Where to look in your own product

None of this requires a new model. Every example above is a formatting, sequencing, or defaulting decision made with information most products already have: an `Accept-Language` header, a device viewport, a support ticket's message history, a locale setting, punctuation and message cadence. The work isn't detecting who the user is — it's building the default response to change based on that signal, instead of assuming everyone reading it looks like the person who built it.

A few rules that keep this from going sideways:

- **Detect signals, not identity.** Infer language, connection speed, or AT use from what the client tells you. Never ask a user to self-report a disability to get a better response — the accommodation should be the default, not a form field.
- **Test with the thing on.** Turn on a screen reader. Throttle your connection to 3G. Set your locale to somewhere your team doesn't sit. A feature that only works well for one kind of user isn't done — it's demoed.
- **Make it the default, not a setting.** A toggle buried in preferences reaches the users who already know to look for it. The point of this pattern is reaching the ones who don't.
- **Match the solution to the ask.** Not every request needs a RAG pipeline or your top-tier model. A user asking to reshape a CSV into JSON, split a column, or clean up a spreadsheet needs a small model and a clear prompt — not a vector database and your most expensive model. Reaching for infrastructure the task doesn't need is its own way of not meeting the user where they are: it's slower, costs more, and solves a harder problem than the one they actually asked.

---

*Also published on Medium: [Meet Users Where They Are](https://medium.com/@thejaredchapman/meet-users-where-they-are-93441513ae60)*

*More of my writing and projects: [thejaredchapman.com](https://thejaredchapman.com)*
