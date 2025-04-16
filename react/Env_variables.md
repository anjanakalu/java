Below is a concise guide for managing environment variables in a Vite-based React project for three environments—**dev/local**, **qa**, and **prod**—with separate CI/CD YAML files for each environment. This addresses your scenario where `.env` files contain placeholders (e.g., `VITE_APP_CLIENT_ID=${CLIENT_ID}`) and CI/CD YAML injects variables (e.g., `CLIENT_ID=808-200-565`, `API_URL=WWW.ABC.QA.COM`). The guide includes rules, required files, and best practices, tailored to your requirements for different API URLs, database environments, and third-party apps, while aligning with your previous context (e.g., debugging with `VITE_APP_ENV`, React projects).

---

## Environment Variables in Vite/React with Separate YAML Files

### Overview
- **Goal**: Manage environment variables for dev/local, qa, and prod in a Vite-based React project, with separate CI/CD YAML files per environment.
- **Key Files**: `.env.local` (local), `.env.dev`, `.env.qa`, `.env.prod`, `.env` (fallback).
- **CI/CD Integration**: Each environment has its own YAML file injecting variables (e.g., `CLIENT_ID`, `API_URL`) into `.env` placeholders.
- **Access**: Variables accessed via `import.meta.env.VITE_<VARIABLE>` in Vite.
- **Environments**:
  - **Dev/Local**: Local development.
  - **QA**: Quality assurance testing.
  - **Prod**: Production.
- **Requirements**:
  - Different API URLs (e.g., `www.facebook.com` for prod, `www.qa.facebook.com` for qa).
  - Separate databases (e.g., `db.dev.facebook.com`, `db.prod.facebook.com`).
  - Same source code, multiple environments.
  - Support for third-party app URLs (e.g., `api.stripe.dev.com`).

### Rules
1. **Prefix**: Use `VITE_` for client-side variables (e.g., `VITE_APP_API_URL`).
2. **File Naming**: Use `.env.<mode>` for environment-specific files (e.g., `.env.prod`).
3. **Gitignore**: Add `.env`, `.env.local`, `.env.dev`, `.env.qa`, `.env.prod` to `.gitignore` to protect secrets.
4. **Placeholders**: Use `${VARIABLE}` in `.env` files for CI/CD injection (e.g., `VITE_APP_API_URL=${API_URL}`).
5. **CI/CD**: Each environment’s YAML file defines variables to resolve placeholders.
6. **Restart**: Restart Vite server after changing `.env` files.
7. **Strings**: All `.env` values are strings.
8. **Build**: Variables embedded in `dist` folder during `vite build`.
9. **Security**: Store sensitive data in CI/CD secrets, not versioned `.env` files.

### Environment Setup
- **Source Code**: Single codebase for all environments.
- **API URLs**:
  - Dev: `www.dev.facebook.com`
  - QA: `www.qa.facebook.com`
  - Prod: `www.facebook.com`
- **Databases**:
  - Dev: `db.dev.facebook.com`
  - QA: `db.qa.facebook.com`
  - Prod: `db.facebook.com`
- **Third-Party Apps**:
  - Dev: `api.stripe.dev.com`
  - QA: `api.stripe.qa.com`
  - Prod: `api.stripe.com`

---

## Implementation Guide

### 1. Required Files
Create these `.env` files in the project root:

- **`.env.local`** (local development, gitignored):
  ```
  VITE_APP_ENV=development
  VITE_APP_API_URL=http://www.dev.facebook.com
  VITE_APP_CLIENT_ID=local-123
  VITE_APP_DB_URL=db.dev.facebook.com
  VITE_APP_THIRD_PARTY_URL=api.stripe.dev.com
  VITE_DOCUMENTATION_LINK=dev-docs.facebook.com
  ```

- **`.env.dev`** (development, gitignored):
  ```
  VITE_APP_ENV=development
  VITE_APP_API_URL=${API_URL}
  VITE_APP_CLIENT_ID=${CLIENT_ID}
  VITE_APP_DB_URL=${DB_URL}
  VITE_APP_THIRD_PARTY_URL=${THIRD_PARTY_URL}
  VITE_DOCUMENTATION_LINK=dev-docs.facebook.com
  ```

- **`.env.qa`** (QA, gitignored):
  ```
  VITE_APP_ENV=qa
  VITE_APP_API_URL=${API_URL}
  VITE_APP_CLIENT_ID=${CLIENT_ID}
  VITE_APP_DB_URL=${DB_URL}
  VITE_APP_THIRD_PARTY_URL=${THIRD_PARTY_URL}
  VITE_DOCUMENTATION_LINK=qa-docs.facebook.com
  ```

