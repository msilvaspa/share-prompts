import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Analytics } from "@vercel/analytics/react";

import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI prompts",
};

const RootLayout = ({ children }: any) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
