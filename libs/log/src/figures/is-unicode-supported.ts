// import process from 'node:process';

export function isUnicodeSupported() {
  const proc = typeof process !== 'undefined' ? process : ({} as any);
  if (proc?.platform !== 'win32') {
    return proc?.env?.TERM !== 'linux'; // Linux console (kernel)
  }

  return (
    Boolean(proc?.env?.WT_SESSION) || // Windows Terminal
    Boolean(proc?.env?.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
    proc?.env?.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
    proc?.env?.TERM_PROGRAM === 'Terminus-Sublime' ||
    proc?.env?.TERM_PROGRAM === 'vscode' ||
    proc?.env?.TERM === 'xterm-256color' ||
    proc?.env?.TERM === 'alacritty' ||
    proc?.env?.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
  );
}

export default isUnicodeSupported;
