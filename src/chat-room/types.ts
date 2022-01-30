export interface RoomUser {
  id: string
  alias: string
}

export interface Room {
  id: string
  users: RoomUser[]
}
