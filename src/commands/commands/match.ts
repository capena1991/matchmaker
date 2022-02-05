import { createMatch } from '../../chat-room/data'
import { onlyOrganizer } from '../../permissions'
import { testGuildId } from '../../utils/config'
import { GuildCommand } from '../types'

export const match: GuildCommand = {
  name: 'match',
  description: 'Match two people from the wait list.',
  options: [
    {
      name: 'index1',
      description: 'The index in the wait list of the first person to match.',
      type: 'INTEGER',
      required: true,
      minValue: 0,
    },
    {
      name: 'index2',
      description: 'The index in the wait list of the second person to match.',
      type: 'INTEGER',
      required: true,
      minValue: 0,
    },
  ],
  run: onlyOrganizer(async (interaction) => {
    const { options } = interaction
    const index1 = options.getInteger('index1') ?? 0
    const index2 = options.getInteger('index2') ?? 0
    const result = await createMatch(index1, index2)
    if (!result.isSuccess) {
      return interaction.reply({ content: result.error, ephemeral: true })
    }
    const [userId1, userId2] = result.result
    return interaction.reply({ content: `Matched <@${userId1}> and <@${userId2}>`, ephemeral: true })
  }),
  guildId: testGuildId,
}
