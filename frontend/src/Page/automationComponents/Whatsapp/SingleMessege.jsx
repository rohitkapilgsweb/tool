import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { whatsappSendMessege } from '../../../redux/actions/LoginAction'
import { toast } from 'react-toastify'

function SingleMessege() {
    const [error, setError] = useState("Enter Your Phone Number")
    const dispatch = useDispatch()
    const notify = () => toast("Message Has Been Sent");
    const onSubmit = async (values) => {
        const isNumber = Number(values.number)
        dispatch(whatsappSendMessege(values)).then((res)=>{
           if(res?.payload?.status === true) {
            notify()
            }else{
              alert('Server Error')
            }
     

        })
  
      }
  return (
    <div>
           <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
           <div className="container">
            <div className="row">
                <div className="col-md-6">
                <Field
              className={`form-control mb-3 `}
              name="number"
              component="input"
              type="text"
              placeholder="Recipient Phone Number"
            />
            {isNaN(values.number) && values.number !== undefined ? <div className='alert alert-danger py-1'>{error}</div> : ""}
              <Field
              className="form-control mb-3"
              name="msg"
              component="textarea"
              type="text"
              placeholder="Messages"
            />
            <button type='Sumbit' className='bg-dark text-white btn'>Send</button>
            </div>
            <div className="col-md-6 whatapps rounded m-0 px-0" >
              <div className="whatapps_new border rounded" >
                <div className="whatapp_title py-2 mb-2 px-2">
                    <h6 className="mb-0">Preview</h6>
                </div>
                <div className="whatapps_chat ps-3 px-2 py-2">
                  {values?.msg && <p className="my-2 position-relative"> <span className="icon_message"></span> <p className="message-body ">{values?.msg}</p> </p>}
                </div>
              </div>  
            </div>
            </div>
           </div>
          </form>
        )}
        />
    </div>
  )
}

export default SingleMessege
