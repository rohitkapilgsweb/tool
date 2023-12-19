import React, { useEffect, useState } from "react";
import {encode, decode} from 'string-encode-decode'
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import {
  UnlinkedAccount,
  add_Facebook_Data,
  get_Facebook_Data,
} from "../../../redux/actions/LoginAction";
import { toast } from "react-toastify";
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRECT } from "../../../config/config";
import Loader from "../../Components/Loader";

function FB_Settings() {
  const [facebookToken, setFacebookToken] = useState();
  const [getFacebookAccounts, setGetFacebookAccounts] = useState();

  const dispatch = useDispatch();
  var meindata = {
    userdata: [],
  };
  const isLoading = useSelector((state)=>state?.GetFacebookAccount?.isLoading)

  useEffect(()=>{
    GetAccountsData()
  },[])


  function handleSuccess(response) {
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
      // const EncodeToken = encode(userDatas.access_token);
      const EncodeToken = userDatas.access_token;
      const DataObjects = {
        facebook_token: EncodeToken,
        facebook_id: userData.id,
        facebook_image: userData.picture.data.url,
        facebook_name: userData.name
      };
      meindata.userdata.push({ accessToken: EncodeToken });
      localStorage.setItem("accessToken", EncodeToken);
      dispatch(add_Facebook_Data(DataObjects)).then((res) => {
        GetAccountsData()
   
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const GetAccountsData = () =>{
    
    dispatch(get_Facebook_Data())
    .then((res)=>{
      setGetFacebookAccounts(res?.payload?.data)

    })
  }
  const DeleteBotton = (id) =>{
    dispatch(UnlinkedAccount(id)).then((res)=>{
      GetAccountsData()
    })
  }


  return (
    <div>
      {isLoading && <Loader/>}
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
                scope="public_profile,email,pages_manage_posts,publish_to_groups,pages_show_list,pages_read_engagement,read_insights,pages_read_user_content,business_management,instagram_basic,pages_show_list"
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
                {getFacebookAccounts?.map((item,index) => {
                  return (
                    <tr key={item?.user_id}>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
               <div>           <h6 className="mb-1">{item.facebook_name}</h6>
                          <p className="mb-0">{item.facebook_id}</p></div>
                        <img
                          width={24}
                          src={item.facebook_image}
                          className="img-fluid rounded-top"
                          alt=""
                        />
                        <button style={{background:"#ff0000" }} className="btn btn-danger" onClick={()=>DeleteBotton(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FB_Settings;
