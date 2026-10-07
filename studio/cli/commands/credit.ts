// credit: the one-time, text-only credit note. No telemetry, no watermark, no star requests.
// Shown at most once per project (state.json credit.shown), after the first attended successful render.
// Off with: "credit": false in harness.config.json, LAUNCHFILM_NO_CREDIT=1, DO_NOT_TRACK=1, CI, or LAUNCHFILM_BATCH=1.
import {parseArgs, str} from '../lib/args.js';
import {loadConfig, setConfigKey} from '../lib/config.js';
import {envFlag} from '../lib/env.js';
import {say} from '../lib/log.js';
import {readState, writeState} from '../lib/state.js';

export const AUTHOR = {name: 'Eugene Li', handle: 'evgenspm', repo: 'github.com/evgenspm/launchfilm'};

export const creditStatus = () => {
	const cfg = loadConfig();
	const st = readState();
	const reasons: string[] = [];
	if (cfg.credit === false) reasons.push('"credit": false in harness.config.json');
	if (envFlag('LAUNCHFILM_NO_CREDIT')) reasons.push('LAUNCHFILM_NO_CREDIT');
	if (envFlag('DO_NOT_TRACK')) reasons.push('DO_NOT_TRACK');
	if (envFlag('LAUNCHFILM_BATCH')) reasons.push('LAUNCHFILM_BATCH (unattended)');
	if (envFlag('CI') || process.env.CI) reasons.push('CI');
	const enabled = reasons.length === 0;
	const shown = Boolean(st.credit?.shown);
	return {enabled, shown, pending: enabled && !shown, reasons};
};

export const creditLines = (product?: string) => {
	const p = product?.trim() || '{Product}';
	return {
		line: `Made with launchfilm, an open-source kit by ${AUTHOR.name} (${AUTHOR.repo}). If you post the film, here's an optional credit line:`,
		x: `Launch film for ${p} made with launchfilm by @${AUTHOR.handle}, an open-source kit that turns a coding agent into a motion designer: ${AUTHOR.repo}`,
		linkedin: `The launch video for ${p} was built with launchfilm, an open-source Remotion kit by ${AUTHOR.name} that lets a coding agent do motion design. ${AUTHOR.repo}`,
		minimal: `Video made with launchfilm (${AUTHOR.repo})`,
	};
};

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json', 'force']});
	const sub = a._[0] ?? 'status';
	const s = creditStatus();
	if (sub === 'off' || sub === 'on') {
		setConfigKey('credit', sub === 'on');
		say(sub === 'off' ? 'Credit note turned off for this project ("credit": false in harness.config.json).' : 'Credit note turned on ("credit": true).');
		return 0;
	}
	if (sub === 'lines') {
		// prints the note once and marks it shown; prints nothing when disabled or already shown (unless --force)
		if (!s.enabled && !a.flags.force) {
			if (a.flags.json) console.log(JSON.stringify({show: false, reasons: s.reasons}));
			return 0;
		}
		if (s.shown && !a.flags.force) {
			if (a.flags.json) console.log(JSON.stringify({show: false, reasons: ['already shown once for this project']}));
			return 0;
		}
		const l = creditLines(str(a.flags, 'product'));
		writeState({credit: {shown: true, shownAt: new Date().toISOString()}});
		if (a.flags.json) console.log(JSON.stringify({show: true, ...l}, null, 1));
		else say(`${l.line}\n\nX:\n${l.x}\n\nLinkedIn:\n${l.linkedin}`);
		return 0;
	}
	if (a.flags.json) console.log(JSON.stringify(s));
	else say(`credit note: ${s.enabled ? (s.shown ? 'enabled, already shown once (will not repeat)' : 'enabled, not shown yet') : `off (${s.reasons.join(', ')})`}`);
	return 0;
};
