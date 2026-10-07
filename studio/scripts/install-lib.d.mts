export declare const SKILL_NAMES_HINT: string[];
export declare const listSkillDirs: (root: string) => string[];
export declare const skillFileOk: (p: string) => boolean;
export declare const linkClaudeSkill: (repo: string, name: string) => 'ok' | 'symlink' | 'junction' | 'copy';
export declare const MARK_BEGIN: string;
export declare const MARK_END: string;
export declare const managedBlock: (version: string, studioDir?: string) => string;
export declare const upsertBlock: (text: string, block: string) => {text: string; changed: boolean};
export declare const blockVersion: (text: string) => string | null;
