// require.context is provided by Remotion's webpack bundler (used by Root.tsx for auto-registration).
interface LaunchfilmRequireContext {
  keys(): string[];
  (id: string): unknown;
}
declare namespace NodeJS {
  interface Require {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp): LaunchfilmRequireContext;
  }
}
