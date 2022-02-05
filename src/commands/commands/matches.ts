import { onlyOrganizer } from '../../permissions'
import { matches as matchesData } from '../../data/matches'
import { testGuildId } from '../../utils/config'
import { GuildCommand } from '../types'

const formatMatch = (users: string[]) => users.map((userId) => `<@${userId}>`).join(', ')
const formatMatches = (matches: string[][]) => matches.map((users, i) => `**${i}** ${formatMatch(users)}`).join(', ')

export const matches: GuildCommand = {
  name: 'matches',
  description: 'Check the matches already made.',
  options: [],
  run: onlyOrganizer(async (interaction) => {
    const { matches } = await matchesData.get()
    if (matches.length === 0) {
      return interaction.reply({ content: '_There are no matches yet._', ephemeral: true })
    }
    return interaction.reply({ content: formatMatches(matches), ephemeral: true })
  }),
  guildId: testGuildId,
}
