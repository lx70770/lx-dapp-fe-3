import useWallte from "@/hooks/useWallet";
import React, { useEffect } from "react";
import { history, Outlet } from "umi";
import "../global.less";
import styles from "./index.less";

const Layout: React.FC = () => {
  const { connectEagerly } = useWallte();

  useEffect(() => {
    connectEagerly();
  }, []);

  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default Layout;
