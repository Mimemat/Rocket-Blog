export interface Post {
  id: number, 
  title: string,
  author: string,
  content: string,
  thumbnail: string,
  created_at: string,
  updated_at: string
}

export interface User {
  name: string,
  email: string,
  pfp: string
}