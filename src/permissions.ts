import { CommandInteraction } from 'discord.js'

import { organizerId } from './utils/config'

const isOrganizer = (userId: string) => userId === organizerId

export const onlyOrganizer = (func: (interaction: CommandInteraction) => Promise<void>) => {
  return async (interaction: CommandInteraction) => {
    if (!isOrganizer(interaction.user.id)) {
      return interaction.reply('You are not authorized to use this command.')
    }
    return func(interaction)
  }
}
