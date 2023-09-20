import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
    addProfession,
    familycodeList,
    getProfessionById,
    professioncodeList,
    updateProfession,
} from "../../../redux/actions/organisation/profession";
import { getCourse } from "../../../redux/actions/course/addcourse";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { wordToJSON } from "../../../utils/helper";
const CKeditorGenerator = dynamic(() => import("../Ckeditor/CKeditor"), {
    ssr: false,
});
function Addprofession() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { Id } = router.query;
    const [dataValue, setDataValue] = useState(0);

    const [type, setType] = useState("Family");
    const FormSteps = ["Register", "CMS"];

    const familyList = useSelector((state) => state?.sectorData?.familyCodelist);
    const professionList = useSelector(
        (state) => state?.sectorData?.professionCodeList
    );
    const courseList = useSelector(
        (state) => state?.courseList?.courselist?.data
    );

    const professionDetails = useSelector(
        (state) => state?.sectorData?.professionById
    );

    const handleFamilySelect = (e) => {
        dispatch(professioncodeList({ familyId: Number(e.target.value) }));
    };

    const handleSubmit = (values) => {
        if (dataValue === 0) {
            setDataValue(1);
        } else {
            let data = { professionRegister: [] };
            data.professionRegister[0] = {
                ...values,
            };
            if (type === "Family") {
                delete data.professionRegister[0].professionId;
            }
            data.professionRegister[0].cms = values?.cms[0];
            if (Id) {
                dispatch(updateProfession(data)).then((res) => {
                    if (res?.payload?.data?.success) {
                        toast.success("Success");
                        router.push("/admin/organisation");
                    } else {
                        toast.error("Error");
                    }
                });
            } else {
                dispatch(addProfession(data)).then((res) => {
                    if (res?.payload?.data?.success) {
                        toast.success("Success");
                        router.push("/admin/organisation");
                    } else {
                        toast.error("Error");
                    }
                });
            }
        }
    };

    const summary = [
        { title: "At a Glance", key: "glance" },
        { title: "Types", key: "types" },
        { title: "Tasks", key: "tasks" },
        { title: "Education", key: "education" },
        { title: "Experience", key: "experience" },
        { title: "Knowledge", key: "knowledge" },
        { title: "Technical Skills", key: "technicalSkills" },
        { title: "Future Prospects", key: "futureProspects" },
        { title: "Certifications", key: "certificates" },
    ];

    const init = (e) => {
        if (e && Object.keys(e).length > 0) {
            return e;
        }
        let initialValues = {};
        if (Id) {
            if (professionDetails?.length > 0) {
                if (professionDetails[0]?.ProfessionCode) {
                    setType("Profession");
                }
                initialValues = {
                    id: professionDetails[0]?.id,
                    familyId: professionDetails[0]?.familyId,
                    professionId: professionDetails[0]?.professionId,
                    alsoCalled: professionDetails[0]?.alsoCalled,
                    prepLevel: professionDetails[0]?.prepLevel,
                    highDemandOfProfession: professionDetails[0]?.highDemandOfProfession,
                    courseId: professionDetails[0]?.courseId,
                };
                initialValues.cms = [
                    {
                        id: professionDetails[0]?.CMS[0]?.id,
                        glance: professionDetails[0]?.CMS[0]?.glance,
                        types: professionDetails[0]?.CMS[0]?.types,
                        tasks: professionDetails[0]?.CMS[0]?.tasks,
                        education: professionDetails[0]?.CMS[0]?.education,
                        experience: professionDetails[0]?.CMS[0]?.experience,
                        knowledge: professionDetails[0]?.CMS[0]?.knowledge,
                        technicalSkills: professionDetails[0]?.CMS[0]?.technicalSkills,
                        futureProspects: professionDetails[0]?.CMS[0]?.futureProspects,
                        certificates: professionDetails[0]?.CMS[0]?.certificates,
                    },
                ];
            }
        } else {
            initialValues = {
                familyId: "",
                professionId: "",
                alsoCalled: "",
                prepLevel: "",
                highDemandOfProfession: "",
                courseId: "",
                cms: [
                    {
                        glance: "",
                        types: "",
                        tasks: "",
                        education: "",
                        experience: "",
                        knowledge: "",
                        technicalSkills: "",
                        futureProspects: "",
                        certificates: "",
                    },
                ],
            };
        }
        return initialValues;
    };

    const validate = (values) => {
        let errors = {};
        if (!values.courseId) {
            errors["courseId"] = "*";
        }
        if (!values.highDemandOfProfession) {
            errors["highDemandOfProfession"] = "*";
        }
        if (!values.prepLevel) {
            errors["prepLevel"] = "*";
        }
        if (!values.alsoCalled) {
            errors["alsoCalled"] = "*";
        }
        if (!values.alsoCalled) {
            errors["alsoCalled"] = "*";
        }
        if (!values.familyId) {
            errors["familyId"] = "*";
        }
        if (type !== "Family") {
            if (!values.professionId) {
                errors["professionId"] = "*";
            }
        }
        return errors;
    };

    useEffect(() => {
        dispatch(familycodeList());
        dispatch(professioncodeList());
        dispatch(getCourse());
        if (Id) {
            dispatch(getProfessionById(Number(Id)));
        }
    }, [Id]);

    const [SummaryCMS, setSummaryCMS] = useState(summary[0].key);

    const handlewordupload = (e) => {
        wordToJSON(e[0]).then((res) => {
          let data = res?.value?.split("<p>**********</p>");
          let payload = {
            cms: [{
                glance: data[0],
                types: data[1],
                tasks: data[2],
                education: data[3],
                experience: data[4],
                knowledge: data[5],
                technicalSkills: data[6],
                futureProspects: data[7],
                certificates: data[8],
            }]
          }
          console.log(payload,'oooooooooooooooooo')
        })
      }
    return (
        <>
            <div className="admin_home_tabs_row p-0">
                <Row>
                    <Col className="d-flex">
                    <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                        <ul className="nav">
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
            <Row className="mt-4">
                <Col>
                    <Form
                        onSubmit={handleSubmit}
                        mutators={{
                            ...arrayMutators,
                        }}
                        keepDirtyOnReinitialize
                        validate={validate}
                        initialValues={useMemo((e) => init(e), [professionDetails])}
                        render={({ handleSubmit, values }) => (
                            <form onSubmit={handleSubmit}>
                                {dataValue === 0 ? (
                                    <>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <>
                                                    <div className="d-flex">
                                                        <label className="signup_form_label">
                                                            Choose Family/Profession
                                                        </label>
                                                    </div>
                                                    <select
                                                        className="form-control select-style signup_form_input "
                                                        onChange={(e) => setType(e.target.value)}
                                                        value={type}
                                                        disabled={Id ? true : false}
                                                    >
                                                        <option>Family</option>
                                                        <option>Profession</option>
                                                    </select>
                                                    <div className="text-end">
                                                        <img
                                                            className="select_down_icon"
                                                            src="/images/down.png"
                                                        />
                                                    </div>
                                                </>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Field name={`familyId`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Family
                                                                </label>
                                                                {meta.error && meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <select
                                                                {...input}
                                                                className="form-control select-style signup_form_input margin_bottom"
                                                                onChange={(e) => {
                                                                    input.onChange(e);
                                                                    handleFamilySelect(e, values);
                                                                }}
                                                            >
                                                                <option value="">Select family</option>
                                                                {familyList?.rows?.length > 0 &&
                                                                    familyList?.rows?.map((item, index) => {
                                                                        return (
                                                                            <option key={index} value={item?.id}>
                                                                                {item?.familyName}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </>
                                                    )}
                                                </Field>
                                            </Col>
                                            {type !== "Family" && (
                                                <Col md={12} lg={6}>
                                                    <Field name={`professionId`}>
                                                        {({ input, meta }) => (
                                                            <>
                                                                <div className="d-flex">
                                                                    <label className="signup_form_label">
                                                                        Profession
                                                                    </label>
                                                                    {meta.error && meta.touched && (
                                                                        <span className="text-danger required_msg">
                                                                            {meta.error}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <select
                                                                    {...input}
                                                                    className="form-control select-style signup_form_input margin_bottom"
                                                                    disabled={!values?.familyId ? true : false}
                                                                >
                                                                    <option value="">Select Profession</option>
                                                                    {professionList?.rows?.length > 0 &&
                                                                        professionList?.rows?.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item?.id}>
                                                                                    {item?.professionName}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                </select>
                                                            </>
                                                        )}
                                                    </Field>
                                                </Col>
                                            )}
                                            <Col md={12} lg={6}>
                                                <Field name={`alsoCalled`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Also Called
                                                                </label>
                                                                {meta.error && meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <input
                                                                {...input}
                                                                className="form-control select-style signup_form_input margin_bottom"
                                                                placeholder="Please enter other names of this profession"
                                                            />
                                                        </>
                                                    )}
                                                </Field>
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <Field name={`prepLevel`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Preparation Level
                                                                </label>
                                                                {meta.error && meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <select
                                                                {...input}
                                                                className="form-control select-style signup_form_input "
                                                            >
                                                                <option value="">
                                                                    Choose preparation level
                                                                </option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
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
                                                <Field name={`highDemandOfProfession`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    High demand of Profession
                                                                </label>
                                                                {meta.error && meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <select
                                                                {...input}
                                                                className="form-control select-style signup_form_input "
                                                            >
                                                                <option value="">Yes/No</option>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
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
                                                <Field name={`courseId`}>
                                                    {({ input, meta }) => (
                                                        <>
                                                            <div className="d-flex">
                                                                <label className="signup_form_label">
                                                                    Courses
                                                                </label>
                                                                {meta.error && meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                        {meta.error}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <select
                                                                {...input}
                                                                className="form-control select-style signup_form_input "
                                                            >
                                                                <option value="">Please Select Courses</option>
                                                                {courseList?.rows?.length > 0 &&
                                                                    courseList?.rows?.map((item, index) => {
                                                                        return (
                                                                            <option key={index} value={item?.id}>
                                                                                {item?.courseName}
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
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <button
                                                    className="admin_signup_btn admin_signup_btn_mobile"
                                                    type="submit"
                                                >
                                                    Add Category
                                                </button>
                                            </Col>
                                        </Row>
                                    </>
                                ) : null}
                                {dataValue === 1 ? (
                                    <>
                                        {/* <Row>
                                            <Col>
                                                <h4 className="mt-4">Summary</h4>
                                                <FieldArray name="cms">
                                                    {({ fields }) => (
                                                        <>
                                                            {fields.map((name, index) => (
                                                                <Tabs
                                                                    key={index}
                                                                    defaultActiveKey={0}
                                                                    className="mb-3"
                                                                >
                                                                    {summary.map((item, index) => {
                                                                        return (
                                                                            <Tab
                                                                                style={{
                                                                                    padding: "10px",
                                                                                    border: "1px solid black",
                                                                                    borderRadius: "5px",
                                                                                    backgroundColor: "#FFF",
                                                                                }}
                                                                                key={index}
                                                                                eventKey={index}
                                                                                title={item.title}
                                                                            >
                                                                                <Field name={`${name}.${item.key}`}>
                                                                                    {({ input, meta }) => (
                                                                                        <>
                                                                                            <CKeditorGenerator
                                                                                                input={input}
                                                                                                onReady={(editor) => {
                                                                                                    // console.log(editor, 'editor')
                                                                                                }}
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </Field>
                                                                            </Tab>
                                                                        );
                                                                    })}
                                                                </Tabs>
                                                            ))}
                                                        </>
                                                    )}
                                                </FieldArray>
                                            </Col>
                                        </Row> */}

                                        <Row className="mb-4">
                                            <Col lg={12} className="">
                                                <h4 className="mb-3 commun_heading ps-3">Summary</h4>
                                                <FieldArray name="cms">
                                                    {({ fields }) => (
                                                        <>
                                                            {fields.map((name, index) => (
                                                                <>
                                                                    <div className="px-3">
                                                                        <ScrollingCarousel
                                                                            show={5.5}
                                                                            slide={4}
                                                                            swiping={true}
                                                                        >
                                                                            <ul key={index} className="nav gap">
                                                                                {summary &&
                                                                                    summary.map((steps, stepsIndex) => (
                                                                                        <li
                                                                                            className="nav-item"
                                                                                            key={steps.key}
                                                                                        >
                                                                                            <a
                                                                                                className={`nav-link admin_tabs_name cms_tabs ${SummaryCMS === steps.key &&
                                                                                                    "cms_active"
                                                                                                    }`}
                                                                                                active="true"
                                                                                                onClick={() =>
                                                                                                    setSummaryCMS(steps.key)
                                                                                                }
                                                                                            >
                                                                                                {steps.title}
                                                                                            </a>
                                                                                        </li>
                                                                                    ))}
                                                                            </ul>
                                                                        </ScrollingCarousel>
                                                                    </div>

                                                                    {summary &&
                                                                        summary.map(
                                                                            (steps, stepsIndex) =>
                                                                                SummaryCMS === steps.key && (
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
                                                    type="submit"
                                                >
                                                    Submit
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

export default Addprofession;
