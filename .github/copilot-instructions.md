# Copilot Instructions

## Commands

```bash
pnpm generate   # fetch GitHub data and render README.md
pnpm lint       # run ESLint with auto-fix
```

`pnpm generate` requires a `USER_TOKEN` env var (GitHub PAT). Copy `.env.example` to `.env` and fill it in. `GITHUB_TOKEN` does not work due to GraphQL permission constraints.

## Architecture

This is a GitHub profile README generator. The pipeline is:

1. **`src/graphql/data.js`** — fetches all public gists, repositories, and pull requests from the GitHub GraphQL API using Apollo Client with relay-style pagination. All data is fetched in full before any rendering.
2. **`src/index.js`** — registers Handlebars helpers, compiles `README.template.md`, and writes the output to `README.md`.
3. **`README.template.md`** — the source template; `README.md` is the generated output and should not be edited manually.

The GitHub Actions workflow (`.github/workflows/generate-readme.yml`) runs the generator on a weekly schedule (Mondays 5am UTC), on push to `master`, and on manual dispatch, then commits back any changes.

## Template Helpers

Custom Handlebars helpers defined in `src/template/handlebars.js`:

| Helper | Usage | Purpose |
|---|---|---|
| `{{repo 'name'}}` | inline | Renders a GitHub repo link with star count and description, looked up from fetched data |
| `{{gist 'filename'}}` | inline | Renders a gist link by filename or gist name |
| `{{srht owner='...' name='...' description='...'}}` | inline | Renders a SourceHut repo link (static, not fetched) |
| `{{#list array sortBy='field' direction='asc\|desc' top=N}}` | block | Sorts the array by a (dot-notation) field, optionally limits to top N |
| `{{#filterout array 'field' (array 'val1' 'val2')}}` | block | Removes items where `field` matches any of the given values |
| `{{array 'a' 'b'}}` | inline | Constructs an array literal (used as argument to `filterout`) |

`repo` and `gist` emit an error string (not a thrown error) if the item is not found in the fetched data.

## Code Conventions

- **3-space indentation**, no semicolons, single quotes (enforced by ESLint)
- **Sorted imports** (`sort-imports` rule, case-insensitive)
- **ESM only** (`"type": "module"` in `package.json`; use `import`/`export`, not `require`)
- **pnpm** is the package manager (`pnpm-lock.yaml`)
- GraphQL fragments are defined in `src/graphql/queries.js` and reused in paginated queries via template literals
- Pagination is handled by `RelayStylePaginationFetcher` in `data.js`, which loops `fetchMore` until `hasNextPage` is false
