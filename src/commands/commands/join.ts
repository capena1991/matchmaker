import { addToWaitList } from '../../chat-room/data'
import { testGuildId } from '../../utils/config'
import { GuildCommand } from '../types'

export const join: GuildCommand = {
  name: 'join',
  description: 'Get into the wait list for your blind date.',
  options: [],
  run: async (interaction) => {
    const result = await addToWaitList(interaction.user.id)
    if (!result.isSuccess) {
      return interaction.reply({ content: result.error, ephemeral: true })
    }
    return interaction.reply({ content: 'You have been added to the wait list!', ephemeral: true })
  },
  guildId: testGuildId,
}
