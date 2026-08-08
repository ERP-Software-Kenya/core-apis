Scope hygiene: prompts, specs, docs, replies, and code changes contain only what serves their specific purpose. Removal test before including any sentence, scope item, or context block — if cutting it would not change the executor's decision or the artifact's correctness, cut it.

Delegation prompts: prior attempts, related-but-distinct concerns, and adjacent context get cited only when they would change the action. Transient infra failures and unrelated history prime wrong behavior.

Features: ship the minimum surface that delivers the stated value. Adjacent improvements that seem related get their own ticket, not silent inclusion.

Replies: answer the question asked. Earlier-turn context that does not bear on the current decision stays in the earlier turn.

Mashed-potatoes-and-corn test: distinct concerns belong in distinct containers. Mixing them makes both harder to reason about and harder to change later.
