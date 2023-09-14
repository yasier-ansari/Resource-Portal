import './globals.css'
import { AuthContextProvider } from "@/hooks/AuthContext"
import IndexLayout from "@/components/IndexLayout"
import { Inter, Outfit } from "next/font/google";
import siteConfig from "@/util/site";

const outfit = Outfit({
  variable: "--font-out",
  subsets: ['latin']
})
const inter = Inter({
  variable: "--font-int",
  subsets: ['latin']
})

export const metadata = {
  title: `${siteConfig.details.title} - ${siteConfig.details.tagLine}`,
  description: siteConfig.details.description,
  openGraph: {
    title: siteConfig.details.title,
    description: siteConfig.details.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.details.title,
    images: [
      {
        url: `${siteConfig.assets.icon}`,
        width: 800,
        height: 600,
        alt: siteConfig.details.title,
      },
    ],
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.details.title,
    description: siteConfig.details.description,
    creator: siteConfig.socialLinks.twitter,
    images: [`${siteConfig.assets.icon}`],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-s min-h-screen w-full ${outfit.className} ${inter.variable} text-gray-800 `} >
        <AuthContextProvider>
          <IndexLayout >
            {children}
          </IndexLayout >
          {/* <ToastContainer /> */}
        </AuthContextProvider>
      </body>
    </html>
  )
}
