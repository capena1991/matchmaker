import Keyv from 'keyv'

import { db } from '../utils/config'
import { DataManager } from './data-manager'

interface Matches {
  waitList: string[]
  matches: string[][]
}

const initializeMatches = () => ({
  waitList: [],
  matches: [],
})

const matchesKeyv = new Keyv<Matches>(db, { namespace: 'chat-room-matches' })
export const matches = new DataManager(matchesKeyv, initializeMatches, 'matches')
