import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  adminMasterfilterData,
  deleteMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import DeleteModal from "../../modals/deleteModal";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";
import { apibasePath } from "../../../config";
import { apiRequest } from "../../../redux/services/api";
import { Image } from "react-bootstrap";

function MasterFilterTable() {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false)
  }
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 100
  })
  const dispatch = useDispatch();
  const masterData = useSelector(
    (data) => data?.masterFilterList?.masterfilterlist?.data?.data
  );

  const loaderMasterData = useSelector((state) => state?.masterFilterList?.isLoading)

  useEffect(() => {
    const timerDebounce = setTimeout(() => {
      dispatch(adminMasterfilterData({ ...pagination, search:{search :  router.query.search} }))
    }, 600)
    return () => clearTimeout(timerDebounce)
  }, [pagination, router.query.search]);

  const handleDelete = (item) => {
    dispatch(deleteMasterFilter(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success('Deleted')
        dispatch(adminMasterfilterData(pagination))
      } else {
        toast.error('Error')
      }
    });
  };

  const handleEdit = (item) => {
    const path = `masterfilter/updatemastetfilter/${item.id}`;
    router.push(path);
  };
  const tableHeading = ["No.", "Category", "Field", "Action"];

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
  const handleDownload = () => {
    fetch(
      `${apibasePath}masterFilter/masterFilterDataFileDownLoad?types=courselevel`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    })
  }

  const handleUploadExcelFileMasterFilter = async (e) => {
    let uplodedFile = e.target.files[0]
    if (uplodedFile) {
      let formData = new FormData()
      formData.append('datafile', uplodedFile)
      formData.append("types", masterTypeState)
      await apiRequest.post('masterFilter/addMasterFilterDataExcel', formData).then((res) => {
        if (res?.data?.success) {
          dispatch(adminMasterfilterData(pagination));
        }
        if (
          res?.data?.data?.result?.data[0]?.status?.toLowerCase() ===
          'duplicate'
        ) {
          toast.info('Duplicate data cannot be added!');
        } else {
          if (res?.payload?.data?.success) {
            toast.success('File uploaded Successfully');
            dispatch(adminMasterfilterData(pagination));
            setShowModal(false);
          }
        }
      })
        .catch((err) => {
          toast.error(err?.message);
        })
    }
  }

  const onDownloadMasterfilterSamplePdf = () => {
    fetch(
      `${apibasePath}masterFilter/masterFilterSampleFileDownLoad`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    })
  }

  const [masterTypeState, setMasterTypeState] = useState()

  const handleMastertypeChange = (type) => {
    setMasterTypeState(type)
  }

  return (
    <>

      <Row className="padding_top">
        <Col xl={6} lg={12} md={12}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading">Master Filter</h4>
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Pagesize setPagination={setPagination} />
            </div>
          </div>
        </Col>
        <Col xl={6} lg={12} md={12} className="text-end">
          <div>
            <select onChange={(e) => handleMastertypeChange(e.target.value)}>
              <option value=''>Select category</option>
              {Object.keys(x).map((keys) => {
                return <option key={keys} value={keys}>{x[keys]}</option>
              })}
            </select>
            <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileMasterFilter(e)} hidden />
            <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
            {/* <Button className="border_btn">Upload XLSX</Button> */}
            <Button className="border_btn" onClick={onDownloadMasterfilterSamplePdf}>Sample XLSX</Button>
            <Button className="border_btn" onClick={handleDownload}>Download XLSX</Button>
            <Button className="border_btn green" onClick={() => router.push("masterfilter/addmasterfilter")}>Add New</Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Table responsive className="admin_table" bordered hover>
        <thead>
          <tr>
            {tableHeading &&
              tableHeading?.map((i, index) => {
                return (
                  <th className="table_head" key={index}>
                    {i}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {loaderMasterData ? <LoaderPage /> : masterData?.rows?.filter(item => {
            if (router.query.search && item.name) {
              return item?.name.toLowerCase().includes(router.query.search.toLowerCase());
            }
            return true
          }
          )?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center admin_table_data">{pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}</td>
                <td className="text-center admin_table_data">{x[item?.types]}</td>
                <td className="text-center admin_table_data">{item.name}</td>
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
                      setModalShow(true)
                      setDeleteItem(item)
                    }}
                  ></img>
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </Table>
      <Pagination pagination={pagination} setPagination={setPagination} list={masterData} />
      <DeleteModal
        show={modalShow}
        onHide={() => handleHide()}
        handleDelete={handleDelete}
        deleteItem={deleteItem}
      />
    </>
  );
}

export default MasterFilterTable;
