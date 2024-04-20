import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Aside } from "src/components/organisms/Aside/aside";
import style from "src/styles/app.module.css";
import { ManagmentContextProvider } from "src/contexts/managmentContext";

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
        <ManagmentContextProvider>
          <Component {...pageProps} />
        </ManagmentContextProvider>
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
      <ManagmentContextProvider>
        <div className={style['container']}>
          <Aside />
          <main className={style['main-container']}>
            <Component {...pageProps} />
          </main>
        </div>
      </ManagmentContextProvider>
    </>
  );
}
