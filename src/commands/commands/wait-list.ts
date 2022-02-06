import { onlyOrganizer } from '../../permissions'
import { matches } from '../../data/matches'
import { Command } from '../types'

export const waitList: Command = {
  name: 'wait-list',
  description: 'Check the people waiting to be matched.',
  options: [],
  run: onlyOrganizer(async (interaction) => {
    const { waitList } = await matches.get()
    if (waitList.length === 0) {
      return interaction.reply({ content: '_There are no people in the wait list._', ephemeral: true })
    }
    return interaction.reply({
      content: waitList.map((userId, i) => `**${i}** <@${userId}>`).join('\n'),
      ephemeral: true,
    })
  }),
}
