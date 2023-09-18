import axios from "axios";
import React from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function SendMessege() {

  const TokenTelegram = useSelector((state)=> state?.getTelegramToken?.TelegramTokens?.telegramToken);
  const notify = () => toast("Message Has Been Sent");





  // const boldButton = document.getElementById('boldButton');
  const textInput = document.getElementById('textInput');
  let text ;
  const boldButton = () => {
      const startPos = textInput?.selectionStart;
      const endPos = textInput?.selectionEnd;
      const selectedText = textInput?.value.substring(startPos, endPos);
      
      const newText = textInput?.value.substring(0, startPos) +
                      '*' + selectedText + '*' +
                      textInput?.value.substring(endPos);
      
      textInput.value = newText;
      text= newText
  };

  const onSubmit = async (values) => {
    // console.log(values)
    
    // const files = values.file
    const chat_id = values.chat_id.includes('@') ? values.chat_id :  "@" + values.chat_id;
    if(TokenTelegram && text){
        const ApiURL = `https://api.telegram.org/bot${TokenTelegram}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=MARKDOWN`
     await axios.get(ApiURL).then((response) => {
          // console.log(response.data)
          // console.log(response)
          notify()
    
        });
    

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
            <div className="d-flex gap-3 mb-3">
        <span onClick={boldButton} className="btn rounded shadow-sm"><strong>B</strong></span>
            </div>
            <Field
            id="textInput"
              className="form-control mb-3"
              name="text"
              component="textarea"
              type="text"
              placeholder="Enter Message"
            />
            
             {/* <Field
              className="form-control " 
              name="file"
              component="input"
              type="file"
              placeholder="Enter Message"
            /> */}
            <button
            // onClick={form.reset}
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
