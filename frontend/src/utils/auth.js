import jwtDecode from "jwt-decode";

export const isUserLogined = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }
  return token ? true : false;
};

export const getToken = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
    return token;
  }else if(typeof window == "undefined"){
    localStorage.clear()
  }
  return token;
};

export const getUserId = () => {
    var token = getToken();
    let decoded = null;
    if (token) {
      decoded = jwtDecode(token);
    }
    return decoded;
  };

  export const LocalFbRole = () => {
    var fb_role = localStorage.getItem("userRole");
    let decoded = null;
    if (fb_role) {
      decoded = fb_role;
    }
    return decoded;
  };