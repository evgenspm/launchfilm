#!/usr/bin/env node
// launchfilm CLI entry. Runs the TypeScript sources through tsx (MIT), so there is no build step.
// Requires Node >= 20. Usage: npx launchfilm <command> [...args]   (or: npm run lf -- <command>)
import {register} from 'tsx/esm/api';

const [major] = process.versions.node.split('.').map(Number);
if (major < 20) {
	console.error(`launchfilm: Node ${process.versions.node} is too old. Install Node 20 or newer (https://nodejs.org).`);
	process.exit(1);
}

register();
const {main} = await import('./index.ts');
process.exitCode = await main(process.argv.slice(2));
