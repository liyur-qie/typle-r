import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', '.next-production/**', 'test-results/**', 'playwright-report/**', 'next-env.d.ts']),
])
