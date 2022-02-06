import { Command } from '../types'

export const ping: Command = {
  name: 'ping',
  description: 'Replies with pong!',
  options: [],
  run: async (interaction) => {
    interaction.reply('Pong')
  },
}
