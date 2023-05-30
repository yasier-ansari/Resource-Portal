import './globals.css'
import { AuthContextProvider } from "@/hooks/AuthContext"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import IndexLayout from "@/components/IndexLayout"
import { configureToast } from "@/util/toast";
import { Urbanist } from "next/font/google";
import localFont from 'next/font/local'
import siteConfig from "@/util/site";

const cal = localFont({
  src: "../asset/font/CalSans-SemiBold.ttf",
  variable: "--font-cal",
})
const urbanist = Urbanist({
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
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;0,900;1,100;1,200;1,300;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      */}
      {/* ${fontHeading.className} */}
      <body className={`font-s min-h-screen w-full ${cal.variable} ${urbanist.className} text-gray-800 `} >
        <AuthContextProvider>
          <IndexLayout >
            {children}
          </IndexLayout >
          <ToastContainer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
