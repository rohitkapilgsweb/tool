import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import {
  addMasterFilter,
  MasterFilterById,
  updateMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CreateMasterFilter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const ID = router.query.id;

  const handleSubmit = (values) => {
    let data = { payload: "" };
    data.payload = values.Field.map((item) => {
      if (!ID) {
        return {
          types: values.Category,
          name: item.FieldName,
          statusId: 1,
        };
      } else {
        return {
          types: values.Category,
          name: item.FieldName,
          statusId: 1,
          id: ID,
        };
      }
    });
    let formdata = new FormData();
    formdata.append("masterData", JSON.stringify(data));
    {
      !ID
        ? dispatch(addMasterFilter(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            const status = res?.payload?.data?.data?.master[0]?.status;
            if (status == "duplicate") {
              toast.error(`${status} added`);
            } else {
              toast.success("added successfuly");
              router.push("/admin/masterfilter");
            }
          }
        })
        : dispatch(updateMasterFilter(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Updated");
            router.push("/admin/masterfilter");
          }
        });
    }
  };
  const masterData = useSelector(
    (data) => data?.masterfilterByid?.masterfilterbyid?.data?.data
  );
  console.log(masterData, "dkjfkdkjfkg");
  useEffect(() => {
    console.log(router.query.id, "dkjfkdkjfkg");
    if (ID) {
      dispatch(MasterFilterById(ID));
    }
  }, []);

  const validate = (values) => {
    let errors = {};
    let itemArray = [];
    if (!values.Category) {
      errors["Category"] = "*";
    }
    if (values.Field) {
      values.Field.map((item, index) => {
        let error = {};
        if (!item.FieldName) {
          error["FieldName"] = "*";
        }
        itemArray.push(error);
      });
      errors["Field"] = itemArray;
    }
    console.log(errors, values);
    return errors;
  };
  const neData = [
    { key: "CourseLevel", value: "courselevel" },
    { key: "ProgramType", value: "programtype" },
    { key: "Discipline", value: "discipline" },
    { key: "SchoolAffilation  ", value: "schoolaffilation" },
    { key: "SchoolDesignation", value: "schooldesignation" },
    { key: "TeacherLevels", value: "teacherlevels" },
    { key: "ProgramDuration", value: "programduration" },
    { key: "CollegeType", value: "collegetype" },
    { key: "Accreditation", value: "accreditation" },
    { key: "Affilation", value: "affilation" },
    { key: "ExamAccepted", value: "examaccepted" },
    { key: "Facilities", value: "facilities" },
    { key: "CourseCategory", value: "coursecategory" },
    { key: "CourseType", value: "coursetype" },
    { key: "CollegeCategory", value: "collegecategory" },
    { key: "Category", value: "category" },
    { key: "CollegeUniversityType", value: "collegeuniversitytype" },
    { key: "ExamType", value: "examtype" },
    { key: "ApplicationMode", value: "applicationmode" },
    { key: "ExamMode", value: "exammode" },
    { key: "ExamOther", value: "examother" },
    { key: "Ranking", value: "ranking" },
    { key: "InstituteType", value: "institutetype" },
    { key: "InternationalCollaboration", value: "internationalcollaboration" },
    { key: "ExamPattern", value: "exampattern" },
    { key: "ApplicationExamStatus", value: "applicationexamstatus" },
    { key: "AcademicLevel", value: "academiclevel" },
    { key: "Qualification", value: "qualification" },
    { key: "FieldofStudy", value: "fieldofstudy" },
    { key: "EntranceExamAccepted", value: "entranceexamaccepted" },
    { key: "CourseDuration", value: "courseduration" },
    { key: "StudyMode", value: "studymode" },
    { key: "EligbilityCriteria", value: "eligbilitycriteria" },
    { key: "ExamDuration", value: "examduration" },
    { key: "RankingType", value: "rankingtype" },
    { key: "ExamDurationType", value: "examdurationtype" },
    { key: "QualificationCriteria", value: "qualificationcriteria" },
    { key: "HeadofInstitute", value: "headofinstitute" },
    { key: "Campus", value: "campus" },
    { key: "PreparatoryExams", value: "preparatoryexams" },
    { key: "Agency", value: "agency" },
    { key: "Ratings", value: "ratings" },
    { key: "Department", value: "department" },
    { key: "CourseType", value: "coursetype" },
    { key: "CourseFeeType", value: "coursefeetype" },
    { key: "CoursePlace", value: "courseplace" },
    { key: "Approvals", value: "approvals" },
    { key: "Eligibility", value: "eligibility" },
    { key: "CourseFeeDetails", value: "coursefeedetails" },
    { key: "CorporateMainCategory", value: "corporatemaincategory" },
    { key: "CorporateSubCategory", value: "corporatesubcategory" },
  ];

  const x = {
    courselevel: "Course Level",
    programtype: "Program Type",
    discipline: "Discipline",
    schoolaffilation: "School Affilation",
    schooldesignation: "School Designation",
    teacherlevels: "Teacher Levels",
    programduration: "Program Duration",
    collegetype: "College Type",
    accreditation: "Accreditation",
    affilation: "Affilation",
    examaccepted: "Exam Accepted",
    facilities: "Facilities",
    coursecategory: "Course Category",
    coursetype: "Course Type",
    collegecategory: "College Category",
    category: "Category",
    collegeuniversitytype: "College University Type",
    examtype: "Exam Type",
    applicationmode: "Application Mode",
    exammode: "Exam Mode",
    examother: "Exam Other",
    ranking: "Ranking",
    institutetype: "Institute Type",
    internationalcollaboration: "International Collaboration",
    exampattern: "Exam Pattern",
    applicationexamstatus: "Application Exam Status",
    academiclevel: "Academic Level",
    qualification: "Qualification",
    fieldofstudy: "Field of Study",
    entranceexamaccepted: "Entrance Exam Accepted",
    courseduration: "Course Duration",
    studymode: "Study Mode",
    eligbilitycriteria: "Eligbility Criteria",
    examduration: "Exam Duration",
    rankingtype: "Ranking Type",
    examdurationtype: "Exam Duration Type",
    qualificationcriteria: "Qualification Criteria",
    headofinstitute: "Head of Institute",
    campus: "Campus",
    preparatoryexams: "Preparatory Exams",
    agency: "Agency",
    ratings: "Ratings",
    department: "Department",
    coursetype: "Course Type",
    coursefeetype: "Course Fee Type",
    courseplace: "Course Place",
    approvals: "Approvals",
    eligibility: "Eligibility",
    coursefeedetails: "Course Fee Details",
    corporatemaincategory: "Corporate Main Category",
    corporatesubcategory: "Corporate Sub Category",
    govtexams: 'Government Exams',
    professionalexams: 'Professional Exams',
    campustocorp: 'Campus to Corp',
    entranceexam: 'Entrance Exam'
  }

  return (
    <div className="padding_top">
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        mutators={{
          // potentially other mutators could be merged here
          ...arrayMutators,
        }}
        initialValues={{
          Category: ID ? masterData?.types : "",
          Field: [{ FieldName: ID ? masterData?.name : "" }],
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Row className="pt-3">
              <Col md={12} lg={12}>
                <Field name="Category">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Select Category
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input select_option"
                      >
                        <option className="select_option" value="">
                          Select Category
                        </option>
                        {Object.keys(x).map((key, index) => {
                          return (
                            <option className="select_option" key={index} value={key}>{x[key]}</option>
                          )
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
              <FieldArray name="Field">
                {({ fields }) => (
                  <>
                    {fields.map((name, index) => (
                      <Col md={12} lg={12} className="d-flex">
                        <Field key={index} name={`${name}.FieldName`}>
                          {({ input, meta }) => (
                            <>
                              <div className="w-100">
                                <div className="d-flex">
                                  {index === 0 && (
                                    <>
                                      <label className="signup_form_label">
                                        Enter Field
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                                <input
                                  {...input}
                                  className="form-control signup_form_input margin_bottom"
                                  placeholder="Enter Field"
                                />
                              </div>
                            </>
                          )}
                        </Field>
                        {!ID && (
                          <div
                            className={
                              index === 0 ? "d-flex m_top_30" : "d-flex "
                            }
                          >
                            <div
                              type="button"
                              className="add_remove_btn"
                              onClick={() =>
                                fields.push({
                                  fieldName: "",
                                })
                              }
                            >
                              <img
                                className="add_remove_icon"
                                src="/images/plus.png"
                              />
                            </div>
                            {fields.length > 1 ? (
                              <div
                                className="add_remove_btn"
                                type="button"
                                onClick={() => fields.remove(index)}
                              >
                                <img
                                  className="add_remove_icon"
                                  src="/images/delete-black.png"
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        )}
                      </Col>
                    ))}
                  </>
                )}
              </FieldArray>
              {ID ? (
                <Col md={12} className="text-center">
                  <button
                    className="admin_signup_btn admin_signup_btn_mobile"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update Field
                  </button>
                </Col>
              ) : (
                <Col md={12} className="text-center">
                  <button
                    className="admin_signup_btn admin_signup_btn_mobile"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add Field
                  </button>
                </Col>
              )}
            </Row>
          </form>
        )}
      />
    </div>
  );
}

export default CreateMasterFilter;
