import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Google OAuth code not found.' },
      { status: 400 },
    )
  }

  // Trocar o code por token no Google
  const googleRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: 'http://localhost:3000/api/auth/callback', // ou prod
      grant_type: 'authorization_code',
    }),
  })

  const tokenData = await googleRes.json()

  const idToken = tokenData.id_token

  if (!idToken) {
    return NextResponse.json({ message: 'Token not received from Google' }, { status: 400 })
  }

  // Validar ou registrar o usuário no seu backend
  const backendRes = await fetch('http://localhost:3001/api/auth/social-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }), // ou dados do user
  })

  if (!backendRes.ok) {
    return NextResponse.json({ message: 'Backend rejected login' }, { status: 401 })
  }

  const { token } = await backendRes.json()

  // Armazena o token em cookie
  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
