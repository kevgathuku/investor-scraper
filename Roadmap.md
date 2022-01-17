# Investor Relations Augmenting

- The main purpose is to add the investor relations links when browsing simplywall.st
- This can be done on demand, and not necessarily scraping / storing results for all the possible companies

## Implementation Plan

### Backend:

- Have the core functionality (Scraping google for the link) in node.js ✅
- Deploy to AWS Lambda
- Call the Deployed API from the interface (Chrome extension)

### Interface:

- The main user-facing interface will be a Chrome extension
- It can be called automatically when the user navigates to a company page
- Have some form of caching mechanism (probably local storage) to avoid calling the lambda function more than once for each company
- Provide a way for the user to report the link is incorrect? Then the lambda can try the next link in the search results
- The app can provide it's own interface i.e. the link can be shown in the extension and not necessarily on the company page
