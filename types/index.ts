export type Account = {
  provider: string
  type: string
  providerAccountId: string
  access_token: string
  expires_at: number
  scope: string
  token_type: string
  id_token: string
}

export type Profile = {
  iss: string
  azp: string
  aud: string
  sub: string
  hd: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
  iat: number
  exp: number
}

export type User = {
  id: string
  name: string
  email: string
  image: string
}

export type PromptList = {
  id: string
  title: string
  Prompt: Array<Prompt>
}

export type Prompt = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

export type ActionType = 'FILE' | 'TEXT' | 'WEBSITE'
export type Upload = CrawlWebsite | UploadFile | FormData

export type CrawlWebsite = {
  type: 'WEBSITE'
  title: string
  url: string
}

export type UploadFile = {
  type: 'FILE'
  title: string
  file: File
}

export function isUploadFile(data: Upload): data is UploadFile {
  return (data as UploadFile)?.type === 'FILE'
}

export function isCrawWebsite(data: Upload): data is CrawlWebsite {
  return (data as CrawlWebsite)?.type === 'WEBSITE'
}

export type PromptDTO = {
  cateId: string
  promptList: Array<string>
}
