import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalHeader } from "@/components/common/GlobalHeader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalHeader />
      <Component {...pageProps} />
    </>
  );
}
