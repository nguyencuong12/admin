import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarComponent, NavbarComponent, BodyComponent } from "../components";
import { ThemeProvider } from "styled-components";
import variable from "../styles/variable";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Admin Sashimeomeo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <ThemeProvider theme={variable}>
        <NavbarComponent></NavbarComponent>
        <BodyComponent>
          <Component {...pageProps} />
        </BodyComponent>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
