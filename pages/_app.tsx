import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarComponent, NavbarComponent, BodyComponent } from "../components";
import { ThemeProvider } from "styled-components";
import variable from "../styles/variable";
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
