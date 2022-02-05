import Keyv from 'keyv'

import { db } from '../utils/config'
import { DataManager } from './data-manager'
import { Room } from '../types'

const initializeRoomData = () => ({
  users: [],
})

const roomsKeyv = new Keyv<Room>(db, { namespace: 'chat-room' })
export const rooms = new DataManager<Room>(roomsKeyv, initializeRoomData)

const roomIndexKeyv = new Keyv<Record<string, string>>(db, { namespace: 'chat-room-index' })

export const getUserRoom = async (userId: string) => {
  const index = await roomIndexKeyv.get('index')
  const roomId = index?.[userId]
  if (!roomId) {
    return undefined
  }
  return rooms.get(roomId)
}
