// Showcase of the list family (presets/list): the self-maintaining list, prompt → thinking → result, pipeline + context chip.
// Invented copy, demo brands only. Registered by Root under the "showcase" folder.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandProvider} from '../../brand/BrandProvider';
import {DEMO_BRANDS} from '../../brand/demo';
import {BrandBackdrop} from '../../presets/look';
import {easings} from '../../presets/easings';
import {
  ContextChip,
  ListAssemble,
  PromptBar,
  SourcePipeline,
  TaskRow,
  ThinkingState,
  assemble,
  listHeight,
  type ListEvent,
} from '../../presets/list';

// ─── the hero list: drop-in, focus, write-in, reorder, check-off, stale → drop ─────────────────────

const EVENTS: ListEvent[] = [
  ...assemble(
    [
      {id: 'notes', title: 'Draft release notes for v2.4', source: 'doc', meta: 'Due before the 3 pm standup'},
      {id: 'pricing', title: 'Review pricing page copy', source: 'mail', meta: 'Maya sent comments'},
      {id: 'pr', title: 'Merge the onboarding fix', source: 'code', meta: '2 approvals, checks green'},
      {id: 'invoice', title: 'Send the March invoice', source: 'mail', meta: 'Finance asked yesterday'},
      {id: 'deck', title: 'Update the board deck', source: 'doc', meta: 'Untouched for 6 days'},
    ],
    8,
  ),
  {at: 46, type: 'focus', id: 'notes'},
  {at: 84, type: 'add', task: {id: 'call', title: 'Prep for the 11:30 customer call', source: 'call', meta: 'Moved up by Leo'}, index: 1, enter: 'write'},
  {at: 132, type: 'order', ids: ['call', 'notes', 'pr']},
  {at: 150, type: 'focus', id: 'call'},
  {at: 180, type: 'done', id: 'invoice'},
  {at: 222, type: 'stale', id: 'deck', label: 'No activity for 6 days · drop or move?', choice: 'drop'},
];

const ListHero: React.FC<{width: number; size: number}> = ({width, size}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H, durationInFrames} = useVideoConfig();
  const h = listHeight(EVENTS, frame, fps, size, width, true);
  const push = interpolate(frame, [0, durationInFrames], [1, 1.04], {easing: easings.inOutSine});
  return (
    <AbsoluteFill>
      <BrandBackdrop glow={0.1} />
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <ListAssemble events={EVENTS} width={width} size={size} header={{title: 'Today', date: 'Thu · 14 May'}} style={{position: 'absolute', left: (W - width) / 2, top: (H - h) / 2}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ListAssembleShow: React.FC = () => (
  <BrandProvider brand={DEMO_BRANDS.tallyfield}>
    <ListHero width={940} size={1} />
  </BrandProvider>
);

const ListAssembleVertical: React.FC = () => (
  <BrandProvider brand={DEMO_BRANDS.plumday}>
    <ListHero width={960} size={1.02} />
  </BrandProvider>
);

// ─── prompt → thinking → result ────────────────────────────────────────────────────────────────

const PromptThinking: React.FC = () => {
  const barW = 1000;
  return (
    <BrandProvider brand={DEMO_BRANDS.lumenfold}>
      <BrandBackdrop glow={0.14} y={0.5} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{position: 'relative', width: barW, height: 300}}>
          <PromptBar text="Summarize this week's churn and draft a follow-up" startFrame={10} sendAt={78} exitAt={96} width={barW} style={{position: 'absolute', top: 108}} />
          <ThinkingState
            label="Thinking"
            lines={['Reading 214 cancellation notes', 'Grouping reasons by plan', 'Drafting the follow-up email']}
            startFrame={100}
            resolveAt={170}
            width={barW}
            style={{position: 'absolute', top: 70, left: 0}}
          >
            <div style={{position: 'relative', width: barW, height: 122}}>
              <TaskRow
                task={{id: 'r', title: 'Churn up 0.6 pts, mostly annual → monthly', source: 'doc', meta: 'Draft ready: "Before you go…" to 38 accounts'}}
                height={122}
                width={barW}
                state={{focus: 1}}
                focusLabel="Result"
              />
            </div>
          </ThinkingState>
        </div>
      </AbsoluteFill>
    </BrandProvider>
  );
};

// ─── pipeline + context chip ───────────────────────────────────────────────────────────────────

const PipelineShow: React.FC = () => (
  <BrandProvider brand={DEMO_BRANDS.shellpine}>
    <BrandBackdrop glow={0.08} x={0.3} />
    <AbsoluteFill style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 90}}>
      <SourcePipeline
        title="Building preview"
        startFrame={6}
        stages={[
          {label: 'Clone branch', sub: 'feat/billing-v2 · 41 files', source: 'code', at: 16, doneAt: 34},
          {label: 'Install and build', sub: '1,204 modules in 18 s', source: 'screen', at: 36, doneAt: 64},
          {label: 'Run checks', sub: '312 tests passed', source: 'doc', at: 66, doneAt: 92},
          {label: 'Post preview link', sub: 'commented on the pull request', source: 'chat', at: 94, doneAt: 110},
        ]}
      />
      <div style={{width: 460, height: 420}}>
        <ContextChip
          label="Context"
          startFrame={20}
          count={4}
          countAt={30}
          items={[
            {label: 'Branch diff', source: 'code', sub: '+812 −97'},
            {label: 'Build logs', source: 'screen', sub: '18 s'},
            {label: 'Test report', source: 'doc', sub: '312 ok'},
            {label: 'Review thread', source: 'chat', sub: '6 msgs'},
          ]}
          openAt={52}
          checkIndex={2}
          checkAt={96}
        />
      </div>
    </AbsoluteFill>
  </BrandProvider>
);

export const showcase = [
  {id: 'list-assemble', component: ListAssembleShow, durationInFrames: 300, width: 1920, height: 1080},
  {id: 'list-assemble-vertical', component: ListAssembleVertical, durationInFrames: 300, width: 1080, height: 1920},
  {id: 'list-prompt-thinking', component: PromptThinking, durationInFrames: 240, width: 1920, height: 1080},
  {id: 'list-pipeline', component: PipelineShow, durationInFrames: 150, width: 1920, height: 1080},
];
