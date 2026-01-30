import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Montserrat cho toàn bộ nội dung (Set làm default font-sans)
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

// Playfair Display cho các tiêu đề nghệ thuật
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SIFS 2026 - Startup & Innovation Festival",
  description: "Ngày hội khởi nghiệp & đổi mới sáng tạo mùa xuân 2026 tại SIHUB. Nơi hội tụ các tài năng và ý tưởng đột phá.",
  generator: "quachthanhlong",
  metadataBase: new URL("https://sifs2026.learnforgrowth.com.vn/"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "SIFS 2026 - Startup & Innovation Festival",
    description: "Hành trình đổi mới sáng tạo mùa xuân 2026",
    images: [
      {
        url: "/og-image.jpg", // File đặt tại public/og-image.jpg
        width: 1200,          // Kích thước chuẩn để FB/Zalo hiện đẹp nhất
        height: 630,
        alt: "SIFS 2026 Preview Image",
      },
  ],
  locale: "vi_VN",
    type: "website",
    },
    twitter: {
    card: "summary_large_image",
    title: "SIFS 2026",
    description: "Startup & Innovation Festival 2026",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Background Layer: Clean & Minimalist */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Nền Gradient xám cực nhẹ để tạo chiều sâu cho màu trắng */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#f1f5f9_0%,#ffffff_100%)]" />
          
          {/* Ambient Lights - Chỉ để lại đốm sáng đỏ cực mờ làm điểm nhấn */}
          <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[0%] right-[-5%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />
        </div>
        
        <main>{children}</main>
        
        <Analytics />
      </body>
    </html>
  )
}






