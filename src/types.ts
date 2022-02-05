export interface RoomUser {
  id: string
  alias: string
}

export interface Room {
  users: RoomUser[]
}

interface SuccessOperationResult<T> {
  isSuccess: true
  result: T
}

interface ErrorOperationResult {
  isSuccess: false
  error: string
}

export type OperationResult<T> = SuccessOperationResult<T> | ErrorOperationResult
