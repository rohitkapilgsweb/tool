// import styles from "../styles/Home.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "../components/homeLayout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ children }) {
  return (
    <div >
      <HomeLayout />
    </div>
  );
}
