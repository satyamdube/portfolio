import './globals.css';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import ParticleCanvas from '../components/ParticleCanvas';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Satyam Dubey | Sr. Frontend Developer / Full Stack Developer',
  description:
    'Portfolio of Satyam Dubey, a Sr. Frontend Developer / Full Stack Developer with 7+ years of experience specializing in React.js, Next.js, TypeScript, Node.js and modern web application development.',
  keywords: [
    'Satyam Dubey',
    'Sr Frontend Developer',
    'Full Stack Developer',
    'Software Engineer',
    'React.js',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Redux Toolkit',
    'Noida',
  ],
  authors: [{ name: 'Satyam Dubey' }],
  creator: 'Satyam Dubey',
  openGraph: {
    type: 'website',
    title: 'Satyam Dubey | Sr. Frontend Developer / Full Stack Developer',
    description:
      'Portfolio of Satyam Dubey — Sr. Frontend Developer / Full Stack Developer with 7+ years of experience building scalable, high-performance web applications.',
    url: 'https://portfolio-satyam-dubey.vercel.app/',
    siteName: 'Satyam Dubey Portfolio',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23080b14'/><text x='50%' y='68%' font-size='16' font-family='sans-serif' font-weight='800' fill='%2300f5a0' text-anchor='middle'>SD</text></svg>",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#07090e',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`dark-theme ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="dark-theme">
        <ParticleCanvas />
        {children}
      </body>
    </html>
  );
}
