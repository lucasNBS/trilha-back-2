import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Aside } from "src/components/organisms/Aside/aside";
import style from "src/styles/app.module.css";
import { ManagmentContextProvider } from "src/contexts/managmentContext";
import { AuthenticationContextProvider } from "src/contexts/authenticationContext";

const inter = Inter({ subsets: ["latin"] });

const pagesWithoutLayoutRoute = ["/register", "/login"]

export default function App({ Component, pageProps, router }: AppProps) {
  if (pagesWithoutLayoutRoute.includes(router.pathname)) {
    return (
      <>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }

          body {
            overflow-x: hidden;
          }
        `}</style>
        <AuthenticationContextProvider>
          <ManagmentContextProvider>
            <Component {...pageProps} />
          </ManagmentContextProvider>
        </AuthenticationContextProvider>
      </>
    )
  }
  
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
      <AuthenticationContextProvider>
        <ManagmentContextProvider>
          <div className={style['container']}>
            <Aside />
            <main className={style['main-container']}>
              <Component {...pageProps} />
            </main>
          </div>
        </ManagmentContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}
