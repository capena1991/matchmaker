import { formatMatch } from '../../utils/formatting'
import { removeMatch } from '../../chat-room/data'
import { onlyOrganizer } from '../../permissions'
import { Command } from '../types'

export const unmatch: Command = {
  name: 'unmatch',
  description: 'Undo a match.',
  options: [
    {
      name: 'index',
      description: 'The match index.',
      type: 'INTEGER',
      required: true,
      minValue: 0,
    },
  ],
  run: onlyOrganizer(async (interaction) => {
    const { options } = interaction
    const index = options.getInteger('index') ?? 0
    const result = await removeMatch(index)
    if (!result.isSuccess) {
      return interaction.reply({ content: result.error, ephemeral: true })
    }
    const users = result.result
    return interaction.reply({ content: `Unmatched ${formatMatch(users)}`, ephemeral: true })
  }),
}
