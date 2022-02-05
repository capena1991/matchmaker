import { onlyOrganizer } from '../../permissions'
import { matches } from '../../data/matches'
import { testGuildId } from '../../utils/config'
import { GuildCommand } from '../types'

export const waitList: GuildCommand = {
  name: 'wait-list',
  description: 'Check the people waiting to be matched.',
  options: [],
  run: onlyOrganizer(async (interaction) => {
    const { waitList } = await matches.get()
    if (waitList.length === 0) {
      return interaction.reply({ content: 'There are no people in the wait list.', ephemeral: true })
    }
    return interaction.reply({
      content: waitList.map((userId, i) => `**${i}** <@${userId}>`).join('\n'),
      ephemeral: true,
    })
  }),
  guildId: testGuildId,
}
