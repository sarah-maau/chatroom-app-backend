export class Profile {
  id: string
  username: string
  createdDate: Date
  updatedDate: Date

  constructor(p: Partial<Profile>) {
    this.id = p.id ?? ''
    this.username = p.username ?? ''
    this.createdDate = p.createdDate ?? new Date()
    this.updatedDate = p.updatedDate ?? new Date()
  }
}
