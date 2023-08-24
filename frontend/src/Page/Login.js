import React from 'react'
// import FacebookLogin from '@greatsumini/react-facebook-login';
// import { useDispatch } from 'react-redux'
// import { LoginActions } from '../redux/actions/LoginAction';
function Login() {
  
  // const dispatch = useDispatch();

  // var meindata = {
  //   userdata:[]
  // }

  //   async function getUserData(accessToken) {
  //       const url = "https://graph.facebook.com/v17.0/me?access_token=" + accessToken;
        
  //       try {
  //         const response = await fetch(url);
  //         const userData = await response.json();
  //         console.log(userData,"userdata");
         
  //         meindata.userdata.push({accessToken: accessToken})
  //         facepageData(userData.id, accessToken)
  //         localStorage.setItem("accessToken", accessToken)
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
      
      
      
  //     async function facepageData(facepageData,accessToken) {
  //       const url = `https://graph.facebook.com/v17.0/${facepageData}/accounts?access_token=` + accessToken;
        
  //       try {
  //         const response = await fetch(url);
  //         const fbPageData = await response.json();
  //         console.log(fbPageData.data[0],"fbpagedata");
  //         localStorage.setItem("pageToken", fbPageData.data[0].access_token)
  //         meindata.userdata.push({page_token: fbPageData.data[0].access_token})
  //         meindata.userdata.push({page_name: fbPageData.data[0].name})
  //         meindata.userdata.push({page_id: fbPageData.data[0].id})
  //         meindata.userdata.push({category: fbPageData.data[0].category})
  //         localStorage?.setItem("userRole","fbUser")
  //         dispatch(LoginActions(meindata))
  //         .then((res)=>{
  //           console.log(res)
  //         })

  //         window.location.reload()
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       } 
  //     }

  //     console.log(meindata,"aaaaaaaaaaaaaaaa")

    
  return (
    <div>
        
        {/* <FacebookLogin
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
    meindata.userdata.push(response)
  }}
/> */}
    </div>
  )
}

export default Login