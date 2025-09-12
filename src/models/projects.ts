export type Project = {
  name: string
  desc: string
  img?: string
  stack: string[]
  url: string
  isPrivate: boolean
  repo?: string   // owner/repo (ใช้สำหรับ OG image)
}
