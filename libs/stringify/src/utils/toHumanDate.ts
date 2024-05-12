export const toHumanDate = (date: Date) =>
  `${new Date(date).toISOString().substr(0, 10)} ${new Date().toISOString().substr(11, 8)}`;
