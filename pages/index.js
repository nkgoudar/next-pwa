import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";

let deferredPrompt;
const Home = (props) => {
  console.log(props)
  const [installable, setInstallable] = useState(false);

  useEffect(() => {

    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("BEFOREINSTALLPROMPT");
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e) => {
    console.log("HANDLEINSTALLCLICK");
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };



  return (
    <>
    <Head>
    {/* <link rel="manifest" id="manifest" href={props.hi} /> */}
    <link href="data:application/json;charset=utf-8,%7B%22name%22%3A%22Wingstop%20Company%20Pvt.%20Ltd.%22%2C%22short_name%22%3A%22Wingstop%20Company%20Pvt.%20Ltd.%22%2C%22theme_color%22%3A%22%23d2910c%22%2C%22background_color%22%3A%22%23fafafa%22%2C%22display%22%3A%22standalone%22%2C%22scope%22%3A%22https%3A%2F%2Fdinedemo.inresto.com%2Fwla%2Fwla-welcome%3FcgId%3D5fa129a2d5388715bebb575b%22%2C%22start_url%22%3A%22https%3A%2F%2Fdinedemo.inresto.com%2Fwla%2Fwla-welcome%3FcgId%3D5fa129a2d5388715bebb575b%22%2C%22related_applications%22%3A%5B%7B%22platform%22%3A%22webapp%22%2C%22url%22%3A%22https%3A%2F%2Fdinedemo.inresto.com%2Fwla%2Fwla-welcome%3FcgId%3D5fa129a2d5388715bebb575b%22%7D%5D%2C%22orientation%22%3A%22portrait%22%2C%22icons%22%3A%5B%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-72%2Ch-72%2Cc-force%22%2C%22sizes%22%3A%2272x72%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-96%2Ch-96%2Cc-force%22%2C%22sizes%22%3A%2296x96%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-128%2Ch-128%2Cc-force%22%2C%22sizes%22%3A%22128x128%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-144%2Ch-144%2Cc-force%22%2C%22sizes%22%3A%22144x144%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-152%2Ch-152%2Cc-force%22%2C%22sizes%22%3A%22152x152%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-192%2Ch-192%2Cc-force%22%2C%22sizes%22%3A%22192x192%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-384%2Ch-384%2Cc-force%22%2C%22sizes%22%3A%22384x384%22%2C%22type%22%3A%22image%2Fpng%22%7D%2C%7B%22src%22%3A%22https%3A%2F%2Fimgsvcim.inresto.com%2Finrestomenuitems%2F5cc2ec5844981c16793f4c36%2Ftheme%2FExpresslogo1.png%3Ftr%3Dw-512%2Ch-512%2Cc-force%22%2C%22sizes%22%3A%22512x512%22%2C%22type%22%3A%22image%2Fpng%22%7D%5D%7D" rel="manifest"></link>
    </Head>
    <div className="App">
      <header className="App-header">
        <h2>Install Demo</h2>
        {installable && (
          <button className="install-button" onClick={handleInstallClick}>
            INSTALL ME
          </button>
        )}
        {/* <p>
          <a href={repo} className="App-link">View source on GitHub</a>
        </p> */}
      </header>
    </div>
    </>
  );
}

Home.getInitialProps = (context, client) => {
  console.log("INITIAL PROPS");
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
    const stringManifest = JSON.stringify(manifestJson)
    return {hi: 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest)};
}

export default Home;