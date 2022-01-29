import { testGuildId } from '../../utils/config'
import { GuildCommand } from '../types'

export const ping: GuildCommand = {
  name: 'ping',
  description: 'Replies with pong!',
  options: [],
  run: async (interaction) => {
    interaction.reply('Pong')
  },
  guildId: testGuildId,
}
