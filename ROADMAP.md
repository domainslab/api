# ROADMAP

- [ ] Add rate-limit for `/api/v1/domains`
- [ ] Keep track of requests to be aware of load and OpenAI limits
- [x] Extend `/api/v1/domains` with `tlds` parameter
- [ ] Extend `/api/v1/domains` with `pageSize` parameter
- [ ] Extend `/api/v1/domain_status` with an ability to estimate the price
- [ ] Improve `errorHandler.ts` to catch 404 Route Not Found
- [ ] Validate generated domains, return BAD REQUEST if we couldn't generate
- [ ] Research other LLMs
  - [ ] Support multiple LLMs at once
  - [ ] AB-test different models
  - [ ] Track clicks/engagement per LLM and identify the best performing one

## Tech Debt

- [x] Add eslint, prettier or any other code formatters for better code-style
- [ ] Add husky/pre-commit
- [ ] Spec endpoints
- [ ] Add CI/CD