- **`.env.prod`** (production, gitignored):
  ```
  VITE_APP_ENV=production
  VITE_APP_API_URL=${API_URL}
  VITE_APP_CLIENT_ID=${CLIENT_ID}
  VITE_APP_DB_URL=${DB_URL}
  VITE_APP_THIRD_PARTY_URL=${THIRD_PARTY_URL}
  VITE_DOCUMENTATION_LINK=prod-docs.facebook.com
  ```

- **`.env`** (fallback, committed to Git):
  ```
  VITE_APP_ENV=development
  VITE_APP_API_URL=${API_URL:-http://www.dev.facebook.com}
  VITE_APP_CLIENT_ID=${CLIENT_ID:-default-client-id}
  VITE_APP_DB_URL=${DB_URL:-db.dev.facebook.com}
  VITE_APP_THIRD_PARTY_URL=${THIRD_PARTY_URL:-api.stripe.dev.com}
  VITE_DOCUMENTATION_LINK=dev-docs.facebook.com
  ```

- **`.gitignore`**:
  ```
  .env
  .env.local
  .env.dev
  .env.qa
  .env.prod
  node_modules
  dist
  ```

### 2. Vite Configuration
**`vite.config.js`**:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: '.', // Load .env files from root
  envPrefix: 'VITE_', // Expose VITE_ variables
});
```

### 3. Accessing Variables
In React code:
```javascript
const apiUrl = import.meta.env.VITE_APP_API_URL;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const dbUrl = import.meta.env.VITE_APP_DB_URL;
const thirdPartyUrl = import.meta.env.VITE_APP_THIRD_PARTY_URL;
const docLink = import.meta.env.VITE_DOCUMENTATION_LINK;
const env = import.meta.env.VITE_APP_ENV;

console.log({ apiUrl, clientId, dbUrl, thirdPartyUrl, docLink, env });
```

For TypeScript:
```typescript
interface Env {
  VITE_APP_API_URL?: string;
  VITE_APP_CLIENT_ID?: string;
  VITE_APP_DB_URL?: string;
  VITE_APP_THIRD_PARTY_URL?: string;
  VITE_DOCUMENTATION_LINK?: string;
  VITE_APP_ENV?: string;
}
declare const import: { meta: { env: Env } };

const apiUrl: string = import.meta.env.VITE_APP_API_URL ?? 'http://www.dev.facebook.com';
const clientId: string = import.meta.env.VITE_APP_CLIENT_ID ?? 'default-client-id';
```

### 4. Running Environments
**`package.json`**:
```json
{
  "scripts": {
    "dev": "vite",
    "dev:qa": "vite --mode qa",
    "dev:prod": "vite --mode prod",
    "build": "vite build",
    "build:qa": "vite build --mode qa",
    "build:prod": "vite build --mode prod"
  }
}
```

- **Dev/Local**:
  - Run: `npm run dev` (loads `.env.local` or `.env`).
  - Uses: `http://www.dev.facebook.com`, `db.dev.facebook.com`.

- **QA**:
  - Run: `npm run dev:qa` (loads `.env.qa`).
  - Build: `npm run build:qa`.

- **Prod**:
  - Run: `npm run dev:prod` (loads `.env.prod`).
  - Build: `npm run build:prod`.

### 5. CI/CD Configuration (Separate YAML Files)
Create three YAML files in `.github/workflows/` for GitHub Actions.

- **`.github/workflows/deploy-dev.yml`**:
  ```yaml
  name: Deploy Dev
  on:
    push:
      branches: [develop]
  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        API_URL: ${{ secrets.DEV_API_URL }}
        CLIENT_ID: ${{ secrets.DEV_CLIENT_ID }}
        DB_URL: ${{ secrets.DEV_DB_URL }}
        THIRD_PARTY_URL: ${{ secrets.DEV_THIRD_PARTY_URL }}
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run build:dev
        - name: Deploy
          run: echo "Deploying to dev"
          # Add deployment steps (e.g., Vercel, Netlify)
  ```

- **`.github/workflows/deploy-qa.yml`**:
  ```yaml
  name: Deploy QA
  on:
    push:
      branches: [qa]
  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        API_URL: ${{ secrets.QA_API_URL }}
        CLIENT_ID: ${{ secrets.QA_CLIENT_ID }}
        DB_URL: ${{ secrets.QA_DB_URL }}
        THIRD_PARTY_URL: ${{ secrets.QA_THIRD_PARTY_URL }}
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run build:qa
        - name: Deploy
          run: echo "Deploying to qa"
          # Add deployment steps
  ```

