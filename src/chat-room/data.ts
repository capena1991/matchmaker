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

export const addToWaitList = async (userId: string): Promise<OperationResult<boolean>> => {
  const { matches: matchesList, waitList } = await matches.get()
  if (waitList.includes(userId)) {
    return { isSuccess: false, error: 'You are already in the wait list.' }
  }
  if (matchesList.some((match) => match.includes(userId))) {
    return { isSuccess: false, error: 'You are already matched to someone.' }
  }
  await matches.set({ matches: matchesList, waitList: [...waitList, userId] })
  return { isSuccess: true, result: true }
}

export const createMatch = async (
  user1Index: number,
  user2Index: number,
): Promise<OperationResult<[string, string]>> => {
  const { matches: matchesList, waitList } = await matches.get()
  if (waitList.length < Math.max(user1Index, user2Index)) {
    return { isSuccess: false, error: 'There are not that many people in the wait list.' }
  }
  const user1Id = waitList[user1Index]
  const user2Id = waitList[user2Index]
  await matches.set({
    matches: [...matchesList, [user1Id, user2Id]],
    waitList: waitList.filter((_, i) => i !== user1Index && i !== user2Index),
  })
  return { isSuccess: true, result: [user1Id, user2Id] }
}
