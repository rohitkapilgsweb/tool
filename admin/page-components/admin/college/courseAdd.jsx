import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { FieldTypes, inputFieldTypes, wordToJSON } from "../../../utils/helper";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import {
  addCourse,
  editCourse,
  getCoursebyId,
} from "../../../redux/actions/course/addcourse";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  adminexamList,
  getAllExams,
} from "../../../redux/actions/exams/createExam";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import CKeditorGenerator from "../../../components/admin/Ckeditor/CKeditor";

export default function AddCourse() {
  const courseCMS = [
    { title: "About", key: "about" },
    { title: "Specialization", key: "specialization" },
    { title: "Eligibility", key: "eligibility" },
    { title: "Course After Details", key: "courseAfterDetails" },
    { title: "Career", key: "career" },
    { title: "Avg. Fees", key: "avgFees" },
    { title: "Salary Trends", key: "salaryTrends" },
  ];

  const [dataValue, setDataValue] = useState(0);
  const [CMSActive, setCMSActive] = useState(courseCMS[0].key);
  const FormSteps = ["Course Register", "CMS"];
  const [durationState, setDurationState] = useState("Year");

  useEffect(() => {
    dispatch(adminexamList({ pageSize: 500, pageNo: 1 }));
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const mainStreamData = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );
  const masterFilterData = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const examData = useSelector((data) => data?.examList?.adminExamList);
  const prevData = useSelector(
    (data) => data?.coursebyId?.course?.data?.data?.rows[0]
  );

  let wordData = {}

  const handlewordupload = (e) => {
    wordToJSON(e[0]).then((res) => {
      let data = res?.value?.split("<p>**********</p>");
      wordData = {
        id: Number(router.query.Id),
        CMS: [
          {
            about: data[0],
            specialization: data[1],
            eligibility: data[2],
            courseAfterDetails: data[3],
            career: data[4],
            avgFees: data[5],
            salaryTrends: data[6],
          },
        ],
      };
    });
  };


  const handleSubmit = (values) => {
    if (router.query.Id) {
      if (dataValue == 0) {
        setDataValue(1);
      }
      if (dataValue == 1) {

        values.id = prevData.id;
        if (values.courseName === prevData.courseName) {
          delete values.courseName;
        }

        if (wordData && wordData.CMS !== undefined && wordData.CMS !== null) {
          values.CMS = wordData.CMS;
        }

        dispatch(editCourse(values)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Updated");
            router.push("/admin/courses");
          } else {
            toast.error("error");
          }
        });
      }
    } else {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        let tempValues = values?.examData?.map((item) => {
          return { examId: item?.examId?.value };
        });
        let data = JSON.parse(
          JSON.stringify({ Course: [{ ...values, examData: tempValues }] })
        );

        dispatch(addCourse(data)).then((res) => {
          if (res?.payload?.data?.success) {
            let status = res?.payload?.data?.data?.stream[0].status;
            if (status === "duplicate") {
              toast.error("Duplicate");
              values.courseDuration = values.courseDuration.split(" ")[0];
            } else {
              toast.success("Course added");
              Router.push("/admin/courses");
            }
          } else {
            toast.error("error");
            values.courseDuration = values.courseDuration.split(" ")[0];
          }
        });
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (dataValue === 0) {
      if (!values.mainStreamId) {
        errors["mainStreamId"] = "*";
      }
      if (!values.courseTypeId) {
        errors["courseTypeId"] = "*";
      }
      if (!values.courseName) {
        errors["courseName"] = "*";
      }
      if (!values.courseCategoryId) {
        errors["courseCategoryId"] = "*";
      }
      if (!values.eligibility) {
        errors["eligibility"] = "*";
      }
      if (!values.courseDuration) {
        errors["courseDuration"] = "*";
      }
      if (!values.averageFees) {
        errors["averageFees"] = "*";
      }
      if (!values.averageSalary) {
        errors["averageSalary"] = "*";
      }
      if (!values.entranceExamId) {
        errors["entranceExamId"] = "*";
      }
      if (!values.courseLevelId) {
        errors["courseLevelId"] = "*";
      }
    }

    return errors;
  };

  const MainStreamOptions = [
    { values: "1", label: "Medical" },
    { values: "2", label: "Non-medical" },
  ];

  const masterValues = "coursetype,coursecategory,courselevel,eligibility";

  const handledurationChange = (e) => {
    setDurationState(e.target.value);
  };

  const fields = [
    {
      fieldType: FieldTypes.fields,
      name: "mainStream",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Main Stream`}
        />
      ),
      label: "Main Stream Name",
      col: "6",
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseType",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder="Choose Course Type"
        />
      ),
      type: inputFieldTypes.text,
      label: "Course Type",
      placeholder: "Select College Type",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseName",
      component: "",
      type: inputFieldTypes.text,
      label: "Course Name",
      placeholder: "Choose Course Name",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseCategory",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder="Enter Course Category"
        />
      ),
      label: "Course Category",
      placeholder: "Enter College Status",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "eligibility",
      component: "",
      type: inputFieldTypes.text,
      label: "Course Elegibility",
      placeholder: "Enter Course Eligibility",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseDuration",
      component: (input) => <Select {...input} options={MainStreamOptions} />,
      type: inputFieldTypes.date,
      label: "Course Duration (Years/Months)",
      placeholder: "Enter course duration",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "averageFee",
      col: "6",
      type: inputFieldTypes.text,
      placeholder: "Enter Average Fee",
      label: "Average Fee",
      className: "",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "averageSalary",
      col: "6",
      type: inputFieldTypes.text,
      placeholder: "Enter Average Salary",
      label: "Average Salary",
      className: "",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "entranceExam",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Entrance Exam`}
        />
      ),
      type: inputFieldTypes.date,
      label: "Entrance Exa,",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.fields,
      name: "courseType",
      component: (input) => (
        <Select
          {...input}
          options={MainStreamOptions}
          placeholder={`Select Course Type`}
        />
      ),
      type: inputFieldTypes.date,
      label: "Type Of Course",
      col: "6",
      disabled: false,
    },
    {
      fieldType: FieldTypes.actions,
      buttons: [
        {
          type: "submit",
          body: "Next",
          variant: "outline-primary",
          className: "w-25 mx-auto",
          activeCondition: false,
          size: "lg",
          col: "12",
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getAllMasterFilter(masterValues));
    // dispatch(getAllExams());
    // dispatch(adminexamList());
    if (router.query.Id) {
      dispatch(getCoursebyId({ id: Number(router.query.Id) }));
      setDurationState(prevData?.courseDuration.split(" ")[1]);
    }
  }, [router.query.Id]);

  const init = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    let initialValues = {};
    if (router.query.Id && prevData) {
      initialValues = {
        mainStreamId: prevData?.mainStreamId,
        courseTypeId: prevData?.courseTypeId,
        courseName: prevData?.courseName,
        courseCategoryId: prevData?.courseCategoryId,
        eligibility: prevData?.eligibility,
        courseDuration: prevData?.courseDuration.split(" ")[0],
        averageFees: prevData?.averageFees,
        averageSalary: prevData?.averageSalary,
        courseLevelId: prevData?.courseLevelId,
        // entranceExamId: prevData?.entranceExamId,
        CMS: [
          {
            id: prevData?.CMS[0]?.id,
            about: prevData?.CMS[0]?.about,
            specialization: prevData?.CMS[0]?.specialization,
            eligibility: prevData?.CMS[0]?.eligibility,
            courseAfterDetails: prevData?.CMS[0]?.courseAfterDetails,
            career: prevData?.CMS[0]?.career,
            avgFees: prevData?.CMS[0]?.avgFees,
            salaryTrends: prevData?.CMS[0]?.salaryTrends,
          },
        ],
      };
      let examlist = prevData?.ExamData?.map((item) => {
        return {
          examId: item?.examId
        };
      });
      initialValues.examData = examlist;

    } else {
      initialValues = {
        mainStreamId: null,
        courseTypeId: null,
        courseName: null,
        courseCategoryId: null,
        eligibility: null,
        courseDuration: null,
        averageFees: null,
        averageSalary: null,
        courseLevelId: null,
        // entranceExamId: null,
        examData: [{ examId: "" }],
        CMS: [
          {
            about: null,
            specialization: null,
            eligibility: null,
            courseAfterDetails: null,
            career: null,
            avgFees: null,
            salaryTrends: null,
          },
        ],
      };
    }
    return initialValues;
  };


  const loadOptions = async (e, values, index) => {
    let list = [];
    if (e.length > 0) {
      await dispatch(adminexamList({ search: e })).then((res) => {
        if (res?.payload?.data?.success) {
          examData?.rows?.map((item) => {
            // console.log(item,'hhhhhhhhhh')
            list.push({ label: item?.examName, value: item?.id });
          });
          // res?.payload?.data?.data?.rows?.map((item)=>{
          //   // console.log(item,'hhhhhhhhhh')
          //   list.push({label:item?.examName,value:item?.id})
          // })
        }
      });
    } else {
      // console.log('called')
      // await dispatch(adminexamList({id:prevData?.ExamData[index]?.examId})).then((res)=>{
      //   if(res?.payload?.data?.success){
      //     res?.payload?.data?.data?.rows?.map((item)=>{
      //       // console.log(item,'hhhhhhhhhh')
      //       list.push({label:item?.examName,value:item?.id})
      //     })
      //   }
      // })
    }
    return list;
  };

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 d-flex">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll">
                {FormSteps &&
                  FormSteps.map((steps, stepsIndex) => (
                    <li className="nav-item" key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        active="true"
                        onClick={() => setDataValue(stepsIndex)}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
            {dataValue == 1 && (
              <div>
                <input
                  type="file"
                  id="actual-btn"
                  onChange={(e) => handlewordupload(e.target.files)}
                  hidden
                />
                <label
                  htmlFor="actual-btn"
                  style={{ cursor: "pointer" }}
                  className="border_btn green"
                >
                  Upload
                </label>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <Row className="mt-5">
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            keepDirtyOnReinitialize
            validate={validate}
            initialValues={useMemo((e) => init(e), [prevData])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                {dataValue === 0 ? (
                  <>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name="mainStreamId">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Main Stream
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                {!router.query.Id && (
                                  <option value={null}>
                                    Select Mainstream
                                  </option>
                                )}
                                {mainStreamData &&
                                  mainStreamData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item?.mainStreamName}
                                      </option>
                                    );
                                  })}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name="courseTypeId">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Course Type
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                {!router?.query?.Id && (
                                  <option>Select Coursetype</option>
                                )}
                                {masterFilterData &&
                                  masterFilterData?.coursetype?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name="courseName">
                          {({ input, meta }) => (
                            <div>
                              <div>
                                <label className="signup_form_label">
                                  Course Name
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Course Name"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name="courseCategoryId">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Course Category
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                <option value="">Select Course category</option>
                                {masterFilterData?.coursecategory &&
                                  masterFilterData?.coursecategory?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name="eligibility">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Eligibility
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control signup_form_input"
                              >
                                <option value="">Select Eligibility</option>
                                {masterFilterData?.eligibility &&
                                  masterFilterData?.eligibility?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item?.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name="courseDuration">
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Course Duration(years)
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>

                              <div className="d-flex w-100">
                                <input
                                  {...input}
                                  type="text"
                                  className="form-control signup_form_input input_right_border"
                                  placeholder="Enter Course Duration"
                                />
                                <div className="year_2nd">
                                  <>
                                    <select
                                      value={durationState}
                                      onChange={(e) => handledurationChange(e)}
                                      className="form-control select-style signup_form_input input_bg"
                                    >
                                      <option>year</option>
                                    </select>
                                    <div className="text-end">
                                      <img
                                        className="select_down_icon"
                                        src="/images/down.png"
                                      />
                                    </div>
                                  </>
                                </div>
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name="averageFees">
                          {({ input, meta }) => (
                            <div>
                              <div>
                                <label className="signup_form_label">
                                  Average Fees
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type="text"
                                className="form-control signup_form_input margin_bottom"
                                placeholder="Enter Average Fees"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name="averageSalary">
                          {({ input, meta }) => (
                            <div>
                              <div>
                                <label className="signup_form_label">
                                  Average Salary
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type="text"
                                className="form-control input-style signup_form_input margin_bottom"
                                placeholder="Enter Average Salary"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name="courseLevelId">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Course Level
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control select-style signup_form_input"
                              >
                                <option value="">Select Course level</option>
                                {masterFilterData?.courselevel &&
                                  masterFilterData?.courselevel?.map(
                                    (item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col>
                      {/* <Col md={12} lg={6}>
                        <Field name="entranceExamId">
                          {({ input, meta }) => (
                            <>
                              <div>
                                <label className="signup_form_label">
                                  Entrance Exam
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <select
                                {...input}
                                className="form-control select-style signup_form_input"
                              >
                                <option value="">Select Exam</option>
                                {examData &&
                                  examData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item?.examName}
                                      </option>
                                    );
                                  })}
                              </select>
                              <div className="text-end">
                                <img
                                  className="select_down_icon"
                                  src="/images/down.png"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                      </Col> */}

                      <Col md={12} lg={6}>
                        <FieldArray name="examData">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div className="d-flex" key={index}>
                                  <Field name={`${name}.examId`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        {/* <div>
                                          <label className="signup_form_label">
                                            Entrance Exam
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div> */}
                                        <div className="d-flex">
                                          {index === 0 && (
                                            <>
                                              <label className="signup_form_label">
                                                Entrance Exam
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg ">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value="">Select Exam</option>
                                          {examData &&
                                            examData?.rows?.map(
                                              (item, index) => {
                                                return (
                                                  <option
                                                    key={index}
                                                    value={item.id}
                                                  >
                                                    {item?.examName}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Field>
                                  <div
                                    className={
                                      index === 0
                                        ? " d-flex plus_minus_btn_margin"
                                        : " d-flex"
                                    }
                                  >
                                    <div
                                      type="button"
                                      className="add_remove_btn ms-2"
                                      onClick={() => {
                                        fields.push({
                                          examId: "",
                                        });
                                      }}
                                    >
                                      <img
                                        className="add_remove_icon"
                                        src="/images/plus.png"
                                      />
                                    </div>
                                    {fields.length > 1 ? (
                                      <div
                                        className="add_remove_btn ms-2"
                                        type="button"
                                        onClick={() => {
                                          if (values?.examData[index]?.id) {
                                            dispatch(
                                              deleteCourseExam(
                                                Number(
                                                  values?.examData[index]?.id
                                                )
                                              )
                                            ).then((res) => {
                                              if (res?.payload?.data?.success) {
                                                fields.remove(index);
                                              }
                                            });
                                          } else {
                                            fields.remove(index);
                                          }
                                        }}
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/minus.png"
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="text-center">
                        <button
                          className="admin_signup_btn admin_signup_btn_mobile"
                          onClick={handleSubmit}
                        >
                          Add Category
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : null}
                {dataValue === 1 ? (
                  <>
                    <Row>
                      <Col lg={12} className="">
                        <FieldArray name="CMS">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <>
                                  <div className="ps-3">
                                    <ScrollingCarousel
                                      show={5.5}
                                      slide={4}
                                      swiping={true}
                                    >
                                      <ul key={index} className="nav gap">
                                        {courseCMS &&
                                          courseCMS.map((steps, stepsIndex) => (
                                            <li
                                              className="nav-item"
                                              key={steps.key}
                                            >
                                              <a
                                                className={`nav-link admin_tabs_name cms_tabs ${CMSActive === steps.key &&
                                                  "cms_active"
                                                  }`}
                                                active="true"
                                                onClick={() =>
                                                  setCMSActive(steps.key)
                                                }
                                              >
                                                {steps.title}
                                              </a>
                                            </li>
                                          ))}
                                      </ul>
                                    </ScrollingCarousel>
                                  </div>

                                  {courseCMS &&
                                    courseCMS.map(
                                      (steps, stepsIndex) =>
                                        CMSActive === steps.key && (
                                          <Field name={`${name}.${steps.key}`}>
                                            {({ input, meta }) => (
                                              <>
                                                <CKeditorGenerator
                                                  input={input}
                                                  onReady={(editor) => { }}
                                                />
                                              </>
                                            )}
                                          </Field>
                                        )
                                    )}
                                </>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <button
                          className="admin_signup_btn admin_signup_btn_mobile"
                          onClick={handleSubmit}
                        >
                          Add Category
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
