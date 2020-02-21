import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";

import "./Layout.scss";
import "./index.scss";

import navButtons from "../config/buttons";
import { UserProvider } from "../utils/user";

const Layout = ({ user, userLoading = false, children }) => {
  const appTitle = `DEMO`;

  return (
    <UserProvider value={{ user, loading: userLoading }}>
      <div className="Layout">
        <Head>
          <title>{appTitle}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>

        <Header appTitle={appTitle} user={user} userLoading={userLoading} />
        <div className="Content">{children}</div>
        <NavBar navButtons={navButtons} />
      </div>
    </UserProvider>
  );
};

export default Layout;
