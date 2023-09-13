import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import FacebookLogin from 'react-facebook-login';
import {
  add_Facebook_Data,
  get_Facebook_Data,
} from "../../../redux/actions/LoginAction";
import { getUserId } from "../../../utils/auth";
import { toast } from "react-toastify";

function FB_Settings() {
  const [facebookToken, setFacebookToken] = useState();
  const [getFacebookAccounts, setGetFacebookAccounts] = useState();

  const dispatch = useDispatch();
  var meindata = {
    userdata: [],
  };


  useEffect(()=>{
    GetAccountsData()
    
  },[])


  function handleSuccess(response) {
    console.log(response);
    console.log(response.authResponse.accessToken);
    setFacebookToken(response.authResponse.accessToken);
    getUserData(response.authResponse.accessToken, response);
  }
  function handleError(error) {
    console.log(error);
  }
  const notify = (msg) => toast(msg);

  async function getUserData(accessToken, response) {
    const url =
      "https://graph.facebook.com/v17.0/me?fields=id,name,email,picture&access_token=" +
      accessToken;

    try {
      const response = await fetch(url);
      const userData = await response.json();

      console.log(userData, "userdata");

      const DataObjects = {
        user_id: getUserId() ? getUserId()?.id : null,
        accessToken: facebookToken,
        page_access_token: null,
        fb_userId: userData.id,
        fb_userImg: userData.picture.data.url,
        fb_Username: userData.name,
        fb_pages: null,
        fb_groups: null,
      };

      meindata.userdata.push({ accessToken: accessToken });
      //   facepageData(userData.id, accessToken);
      localStorage.setItem("accessToken", accessToken);

      dispatch(add_Facebook_Data(DataObjects)).then((res) => {
        console.log(res);
        notify(res.payload.status)
        GetAccountsData()
   
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const datanew = {
    userId: "64ec576bc607966985a45e3a"
  }
  const GetAccountsData = () =>{
    dispatch(get_Facebook_Data(datanew))
    .then((res)=>{
      setGetFacebookAccounts(res?.payload)
      console.log(res,"responseresponseresponse")
    })
  }
// const responseFacebook = (response) => {
//   console.log(response);
// }

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
            
  {/* <FacebookLogin
    appId="158402927285129"
    autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={responseFacebook} />, */}

            <FacebookProvider appId="158402927285129">
              <LoginButton
                className="btn btn-primary"
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
              >
                Add Account
              </LoginButton>
            </FacebookProvider>
          </Col>
          <Col sm={12}>
            <Table striped bordered className="mt-4">
              <thead>
                <tr>
                  <th>User Data</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log(getFacebookAccounts,"getFacebookAccountsgetFacebookAccounts")} */}
                {getFacebookAccounts?.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img
                          width={24}
                          src={item.fb_userImg}
                          className="img-fluid rounded-top"
                          alt=""
                        />{" "}
                        {item.fb_Username}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
