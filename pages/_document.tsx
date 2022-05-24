import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyles, createStylesServer } from "@mantine/next";
import React, { ReactElement, ReactFragment } from "react";

const stylesServer = createStylesServer();

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,

        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <ServerStyles html={initialProps.html} server={stylesServer} />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
export default MyDocument;
