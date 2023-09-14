import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { whatsappSendMessege } from '../../../redux/actions/LoginAction'

function SingleMessege() {
    const [error, setError] = useState("Enter Your Phone Number")
    const dispatch = useDispatch()
    const onSubmit = async (values) => {
        console.log(values)
        // setError(values.number.isInteger())
        const isNumber = Number(values.number)
        dispatch(whatsappSendMessege(values)).then((res)=>{
            console.log(res)
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
            <button className='bg-dark text-white btn'>Send</button>
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
