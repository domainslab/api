# ROADMAP

- [x] Add authentication middleware
- [ ] Allow any requests when running locally
- [ ] Add rate-limit for `/v1/domains`
- [ ] Keep track of requests to be aware of load and OpenAI limits
- [x] Extend `/v1/domains` with `tlds` parameter
- [ ] Extend `/v1/domains` with `pageSize` parameter
- [ ] Extend `/v1/domain_status` with an ability to estimate the price
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
- [x] Add CI/CD
- [ ] Migrate to PM2 for production env (use nodemon just for dev)