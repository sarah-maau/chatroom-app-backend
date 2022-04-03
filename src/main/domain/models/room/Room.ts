export class Room {
  id: string
  name: string
  profileIds: string[]
  createdDate: Date
  updatedDate: Date

  constructor(p: Partial<Room>) {
    this.id = p.id ?? ''
    this.name = p.name ?? ''
    this.profileIds = p.profileIds ?? []
    this.createdDate = p.createdDate ?? new Date()
    this.updatedDate = p.updatedDate ?? new Date()
  }
}
