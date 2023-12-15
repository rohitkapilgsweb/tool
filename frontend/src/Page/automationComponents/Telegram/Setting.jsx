import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import Col from "react-bootstrap/esm/Col";
import {
  getTelegramToken,
  saveTelegramToken,
  updateTelegramToken,
} from "../../../redux/actions/LoginAction";
import { getUserId } from "../../../utils/auth";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
function Setting(props) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(false);
  const [telegramToken, setTelegramToken] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [updateToken, setUpdateToken] = useState();

  
  const isLoading = useSelector((state) => state?.getTelegramToken?.isLoading);
  const getTelegramTokens = useSelector((state) => state?.getTelegramToken?.TelegramTokens?.data  );

  
  useEffect(() => {
    if (getUserId()) {
      dispatch(getTelegramToken(getUserId()?.user?.id)).then((res) => {
        setTelegramToken(res?.payload?.data.telegram_token);
        setUserId(true);
        if(res?.payload?.data.telegram_token){
          setEditBtn(true)
        }
      });
    }
  
  }, []);

 
  const notify = (msg) => toast(msg);
  const onSubmit = async (values) => {
    setUpdateToken(values)
    // console.log(JSON.stringify(values));
    const saveData = {
      telegram_token: values.telegram_BotToken,
    };
    dispatch(saveTelegramToken(saveData)).then((res) => {
      setEditBtn(res.payload.status);
      if(res.payload.status){
        notify(res.payload.status)
      }
      dispatch(getTelegramToken(getUserId()?.user?.id)).then((res) => {
        setTelegramToken(res?.payload?.data.telegram_token);
        setUserId(true);
      });
    });
  };
  const stateChange = (query,values) => {
    if (query === "cancel") {
      setEditBtn(true);
    } else if (query === "edit") {
      setEditBtn(false);
    }else if(query === "update"){
      // setEditBtn(true);
      const updateData = {
        telegram_tokens :{telegram_token: values},
        id: getTelegramTokens?.id
      }
      dispatch(updateTelegramToken(updateData)).then((res)=>{
      toast(res.payload.status)
        if(res.payload.status === "Telegram update successfully"){
          notify(res.payload.status)
          dispatch(getTelegramToken(getUserId()?.user?.id)).then((res) => {
            setTelegramToken(res?.payload?.data.telegram_token);
            setUserId(true);
            if(res?.payload?.data.telegram_token){
              setEditBtn(true)
            }
          });
        }

      })
// console.log(updateToken,"add Update Logic")
    }
  
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <label>Your Bot Token</label>
            <>
              <Field
                className="form-control"
                name="telegram_BotToken"
                component="input"
                type="text"
                // value={telegramToken}
                placeholder={userId ? telegramToken : "Enter Bot Token"}
                disabled={editBtn}
              />
            </>
            {!editBtn ? (
              <>
                <Col sm={4}>
                  <div className="d-flex align-items-center gap-3">
                   {!telegramToken && <button
                      className="mt-3 bg-black btn text-white"
                      type="submit"
                      disabled={submitting || pristine}>
                      Save
                    </button>} 
                    {telegramToken && (<>
                      <p
                      className="mt-3 mb-0 bg-black btn text-white"
                      type="submit"
                      onClick={() =>stateChange('update',values?.telegram_BotToken)}
                      >
                      Update
                    </p> <p
                      className="mt-3 mb-0 bg-black btn text-white"
                      onClick={() => stateChange("cancel")}

                    >
                      Cancel
                    </p></>)}
                    
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col sm={{ span: 12 }}>
                  <p
                    className="mt-3 bg-black btn text-white"
                    onClick={() => stateChange("edit")}

                  >
                    EDIT
                  </p>
                </Col>
              </>
            )}
          
          </form>
        )}
      />
    </div>
  );
}

export default Setting;
