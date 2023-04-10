import { AppProps } from "next/app";
import Head from "next/head";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "highlight.js/styles/stackoverflow-dark.css";

import { useChatStore } from "@/stores/ChatStore";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import UIController from "@/components/UIController";
import { setColorScheme } from "@/stores/ChatActions";
import AudioPlayer from "@/components/AudioPlayer";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const colorScheme = useChatStore((state) => state.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  const apiKey = useChatStore((state) => state.apiKey);
  const playerMode = useChatStore((state) => state.playerMode);

  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>GoatGPT</title>
        <meta name="description" content="A new ChatGPT UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐐</text></svg>"/>
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
            primaryColor: "bluu",
            colors: {
              // https://smart-swatch.netlify.app/#5E6AD2
              bluu: [
                "#e8fae4",
                "#cbecc3",
                "#aedd9f",
                "#92d07b",
                "#78c256",
                "#57a93d",
                "#3d832e",
                "#265e20",
                "#113910",
                "#001504",
              ],
              // https://smart-swatch.netlify.app/#2A2D3D
              dark: [
                "#eef1fd",
                "#d1d4e3",
                "#b3b7cb",
                "#959ab5",
                "#787e9f",
                "#5f6486",
                "#494e69",
                "#34384c",
                "#1e212f",
                "#070b16",
              ],
            },
          }}
        >
          <Notifications />
          <AppShell
            padding={0}
            navbar={<Nav />}
            layout="alt"
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <div style={{ position: "relative", height: "100%" }}>
              <Component {...pageProps} />

              {apiKey && <UIController />}
            </div>
            {playerMode && <AudioPlayer />}
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
