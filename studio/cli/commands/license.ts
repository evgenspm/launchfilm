// license: record the user's one-time answer about the Remotion license (state.json remotionLicenseAck).
// Remotion is source-available: free for individuals and teams of up to 3 people (5.0: contractors count);
// companies of 4+ need a Company License (https://www.remotion.pro/license). launchfilm cannot cover that.
import {parseArgs} from '../lib/args.js';
import {die, say} from '../lib/log.js';
import {readState, writeState} from '../lib/state.js';

const ANSWERS: Record<string, string> = {
	individual: 'an individual (free license)',
	'small-team': 'a team of up to 3 people, contractors included (free license)',
	'company-licensed': 'a company of 4+ people that has a Remotion Company License',
	evaluating: 'evaluating Remotion (free while evaluating)',
};

export const NOTICE =
	'launchfilm renders with Remotion, which is source-available: free for individuals and teams of up to 3 people (contractors count from Remotion 5.0); companies of 4 or more need a Company License: https://www.remotion.pro/license';

export const run = async (argv: string[]) => {
	const a = parseArgs(argv, {boolean: ['json']});
	const [sub, answer] = a._;
	if (!sub || sub === 'status') {
		const st = readState();
		if (a.flags.json) console.log(JSON.stringify({ack: st.remotionLicenseAck ?? null, notice: NOTICE}));
		else say(st.remotionLicenseAck ? `Remotion license: ${ANSWERS[st.remotionLicenseAck.answer] ?? st.remotionLicenseAck.answer} (recorded ${st.remotionLicenseAck.at})` : `not acknowledged yet.\n${NOTICE}\nAsk the user once, then: npx launchfilm license ack ${Object.keys(ANSWERS).join('|')}`);
		return 0;
	}
	if (sub !== 'ack') die(`unknown subcommand ${sub}`, 'license status | license ack <answer>');
	if (!answer || !ANSWERS[answer]) die('license ack needs the user\'s answer', `one of: ${Object.keys(ANSWERS).join(', ')}`);
	writeState({remotionLicenseAck: {answer, at: new Date().toISOString()}});
	say(`recorded: ${ANSWERS[answer]}.${answer === 'company-licensed' ? '' : ' If the team grows to 4+ people, a Company License is needed.'}`);
	return 0;
};
