import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCourse,
  deleteCourse,
  editCourse,
  getCourse,
} from "../../../redux/actions/course/addcourse";
import DeleteModal from "../../modals/deleteModal";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import * as XLSX from "xlsx"
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { searchExams } from "../../../redux/actions/exams/createExam";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";

function CourseTable() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 100,
  });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false);
  };
  const courseData = useSelector((data) => data?.courseList?.courselist);

  const loadingData = useSelector((state) => state?.courseList?.isLoading);

  const dispatch = useDispatch();
  const handleEdit = (item) => {
    router.push(`/admin/courses/updatecourse/${item?.id}`);
  };
  const handleDelete = (item) => {
    dispatch(deleteCourse(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
        dispatch(getCourse(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };
  const Heading = ["No.", "Main Stream", "Course Type", "Name", "Action"];
  useEffect(() => {
    dispatch(getCourse(pagination));
  }, [pagination]);

  const router = useRouter();


  const handleChange = (files) => {
    let selectedFile = files[0]
    if (selectedFile) {
      dispatch(getAllMasterFilter('coursetype,coursecategory,eligibility,courselevel')).then((res) => {
        if (res?.payload?.data?.success) {
          const courseType = {}
          const courseEligibility = {}
          const courseCategory = {}
          const courseLevel = {}
          res?.payload?.data?.data?.coursetype?.map((item) => {
            courseType[item?.name] = item?.id
          })
          res?.payload?.data?.data?.coursecategory?.map((item) => {
            courseCategory[item?.name] = item?.id
          })
          res?.payload?.data?.data?.eligibility?.map((item) => {
            courseEligibility[item?.name] = item?.id
          })
          res?.payload?.data?.data?.courselevel?.map((item) => {
            courseLevel[item?.name] = item?.id
          })
          dispatch(searchExams({ pageNo: 1, pageSize: 300 })).then((res) => {
            if (res?.payload?.data?.success) {
              const examslist = {}
              res?.payload?.data?.data?.rows?.map((item) => {
                examslist[item?.examName] = item?.id
              })
              dispatch(getMainStream({ pageSize: 200, pageNo: 1 })).then((res) => {
                if (res?.payload?.data?.success) {
                  let mainstreamlist = {}
                  res?.payload?.data?.data?.rows?.map((item) => {
                    mainstreamlist[item?.mainStreamName] = item?.id
                  })

                  let reader = new FileReader();
                  reader.readAsArrayBuffer(selectedFile);
                  reader.onload = ((e) => {
                    // setExcelFileError(null)
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                    const worksheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[worksheetName];
                    const data = XLSX.utils.sheet_to_json(worksheet);
                    let coursedata = {}
                    coursedata.Course = data?.map((item) => {
                      let exams = { examData: [] }
                      if (item[`Exam Accepted`] === '-') {
                        exams = {}
                      } else {
                        // exams.examData 
                        item[`Exam Accepted`].split(';').map(ele => {
                          if (examslist[ele]) {
                            exams.examData.push({ examId: examslist[ele] })
                          }
                        })
                      }
                      return {
                        mainStreamId: item[`Stream`] ? mainstreamlist[`${item[`Stream`].split("|")[0].toUpperCase()}`] : null,
                        courseTypeId: item[`Course Type`] ? courseType[`${item[`Course Type`]}`] : null,
                        courseName: item[`Course Name`],
                        courseCategoryId: item[`Course Category`] ? courseCategory[`${item[`Course Category`]}`] : null,
                        eligibility: item[`Course Eligibility`] ? courseEligibility[`${item[`Course Eligibility`]}`] : null,
                        courseDuration: item[`Course Duration`],
                        averageFees: item[`Average Fees`],
                        averageSalary: item[`Average Salary`],
                        courseLevelId: item[`Course Level`] ? courseLevel[`${item[`Course Level`]}`] : null,
                        // entranceExamId: null,
                        ...exams
                      }
                    })
                    // for (let i = 1; i * 200 <= coursedata?.Course?.length; i++) {
                    let finaldata = { Course: [] }
                    for (let j = 0; j <= coursedata?.Course?.length; j++) {
                      finaldata?.Course?.push(coursedata?.Course[j])
                      // finaldata?.Course = coursedata?.Course.from({length:200}, (v,j)=> i)
                      if ((j >= 200 && 200 % j == 0) || j == coursedata?.Course?.length - 1) {
                        console.log('dispatch', j)
                        dispatch(addCourse(finaldata)).then((res) => {
                          if (res?.payload?.data?.success) {
                            let status = res?.payload?.data?.data?.stream[0].status;
                            if (status === "duplicate") {
                              toast.error("Duplicate");
                              // values.courseDuration = values.courseDuration.split(" ")[0];
                            } else {
                              if (j == coursedata?.Course?.length) {
                                toast.success("Course added");
                                dispatch(getCourse(pagination));
                              }
                            }
                          } else {
                            toast.error("error");
                            // values.courseDuration = values.courseDuration.split(" ")[0];
                          }
                        });
                        finaldata.Course = []
                      }
                    }
                    // }
                  })

                }
              })
            }
          })
        }
      })
      // if(selectedFile&&fileType.includes(selectedFile.type)){

      // }
    }
  }
  return (
    <>
      <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">Courses List</h4>
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
          </div>
        </Col>
        <Col xl={6} lg={12} md={12} className="text-end">
          <div>
            {/* <Button className="border_btn" >Upload CSV</Button> */}
            {/* <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileCity(e)} hidden /> */}
            <input type="file" id="actual-btn" onChange={(e) => handleChange(e.target.files)} hidden />
            <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
            <Button className="border_btn">Download CSV</Button>
            <Button
              className="border_btn green"
              onClick={() => router.push("courses/add")}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row>
      <hr />

      <div className="admin_stream_table">
        <Row>
          <Table responsive className="admin_table" bordered hover>
            <thead>
              <tr>
                {Heading.map((hd, index) => {
                  return (
                    <th className="table_head" key={index}>
                      {hd}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {
                // loadingData ? (
                //   <LoaderPage />
                // ) : (
                courseData &&
                courseData?.length > 0 &&
                courseData.filter((item) => {
                  if (router.query.search && item?.courseName) {
                    return item?.courseName.toLowerCase().includes(router.query.search.toLowerCase())
                  }
                  return true
                })?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center admin_table_data">
                        {pagination.pageSize * (pagination.pageNo - 1) +
                          (index + 1)}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.MainStream?.mainStreamName}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.CourseType?.name}
                      </td>
                      <td className="text-center admin_table_data">
                        {item?.courseName}
                      </td>
                      <td className="text-center admin_table_data">
                        <img
                          className="mx-1 admin_table_action_icon"
                          src="/images/edit-icon-blue.png"
                          onClick={() => handleEdit(item)}
                        ></img>
                        <img
                          className="mx-1 admin_table_action_icon"
                          src="/images/delete-icon-blue.png"
                          onClick={() => {
                            setModalShow(true);
                            setDeleteItem(item);
                          }}
                        ></img>
                      </td>
                    </tr>
                  );
                }
                )
                // )
              }
            </tbody>
          </Table>
          {courseData  && courseData?.length === 0 && <NoDataPage name="Courses" />}
        </Row>
        {courseData  && courseData?.length !== 0 &&
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            list={courseData}
          />
        }
        <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
}

export default CourseTable;
