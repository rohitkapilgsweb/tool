import { useRouter } from "next/router";
import React, { memo, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/admin/layout";

function AdminPage({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/admin") {
      router.push("/admin/dashboard");
    }
  }, []);
  return (
    <>
      <Layout children={children} />
    </>
  );
}

export default memo(AdminPage);
