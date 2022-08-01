import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarComponent, NavbarComponent, BodyComponent } from "../components";
import { ThemeProvider } from "styled-components";
import variable from "../styles/variable";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Head from "next/head";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }, []);
    return (
        <Provider store={store}>
            <Head>
                <title>My Website</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <ThemeProvider theme={variable}>
                {showNav && <NavbarComponent></NavbarComponent>}
                <BodyComponent>
                    <Component {...pageProps} />
                </BodyComponent>
            </ThemeProvider>
        </Provider>
    );
}
export default MyApp;
