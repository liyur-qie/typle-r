const { spawnSync } = require('node:child_process')
const path = require('node:path')
const cli = path.join(__dirname, '../node_modules/prisma/build/index.js')
function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { stdio: 'inherit', env: process.env })
  if (result.status !== 0) process.exit(result.status || 1)
}
if (process.argv.includes('--baseline')) {
  // Never mark a different schema as applied: first verify the existing database.
  run(['migrate', 'diff', '--from-config-datasource', '--to-schema', 'prisma/schema.prisma', '--exit-code'])
  run(['migrate', 'resolve', '--applied', '0001_workspaces'])
}
run(['migrate', 'deploy'])
