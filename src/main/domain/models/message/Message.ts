export class Message {
  id: string
  content: string
  createdDate: Date

  constructor(p: Partial<Message>) {
    this.id = p.id ?? ''
    this.content = p.content ?? ''
    this.createdDate = p.createdDate ?? new Date()
  }
}
