
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
          {/* // <Wrapper> */}
            <Component {...pageProps} />
             <ToastContainer autoClose={1000} />
          {/* ///* </Wrapper>  */}
     </Provider>
  )

}

export default MyApp;
