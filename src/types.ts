export interface RoomUser {
  id: string
  alias: string
}

export interface Room {
  users: RoomUser[]
}
