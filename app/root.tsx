import { Link, Outlet } from "@remix-run/react";
import { Scripts } from "@remix-run/react";
import React from 'react';
import { QueueProvider } from "~/components/Queue";
import Icon from "~/components/Icon";
import Player from "~/components/Player";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>SixBillowNoise</title>
        <link rel="stylesheet" href="/global.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        
      </head>
      <body>
        <QueueProvider>
          <Scripts />
          <div id="top-bar">
            <Link to="/">
              <Icon name="graphic_eq" />SixBillowNoise<Icon name="graphic_eq" />
            </Link>
          </div>
          <div id="mid">
            {children}
            <Player />
          </div>
          {/*<div id="player">
          </div>*/}
        </QueueProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}