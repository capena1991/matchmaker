import { matches } from '../../data/matches'
import { closeAllRooms, createRoom } from '../../chat-room/data'
import { sendWelcome } from '../../chat-room/messages'
import { onlyOrganizer } from '../../permissions'
import { Command } from '../types'

export const start: Command = {
  name: 'start',
  description: 'Start the blind date event with the current matches.',
  options: [],
  run: onlyOrganizer(async (interaction) => {
    interaction.deferReply()

    const closeRoomsResult = await closeAllRooms()
    if (!closeRoomsResult.isSuccess) {
      interaction.editReply(closeRoomsResult.error)
      return
    }

    const { matches: matchesList } = await matches.get()

    await Promise.all([
      matchesList.map(async (users, i) => {
        const createRoomResult = await createRoom(i.toString(), users)
        if (createRoomResult.isSuccess) {
          await sendWelcome(createRoomResult.result, interaction.client)
        }
      }),
    ])

    interaction.editReply(`**${matchesList.length}** blind dates just started!`)
  }),
}
