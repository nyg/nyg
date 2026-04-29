# README Review

> Two independent AI reviews — **Claude Sonnet 4.6** and **GPT-5.4** — were run in parallel on the
> rendered README and the `src/graphql/` source. Their findings are synthesised below.
> ✦ = both models raised this independently.
>
> Points 1–8 from the original review were addressed in this PR (broken Contributions links,
> empty PR tooltips, misleading repo descriptions, missing intro, section rename, noise sections
> collapsed, name-first tables). Open findings follow.

---

## Part 1 — README (self-promotion quality)

**1. No sense of current focus or professional context** *(Sonnet)*

A visitor cannot tell whether this is a student, a professional engineer, or a hobbyist;
whether the person is open to work; or what they are actively building right now.  
Fix: one line under the intro is enough — *"Currently working on X; interested in Y."*

**2. iOS/Swift gists are partially duplicated** *(Sonnet)*

`iOSCreatePDF.swift` (75 ★) appears in both the "Most starred gists" table and the "iOS & Swift"
section. The section then lists 8 gists, most with 0–4 stars and no context on why they matter.  
Fix: trim the section to 2–3 notable items and let the star table do the rest.

---

## Part 2 — Technical (Apollo + GraphQL)

### Bugs

**3. `fetchAll()` re-fetches page 1 on every call ✦**

`watchQuery()` fires the initial request immediately. `fetchAll()` then starts with
`cursor = null` and calls `fetchMore({ variables: { cursor: null } })` — the exact same
variables as the initial request — before checking `hasNextPage`. For any collection with
fewer than 100 items, page 1 is fetched twice.

Fix:

```js
this.fetchAll = async () => {
   let { data } = await observableQuery.result()
   let pageInfo = extractField(data).pageInfo
   while (pageInfo.hasNextPage) {
      ;({ data } = await observableQuery.fetchMore({ variables: { cursor: pageInfo.endCursor } }))
      pageInfo = extractField(data).pageInfo
   }
}
```

**4. `prCount` can silently drift from `prs.length`, breaking sort order ✦**

`prCount` is incremented manually alongside `prs.push()`. If `prs` is ever filtered later,
`sortBy='prCount'` in the template silently produces wrong ordering.  
Fix: remove `prCount` and sort by `prs.length`, or derive the count at sort time.

---

### Design

**5. Apollo Client is the wrong tool for a one-shot CLI ✦**

Apollo exists for reactive, long-lived UI applications: normalized cache, subscriptions,
re-rendering, type policies. For a script that runs once and exits, you pay the full
abstraction cost (relayStylePagination merge functions, watchQuery lifecycle, readFragment)
while using almost none of its value.

The two-phase approach — populate cache via `watchQuery`/`fetchMore`, then extract via
`readQuery`/`readFragment` — is working around the fact that Apollo was not designed for
imperative batch fetching.

`graphql-request` with a plain `async` pagination loop would be a third of the code with
zero ceremony, and would make the intent of the script immediately obvious.

**6. `readFragment` accesses the internal `__ref` cache key** *(Sonnet)*

`edge.node.__ref` is not a public API — it is Apollo's internal cache identifier.
It works today but can break silently across Apollo versions.  
Fix: include fragment spreads directly in the paginated query and read from `fetchMore`
results, eliminating the need for post-hoc `readFragment` calls.

**7. `gqlUserInfo` is mostly dead code ✦**

It fetches ~15 fields — `followers`, `following`, `repositoryDiscussions`,
`issueComments`, `publicKeys`, `contributionYears`, etc. — none of which are exported or
used in the template. Only `viewer.login` (used to filter own PRs) is actually consumed.  
Fix: replace with `{ viewer { id login } }`, or fold `login` into one of the paginated queries.

---

### Error handling

**8. Missing `USER_TOKEN` sends `Authorization: Bearer undefined` to GitHub** *(Sonnet)*

There is no guard at startup. The failure eventually arrives as a confusing Apollo error deep
in the pagination loop.  
Fix: add at the top of `data.js`:

```js
if (!process.env.USER_TOKEN) {
   throw new Error('USER_TOKEN environment variable is not set — copy .env.example to .env')
}
```

**9. No error handling in the pagination loop ✦**

A network error, a GitHub 429 (rate limit), or an invalid token mid-pagination throws an
unhandled rejection with an Apollo stack trace. The script exits with no actionable message.  
Fix: wrap each `fetchAll()` call in `try/catch` with a message identifying which entity was
being fetched.

---

### Performance

**10. Three independent fetches run sequentially** *(Sonnet)*

Gists, repositories, and pull requests have no mutual dependencies but are awaited serially.  
Fix:

```js
await Promise.all([
   new RelayStylePaginationFetcher(gistQuery, ...).fetchAll(),
   new RelayStylePaginationFetcher(repositoryQuery, ...).fetchAll(),
   new RelayStylePaginationFetcher(pullRequestQuery, ...).fetchAll(),
])
```

This could cut wall-clock time by up to 2/3 for large accounts.

---

## Summary

| # | Area | Finding | Severity |
|---|------|---------|----------|
| 1 | README | No current focus or professional context | 💡 Suggestion |
| 2 | README | iOS/Swift gists partially duplicated | 💡 Suggestion |
| 3 | Technical | `fetchAll()` double-fetches page 1 (`cursor: null` start) | 🔴 Bug |
| 4 | Technical | `prCount` can drift from `prs.length`; sort silently breaks | 🟡 Non-blocking |
| 5 | Technical | Apollo Client is overkill for a one-shot CLI script | 🟡 Non-blocking |
| 6 | Technical | `readFragment` relies on internal `__ref` cache key | 🟡 Non-blocking |
| 7 | Technical | `gqlUserInfo` fetches ~15 fields; only `login` is ever used | 🟡 Non-blocking |
| 8 | Technical | No guard for missing `USER_TOKEN` | 🟡 Non-blocking |
| 9 | Technical | No error handling around pagination loop | 🟡 Non-blocking |
| 10 | Technical | Three fetches run serially; could be `Promise.all`'d | 💡 Suggestion |

