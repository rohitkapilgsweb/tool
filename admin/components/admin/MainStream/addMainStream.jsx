import React, { useEffect, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { buttonTypes, FieldTypes, inputFieldTypes } from '../../../utils/helper'
import FormGenerator from '../../common-components/Form/FormGenerator'
import arrayMutators from 'final-form-arrays'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMainStreams,
  editMainStream,
  getMainStreamById
} from '../../../redux/actions/streams/addMainStreams'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function AddMainStream () {
  const dispatch = useDispatch()
  const mainStream = useSelector(
    data =>
      data?.mainStreamById?.mainStreamByIdValue?.data?.stream?.mainStreamName
  )
  const router = useRouter()
  const { Id } = router.query

  const handleSubmit = values => {
    let updatedData = {}

    if (!router.query.Id) {
      dispatch(addMainStreams(values)).then(res => {
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.stream[0]?.status
          if (status == 'duplicate') {
            toast.error(`Main Stream is ${status}`)
          } else {
            toast.success('Main Stream added successfuly')
            router.push('/admin/streams')
          }
        }
      })
    } else {
      updatedData = {
        mainStream: [
          {
            id: router.query.Id,
            mainStreamName: values.stream[0].mainStreamName
          }
        ]
      }
      dispatch(editMainStream(updatedData)).then(res => {
        if (res?.payload?.data?.success) {
          router.push('/admin/streams')
          toast.success('Updated')
        } else {
          toast.error(res?.payload?.data?.message)
        }
      })
    }
  }

  const validate = values => {
    const errors = {}
    const itemErray = []
    values.stream.map((ele, index) => {
      const error = {}
      if (!ele.mainStreamName || ele.mainStreamName === ' ') {
        error['mainStreamName'] = '*'
      }
      itemErray.push(error)
    })
    errors['stream'] = itemErray
    console.log(errors, 'errors')
    return errors
  }

  useEffect(() => {
    // handleInit()
    if (router.query.Id) {
      dispatch(getMainStreamById(router.query.Id))
    }
  }, [router.query.Id])

  const setInitial = () => {
    let initialValues = {}
    if (Id) {
      initialValues.stream = [{ mainStreamName: mainStream }]
    } else {
      initialValues.stream = [{ mainStreamName: '' }]
    }
    return initialValues
  }

  return (
    <Container className='p-0'>
      <Row className='my-3 padding_top'>
        <Col>
          <h3 className='master_heading'>Main Stream Name</h3>
          <hr></hr>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              // potentially other mutators could be merged here
              ...arrayMutators
            }}
            validate={validate}
            initialValues={useMemo(() => setInitial(), [mainStream])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <FieldArray name='stream'>
                    {({ fields }) => (
                      <div>
                        <>
                          {fields.map((name, index) => (
                            <Row>
                              <Col lg={12} md={12}>
                                <div className='add_main_stream_btn_input margin_bottom'>
                                  <Field name={`${name}.mainStreamName`}>
                                    {({ input, meta }) => (
                                      <div className='w-100'>
                                        <input
                                          {...input}
                                          type='text'
                                          // className='form-control signup_form_input'
                                          className={meta.touched ? (
                                            meta.error ? (
                                              "red_border form-control select-style signup_form_input "
                                            ) : (
                                              "form-control select-style signup_form_input "
                                            )
                                          ) : (
                                            "form-control select-style signup_form_input "
                                          )}
                                          placeholder='Enter Main Stream'
                                        />
                                        {/* {meta.error && meta.touched && (
                                          <span className='text-danger required_msg'>
                                            {meta.error}
                                          </span>
                                        )} */}
                                      </div>
                                    )}
                                  </Field>
                                  <div className=' plus_minus_btn_div'>
                                    {!router.query.Id && (
                                      <div
                                        type='button'
                                        className='add_remove_btn'
                                        onClick={() =>
                                          fields.push({ mainStreamName: '' })
                                        }
                                      >
                                        <img
                                          className='add_remove_icon'
                                          src='/images/plus.png'
                                        />
                                      </div>
                                    )}
                                    {fields.length > 1 ? (
                                      <div
                                        className='add_remove_btn'
                                        type='button'
                                        onClick={() => fields.remove(index)}
                                      >
                                        <img
                                          className='add_remove_icon'
                                          src='/images/minus.png'
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ))}
                        </>
                      </div>
                    )}
                  </FieldArray>
                </Row>
                <Row>
                  <Col className='text-center'>
                    <button className='admin_signup_btn  mt-3' type='submit'>
                      {router.query.Id ? 'Update' : 'Add Main Stream'}
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </Container>
  )
}
