import React from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useDispatch } from "react-redux";
import { add_Facebook_Data, get_Facebook_Data } from "../../../redux/actions/LoginAction";
function FB_Settings() {
  const dispatch = useDispatch();
  var meindata = {
    userdata: [],
  };

  const DataObjects = {
    user_id: "usereFeefeefe23",
    accessToken: "abcd1234",
    page_access_token: "efgh5678",
    fb_userId: "fbuser567",
    fb_userImg:"https://example.com/user-img.jpg",
    fb_Username: "john.doe",
    fb_pages: "Page 1",
    fb_groups: "groups"
}


  async function getUserData(accessToken,response) {
    const url =
      "https://graph.facebook.com/v17.0/me?access_token=" + accessToken;

    try {
      const response = await fetch(url);
      const userData = await response.json();
      console.log(userData, "userdata");

      meindata.userdata.push({ accessToken: accessToken });
    //   facepageData(userData.id, accessToken);
      localStorage.setItem("accessToken", accessToken);


      dispatch(add_Facebook_Data(DataObjects))
.then((res)=>{
    console.log(res)
})

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

//   async function facepageData(facepageData, accessToken) {
//     const url =
//       `https://graph.facebook.com/v17.0/${facepageData}/accounts?access_token=` +
//       accessToken;

//     try {
//       const response = await fetch(url);
//       const fbPageData = await response.json();
//       console.log(fbPageData.data[0], "fbpagedata");
//       localStorage.setItem("pageToken", fbPageData.data[0].access_token);
//       meindata.userdata.push({ page_token: fbPageData.data[0].access_token });
//       meindata.userdata.push({ page_name: fbPageData.data[0].name });
//       meindata.userdata.push({ page_id: fbPageData.data[0].id });
//       meindata.userdata.push({ category: fbPageData.data[0].category });
//       localStorage?.setItem("userRole", "fbUser");
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }

  function handleSuccess(response) {
    console.log(response.status);
    console.log(response.authResponse.accessToken);
    getUserData(response.authResponse.accessToken,response)
  }
  function handleError(error) {
    console.log(error);
  }

  return (
    <div>
        <Container>
          <Row>
            <h4 className="my-4 text-black">Facebook General Settings</h4>
            <Col sm={4}>
              <p>Enable Autoposting to Facebook</p>
            </Col>

            <Col sm={8}>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
              />
            </Col>
          </Row>

          <Row className="justify-content-between mb-3">
            <h4 className="my-4 text-black">Facebook API Settings </h4>
            <Col sm={4}>
              <p>Facebook APP Method</p>
            </Col>

            <Col sm={4}>
              <FacebookProvider appId="158402927285129">
                <LoginButton
                  className="btn btn-primary"
                  scope="email"
                  onError={handleError}
                  onSuccess={handleSuccess}>
                  Add Account
                </LoginButton>
              </FacebookProvider>
            </Col>
            <Col sm={12} className="">
              <Button variant="primary">Save</Button>
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default FB_Settings;
