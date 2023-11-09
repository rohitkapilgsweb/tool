import React, { useEffect, useState } from "react";
import {encode, decode} from 'string-encode-decode'
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
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRECT } from "../../../config/config";

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
    // console.log(response);
    // console.log(response.authResponse.accessToken);
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
      const Api_url="https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id="+ FACEBOOK_CLIENT_ID + "&client_secret="+FACEBOOK_CLIENT_SECRECT + '&fb_exchange_token=' + accessToken

    try {
      const response = await fetch(url);
      const userData = await response.json();
      const responserefreshToken = await fetch(Api_url)
      const userDatas = await responserefreshToken.json();
      const EncodeToken = encode(userDatas.access_token);

      const DataObjects = {
        user_id: getUserId() ? getUserId()?.id : null,
        page_access_token:EncodeToken,
        accessToken: EncodeToken,
        fb_userId: userData.id,
        fb_userImg: userData.picture.data.url,
        fb_Username: userData.name,
        fb_pages: null,
        fb_groups: null,
      };
// console.log(DataObjects,EncodeToken,userDatas.access_token,"DataObjectsDataObjectsDataObjectsDataObjects")
      meindata.userdata.push({ accessToken: EncodeToken });
      //   facepageData(userData.id, accessToken);
      localStorage.setItem("accessToken", EncodeToken);

      dispatch(add_Facebook_Data(DataObjects)).then((res) => {
        // console.log(res);
        notify(res.payload.status)
        GetAccountsData()
   
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const GetAccountsData = () =>{
    const data = {
      userId: getUserId()?.id,
      session:getFacebookAccounts ? getFacebookAccounts[0]?.accessToken : ""
    }
    
    dispatch(get_Facebook_Data(data))
    .then((res)=>{
      setGetFacebookAccounts(res?.payload)
      // console.log(res,"responseresponseresponse")

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
            
            <FacebookProvider appId="158402927285129">
              <LoginButton
                className="btn btn-primary"
                scope="public_profile,email,pages_manage_posts,publish_to_groups,pages_show_list,pages_read_engagement,pages_read_user_content"
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
                {getFacebookAccounts?.map((item,index) => {
                  return (
                    <tr key={index}>
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
