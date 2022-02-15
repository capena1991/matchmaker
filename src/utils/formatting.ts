export const formatMatch = (users: string[]) => users.map((userId) => `<@${userId}>`).join(' and ')

export const formatMatches = (matches: string[][]) =>
  matches.map((users, i) => `**${i}** ${formatMatch(users)}`).join('\n')
