import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
})

const _playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "SIFS 2026 - Startup & Innovation Festival ",
  description: "Ngày hội khởi nghiệp & đổi mới sáng tạo mùa xuân 2026 tại SIHUB [cite: 7, 295, 297]",
  generator: "quachthanhlong",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        [cite_start]{/* Theme color chuyển sang đỏ đậm sang trọng [cite: 1] */}
        <meta name="theme-color" content="#8B0000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${_montserrat.variable} ${_playfair.variable} font-sans antialiased bg-[#050505] text-white selection:bg-red-500/30`}
      >
        {/* Hiệu ứng background tinh tế: Hỗ trợ chiều sâu cho nội dung gọi vốn */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#300000_0%,#050505_70%)]" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        </div>
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}