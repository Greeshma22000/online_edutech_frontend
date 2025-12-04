import '../styles/globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import LayoutWrapper from '../components/layout/LayoutWrapper';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata = {
  title: 'Online EduTech',
  description: 'Online learning platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans min-h-screen bg-white text-gray-800 antialiased text-[17px] md:text-[18px]`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}




// import '../styles/globals.css';
// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// import LayoutWrapper from '../components/layout/LayoutWrapper';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Online Edutech",
//   description: "Online learning platform",
// };

// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <body
// //         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// //       >
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${jakarta.variable} font-sans min-h-screen bg-white text-gray-800 antialiased text-[17px] md:text-[18px]`}>
//         <LayoutWrapper>{children}</LayoutWrapper>
//       </body>
//     </html>
//   );
// }