import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteExam, adminexamList, getExamById, addExam } from '../../../redux/actions/exams/createExam'
import DeleteModal from '../../modals/deleteModal'
import Pagesize from '../pagination/pagesize'
import Pagination from '../pagination/pagination'
import LoaderPage from '../../common-components/loader'
import NoDataPage from '../../common-components/NoDataPage/NoDataPage'
import * as XLSX from 'xlsx'
import { getAllMasterFilter } from '../../../redux/actions/masterfilter/createmasterfilter'
import { getMainStream } from '../../../redux/actions/streams/addMainStreams'



function ExamTable() {
    const [pagination, setPagination] = useState({
        pageNo: 1,
        pageSize: 100
    })
    const [excelFile, setExcelFile] = useState(null)
    const [excelFileError, setExcelFileError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const fileType = ['application/vnd.ms-excel']
    const router = useRouter()
    const dispatch = useDispatch()
    const handleDelete = (item) => {
        dispatch(deleteExam(item.id)).then((res) => {
            if (res?.payload?.data?.success) {
                toast.success('Deleted')
                dispatch(adminexamList(pagination));
            } else {
                toast.error('Error')
            }
        });
    }
    const [modalShow, setModalShow] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const handleHide = () => {
        setModalShow(false);
    };
    const handleEdit = (item) => {
        router.push(`exams/updateexam/${item.id}`)
    }
    const examData = useSelector((data) => data?.examList?.adminExamList)
    const loaderExamDate = useSelector((state) => state?.examList?.isLoading)

    const getapplicationModeId = (name) => {

    }

    const handleChange = (files) => {
        let selectedFile = files[0]
        if (selectedFile) {
            setIsLoading(true)
            // if(selectedFile&&fileType.includes(selectedFile.type)){
            console.log('datadatadata entered')
            dispatch(getAllMasterFilter('coursetype,exammode,examtype,applicationmode')).then((res) => {
                if (res?.payload?.data?.success) {
                    const applicatonMode = {}
                    res?.payload?.data?.data?.applicationmode?.map((item) => {
                        applicatonMode[item?.name] = item?.id
                    })
                    const examMode = {}
                    res?.payload?.data?.data?.exammode?.map((item) => {
                        examMode[item?.name] = item?.id
                    })
                    const examType = {}
                    res?.payload?.data?.data?.examtype?.map((item) => {
                        examType[item?.name] = item?.id
                    })
                    const courseType = {}
                    res?.payload?.data?.data?.coursetype?.map((item) => {
                        courseType[item?.name] = item?.id
                    })
                    let mainStream = {}
                    console.log(applicatonMode, 'kkkkkkkkkkkkk')
                    dispatch(getMainStream({ pageSize: 200, pageNo: 1 })).then((res) => {
                        if (res?.payload?.data?.success) {
                            res?.payload?.data?.data?.rows?.map((item) => {
                                mainStream[item?.mainStreamName] = item?.id
                            })
                            let reader = new FileReader();
                            reader.readAsArrayBuffer(selectedFile);
                            reader.onload = ((e) => {
                                setExcelFileError(null)
                                const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                                const worksheetName = workbook.SheetNames[0];
                                const worksheet = workbook.Sheets[worksheetName];
                                const data = XLSX.utils.sheet_to_json(worksheet);
                                let examdata = { payload: [] }
                                data?.map((item, index) => {
                                    // if (item[`Course Type`] && item[`Course Type`].split(',').length < 2) {
                                    let x = { mainstreamdata: [] }
                                    if (item[`Main Stream`]) {
                                        item[`Main Stream`].split(',').map((ele) => {
                                            return x.mainstreamdata.push({ mainStreamId: mainStream[ele] })
                                        })
                                    }
                                    // if(item[`EXAM NAME`] && item[`Course Type`]){
                                    // examdata.payload[0].exam.push({
                                    //     resultAnnouncementDate:item[`Result Date [DD/MM/YYYY]`] ? item[`Result Date [DD/MM/YYYY]`]:  null,
                                    //     examDate:item[`Exam Date[DD/MM/YYYY - DD/MM/YYYY]`] ? item[`Exam Date[DD/MM/YYYY - DD/MM/YYYY]`] : null,
                                    //     examApplicationDate:item[`Application Date[DD/MM/YYYY - DD/MM/YYYY]`] ? item[`Application Date[DD/MM/YYYY - DD/MM/YYYY]`] : null,
                                    //     applicationModeId:item[`Application Mode`] ? item[`Application Mode`] : null,
                                    //     examModeId:item[`Exam Mode`] ? item[`Exam Mode`] : null,
                                    //     examTypeId:item[`Exam Type`] ? item[`Exam Type`] : null,
                                    //     examName:item[`EXAM NAME`] ? item[`EXAM NAME`] : null,
                                    //     courseTypeId: null,
                                    // })
                                   
                                    let a = {
                                        exam: [{
                                            resultAnnouncementDate: item[`Result Date [DD/MM/YYYY]`] ? item[`Result Date [DD/MM/YYYY]`] : null,
                                            examDate: item[`Exam Date[DD/MM/YYYY - DD/MM/YYYY]`] ? item[`Exam Date[DD/MM/YYYY - DD/MM/YYYY]`] : null,
                                            examApplicationDate: item[`Application Date[DD/MM/YYYY - DD/MM/YYYY]`] ? item[`Application Date[DD/MM/YYYY - DD/MM/YYYY]`] : null,
                                            applicationModeId: item[`Application Mode`] ? applicatonMode[`${item[`Application Mode`]}`] : null,
                                            examModeId: item[`Exam Mode`] ? examMode[`${item[`Exam Mode`]}`] : null,
                                            examTypeId: item[`Exam Type`] ? examType[`${item[`Exam Type`]}`] : null,
                                            examName: item[`EXAM NAME`] ? item[`EXAM NAME`] : null,
                                            courseTypeId: item[`Course Type`] ? courseType[`${item[`Course Type`].split(',')[0]}`] : null,
                                        }]
                                    }
                                    
                                    // if(a.exam[0]?.applicationModeId && a.exam[0]?.courseTypeId && a.exam[0]?.examTypeId && a.exam[0]?.examModeId){
                                    if (x.mainstreamdata.length > 0) {
                                        examdata?.payload.push({ exam: a.exam, examMainStream: x.mainstreamdata })
                                    } else {
                                       
                                        examdata?.payload.push({ exam: a.exam })
                                    }
                                    // }

                                    // }
                                    // }
                                })
                              
                                let formdata = new FormData();
                                formdata.append("examData", JSON.stringify(examdata));
                                // console.log(examdata, 'examdataexamdataexamdata')
                                dispatch(addExam(formdata)).then((res) => {
                                    if (res?.payload?.data?.success) {
                                        toast.success("Exam Added");
                                        dispatch(adminexamList(pagination));
                                    } else {
                                        toast.error("error");
                                    }
                                    setIsLoading(false)
                                });
                            })
                        }
                    })

                }
            })
            // }
        }
    }

    useEffect(() => {
        const timerDebounce = setTimeout(() => {
            dispatch(adminexamList({ ...pagination, search: router.query.search }))
        }, 600)
        return () => clearTimeout(timerDebounce)
    }, [pagination, router.query.search])

    const tableHeading = ["No.", "Main Stream", "Course Type", "Name", "Action"]
    return (
        <>
            {isLoading && <LoaderPage />}
            <>
                <Row className='padding_top'>
                    <Col xl={6} lg={12} md={12}>
                        <div className="d-flex table_heading_header">
                            <h4 className="table_list_heading master_heading">Exams List</h4>
                            <div className="enteries_input">
                                <h6 className="enteries_input_label">Show Enteries</h6>
                                <Pagesize setPagination={setPagination} />
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} lg={12} md={12} className="text-end">
                        <div>
                            {/* <Button className="border_btn">Upload CSV</Button> */}
                            {/* <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileCity(e)} hidden /> */}
                            <input type="file" id="actual-btn" onChange={(e) => handleChange(e.target.files)} hidden />
                            <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                            <Button className="border_btn">Download CSV</Button>
                            <Button
                                className="border_btn green"
                                onClick={() => router.push("exams/add")}
                            >
                                Add New
                            </Button>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <div>
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
                            {loaderExamDate ? <LoaderPage /> : examData?.rows && examData?.rows.length > 0 &&
                                examData?.rows?.filter((item) => {
                                    if (router.query.search && item?.examName) {
                                        return item?.examName.toLowerCase().includes(router.query.search.toLowerCase())
                                    }
                                    return true
                                })?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center admin_table_data">{pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}</td>
                                            <td className="text-center admin_table_data">{item?.MainStreamList[0]?.MainStream?.mainStreamName ? item?.MainStreamList[0]?.MainStream?.mainStreamName : "-"}</td>
                                            <td className="text-center admin_table_data">{item?.CourseType?.name ? item?.CourseType?.name : "-"}</td>
                                            <td className="text-center admin_table_data">{item?.examName}</td>
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
                                    )
                                })}
                        </tbody>
                    </Table>
                    {examData && examData?.rows && examData?.rows.length === 0 && <NoDataPage name="Exams" />}
                    {examData && examData?.rows && examData.rows.length !== 0 &&
                        <Pagination pagination={pagination} setPagination={setPagination} list={examData} />
                    }
                    <DeleteModal
                        show={modalShow}
                        onHide={() => handleHide()}
                        handleDelete={handleDelete}
                        deleteItem={deleteItem}
                    />
                </div>
            </>
        </>
    )
}

export default ExamTable