- **`.github/workflows/deploy-prod.yml`**:
  ```yaml
  name: Deploy Prod
  on:
    push:
      branches: [main]
  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        API_URL: ${{ secrets.PROD_API_URL }}
        CLIENT_ID: ${{ secrets.PROD_CLIENT_ID }}
        DB_URL: ${{ secrets.PROD_DB_URL }}
        THIRD_PARTY_URL: ${{ secrets.PROD_THIRD_PARTY_URL }}
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run build:prod
        - name: Deploy
          run: echo "Deploying to prod"
          # Add deployment steps
  ```

**Secrets Setup** (GitHub Settings > Secrets and variables > Actions):
- Dev:
  - `DEV_API_URL`: `www.dev.facebook.com`
  - `DEV_CLIENT_ID`: `local-123`
  - `DEV_DB_URL`: `db.dev.facebook.com`
  - `DEV_THIRD_PARTY_URL`: `api.stripe.dev.com`
- QA:
  - `QA_API_URL`: `www.qa.facebook.com`
  - `QA_CLIENT_ID`: `808-200-565`
  - `QA_DB_URL`: `db.qa.facebook.com`
  - `QA_THIRD_PARTY_URL`: `api.stripe.qa.com`
- Prod:
  - `PROD_API_URL`: `www.facebook.com`
  - `PROD_CLIENT_ID`: `999-300-777`
  - `PROD_DB_URL`: `db.facebook.com`
  - `PROD_THIRD_PARTY_URL`: `api.stripe.com`

**How It Works**:
- Each YAML triggers on specific branches (e.g., `develop` for dev, `qa` for qa, `main` for prod).
- YAML injects environment-specific variables (e.g., `API_URL`, `CLIENT_ID`) into the CI/CD runtime.
- Vite loads `.env.<mode>` (e.g., `.env.qa` for `--mode qa`) and resolves placeholders (e.g., `VITE_APP_API_URL=${API_URL}` to `www.qa.facebook.com`).
- Build output in `dist` embeds variables.

### 6. Traditional vs. Modern Approach
- **Traditional**:
  ```javascript
  let API_URL = 'www.facebook.com';
  if (window.location.href.includes('qa')) API_URL = 'www.qa.facebook.com';
  else if (window.location.href.includes('dev')) API_URL = 'www.dev.facebook.com';
  ```
  - **Issues**: Hardcoded, error-prone, not scalable.

- **Modern**:
  - Use `.env` files with placeholders and CI/CD injection.
  - Access: `import.meta.env.VITE_APP_API_URL`.
  - **Benefits**: Scalable, secure, CI/CD-integrated.

### 7. Build Output
- `npm run build:<mode>` creates `dist` with:
  - `index.html`
  - `assets/` (JS, CSS)
- Variables (e.g., `VITE_APP_API_URL`) embedded in JS bundle.

### 8. Best Practices
- **Security**: Store sensitive data in CI/CD secrets, not `.env` in Git.
- **Gitignore**: Prevent `.env*` commits.
- **Consistency**: Use `VITE_` prefix, consistent naming.
- **Documentation** (README):
  ```
  ## Environment Variables
  - `.env.local`: Local dev (gitignored).
  - `.env.dev`, `.env.qa`, `.env.prod`: Environment-specific (gitignored).
  - `.env`: Fallback (committed).
  - CI/CD: Separate YAML files inject variables via secrets.
  - Run: `npm run dev:<mode>` or `npm run build:<mode>`.
  ```
- **Debugging**: Log variables in CI/CD:
  ```yaml
  - run: env | grep VITE_
  ```
- **Restart**: Restart Vite after `.env` changes.

### 9. Connection to Your Context
- **April 16, 2025 (Debugging)**: `VITE_APP_ENV` toggles logs (e.g., `development`, `qa`, `production`). Set in each `.env` file, injected via YAML for prod.
- **React Projects**: Your e-commerce or image-to-PDF apps use this setup for API URLs (e.g., `www.facebook.com`) and databases.
- **CI/CD YAML**: Your separate YAML files align with this structure, injecting `CLIENT_ID`, `API_URL` per environment.

---

## Summary
- **Files**: `.env.local`, `.env.dev`, `.env.qa`, `.env.prod`, `.env` (fallback).
- **CI/CD**: Separate YAML files (`deploy-dev.yml`, `deploy-qa.yml`, `deploy-prod.yml`) inject variables into `.env` placeholders via `dotenv-expand`.
- **No Extra Config**: Vite resolves placeholders automatically.
- **Commands**: `npm run dev:<mode>`, `npm run build:<mode>`.
- **Security**: Gitignore sensitive `.env` files; use secrets.
- **Access**: `import.meta.env.VITE_<VARIABLE>`.

If you need tweaks for a specific CI/CD platform (e.g., GitLab, Jenkins) or face issues, let me know!
