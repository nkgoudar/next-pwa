import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";

let deferredPrompt;
const Home = (props) => {
  console.log(props)
  const [installable, setInstallable] = useState(false);
  const [name, setName] = useState("");

  const manifestJson = {
    name: "TEST PWA 2",
    short_name: "TES",
    theme_color: "#ffffff",
    background_color: "#004740",
    display: "fullscreen",
    orientation: "portrait",
    scope: "https://next-pwa.herokuapp.com",
    start_url: "https://next-pwa.herokuapp.com",
    icons: [
      {
        src: "https://next-pwa.herokuapp.com/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://next-pwa.herokuapp.com/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://next-pwa.herokuapp.com/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    splash_pages: null,
  };
  useEffect(() => {
  
    //   // const manifestElement = document.getElementById("manifest");
      const stringManifest = JSON.stringify(manifestJson)
      let node = document.createElement('link');
      node.setAttribute('id', 'manni')
      node.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      node.rel = 'manifest';
      document.getElementsByTagName('head')[0].appendChild(node); 

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

  const nameSet = () => {
    console.log(name);
    manifestJson.name = name;
    manifestJson.short_name = name;
    const stringManifest = JSON.stringify(manifestJson)
    let node = document.getElementById('manni');
    node.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
    // node.rel = 'manifest';
    // document.getElementsByTagName('head')[0].appendChild(node); 
  }

  return (
    <>
    <Head>
    {/* <link rel="manifest" id="manifest" href={props.hi} /> */}
    </Head>
    <div className="App">
      <header className="App-header">
        <h2>Install Demo</h2>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button onClick={nameSet}>Set PWA app name</button>
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

// Home.getInitialProps = (context, client) => {
//   console.log("INITIAL PROPS");
  
//     return {hi: 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest)};
// }

export default Home;
