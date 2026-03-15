# 🧑‍💻 Usage

1. Install dependencies:

```bash
pnpm install 
```

2. Start MetaMask Test Dapp:

```bash
pnpm run serve:test-dapp
```

3. Install Playwright:

```bash
pnpm exec playwright install  
```

*3a. If you do not have Anvil installed, go to
the [Foundry installation guide](https://book.getfoundry.sh/getting-started/installation#installation)* and follow the
instructions.

4. Build cache with our CLI by using a script:

```bash
# You can either build cache in a headed mode:
pnpm run build:cache

# Or in a headless mode:
pnpm run build:cache:headless
```

5. Run Playwright tests as you would normally do:

```bash
# Use one of our scripts:
pnpm run test:playwright:headful
pnpm run test:playwright:headless
pnpm run test:playwright:headless:ui

# Or use Playwright directly:
playwright test
HEADLESS=true playwright test
HEADLESS=true playwright test --ui
```

### ⚠️ Important note ⚠️

Currently, tests are triggered in a headed mode by default. Add `HEADLESS=true` to run them in a headless mode.

This behavior will change soon! 🫡

# 🤔 Still want more?

If you need more than this example project, check out our tests for MetaMask [here](../../wallets/metamask/test/e2e).
