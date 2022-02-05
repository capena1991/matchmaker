export interface RoomUser {
  id: string
  alias: string
}

export interface Room {
  users: RoomUser[]
}

interface SuccessOperationResult {
  isSuccess: true
}

interface ErrorOperationResult {
  isSuccess: false
  error: string
}

export type OperationResult = SuccessOperationResult | ErrorOperationResult
