import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apibasePath } from "../../../config";
import {
  addCollege,
  deleteCollege,
  getCollegebyId,
  getColleges,
} from "../../../redux/actions/college/college";
import CommonHead from "../../common-components/UserHead/CommonHead";
import DeleteModal from "../../modals/deleteModal";
import AdminTable from "../AdminTable";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import { toast } from "react-toastify";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { collegeApprovalList } from "../../../redux/actions/auth";
import { collegeApprovalByAdmin } from "../../../redux/actions/auth";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import * as XLSX from "xlsx"
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { getState } from "../../../redux/actions/location/createState";
import { getCityList } from "../../../redux/actions/location/createCity";
import { getSubStream } from "../../../redux/actions/streams/addSubStream";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { adminexamList } from "../../../redux/actions/exams/createExam";


function CollegeAdminPage(props) {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 100,
  });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const FormSteps = ["College list", "Pending approvals"];
  const [dataValue, setDataValue] = React.useState(0);
  const [isLoading,setIsLoading] = useState(false)

  // const collegeList = useSelector((data) => data?.collegelist?.collegelist);
  const collegeList = useSelector((data) => data?.collegelist?.college);

  useEffect(() => {
    dispatch(getCollegebyId(pagination))
  }, [pagination])

  const approvalList = useSelector(
    (data) => data?.adminData?.pendingApprovalList
  );
  const Heading = [
    "No.",
    "Image",
    "Logo",
    "Name",
    "City",
    "State",
    "Courses",
    "Action",
  ];
  const approvalHeading = [
    "No.",
    "College",
    "State",
    "City",
    "E-mail",
    "Action",
  ];


  const loadercollegecard = useSelector((data) => data?.collegelist?.isLoading);
  const loaderApproval = useSelector((data) => data?.adminData?.isLoading);

  const handleEdit = (item) => {
    router.push(`college/update/${item?.id}`);
  };

  const handleDelete = (item) => {
    dispatch(deleteCollege(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
        dispatch(getColleges(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };
  const handleHide = () => {
    setModalShow(false);
  };

  const handleApprove = (id) => {
    dispatch(
      collegeApprovalByAdmin({
        PendingRequest: [
          {
            id: id,
            active: true,
          },
        ],
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Approved", { autoClose: 1000 });
        dispatch(collegeApprovalList(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };

  const handleReject = (id) => {
    dispatch(
      collegeApprovalByAdmin({
        PendingRequest: [
          {
            id: id,
            active: false,
          },
        ],
      })
    ).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Rejected", { autoClose: 1000 });
        dispatch(collegeApprovalList(pagination));
      } else {
        toast.error("error", { autoClose: 1000 });
      }
    });
  };

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getColleges(pagination));
    // dispatch(collegeApprovalList(pagination));
  }, [pagination]);

  const handleChange = (files) => {
    let selectedFile = files[0]
    if (selectedFile) {
      setIsLoading(true)
      dispatch(getAllMasterFilter('coursetype,coursecategory,eligibility,courselevel,courseplace,programtype,affilation,collegetype,approvals,agency,coursefeetype')).then((res) => {
        if (res.payload.data.success) {
          const coursetypedata = {}
          res?.payload?.data?.data?.coursetype?.map((item) => {
            coursetypedata[item?.name] = item?.id
          })
          const coursecategorydata = {}
          res?.payload?.data?.data?.coursecategory?.map((item) => {
            coursecategorydata[item?.name] = item?.id
          })
          const eligibilitydata = {}
          res?.payload?.data?.data?.eligibility?.map((item) => {
            eligibilitydata[item?.name] = item?.id
          })
          const courseleveldata = {}
          res?.payload?.data?.data?.courselevel?.map((item) => {
            courseleveldata[item?.name] = item?.id
          })
          const courseplacedata = {}
          res?.payload?.data?.data?.courseplace?.map((item) => {
            courseplacedata[item?.name] = item?.id
          })
          const programtypedata = {}
          res?.payload?.data?.data?.programtype?.map((item) => {
            programtypedata[item?.name] = item?.id
          })
          const affilationdata = {}
          res?.payload?.data?.data?.affilation?.map((item) => {
            affilationdata[item?.name] = item?.id
          })
          const collegetypedata = {}
          res?.payload?.data?.data?.collegetype?.map((item) => {
            collegetypedata[item?.name] = item?.id
          })
          const approvalsdata = {}
          res?.payload?.data?.data?.approvals?.map((item) => {
            approvalsdata[item?.name] = item?.id
          })
          const agencydata = {}
          res?.payload?.data?.data?.agency?.map((item) => {
            agencydata[item?.name] = item?.id
          })
          const coursefeetypedata = {}
          res?.payload?.data?.data?.coursefeetype?.map((item) => {
            coursefeetypedata[item?.name] = item?.id
          })
          dispatch(getState({ pageNo: 1, pageSize: 100 })).then((res) => {
            const statelist = {}
            if (res?.payload?.data?.success) {
              res?.payload?.data?.data?.rows?.map((item) => {
                // console.log(statelist[`${item?.state?.toUpperCase()}`],'iiiiiii')
                statelist[item?.state?.toUpperCase()] = item?.id
              })
              dispatch(getCityList({ pageNo: 1, pageSize: 4500 })).then((res) => {
                const citylist = {}
                if (res?.payload?.data?.success) {
                  res?.payload?.data?.data?.rows?.map((item) => {
                    citylist[item?.name?.toUpperCase()] = item?.id
                  })
                  dispatch(getMainStream({ pageSize: 200, pageNo: 1 })).then((res) => {
                    if (res?.payload?.data?.success) {
                      const mainstreamlist = {}
                      res?.payload?.data?.data?.rows?.map((item) => {
                        mainstreamlist[item?.mainStreamName] = item?.id
                      })
                  //     dispatch(getSubStream({pageSize: 400, pageNo: 1})).then((res)=>{
                  //       if(res?.payload?.data?.success){
                  //         let substreamlist = {}
                  //         res?.payload?.data?.data?.rows?.map((item)=>{
                  //         })
                  //       }
                  //     })
                  const examlist = {}
                  dispatch(adminexamList({ pageNo: 1, pageSize: 500 })).then((res) => {
                    if (res?.payload?.data?.success) {
                      res?.payload?.data?.data?.rows?.map((item) => {
                        examlist[item?.examName.toUpperCase()] = item?.id
                      })
                      let reader = new FileReader();
                      reader.readAsArrayBuffer(selectedFile);
                      reader.onload = ((e) => {
                        // setExcelFileError(null).
                        const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                        const worksheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[worksheetName];
                        const data = XLSX.utils.sheet_to_json(worksheet);
                        let collegedata = { payload: [] }
                        let srno = 0
                        data.map((item,index) => {
                          // console.log(coursetypedata[`${item[`Type Of Course`]}`],coursetypedata,item[`Type Of Course`],'jjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                          let streams = []
                          if (item[`Course Fee`] && item[`Course Fee`]?.length > 0) {
                          }
                          item[`Streams`] && item[`Streams`]?.split(',').map((ele) => {
                            let mainstream = ele.split('|')[0] && ele.split('|')[0].length > 1 && ele.split('|')[0].trim().substring(1, ele.split('|')[0].length).trim()
                            let substream = ele.split('|')[1] && ele.split('|')[1].length > 0 && ele.split('|')[1].trim()
                            let colstream = ele.split('|')[2] && ele.split('|')[2].length > 1 && ele.split('|')[2].trim().substring(0, ele.split('|')[2].length - 1).trim()
                            let x = {}
                            if (mainstream) {
                              x.mainStreamId = mainstream
                            }
                            if (substream) {
                              x.subStreamId = substream
                            }
                            if (colstream) {
                              x.colStreamId = colstream
                            }
                            if (x) {
                              streams.push(x)
                            }
                          })

                          let fee = []
                          item[`Course Fee`] && item[`Course Fee`].length > 0 && item[`Course Fee`]?.split(',').map((ele) => {
                            let courseFeeDetailsId = ele.split(":")[0] && ele.split(":")[0].length > 1 && ele.split(":")[0].trim().substring(1, ele.split(":")[0].length).trim()
                            let fees = ele.split(':')[1] && ele.split(':')[1].length > 1 && ele.split(":")[1].substring(0, ele.split(":")[1].length - 2).trim()
                            let x = {}
                            if (courseFeeDetailsId) {
                              x.courseFeeDetailsId = coursefeetypedata[courseFeeDetailsId]
                            }
                            if (fees) {
                              x.fees = Number(fees)
                            } if (x) {
                              fee.push(x)
                            }
                          })
                          if(item[`Exam Accepted`]){
                            console.log(examlist[`${item[`Exam Accepted`].split(";")[0].toUpperCase().trim()}`],item[`Exam Accepted`].split(";")[0].toUpperCase().trim(),'fiwnrfn')
                          }

                          if (item['Sr. No.']) {
                            // console.log(index,'jjjjjjjjjjjjj')
                            console.log(srno,'entered clg')
                            srno++
                            let agency = []
                            if (item[`College Agency`]) {
                              item['College Agency'].split(',').map((ele) => {
                                // console.log(ele.split("-")[1]?.trim().toUpperCase(),'jhhhhhhhhhhhh')
                                agency.push({
                                  collegeAgencyId: ele.split("-")[2]?.trim() ? agencydata[`${ele.split("-")[2].trim()}`] : null,
                                  collegeAgencyFor: ele.split("-")[1]?.trim() ? mainstreamlist[`${ele.split("-")[1].trim().toUpperCase()}`] : null,
                                  totalAgency: ele.split('-')[0]?.trim()?.substring(1, ele.split('-')[0].length).trim(),
                                  totalAgencyForYears: ele.split('-')[3]?.substring(0, ele.split('-')[3].length - 1).trim(),
                                })
                              })
                            }
                            let x = { college: [], collegeCourse: [] }
                            x.college[0] = {
                              chooseAffiliationId: item[`College Affiliations`] ? affilationdata[`${item[`College Affiliations`]}`] : null,
                              collegeName: item[`College Name`] ? item[`College Name`]:null,
                              collegeMailId: item[`College Mail Id`] ? item[`College Mail Id`] : null,
                              collegeTypeId: item[`College Type`] ? collegetypedata[`${item[`College Type`]}`]:null,
                              collegeEstablishedDate: item[`College Established Date`] ? item[`College Established Date`] : null,
                              chooseApprovalId: item[`College Approvals`] ? approvalsdata[`${item[`College Approvals`]}`] : null,
                              collegeStateId: item[`College State`] ? statelist[`${item[`College State`].toUpperCase()}`] : null,
                              collegeCityId: item[`College City`] ? citylist[`${item[`College City`].toUpperCase()}`] : null,
                              collegeNaacGrade: item[`College NAAC Grade`] ? item[`College NAAC Grade`] : null,
                            }
                            x.collegeCourse[0] = {
                              courseTypeId: item[`Course Type`] ? coursetypedata[`${item[`Course Type`]}`] : null,
                              courseName: item[`Course Name`] ? item[`Course Name`] : null,
                              coursePlaceId: item[`Course Place`] ? courseplacedata[`${item[`Course Place`]}`] : null,
                              courseDuration: item[`Course Duration`] ? item[`Course Duration`] : null,
                              courseEligibility: item[`Course Eligibility`] ? eligibilitydata[`${item[`Course Eligibility`]}`] : null,
                              courseLevel: item[`Course Level`] ? courseleveldata[`${item[`Course Level`]}`] : null,
                              programTypeId: item[`Program Type`] ? programtypedata[`${item[`Program Type`]}`] : null,
                              courseCategoryId: item[`Course Category`] ? coursecategorydata[`${item[`Course Category`]}`] : null,
                              chooseExamAcceptedId: item[`Exam Accepted`] ? examlist[`${item[`Exam Accepted`].split(";")[0].toUpperCase().trim()}`] : null,
                            }
                            if (agency?.length > 0) {
                              // console.log('entered','jjjjjjjjjjjjjjjjjjjjjjjjjjj')
                              x.collegeAgencies = agency
                            }
                            if (streams?.length > 0) {
                              x.collegeCourse[0].collegeStreams = streams
                            }
                            if (fee?.length > 0) {
                              x.collegeCourse[0].courseFees = fee
                            }
                            collegedata?.payload.push(x)
                          } else {
                            let x = {
                              // courseTypeId: item[`Type Of Course`],
                              // courseName: item[`Course Name`],
                              // coursePlaceId: item[`Course Place`],
                              // courseDuration: item[`Course Duration`],
                              // courseEligibility: item[`Course Eligibility`],
                              // courseLevel: item[`Course Level`],
                              // programTypeId: item[`Program Type`],
                              // courseCategoryId: item[`Course Category`],
                              // chooseExamAcceptedId: item[`Exam Accepted`],
                              courseTypeId: item[`Course Type`] ? coursetypedata[`${item[`Course Type`]}`] : null,
                              courseName: item[`Course Name`] ? item[`Course Name`] : null,
                              coursePlaceId: item[`Course Place`] ? courseplacedata[`${item[`Course Place`]}`] : null,
                              courseDuration: item[`Course Duration`] ? item[`Course Duration`] : null,
                              courseEligibility: item[`Course Eligibility`] ? eligibilitydata[`${item[`Course Eligibility`]}`] : null,
                              courseLevel: item[`Course Level`] ? courseleveldata[`${item[`Course Level`]}`] : null,
                              programTypeId: item[`Program Type`] ? programtypedata[`${item[`Program Type`]}`] : null,
                              courseCategoryId: item[`Course Category`] ? coursecategorydata[`${item[`Course Category`]}`] : null,
                              chooseExamAcceptedId: item[`Exam Accepted`] ? examlist[`${item[`Exam Accepted`].split(";")[0].toUpperCase().trim()}`] : null,
                            }
                            if (streams?.length > 0) {
                              x.collegeStreams = streams
                            }
                            if (fee?.length > 0) {
                              x.courseFees = fee
                            }
                            console.log(srno,'entered course')
                            // collegedata?.payload[srno - 1]?.collegeCourse && 
                            collegedata?.payload[srno - 1]?.collegeCourse.push(x)
                          }
                        })
                        let finaldata = { payload: [] }
                        var formData = new FormData()
                        console.log(collegedata,'cmiwrnnjl')
                        // formData.append("collegeData", JSON.stringify(collegedata));
                        // dispatch(addCollege(formData)).then((res)=>{
                        //   if(res){
                        //     setIsLoading(false)
                        // dispatch(getColleges(pagination));
                        // dispatch(getCollegebyId(pagination))
                        //   }
                        // })
                        // for (let j = 0; j <= collegedata?.payload?.length; j++) {
                        //   finaldata?.payload?.push(collegedata?.payload[j])
                        //   console.log(j>100 && j%100 == 0,'indexxxxxxxxxxxxxxx')
                        //   if (j >= 100 && j%100 == 0) {
                        //     console.log(finaldata,j,'lllllllllllllll')
                        //     let formData = new FormData();
                        //     formData.append("collegeData", JSON.stringify(finaldata));
                        //     dispatch(addCollege(formData)).then((res)=>{
                        //     })
                        //     finaldata.payload=[]
                        //   }
                        //   if( j == collegedata?.payload?.length - 1){
                        //     let formData = new FormData();
                        //     formData.append("collegeData", JSON.stringify(finaldata));
                        //     dispatch(addCollege(formData)).then((res)=>{
                        //       if(res){
                        //         setIsLoading(false)
                        //       }
                        //     })
                        //     console.log(finaldata,j,'lllllllllllllll')
                        //   }
                        // }
                      })
                    }
                  })
                }
              })
                }
              })
            }
          })
        }
      })
      // if(selectedFile&&fileType.includes(selectedFile.type)){

    }
  }

  return (
    <>
    {isLoading && <LoaderPage/>}
      <div className="admin_home_tabs_row">
        <Row>
          <Col xl={12} className="p-0 ">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll ">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        active="true"
                        onClick={() => {
                          setDataValue(stepsIndex);
                          // setPagination({ ...pagination, pageNo: 1 });
                        }}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
        </Row>
      </div>
      <Row>
        <Col xl={12} className="">
          <div className="college_header_btn_row">
            <div className="enteries_input mt-0">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
            <div className="text-end">
              <Button className="border_btn border_btn_margin_top">Upload CSV</Button>
              {/* <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileCity(e)} hidden /> */}
              <input type="file" id="actual-btn" onChange={(e) => handleChange(e.target.files)} hidden />
              <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
              <Button className="border_btn border_btn_margin_top">Download CSV</Button>
              <Button
                className="border_btn green border_btn_margin_top"
                onClick={() => router.push("college/addcollege")}
              >
                Add New
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">College List</h4>
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
          </div>
        </Col>
        <Col xl={6} lg={12} md={12} className="text-end mt-2">
          <div>
            <Button className="border_btn">Upload XLSX</Button>
            <Button className="border_btn">Download XLSX</Button>
            <Button
              className="border_btn green"
              onClick={() => router.push("college/addcollege")}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row> */}
      {/* <hr /> */}
      <div className="admin_stream_table">
        {dataValue === 0 && (
          <>
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
                    // loadercollegecard ? (
                    //   <LoaderPage />
                    // ) :
                    collegeList?.rows?.length > 0 && (
                      collegeList?.rows?.filter((item) => {
                        if (router.query.search && item?.collegeName) {
                          return item?.collegeName.toLowerCase().includes(router.query.search.toLowerCase())
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
                              <Image
                                height={75}
                                width={75}
                                // className="college_card_img img-fluid"
                                alt=""
                                src={item?.collegeImage ? `${apibasePath}documents/college/${item?.collegeImage}` : ''}
                              />
                            </td>
                            <td className="text-center admin_table_data">
                              <Image
                                height={75}
                                width={75}
                                // className="college_card_img img-fluid"
                                alt=""
                                src={ item?.collegeLogo ? `${apibasePath}documents/college/${item?.collegeLogo}` : ''}
                              />
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.collegeName}
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.Cities?.name}
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.States?.state}
                            </td>
                            <td className="text-center admin_table_data">
                              {item?.AssociateCourse?.length}
                            </td>
                            <td className="text-center admin_table_data no_wrap_no">
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
                      })
                    )}
                </tbody>
              </Table>
              {collegeList && collegeList?.rows && collegeList?.rows.length === 0 && <NoDataPage name="Colleges" />}
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={collegeList}
            />
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handleDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 1 && (
          <>
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {approvalHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loaderApproval ? (
                    <LoaderPage />
                  ) : approvalList?.rows?.length > 0 && (
                    approvalList?.rows?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center admin_table_data">
                            {pagination.pageSize * (pagination.pageNo - 1) +
                              (index + 1)}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.collegeName}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.Cities?.name}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.States?.state}
                          </td>
                          <td className="text-center admin_table_data">
                            {item?.email}
                          </td>
                          <td className="text-center admin_table_data">
                            {/* <img
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
                            ></img> */}
                            <Button
                              className="border_btn table_btn"
                              onClick={() => console.log("reject")}
                            >
                              Reject
                            </Button>
                            <Button
                              className="border_btn green table_btn"
                              onClick={() => handleApprove(item?.id)}
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
              {approvalList && approvalList?.rows && approvalList?.rows.length === 0 && <NoDataPage name="Colleges" />}
            </Row>
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              list={approvalList}
            />
          </>
        )}
      </div>
    </>
  );
}

export default CollegeAdminPage;
