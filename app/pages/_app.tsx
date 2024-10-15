// pages/_app.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { AppProps } from 'next/app';
// import { ThemeProvider, useTheme } from '../contexts/theme-context';
// import NavBar from '../components/NavBar';
// import Footer from '../components/Footer';
import Layout from '@/components/Layout';

function HeliosFuturamaApp({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider>
    //   <ThemeWrapper>
    //     <NavBarWithTheme />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    //     <FooterWithTheme />
    //   </ThemeWrapper>
    // </ThemeProvider>
  );
}

// const ThemeWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { isDarkTheme } = useTheme();

//   React.useEffect(() => {
//     document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
//   }, [isDarkTheme]);

//   return <>{children}</>;
// };

// const NavBarWithTheme: React.FC = () => {
//   return <NavBar />;
// };

// const FooterWithTheme: React.FC = () => {
//   const { isDarkTheme } = useTheme();
//   return <Footer isDarkTheme={isDarkTheme} />;
// };

export default HeliosFuturamaApp;