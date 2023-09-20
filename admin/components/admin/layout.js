import Image from "next/image";
import { Container, Row } from "react-bootstrap";
import LeftMenuPage from "./LeftMenu";
import Header from '../Layout/Header'
import { useRouter } from "next/router";
import { memo } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Container fluid>
        <div className="layout_padding padding_top">
          <Row>
            <div className="col-lg-1 col-md-2 col-0 mobile_leftmenu">
              <LeftMenuPage />
            </div>
            <div className="col-lg-11 col-md-10 col-12">
              <Row>
                <div className="header_padding">
                  <Header />
                </div>
              </Row>
              <main>
                {" "}
                <Row>
                  <div className="header_padding">{children}</div>
                </Row>
              </main>
            </div>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default memo(Layout);
