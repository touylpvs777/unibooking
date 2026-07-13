import client from './client'
import type { LoginRequest, TokenResponse, User } from '@/types/auth'

export const login = (data: LoginRequest) =>
  client.post<TokenResponse>('/auth/login', data)

export const logoutApi = () =>
  client.post('/auth/logout')

export const getMe = () => client.get<User>('/users/me')
