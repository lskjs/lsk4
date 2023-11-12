export const joinArgs = (args: string[] = []): string =>
  args
    .filter(Boolean)
    .map((a) => (a.includes(' ') ? `"${a}"` : a))
    .join(' ');
