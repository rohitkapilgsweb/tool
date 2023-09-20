import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteColStream,
  getColStream,
} from "../../../redux/actions/streams/addColStream";
import {
  deleteMainStream,
  getMainStream,
} from "../../../redux/actions/streams/addMainStreams";
import {
  deleteSubStream,
  getSubStream,
} from "../../../redux/actions/streams/addSubStream";
import DeleteModal from "../../modals/deleteModal";
import AdminTable from "../AdminTable";
import Pagesize from "../pagination/pagesize";
import Pagination from "../pagination/pagination";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import { apibasePath } from "../../../config";
import { apiRequest } from "../../../redux/services/api";

function StreamsPage() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 100,
  });
  const FormSteps = ["Main Streams", "Sub Streams", "Col Streams"];
  const dispatch = useDispatch();
  const data = useSelector((data) => data);
  const router = useRouter(0);
  const [dataValue, setDataValue] = React.useState(0);
  const mainsTreamHeading = ["No.", "Main Stream", "Action"];
  const subTreamHeading = ["No.", "Main Stream", "Sub Stream", "Action"];
  const colTreamHeading = ["No.", "Sub Stream", "Col Stream", "Action"];
  const mainsTreamData = data?.mainStreamList?.mainStreamValue?.data?.data;
  const loadingMainTreamData = data?.mainStreamList?.isLoading;
  const subStreamData = data?.subStreamList?.subStreamValue?.data?.data;
  const loadingSubStreamData = data?.subStreamList?.isLoading;
  const colStreamData = data?.colStreamList?.colStreamSlice?.data?.data;
  const loadingColStreamData = data?.colStreamList?.isLoading;

  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false);
  };

  const handleDelete = (item) => {
    if (item?.mainStreamName || item.mainStreamName == "") {
      dispatch(deleteMainStream(item.id)).then((res) => {
        console.log(res);
        if (res?.payload?.data?.success) {
          toast.success("Delete");
          dispatch(getMainStream());
        } else {
          toast.error(res?.payload?.response?.data?.message);
        }
      });
    }
    if (item?.subStreamName) {
      dispatch(deleteSubStream(item.id)).then((res) => {
        console.log(res);
        if (res?.payload?.data?.success) {
          toast.success("Deleted", { autoClose: 1000 });
          dispatch(getSubStream());
        } else {
          toast.error(res?.payload?.response?.data?.message);
        }
      });
    }
    if (item?.colStreamName) {
      dispatch(deleteColStream(item.id)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Deleted", { autoClose: 1000 });
          dispatch(getColStream());
        } else {
          toast.error(res?.payload?.message, { autoClose: 1000 });
        }
      });
    }
    // if (item?.subStreamName) {
    //   dispatch(deleteSubStream(item.id)).then((res) => {
    //     if (res?.payload?.data?.success) {
    //       toast.success("Delete");
    //       dispatch(getSubStream());
    //     } else {
    //       toast.error("Error");
    //     }
    //   });
    // }
    // if (item?.colStreamName) {
    //   dispatch(deleteColStream(item.id)).then((res) => {
    //     if (res?.payload?.data?.success) {
    //       toast.success("Deleted");
    //       dispatch(getColStream());
    //     } else {
    //       toast.error("Error");
    //     }
    //   });
    // }
  };

  const handleEdit = (item) => {
    if (item.mainStreamName) {
      router.push(`/admin/streams/updatemainstream/${item.id}`);
    }
    if (item.subStreamName) {
      router.push(`/admin/streams/updatesubstream/${item.id}`);
    }
    if (item.colStreamName) {
      router.push(`/admin/streams/updatecolstream/${item.id}`);
    }
  };

  useEffect(() => {
    if (dataValue === 0) {
      const timerDebounceMainstream = setTimeout(() => {
        dispatch(getMainStream({ ...pagination, search: router.query.search }));
        return () => clearTimeout(timerDebounceMainstream)
      }, 600)
    }

    if (dataValue === 1) {
      const timerDebounceSubstream = setTimeout(() => {
        dispatch(getSubStream({ ...pagination, search: router.query.search }));
        return () => clearTimeout(timerDebounceSubstream)
      }, 600)
    }

    if (dataValue === 2) {
      const timerDebounceColstream = setTimeout(() => {
        dispatch(getColStream({ ...pagination, search: router.query.search }));
        return () => clearTimeout(timerDebounceColstream)
      }, 600)
    }
  }, [pagination, router.query.search, dataValue]);

  const onDownloadPdf = () => {
    fetch(
      `${apibasePath}mainStream/mainStreamSampleFile`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  };

  const handleUploadExcelFile = async (e) => {
    const uplodedFile = e.target.files[0];
    if (uplodedFile) {
      var formData = new FormData();
      formData.append('datafile', uplodedFile);
      await apiRequest
        .post(`mainStream/addMainStreamByExcel`, formData)
        .then((res) => {
          if (res?.data?.success) {
            dispatch(getMainStream(pagination));
            if (res?.data?.data?.length > 0) {
              toast.info('Duplicate data cannot be added!');
            } else {
              toast.success('File uploaded Successfully');
            }
          }
          // if (
          //   res?.data?.data?.result?.data[0]?.status?.toLowerCase() ===
          //   'duplicate'
          // ) {
          // } else {
          //   if (res?.payload?.data?.success) {
          // toast.success('File uploaded Successfully');
          //     dispatch(getMainStream(pagination));
          //     setShowModal(false);
          //   }
          // }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const onDownloadMainstreamSamplePdf = () => {
    fetch(`${apibasePath}mainStream/mainStreamSampleFile`).then((res) => {
      res.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleDownloadSbuStream = () => {
    fetch(
      `${apibasePath}subStream/subStreamSampleExcelFile`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }
  const handleUploadCvsFile = async (e) => {
    const uplodedFile = e.target.files[0];
    if (uplodedFile) {
      var formData = new FormData();
      formData.append('datafile', uplodedFile);
      await apiRequest
        .post(`subStream/addSubStreamDataByExcel`, formData)
        .then((res) => {
          if (res?.data?.success) {
            dispatch(getSubStream(pagination));
            if (res?.data?.data?.length > 0) {
              toast.info('Duplicate data cannot be added!');
            } else {
              toast.success('File uploaded Successfully');
            }
          }
          // if (
          //   res?.data?.data?.result?.data[0]?.status?.toLowerCase() ===
          //   'duplicate'
          // ) {
          //   toast.info('Duplicate data cannot be added!');
          // } else {
          //   if (res?.payload?.data?.success) {
          //     toast.success('File uploaded Successfully');
          //     dispatch(getSubStream(pagination));
          //   }
          // }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };
  const handleColStreamExcel = async (e) => {
    const uplodedFile = e.target.files[0];
    if (uplodedFile) {
      var formData = new FormData();
      formData.append('datafile', uplodedFile);
      await apiRequest
        .post(`colStream/addColStreamDataByExcel`, formData)
        .then((res) => {
          if (
            res?.data?.data?.result?.data[0]?.status?.toLowerCase() ===
            'duplicate'
          ) {
            toast.info('Duplicate data cannot be added!');
          } else {
            if (res?.data?.data?.result?.success) {
              toast.success('File uploaded Successfully');

              dispatch(getColStream(pagination));


            }
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };
  const handleColStreamSample = () => {
    fetch(
      `${apibasePath}colStream/colStreamSampleExcelFile`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const onDownloadSubstreamSamplePdf = () => {
    fetch(`${apibasePath}subStream/subStreamSampleExcelFile`).then((res) => {
      res.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleColstreamdownload = () => {
    fetch(
      `${apibasePath}colStream/colStreamSampleExcelFile`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const uploadColStream = async (e) => {
    const uplodedFile = e.target.files[0];
    if (uplodedFile) {
      var formData = new FormData();
      formData.append('datafile', uplodedFile);
      await apiRequest
        .post(`colStream/addColStreamDataByExcel`, formData)
        .then((res) => {
          if (res?.data?.success) {
            dispatch(getColStream(pagination));
          }
          // if (
          //   res?.data?.data?.result?.data[0]?.status?.toLowerCase() ===
          //   'duplicate'
          // ) {
          //   toast.info('Duplicate data cannot be added!');
          // } else {
          //   if (res?.payload?.data?.success) {

          //     toast.success('File uploaded Successfully');
          //     dispatch(getColStream(pagination));
          //   }
          // }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }

  const onDownloadColstreamSamplePdf = () => {
    fetch(`${apibasePath}colStream/colStreamSampleExcelFile`).then((res) => {
      res.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  return (
    <div>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 ">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll ">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        active='true'
                        onClick={() => {
                          setDataValue(stepsIndex);
                          setPagination({ ...pagination, pageNo: 1 });
                        }}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
          </Col>
          {/* <Col>
            <Pagesize setPagination={setPagination} />
          </Col> */}
        </Row>
      </div>
      {dataValue === 0 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Main Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                <label htmlFor="file-input" className="border_btn" style={{ cursor: "pointer" }}>Upload XLSX</label>
                <input
                  id="file-input"
                  className="importbtn"
                  onChange={(e) => handleUploadExcelFile(e)}
                  type="file"
                  hidden
                />
                <Button className="border_btn" onClick={onDownloadMainstreamSamplePdf}>Sample XLSX</Button>
                <Button className="border_btn" onClick={onDownloadPdf}>Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/mainstream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {mainsTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingMainTreamData ? (
                    <LoaderPage />
                  ) : mainsTreamData?.rows.length > 0 &&
                  mainsTreamData?.rows?.filter((item) => {
                    if (router.query.search && item?.mainStreamName) {
                      return item?.mainStreamName.toLowerCase().includes(router.query.search.toLowerCase())
                    }
                    return true
                  })?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_serial">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.mainStreamName}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/edit-icon-blue.png"}
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/delete-icon-blue.png"}
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {mainsTreamData && mainsTreamData.rows && mainsTreamData?.rows.length === 0 && <NoDataPage name="Mains Streams" />}
            </Row>
            {mainsTreamData?.rows && mainsTreamData?.rows.length > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={mainsTreamData}
              />)}
          </div>
        </Row>
      )}

      {dataValue === 1 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Sub Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                {/* <Button className="border_btn"></Button> */}
                <label htmlFor="file-input" className="border_btn" style={{ cursor: "pointer" }}>Upload XLSX</label>
                {/* <BiExport className="ie-icon" />{' '} */}
                {/* <span className="icon-btn">Upload XLSX</span> */}

                <input
                  id="file-input"
                  className="importbtn"
                  onChange={(e) => handleUploadCvsFile(e)}
                  type="file"
                  hidden
                />
                <Button className="border_btn" onClick={onDownloadSubstreamSamplePdf}>Sample XLSX</Button>
                <Button className="border_btn" onClick={handleDownloadSbuStream}>Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/substream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {subTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingSubStreamData ? (
                    <LoaderPage />
                  ) : subStreamData?.rows.length > 0 &&
                  subStreamData?.rows?.filter((item) => {
                    if (router.query.search && item?.subStreamName) {
                      return item?.subStreamName.toLowerCase().includes(router.query.search.toLowerCase())
                    }
                    return true
                  })?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_serial">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item.MainStream?.mainStreamName}
                        </td>
                        <td className="text-center admin_table_data">
                          {item.subStreamName}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/edit-icon-blue.png"}
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/delete-icon-blue.png"}
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {subStreamData && subStreamData.rows && subStreamData?.rows.length === 0 && <NoDataPage name="Sub Streams" />}
            </Row>
            {subStreamData?.rows && subStreamData?.rows.length > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={subStreamData}
              />)}
          </div>
        </Row>
      )}

      {dataValue === 2 && (
        <Row>
          <Row>
            <Col xl={6} lg={12} className="admin_table_header_smallscreen">
              <div className="d-flex table_heading_header">
                <h4 className="table_list_heading">Col Stream List</h4>
                <div className="enteries_input">
                  <h6 className="enteries_input_label">Show Enteries</h6>
                  <Pagesize setPagination={setPagination} />
                </div>
              </div>
            </Col>
            <Col
              xl={6}
              lg={12}
              md={12}
              className="text-end admin_table_header_smallscreen"
            >
              <div>
                <label htmlFor="file-input" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <input
                  id="file-input"
                  className="importbtn"
                  onChange={(e) => uploadColStream(e)}
                  type="file"
                  hidden
                />
                <Button className="border_btn" onClick={onDownloadColstreamSamplePdf}>Sample XLSX</Button>
                <Button className="border_btn" onClick={handleColstreamdownload}>Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("streams/colstream/add")}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr className="table_head">
                    {colTreamHeading.map((hd, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {hd}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loadingColStreamData ? (
                    <LoaderPage />
                  ) : colStreamData?.rows.length > 0 &&
                  colStreamData?.rows?.filter((item) => {
                    if (router.query.search && item?.colStreamName) {
                      return item?.colStreamName.toLowerCase().includes(router.query.search.toLowerCase())
                    }
                    return true
                  })?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center admin_table_serial">
                          {pagination.pageSize * (pagination.pageNo - 1) +
                            (index + 1)}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.SubStream?.subStreamName}
                        </td>
                        <td className="text-center admin_table_data">
                          {item.colStreamName}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/edit-icon-blue.png"}
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src={"/images/delete-icon-blue.png"}
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {colStreamData && colStreamData.rows && colStreamData?.rows.length === 0 && <NoDataPage name="Col Streams" />}
            </Row>
            {colStreamData?.rows && colStreamData?.rows.length > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={colStreamData}
              />
            )}
          </div>
        </Row>
      )}
      <DeleteModal
        show={modalShow}
        onHide={() => handleHide()}
        handleDelete={handleDelete}
        deleteItem={deleteItem}
      />
    </div>
  );
}

export default StreamsPage;
