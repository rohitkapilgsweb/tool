import React from 'react'
import FacebookLogin from '@greatsumini/react-facebook-login';
function Login() {
    async function getUserData(accessToken) {
        const url = "https://graph.facebook.com/v17.0/me?access_token=" + accessToken;
        
        try {
          const response = await fetch(url);
          const userData = await response.json();
          console.log(userData,"userdata");
          facepageData(userData.id, accessToken)
          localStorage.setItem("accessToken", accessToken)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      
      
      
      async function facepageData(facepageData,accessToken) {
        const url = `https://graph.facebook.com/v17.0/${facepageData}/accounts?access_token=` + accessToken;
        
        try {
          const response = await fetch(url);
          const fbPageData = await response.json();
          console.log(fbPageData.data[0],"fbpagedata");
          localStorage.setItem("pageToken", fbPageData.data[0].access_token)
          localStorage?.setItem("userRole","fbUser")
        } catch (error) {
          console.error("Error fetching user data:", error);
        } 
      }
  return (
    <div>
        
        <FacebookLogin
  appId="158402927285129"
  onSuccess={(response) => {
    console.log('Login Success!', response);
    getUserData(response.accessToken)
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
  }}
/>
    </div>
  )
}

export default Login