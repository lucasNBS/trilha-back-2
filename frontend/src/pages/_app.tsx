import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Aside } from "src/components/organisms/Aside/aside";
import style from "src/styles/app.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
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
      <div className={style['container']}>
        <Aside />
        <main className={style['main-container']}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
