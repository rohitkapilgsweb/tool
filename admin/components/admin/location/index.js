import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getState,
  deleteState,
  updateState,
} from "../../../redux/actions/location/createState";
import {
  deleteCity,
  getCityList,
} from "../../../redux/actions/location/createCity";
import DeleteModal from "../../modals/deleteModal";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import Pagesize from "../pagination/pagesize";
import {
  deleteCountry,
  getCountry,
} from "../../../redux/actions/location/countryList";
import LoaderPage from "../../common-components/loader";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import { apiRequest } from "../../../redux/services/api";
import { apibasePath } from "../../../config";

function LocationPage() {

  const tableHeading2 = [
    "No.",
    "Country Name",
    "State Name",
    "Status",
    "Action",
  ];
  const tableHeading1 = ["No.", "State Name", "City Name", "Status", "Action"];
  const tableHeading3 = ["No.", "Country Name", "Status", "Action"];

  const json = [
    {
      DisplayName: "City",
      key: "City",
      data: "",
      className: "",
    },
    {
      DisplayName: "State",
      key: "State",
      data: "",
      className: "",
    },
    {
      DisplayName: "Country",
      key: "Country",
      data: "",
      className: "",
    },
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [active, setActive] = useState("City");
  const [dataValue, setDataValue] = React.useState(0);

  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 100,
  });
  const cityList = useSelector((data) => data?.cityList?.cityList?.data?.data);
  const loadercityList = useSelector((data) => data?.cityList?.isLoading);

  const stateList = useSelector(
    (data) => data?.stateList?.stateList?.data?.data
  );
  const countryList = useSelector(
    (data) => data?.countrylist?.countrylist?.data?.data
  );


  useEffect(() => {
    if (dataValue === 0) {
      const timerDebounceCity = setTimeout(() => {
        dispatch(getCityList({ ...pagination, search: router.query.search }));
      }, 600)
      return () => clearTimeout(timerDebounceCity)
    }

    if (dataValue === 1) {
      const timerDebounceState = setTimeout(() => {
        dispatch(getState({ ...pagination, search: router.query.search }))
      }, 600)
      return () => clearTimeout(timerDebounceState)
    }

    if (dataValue === 2) {
      const timerDebounceCountry = setTimeout(() => {
        dispatch(getCountry({ ...pagination, search: router.query.search }));
      }, 600)
      return () => clearTimeout(timerDebounceCountry)
    }
  }, [pagination, router.query.search, dataValue]);

  const handleHide = () => {
    setModalShow(false);
  };
  const handleEdit = (item) => {
    if (item?.stateId) {
      router.push(`/admin/location/updatecity/${item?.id}`);
    }
    if (item?.countryId) {
      router.push(`/admin/location/updatestate/${item?.id}`);
    } else router.push(`/admin/location/updatecountry/${item?.id}`);
  };

  const handlecityDelete = (item) => {
    dispatch(deleteCity(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getCityList(pagination));
        toast.success("Deleted");
      } else {
        toast.error("Error");
      }
    });
  }
  const handlestateDelete = (item) => {
    dispatch(deleteState(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getState(pagination));
        toast.success("Deleted");
      } else {
        toast.error("Error");
      }
    });
  }
  const handlecountryDelete = (item) => {
    dispatch(deleteCountry(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getCountry(pagination));
        toast.success("Deleted", { autoClose: 1000 });
      } else {
        toast.error("Error");
      }
    });
  }

  const handleDelete = (item) => {
    if (item?.stateId) {
      dispatch(deleteCity(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getCityList(pagination));
          toast.success("Deleted");
        } else {
          toast.error("Error");
        }
      });
    }
    if (item?.countryId) {
      dispatch(deleteState(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getState(pagination));
          toast.success("Deleted");
        } else {
          toast.error("Error");
        }
      });
    } else {
      dispatch(deleteCountry(item?.id)).then((res) => {
        if (res?.payload?.data?.success) {
          dispatch(getCountry(pagination));
          toast.success("Deleted", { autoClose: 1000 });
        } else {
          toast.error("Error");
        }
      });
    }
  };

  const handleTab = (key, index) => {
    setActive(key);
    setDataValue(index);
  };


  const handleUploadExcelFileCity = async (e) => {
    const uplodedFile = e.target.files[0];

    if (uplodedFile) {
      var formData = new FormData();
      formData.append('datafile', uplodedFile);
      await apiRequest.post(`location/addContentByExcelCity`, formData).then((res) => {
        if (res?.data?.data?.result?.data[0]?.status?.toLowerCase() === 'duplicate') {
          toast.info('Duplicate data cannot be added!');
        } else {
          if (res?.data?.data?.result?.success) {
            toast.success('File uploaded Successfully');
            dispatch(getCityList());
            // setShowModal(false);
          }
        }
      })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }

  const downloadCsvFileCity = () => {
    fetch(`${apibasePath}location/downloadCityExcel`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const sampleCsvFileCity = () => {
    fetch(`${apibasePath}location/downloadCitySampleExcel`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleUploadExcelFileState = async (e) => {
    const uplodedFile = e.target.files[0]
    if (uplodedFile) {
      let formData = new FormData()
      formData.append('datafile', uplodedFile)
      await apiRequest.post('location/addContentByExcelState', formData).then((res) => {
        if (res?.data?.data?.result?.data[0]?.status?.toLowerCase() === 'duplicate') {
          toast.info('Duplicate data cannot be added')
        } else {
          if (res?.data?.data?.result?.success) {
            toast.success('File uploaded Successfully')
            dispatch(getState())
          }
        }
      }).catch((error) => {
        toast.error(error?.message)
      })
    }
  }

  const downloadCsvFileState = () => {
    fetch(`${apibasePath}location/downloadStateExcel`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const sampleCsvFileState = () => {
    fetch(`${apibasePath}location/downloadStateSampleExcel`).then((res) => {
      res.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleUploadExcelFileCountry = async (e) => {
    const uplodedFile = e.target.files[0]
    if (uplodedFile) {
      let formData = new FormData()
      formData.append('datafile', uplodedFile)
      await apiRequest.post('location/addContentByExcelCountry', formData).then((response) => {
        if (res?.data?.data?.result?.data[0]?.status?.toLowerCase() === 'duplicate') {
          toast.info('Duplicate data cannot be added')
        } else {
          if (res?.data?.data?.result?.success) {
            toast.success('File uploaded Successfully')
            dispatch(getCountry())
          }
        }
      }).catch((error) => {
        toast.error(error?.message)
      })
    }
  }

  const downloadCsvFileCountry = () => {
    fetch(`${apibasePath}location/downloadCountryExcel`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const sampleCsvFileCountry = () => {
    fetch(`${apibasePath}location/downloadCountrySampleExcel`).then((res) => {
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
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0">
            <div className="d-flex table_heading_header p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav tabs_scroll">
                  {json &&
                    json?.map((steps, stepsIndex) => (
                      <li className="nav-item" key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                            }`}
                          active='true'
                          onClick={() => {
                            handleTab(steps.key, stepsIndex);
                            setPagination({ ...pagination, pageNo: 1 });
                          }}
                        >
                          {steps.DisplayName}
                        </a>
                      </li>
                    ))}
                </ul>
              </ScrollingCarousel>
              <div className="enteries_input user_lead_entery_input location_enteries hide_btn_row">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Pagesize setPagination={setPagination} />
              </div>
            </div>
          </Col>

          <Col xl={6} lg={12} md={12} className="text-end p-0 hide_btn_row">
            {dataValue === 0 && (
              <div className="city_state_btn_margin">
                <Button className="border_btn" onClick={() => router.push("location/addcity")} > Add New City</Button>
                <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileCity(e)} hidden />
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <Button className="border_btn" onClick={downloadCsvFileCity}>Download XLSX</Button>
                <Button className="border_btn" onClick={sampleCsvFileCity}>sample XLSX</Button>
              </div>
            )}
            {dataValue === 1 && (
              <div className="city_state_btn_margin">
                <Button className="border_btn" onClick={() => router.push("location/addstate")}>Add New State</Button>
                <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileState(e)} hidden />
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <Button className="border_btn" onClick={sampleCsvFileState}>Download XLSX</Button>
                <Button className="border_btn" onClick={downloadCsvFileState}>sample XLSX</Button>
              </div>
            )}
            {dataValue === 2 && (
              <div className="city_state_btn_margin">
                <Button className="border_btn" onClick={() => router.push("location/addcountry")}>Add New Country</Button>
                <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileCountry(e)} hidden />
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upld XLSX</label>
                <Button className="border_btn" onClick={downloadCsvFileCountry}>Download XLSX</Button>
                <Button className="border_btn" onClick={sampleCsvFileCountry}>sample XLSX</Button>
              </div>
            )}
          </Col>
        </Row>
      </div>


      <div className="admin_table">
        {dataValue === 0 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading1 &&
                    tableHeading1?.map((i, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {i}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {loadercityList ? (
                  <LoaderPage />
                ) : (
                  cityList?.rows && cityList?.rows.length > 0 &&
                  cityList?.rows?.filter((item) => {
                    if (router.query.search && item?.name) {
                      return item?.name.toLowerCase().includes(router.query.search.toLowerCase())
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
                          {item?.State?.state}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatecity/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
                            onClick={() => {
                              setModalShow(true);
                              setDeleteItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
            {cityList && cityList.rows && cityList.rows.length === 0 && <NoDataPage name="Cities" />}
            {cityList && cityList.rows && cityList.rows.length !== 0 &&
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={cityList}
              />
            }
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlecityDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 1 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading2 &&
                    tableHeading2?.map((i, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {i}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {stateList?.rows && stateList?.rows.length > 0 &&
                  stateList?.rows?.filter((item) => {
                    if (router.query.search && item?.state) {
                      return item?.state.toLowerCase().includes(router.query.search.toLowerCase())
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
                          {item?.Countries?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.state}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatestate/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
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
            {stateList?.rows && stateList?.rows.length === 0 && <NoDataPage name="States" />}
            {stateList?.rows && stateList?.rows.length !== 0 &&
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={stateList}
              />}
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlestateDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {dataValue === 2 && (
          <>
            <Table responsive className="admin_table" bordered hover>
              <thead>
                <tr>
                  {tableHeading3 &&
                    tableHeading3?.map((i, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {i}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {countryList?.rows && countryList?.rows.length > 0 &&
                  countryList?.rows?.filter((item) => {
                    if (router.query.search && item?.name) {
                      return item?.name.toLowerCase().includes(router.query.search.toLowerCase())
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
                          {item?.name}
                        </td>
                        <td className="text-center admin_table_data">
                          {item?.active === true ? "Active" : "Inactive"}
                        </td>
                        <td className="text-center admin_table_data no_wrap_no">
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/edit-icon-blue.png"
                            onClick={() => router.push(`/admin/location/updatecountry/${item?.id}`)}
                          />
                          <img
                            className="mx-1 admin_table_action_icon"
                            src="/images/delete-icon-blue.png"
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
            {countryList && countryList.rows && countryList?.rows.length === 0 && <NoDataPage name="Countries" />}
            {countryList && countryList.rows && countryList?.rows.length !== 0 &&
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                list={countryList}
              />
            }
            <DeleteModal
              show={modalShow}
              onHide={() => handleHide()}
              handleDelete={handlecountryDelete}
              deleteItem={deleteItem}
            />
          </>
        )}
        {/* <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        /> */}
      </div>
    </>
  );
}

export default LocationPage;
