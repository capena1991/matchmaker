import { Message } from 'discord.js'
import { getUserRoom } from '../data/rooms'
import { RoomUser } from '../types'

const formatMessage = ({ content }: Message, author?: RoomUser) => `**[${author?.alias ?? 'unknown'}]** ${content}`

export const broadcastToRoom = async (message: Message) => {
  const { author, client } = message

  const room = await getUserRoom(author.id)
  if (!room) {
    return
  }

  const authorRoomUser = room.users.find(({ id }) => id === author.id)

  await Promise.all(
    room.users.map(async ({ id }) => {
      if (id === author.id) {
        return
      }
      const user = await client.users.fetch(id)
      try {
        await user.send(formatMessage(message, authorRoomUser))
      } catch (error) {
        console.error(error)
      }
    }),
  )
}
