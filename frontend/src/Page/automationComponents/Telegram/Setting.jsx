import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import Col from "react-bootstrap/esm/Col";
import { getTelegramToken } from "../../../redux/actions/LoginAction";
import { getUserId } from "../../../utils/auth";
function Setting(props) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(false);
  const [telegramToken, setTelegramToken] = useState(false);
  const usergetObject = {
    user_id: getUserId().id,
  };
  useEffect(() => {
    if (getUserId()) {
      dispatch(getTelegramToken(usergetObject)).then((res) => {
        setTelegramToken(res?.payload?.telegramToken);
        setUserId(true);
      });
    }
  }, []);

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values));
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <label>Your Bot Token</label>

            <>
              <Field
                className="form-control"
                name="key"
                component="input"
                type="text"
                // value={telegramToken}
                placeholder={userId ? telegramToken : "Enter Bot Token"}
                disabled={userId ? true : false}
              />
            </>
            {!userId ? (
              <Col sm={{ span: 12 }}>
                <button
                  className="mt-3 bg-black btn text-white"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Save
                </button>
                {console.log(userId)}
                {!userId && <button
                  // onClick={setUserId(true)}
                    className="mt-3 btn btn-danger text-white"
                    type="submit"                 >
                    Cancel
                  </button>}
              </Col>
          
            ) : (
              <>
                <Col sm={{ span: 12 }}>
                  <button
                  // onClick={setUserId(false)}
                    className="mt-3 bg-black btn text-white"
                    type="submit"                 >
                    Edit
                  </button>
                  <button
                    className="mt-3 bg-black btn text-white"
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    Update
                  </button>
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
