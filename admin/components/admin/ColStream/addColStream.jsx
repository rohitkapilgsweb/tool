import React, { useEffect, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { buttonTypes, FieldTypes, inputFieldTypes } from '../../../utils/helper'
import FormGenerator from '../../common-components/Form/FormGenerator'
import Select from 'react-select'
import { FieldArray } from 'react-final-form-arrays'
import { Field, Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { getMainStream } from '../../../redux/actions/streams/addMainStreams'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getSubStream } from '../../../redux/actions/streams/addSubStream'
import {
  CreateColStream,
  editColStream,
  getColStreamById
} from '../../../redux/actions/streams/addColStream'
import { toast } from 'react-toastify'

export default function AddColStream () {
  const router = useRouter()
  const dispatch = useDispatch()

  const mainData = useSelector(
    data => data?.mainStreamList?.mainStreamValue?.data?.data
  )
  const subData = useSelector(
    data => data?.subStreamList?.subStreamValue?.data?.data
  )
  const colStream = useSelector(
    data => data?.colStreamById?.colStreamByIdValue?.data?.stream
  )

  useEffect(() => {
    dispatch(getMainStream())
    dispatch(getSubStream())
    if (router?.query.Id) {
      dispatch(getColStreamById(router.query.Id))
    }
  }, [router.query.Id])

  const handleSubmit = values => {
    let updatedValue = {}
    if (!router.query.Id) {
      dispatch(CreateColStream(values)).then(res => {
        console.log(res, 'mainDtatatat')
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.stream[0]?.status
          if (status == 'duplicate') {
            toast.error(`Col Stream is ${status}`, { autoClose: 1000 })
          } else {
            toast.success('Col Stream added successfuly', { autoClose: 1000 })
            router.push('/admin/streams')
          }
        }
      })
    } else {
      updatedValue = {
        colStream: [
          {
            colStreamName: values?.colstream[0]?.colStreamName,
            id: colStream?.id
          }
        ]
      }
      dispatch(editColStream(updatedValue)).then(res => {
        console.log(res)
        if (res?.payload?.data?.success) {
          toast.success('Updated', { autoClose: 1000 })
          router.push('/admin/streams')
        } else {
          toast.error('error', { autoClose: 1000 })
        }
      })
    }
  }

  const handleInit = () => {
    let initialValue = {}
    if (router?.query?.Id) {
      initialValue = {
        mainStreamId: colStream?.MainStream?.mainStreamName,
        subStreamId: colStream?.SubStream?.subStreamName,
        colstream: [{ colStreamName: colStream?.colStreamName }]
      }
    } else {
      initialValue = {
        mainStreamId: '',
        subStreamId: '',
        colstream: [{ colStreamName: '' }]
      }
    }
    return initialValue
  }

  const validate = values => {
    const errors = {}
    const itemArray = []
    values?.colstream?.map(item => {
      const error = {}
      if (!item.colStreamName) {
        error['colStreamName'] = '*'
      }
      itemArray.push(error)
      errors['colstream'] = itemArray
    })
    if (!values.mainStreamId) {
      errors['mainStreamId'] = '*'
    }
    if (!values.subStreamId) {
      errors['subStreamId'] = '*'
    }
    return errors
  }

  const handleMainStream = (e) => {
    dispatch(getSubStream({mainStreamId:Number(e.target.value)}))
  }

  return (
    <>
      <Row className='my-3 padding_top'>
        <Col>
          <h3 className='fw-bold'>Col Stream Name</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators
            }}
            validate={validate}
            initialValues={useMemo(() => handleInit(), [colStream])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={12}>
                    <Field name='mainStreamId'>
                      {({ input, meta }) => (
                        <>
                          <div>
                            <label className='signup_form_label'>
                              Main Stream Name
                            </label>
                            {meta.error && meta.touched && (
                              <span className='text-danger required_msg'>
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            className='form-control signup_form_input'
                            disabled={router.query.Id ? true : false}
                            onChange={e => {
                              input.onChange(e)
                              handleMainStream(e)
                            }}
                          >
                            {router.query.Id ? (
                              <option>
                                {colStream?.MainStream?.mainStreamName}
                              </option>
                            ) : (
                              <option>Select main stream</option>
                            )}
                            {mainData &&
                              mainData?.rows?.map(item => (
                                <option key={item.id} value={item.id}>
                                  {item.mainStreamName}{' '}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </Field>
                    <div className='text-end'>
                      <img
                        className='select_down_icon'
                        src='/images/down.png'
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <Field
                      name='subStreamId'
                      component='select'
                      placeholder='Choose Exam Accepted'
                    >
                      {({ input, meta }) => (
                        <>
                          <div>
                            <label className='signup_form_label'>
                              Sub Stream Name
                            </label>
                            {meta.error && meta.touched && (
                              <span className='text-danger required_msg'>
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            className='form-control signup_form_input'
                            disabled={router.query.Id ? true : false}
                          >
                            {router.query.Id ? (
                              <option>
                                {colStream?.SubStream?.subStreamName}
                              </option>
                            ) : (
                              <option>Select sub stream</option>
                            )}
                            {subData &&
                              subData?.rows?.map(item => (
                                <option key={item.id} value={item.id}>
                                  {item.subStreamName}{' '}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </Field>
                    <div className='text-end'>
                      <img
                        className='select_down_icon'
                        src='/images/down.png'
                      />
                    </div>
                  </Col>
                </Row>

                <div>
                 
                  <FieldArray name='colstream'>
                    {({ fields }) => (
                      <>
                        {fields.map((name, index) => (
                          <Row>
                            <Col lg={12} md={12}>
                              <div className='d-flex margin_bottom'>
                                <Field name={`${name}.colStreamName`}>
                                  {({ input, meta }) => (
                                    <div className='w-100'>
                    <label className='signup_form_label'>Col Stream Name</label>

                                       {meta.error && meta.touched && (
                                        <span className='text-danger required_msg'>
                                          {meta.error}
                                        </span>
                                      )}
                                      <input
                                        {...input}
                                        type='text'
                                        className='form-control signup_form_input'
                                        placeholder='Enter Col Stream'
                                      />
                                     
                                    </div>
                                  )}
                                </Field>
                                <div className='d-flex m_top_30 '>
                                  {!router.query.Id && (
                                    <div
                                      type='button'
                                      className='add_remove_btn'
                                      onClick={() =>
                                        fields.push({ colStreamName: '' })
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
                    )}
                  </FieldArray>
                </div>
                <Row>
                  <Col className='text-center'>
                    <button className='admin_signup_btn  mt-3' type='submit'>
                      Add Col Stream
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
