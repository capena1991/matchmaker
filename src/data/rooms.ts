import Keyv from 'keyv'

import { db } from '../utils/config'
import { DataManager } from './data-manager'
import { Room } from '../types'

const initializeRoom = () => ({
  users: [],
})

const initializeIndex = () => ({} as Record<string, string>)

const roomsKeyv = new Keyv<Room>(db, { namespace: 'chat-room' })
export const rooms = new DataManager(roomsKeyv, initializeRoom)

const roomIndexKeyv = new Keyv<Record<string, string>>(db, { namespace: 'chat-room-index' })
export const roomIndex = new DataManager(roomIndexKeyv, initializeIndex, 'index')
