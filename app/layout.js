import './globals.css'
import { AuthContextProvider } from "@/hooks/AuthContext"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import IndexLayout from "@/components/IndexLayout"
import { configureToast } from "@/util/toast";
import { DM_Sans, Manrope, Outfit, Red_Hat_Display, Urbanist, Work_Sans } from "next/font/google";
import localFont from 'next/font/local'
import siteConfig from "@/util/site";

const cal = localFont({
  src: "../asset/font/CalSans-SemiBold.woff2",
  variable: "--font-cal",
})

const outfit = Outfit({
  variable: "--font-out",
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
      <body className={`font-s min-h-screen w-full ${cal.variable} ${outfit.className} font-sat text-gray-800 `} >
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
