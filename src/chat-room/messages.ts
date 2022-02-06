import { Message, Client } from 'discord.js'
import { RoomUser, Room } from '../types'
import { getUserRoom } from './data'

const formatMessage = ({ content }: Message, author?: RoomUser) => `**[${author?.alias ?? 'unknown'}]** ${content}`

const sendMessageToUser = async (userId: string, message: string, client: Client) => {
  const user = await client.users.fetch(userId)
  try {
    await user.send(message)
  } catch (error) {
    console.error(error)
  }
}

export const broadcastToRoom = async (message: Message) => {
  const { author, client } = message

  const room = await getUserRoom(author.id)
  if (!room) {
    return
  }

  const authorRoomUser = room.users.find(({ id }) => id === author.id)

  await Promise.all(
    room.users.map(({ id }) => {
      if (id === author.id) {
        return
      }
      return sendMessageToUser(id, formatMessage(message, authorRoomUser), client)
    }),
  )
}

export const sendWelcome = async (room: Room, client: Client) =>
  Promise.all(
    room.users.map(({ id }) =>
      sendMessageToUser(
        id,
        '**Your blind date has started! Start talking to each other and let me see that loooove 💘**',
        client,
      ),
    ),
  )
