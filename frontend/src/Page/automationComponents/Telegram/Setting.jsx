import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import Col from "react-bootstrap/esm/Col";
import {
  getTelegramToken,
  saveTelegramToken,
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
  const usergetObject = {
    user_id: getUserId().id,
  };
  useEffect(() => {
    if (getUserId()) {
      dispatch(getTelegramToken(usergetObject)).then((res) => {
        setTelegramToken(res?.payload?.telegramToken);
        setUserId(true);
        if(res?.payload?.telegramToken){
          setEditBtn(true)
        }
      });
    }
  
  }, []);

 
  const notify = (msg) => toast(msg);
  const onSubmit = async (values) => {

    // console.log(JSON.stringify(values));
    const saveData = {
      telegram_BotToken: values.telegram_BotToken,
      user_id: getUserId().id,
    };
    dispatch(saveTelegramToken(saveData)).then((res) => {
      setEditBtn(res.payload.status);
      if(res.payload.status === true){
        let mst = 'Toked Has Been Adedd'
        notify(mst)
      }
      dispatch(getTelegramToken(usergetObject)).then((res) => {
        setTelegramToken(res?.payload?.telegramToken);
        setUserId(true);
      });
    });
  };
  const stateChange = (query) => {
    if (query === "cancel") {
      setEditBtn(true);
    } else if (query === "edit") {
      setEditBtn(false);
    }else if(query === "update"){
      // setEditBtn(true);
      const updateData = {
        updateToken : updateToken?.telegram_BotToken,
        user_id: getUserId().id
      }
      dispatch(saveTelegramToken(updateData))
      .then((res)=>{
        setEditBtn(true);
        let mst = 'Toked Has Been Updated'
        notify(mst)
      })
console.log(updateToken,"add Update Logic")
    }
  
  };

  const isLoading = useSelector((state) => state?.saveTelegramToken?.isLoading);
  // const statusToken = useSelector((state) => state?.TelegramToken?.status);
  return (
    <div>
      {isLoading && <Loader />}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {setUpdateToken(values)}
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
                      onClick={() =>stateChange('update')}
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
