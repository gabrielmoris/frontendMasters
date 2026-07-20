import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	testIgnore: ['**/labs/fixtures/**', '**/labs/broken-traces/**'],
	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
		url: 'http://127.0.0.1:4173',
		reuseExistingServer: true
	},
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	projects: [
		{ name: 'setup', testMatch: 'tests/auth.setup.ts' }, // Here is how I tell playwright to run a file which is not.spec.ts
		// Here Is how I LOAD the cookie
		{
			name: 'chronium',
			use: { storageState: 'playwright/.authentication/user.json' },
			dependencies: ['setup']
		}
	]
	// reporter: [
	// 	['html', { outputFolder: 'playwright-report/html' }],
	// 	['json', { outputFile: 'playwright-report/report.json' }],
	// 	['list']
	// ]
});
