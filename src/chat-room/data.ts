import { OperationResult } from '@app/types'
import { matches } from '../data/matches'
import { roomIndex, rooms } from '../data/rooms'

export const getUserRoom = async (userId: string) => {
  const index = await roomIndex.get()
  const roomId = index[userId]
  if (!roomId) {
    return undefined
  }
  return rooms.get(roomId)
}

export const addToWaitList = async (userId: string): Promise<OperationResult> => {
  const { matches: matchesList, waitList } = await matches.get()
  if (waitList.includes(userId)) {
    return { isSuccess: false, error: 'You are already in the wait list.' }
  }
  if (matchesList.some((match) => match.includes(userId))) {
    return { isSuccess: false, error: 'You are already matched to someone.' }
  }
  await matches.set({ matches: matchesList, waitList: [...waitList, userId] })
  return { isSuccess: true }
}
