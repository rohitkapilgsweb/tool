import axios from "axios";
import React from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function SendMessege() {

  const TokenTelegram = useSelector((state)=> state?.getTelegramToken?.TelegramTokens?.telegramToken);
  const notify = () => toast("Message Has Been Sent");

  const onSubmit = async (values) => {
    const text = values.text
    const chat_id = values.chat_id.includes('@') ? values.chat_id :  "@" + values.chat_id;
    if(TokenTelegram){
      const ApiURL = `https://api.telegram.org/bot${TokenTelegram}/sendMessage?chat_id=${chat_id}&text=${text}`
      axios.get(ApiURL).then((response) => {
        console.log(response.data)
        notify()
       
      });

    }else{
      alert('Add Your Telegram Token Go To Settings')
    }
  };
  return (
    <div>
        <ToastContainer/>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
              <Field
              className="form-control mb-3"
              name="chat_id"
              component="input"
              type="text"
              placeholder="@CheanelUserName"
            />
            <Field
              className="form-control"
              name="text"
              component="textarea"
              type="text"
              placeholder="Enter Message"
            />

            <button
              className="mt-3 bg-black btn text-white"
              type="submit"
              disabled={submitting || pristine}
            >
              Send
            </button>
          </form>
        )}
      />
    </div>
  );
}

export default SendMessege;
