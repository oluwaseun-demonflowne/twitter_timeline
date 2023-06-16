import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Provider from "@components/Provider"
import { Session } from "next-auth"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session:Session
}) {
  return (
    <html lang="en">
      <body>
      <Provider session={session}>
        {children}
      </Provider>
      </body>
    </html>
  )
}
