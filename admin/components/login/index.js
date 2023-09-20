import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../redux/actions/auth";
// import DisclaimerModal from "../modals/disclaimermodal";
// import SignupModal from "../modals/signupmodal";
// import ForgotPasswordPage from "../admin/forgotPassword";
// import { getTokenDecode, setCookies } from "../utils";
import { userRoles } from "../../utils/helper";
import { setLayoutByRole } from "../../redux/reducers/User/userSlice";
// import LoaderPage from "../common-components/loader";


function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const handleHide = () => {
    setModalShow(false);
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginLoader = useSelector((state) => state.loginUser.isLoading)


  const handleLogin = () => {
    dispatch(login(loginData)).then(async (res) => {
      if (res.payload.success) {
        setCookies(10, res.payload.data.token, res.payload.data.user.Roles.key)
        localStorage.setItem('token', res.payload.data.token)
        toast.success("Successfully Logged In")
        if (res.payload.data.user.Roles.key === userRoles.admin) {
          dispatch(setLayoutByRole(res.payload.data.user.Roles.key))
          router.push('/admin/dashboard')
        } else {
          dispatch(setLayoutByRole(res.payload.data.user.Roles.key))
          router.push('/')
        }

      } else {
        toast.error(res?.payload?.message);
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleForget = () => {
    router.push("/forget");
  };


  return (
    <>
      {loginLoader && <LoaderPage />}
      <div className="login_bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="text-center login_left_col">
                <img className="hcceco_logo" src="/images/bharat-logo.svg" />
                <p className="logo_sub_heading">Sign in to your account</p>
                <img
                  className="img-fluid login_img"
                  src="images/login-img.svg"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="login_right_col">
                <form onSubmit={onSubmit} className="login_form">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="login_input signup_form_input"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="login_input signup_form_input"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                  <div className="forgot_row" onClick={handleForget}>
                    <p className="login_paira mobile_font_14 under_line hover_link">
                      Forgot Password?
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn login_btn"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <p className="login_paira text-center mobile_font_14">
                    Don't have an account?{" "}
                    <a onClick={() => setModalShow(true)}>Create Account</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <DisclaimerModal show={modalShow} onHide={() => handleHide()} /> */}


    </>
  );
}
export default LoginPage;
