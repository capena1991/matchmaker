import { Room } from './types'

const userRoom: Record<string, string> = {
  '425379183829581835': '1',
  '937101273608646737': '1',
}

const rooms: Record<string, Room> = {
  '1': {
    id: '1',
    users: [
      { id: '425379183829581835', alias: 'me' },
      { id: '937101273608646737', alias: 'alt' },
    ],
  },
}

// TODO: get from DB
export const getUserRoom = (userId: string) => {
  return Promise.resolve(rooms[userRoom[userId]])
}
