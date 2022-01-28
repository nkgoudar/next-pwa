import Head from "next/head";
import "../styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (true) {
      const manifestJson = {
        name: "TEST PWA 2",
        short_name: "TES",
        theme_color: "#ffffff",
        background_color: "#004740",
        display: "fullscreen",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        splash_pages: null,
      };

      //   // const manifestElement = document.getElementById("manifest");
        const stringManifest = JSON.stringify(manifestJson);
      const blob = new Blob([stringManifest], {type: 'application/json'});
      // const manifestURL = URL.createObjectURL(blob);
      let node = document.createElement('link');
      // node.href = manifestURL
      node.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      node.rel = 'manifest';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}