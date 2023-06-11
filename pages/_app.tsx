import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalHeader } from "@/components/common/GlobalHeader";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalHeader />
      <Component {...pageProps} />
    </>
  );
}
