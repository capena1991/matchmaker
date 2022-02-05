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
      return interaction.reply('There are no people in the wait list.')
    }
    return interaction.reply(waitList.map((userId, i) => `**${i}** <@${userId}>`).join('\n'))
  }),
  guildId: testGuildId,
}
