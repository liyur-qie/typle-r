import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:3101', trace: 'retain-on-failure' },
  reporter: [['list']],
  webServer: {
    command: 'node node_modules/next/dist/bin/next start -p 3101 -H 127.0.0.1',
    url: 'http://127.0.0.1:3101',
    reuseExistingServer: false,
    timeout: 60000,
  },
})
