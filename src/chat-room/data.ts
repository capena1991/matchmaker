import { roomIndex, rooms } from '@app/data/rooms'

export const getUserRoom = async (userId: string) => {
  const index = await roomIndex.get('index')
  const roomId = index[userId]
  if (!roomId) {
    return undefined
  }
  return rooms.get(roomId)
}
