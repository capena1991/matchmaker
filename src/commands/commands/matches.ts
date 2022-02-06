import { onlyOrganizer } from '../../permissions'
import { matches as matchesData } from '../../data/matches'
import { formatMatches } from '../../utils/formatting'
import { Command } from '../types'

export const matches: Command = {
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
}
