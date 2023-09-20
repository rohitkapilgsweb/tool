import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import DeleteModal from "../../modals/deleteModal";
import {
  deleteIndustry,
  deleteSector,
  getIndustryList,
  getlistSector,
} from "../../../redux/actions/organisation/addsector";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "../../common-components/loader";
import {
  addOrganisation,
  deleteOrganisation,
  getOrganisationlist,
} from "../../../redux/actions/organisation/addorganisation";
import Image from "next/image";
import { apibasePath } from "../../../config";
import Pagination from "../pagination/pagination";
import Pagesize from "../pagination/pagesize";
import { toast } from "react-toastify";
import { getRole } from "../../utils/index";
import {
  deleteFamilycode,
  deleteProfessioncode,
  familycodeList,
  professioncodeList,
  professionlist,
  deleteProfession,
} from "../../../redux/actions/organisation/profession";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import NoDataPage from "../../common-components/NoDataPage/NoDataPage";
import { apiRequest } from "../../../redux/services/api";
import * as XLSX from "xlsx"
import { getState } from "../../../redux/actions/location/createState";
import { getCityList } from "../../../redux/actions/location/createCity";
import { typeOfCompany, natureOfBuisness, companylevel, organisationType, companySize } from "../../utils/allJson";

function Organisation() {
  const headerTabs = [{ name: "Companies", key: 'companies' }, { name: "Professions", key: 'profession' }];
  const subHeaderTabs = [
    { name: "Sector", key: 'sector', showFor: 'companies' },
    { name: "Industry", key: 'industry', showFor: 'companies' },
    { name: "Companies", key: 'companies', showFor: 'companies' },
    { name: "Family code", key: 'familyCode', showFor: 'profession' },
    { name: "Profession Code", key: 'professionCode', showFor: 'profession' },
    { name: "Profession list", key: 'profession', showFor: 'profession' }]

  const sectorheading = ["No.", "Sector", "Action"];
  const industryheading = ["No.", "Industry", "Action"];
  const Heading = ["S.No.", "Image", "Logo", "Name", "City", "State", "Company level", "Action",];
  const professionHeading = ["S.No.", "family/profession", "Also called", "Prep Level", "Action",];
  const familyCodeTablehead = ["Sr. no", "Family Name", "Family Code", "Action",];
  const professionCodeTablehead = ["Sr. no", "Profession Name", "Profession Code", "Action",];

  const router = useRouter();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 10, });
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [header, setHeader] = useState(headerTabs[0].key);
  const [subHeader, setSubHeader] = useState(subHeaderTabs[0].key);

  const handleHide = () => {
    setModalShow(false);
  };
  const isLoading = useSelector(state => state.sectorData.isLoading)
  const getSectorList = useSelector((state) => state?.sectorData?.sectorlist);
  const organisationlist = useSelector(state => state?.sectorData?.organisationList);
  const industrylist = useSelector(state => state?.sectorData?.industrylist);
  const familycodelist = useSelector(state => state?.sectorData?.familyCodelist);
  const professioncodelist = useSelector(state => state?.sectorData?.professionCodeList);
  const professionList = useSelector(state => state?.sectorData?.professionList);

  const tabData = {
    sector: {
      forList: () => dispatch(getlistSector({...pagination, search : router.query.search})), list: getSectorList?.rows, tableHeadings: sectorheading
    },
    industry: {
      forList: () => dispatch(getIndustryList({...pagination, search : router.query.search})), list: industrylist?.rows, tableHeadings: industryheading,
    },
    companies: {
      forList: () => dispatch(getOrganisationlist({...pagination, search : router.query.search})), list: organisationlist?.rows, tableHeadings: Heading,
    },
    familyCode: {
      forList: () => dispatch(familycodeList({...pagination, search : router.query.search})), list: familycodelist?.rows, tableHeadings: familyCodeTablehead,
    },
    professionCode: {
      forList: () => dispatch(professioncodeList({...pagination, search : router.query.search})), list: professioncodelist?.rows, tableHeadings: professionCodeTablehead,
    },
    profession: {
      forList: () => dispatch(professionlist({...pagination, search : router.query.search})), list: professionList?.rows, tableHeadings: professionHeading, editRoute: () =>
        router.push(
          `organisation/profession/update/${item?.id}`
        )
    },
  }

  useEffect(() => {
    if (subHeader) tabData[subHeader].forList()
  }, [subHeader, pagination, router.query.search])

  const handleDelete = (item, type) => {
    switch (type) {
      case 'sector': {
        dispatch(deleteSector(item.id)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 })
            dispatch(getlistSector(pagination));
          }
        });
        break;
      }
      case 'industry': {
        dispatch(deleteIndustry(item.id)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 })
            dispatch(getIndustryList(pagination));
          }
        });
        break;
      }
      case 'companies': {
        dispatch(deleteOrganisation(Number(item.id))).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 });
            dispatch(getOrganisationlist(pagination));
          } else {
            toast.error("Error", { autoClose: 1000 });
          }
        });
        break;
      }
      case 'familyCode': {
        dispatch(deleteFamilycode(item?.id)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 })
            dispatch(familycodeList(pagination));
          }
        });
        break;
      }
      case 'professionCode': {
        dispatch(deleteProfessioncode(item?.id)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 })
            dispatch(professioncodeList(pagination));
          }
        });
        break;
      }
      case 'profession': {
        dispatch(deleteProfession(item.id)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Deleted", { autoClose: 1000 })
            dispatch(professionlist(pagination));
          }
        });
        break;
      }
      default: return null
    }
  }

  const handleMenu = (key) => {
    const subHeaderkey = subHeaderTabs.find(item => item.showFor == key)
    setHeader(key)
    setSubHeader(subHeaderkey?.key)
  }

  const tableRows = (type, item, index) => {
    switch (type) {
      case 'sector': {
        return (
          <tr key={index}>
            <td className="text-center admin_table_serial">
              {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
            </td>
            <td className="text-center admin_table_data">
              {item.name}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src={"/images/edit-icon-blue.png"}
                onClick={() => router.push(`/admin/organisation/sector/update/${item.id}`)}
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
        )
      }
      case 'industry': {
        return (
          <tr key={index}>
            <td className="text-center admin_table_serial">
              {pagination.pageSize * (pagination.pageNo - 1) + (index + 1)}
            </td>
            <td className="text-center admin_table_data">
              {item.name}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src={"/images/edit-icon-blue.png"}
                onClick={() => router.push(`/admin/organisation/industry/update/${item.id}`)}
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
        )
      }
      case 'companies': {
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
                src={item?.companyCover ? `${apibasePath}documents/organisation/${item?.companyCover}` : ""}
              />
            </td>
            <td className="text-center admin_table_data">
              <Image
                height={75}
                width={75}
                // className="college_card_img img-fluid"
                alt=""
                src={item?.companyLogo ? `${apibasePath}documents/organisation/${item?.companyLogo}` : ""}
              />
            </td>
            <td className="text-center admin_table_data">
              {item?.OrganisationCompany?.companyName}
            </td>
            <td className="text-center admin_table_data">
              {item?.Cities?.name}
            </td>
            <td className="text-center admin_table_data">
              {item?.States?.state}
            </td>
            <td className="text-center admin_table_data">
              {item?.CompanyLevel.length > 0 &&
                item?.CompanyLevel[0]?.companyLevel}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src="/images/edit-icon-blue.png"
                onClick={() => router.push(`/admin/organisation/company/update/${item.id}`)}
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
        )
      }
      case 'familyCode': {
        return (
          <tr key={index}>
            <td className="text-center admin_table_data">
              {pagination.pageSize * (pagination.pageNo - 1) +
                (index + 1)}
            </td>
            <td className="text-center admin_table_data">
              {item?.familyName}
            </td>
            <td className="text-center admin_table_data">
              {item?.familyCode}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src="/images/edit-icon-blue.png"
                onClick={() => router.push(`/admin/organisation/familycode/update/${item?.id}`)} />
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
        )
      }
      case 'professionCode': {
        return (
          <tr key={index}>
            <td className="text-center admin_table_data">
              {pagination.pageSize *
                (pagination.pageNo - 1) +
                (index + 1)}
            </td>
            <td className="text-center admin_table_data">
              {item?.professionName}
            </td>
            <td className="text-center admin_table_data">
              {item?.professionCode}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src="/images/edit-icon-blue.png"
                onClick={() => router.push(`/admin/organisation/professioncode/update/${item?.id}`)}
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
        )
      }
      case 'profession': {
        return (
          <tr key={index}>
            <td className="text-center admin_table_data">
              {pagination.pageSize * (pagination.pageNo - 1) +
                (index + 1)}
            </td>
            <td className="text-center admin_table_data">
              {item?.ProfessionCode ? (
                <>
                  {`${item?.ProfessionCode?.FamilyCode?.familyCode}.${item?.ProfessionCode?.professionCode}`}{" "}
                  - {item?.ProfessionCode?.professionName}
                </>
              ) : (
                <>
                  {`${item?.FamilyCode?.familyCode}.0000`} -{" "}
                  {item?.FamilyCode?.familyName}
                </>
              )}
            </td>
            <td className="text-center admin_table_data">
              {item?.alsoCalled}
            </td>
            <td className="text-center admin_table_data">
              {item?.prepLevel}
            </td>
            <td className="text-center admin_table_data">
              <img
                className="mx-1 admin_table_action_icon"
                src="/images/edit-icon-blue.png"
                onClick={() => router.push(`organisation/profession/update/${item?.id}`)}
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
        )
      }
      default: return null
    }
  }
  const handleRoutes = (type) => {
    router.push(`organisation/${type.toLowerCase()}/add`)
  }

  const downloadSectorXlsx = () => {
    fetch(`${apibasePath}organisation/sectorDataFileDownload`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleUploadExcelFileSector = async (e) => {
    const uplodedFile = e.target.files[0]
    if (uplodedFile) {
      let formData = new FormData()
      formData.append('datafile', uplodedFile)
      await apiRequest.post('organisation/addScetorDataByExcel', formData).then((res) => {
        if (res?.data?.data?.result?.data[0]?.status?.toLowerCase() === 'duplicate') {
          toast.info('Duplicate data cannot be added')
        } else {
          if (res?.data?.data?.result?.success) {
            toast.success('File uploaded Successfully')
            dispatch(getlistSector())
          }
        }
      }).catch((error) => {
        toast.error(error?.message)
      })
    }
  }

  const sampleSectorXlsx = () => {
    fetch(`${apibasePath}organisation/sectorSampleFileDownload`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const handleUploadExcelFileIndustry = async (e) => {
    const uplodedFile = e.target.files[0]
    if (uplodedFile) {
      let formData = new FormData()
      formData.append('datafile', uplodedFile)
      await apiRequest.post('organisation/addIndustryDataByExcel', formData).then((res) => {
        if (res?.data?.data?.result?.data[0]?.status?.toLowerCase() === 'duplicate') {
          toast.info('Duplicate data cannot be added')
        } else {
          if (res?.data?.data?.result?.success) {
            toast.success('File uploaded Successfully')
            dispatch(getIndustryList())
          }
        }
      }).catch((error) => {
        toast.error(error?.message)
      })
    }
  }

  const downloadIndustryXlsx = () => {
    fetch(`${apibasePath}organisation/industryDataFileDownload`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  const sampleIndustryXlsx = () => {
    fetch(`${apibasePath}organisation/industrySampleFileDownload`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = Date.now()
        a.click()
      })
    })
  }

  //profession file

  const handleProfessionFile = (files) => {
    let selectedFile = files[0]
    if (selectedFile) {
      // if(selectedFile&&fileType.includes(selectedFile.type)){
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = ((e) => {
        // setExcelFileError(null)
        const workbook = XLSX.read(e.target.result, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data, 'ggggggggggggg')
        data.map((item) => {
          if (item[`Choose Family/Profession`] === "Family") {
            // 1120  - Managing Directors and Chief Executives
            let courses = item[`Eligibility`]
            let familydata = {
              familyId: item[`Family Name`].split('-')[1].trim(),
              // professionId: "",
              alsoCalled: item[`Also Called`],
              prepLevel: item[`Prep Level`],
              highDemandOfProfession: item[`Profession Demand`],
              // courseId: "",
            }
          } if (item[`Choose Family/Profession`] === "Profession") {
            let professiondata = {
              familyId: item[`Family Name`].split('-')[1].trim(),
              professionId: item[`Profession Name`].split('-')[1].trim(),
              alsoCalled: item[`Also Called`],
              prepLevel: item[`Prep Level`],
              highDemandOfProfession: item[`Profession Demand`],
              // courseId: "",
            }
          }
        })
      })
    }
  }

  //company excel upload

  const handleOrgExcelupload = async (files) => {
    const selectedFile = files[0];
    
    if (!selectedFile) return;
  
    try {
      const stateList = {};
      const cityList = {};
      const sectorList = {};
      const industryList = {};
  
      await Promise.all([
        dispatch(getState({ pageNo: 1, pageSize: 100 })).then((res) => {
          if (res?.payload?.data?.success) {
            res.payload.data.data.rows.map((item) => {
              stateList[item.state?.toUpperCase()] = item.id;
            });
          }
        }),
  
        dispatch(getCityList({ pageNo: 1, pageSize: 1000 })).then((res) => {
          if (res?.payload?.data?.success) {
            res.payload.data.data.rows.map((item) => {
              cityList[item.name?.toUpperCase()] = item.id;
            });
          }
        }),
  
        dispatch(getlistSector({ pageNo: 1, pageSize: 300 })).then((res) => {
          if (res?.payload?.data?.data?.rows) {
            res.payload.data.data.rows.map((item) => {
              sectorList[item.name?.toUpperCase()] = item.id;
            });
          }
        }),
  
        dispatch(getIndustryList({ pageNo: 1, pageSize: 300 })).then((res) => {
          if (res?.payload?.data?.data?.rows) {
            res.payload.data.data.rows.map((item) => {
              industryList[item.name?.toUpperCase()] = item.id;
            });
          }
        }),
      ]);
  
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        const orgData = {
          payload: data.map((item) => ({
            orgCatgeory: item['Organisation Category'],
            groupId: item['Group Name'],
            brandId: item['Enter/Select 1 Brand Name'],
            companyId: item['Enter/select Company Name'],
            streetAddress: item['Street Address'],
            plotNumber: item['Plot No.'],
            typeOfCompany: item['Type of Company'],
            companySize: item["Company's Size"],
            establishedYear: item['Established Year'],
            webSite: item['Website'],
            competitors: item['Competitors'],
            headOffice: item['It is a Head Office'],
            stateId: stateList[item['State']?.toUpperCase()] || null,
            cityId: cityList[item['City']?.toUpperCase()] || null,
            contactNumber: item['Contact No.'],
            email: item['Email Id'],
            sector: (item['Select Sector'] || '').split(',').map(ele => ({ sectorId: sectorList[ele.trim()] })),
            industry: (item['Select Industry'] || '').split(',').map(ele => ({ industryId: industryList[ele.trim()] })),
            levelOfCompany: (item['Company Level'] || '').split(',').map(ele => ({ companyLevel: ele.trim() })),
            businessNature: (item['Nature of Business'] || '').split(',').map(ele => ({ natureOfBusiness: ele.trim() })),
          })),
        };
  
        const formData = new FormData();
        formData.append('organisationData', JSON.stringify(orgData));
  
        dispatch(addOrganisation(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success('Organisation Added');
          } else {
            toast.error('Error');
          }
        });
      };
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 ">
            <div className="tab_drop_justify">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav  ">
                  {headerTabs &&
                    headerTabs?.map((steps, stepsIndex) => (
                      <li className="nav-item " key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${header === steps.key && "head-active"
                            }`}
                          active='true'
                          onClick={() => {
                            handleMenu(steps.key)
                          }}
                        >
                          {steps.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </ScrollingCarousel>
              <div className="enteries_input mt-0">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Pagesize setPagination={setPagination} />
              </div>
            </div>
          </Col>
          <Col xl={6} lg={12} md={12} className="text-end admin_table_header_smallscreen hide_btn_row">

            {subHeader === "companies" && header === 'companies' &&
              <div>
                <Button className="border_btn green" onClick={() => router.push("organisation/company/add")} > Add New </Button>
                <input type="file" id='actual-btn' onChange={(e) => handleOrgExcelupload(e.target.files)} hidden />
                <label htmlFor="actual-btn" className="border_btn" style={{ cursor: 'pointer' }}>Upload XLSX</label>
                <Button className="border_btn">Download XLSX</Button>
              </div>
            }
            {header === 'companies' && subHeader === 'sector' &&
              < div >
                <Button className="border_btn" onClick={() => router.push("organisation/sector/add")} > Add new sector </Button>
                <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileSector(e)} hidden />
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <Button className="border_btn" onClick={downloadSectorXlsx}>Dwnld XLSX</Button>
                <Button className="border_btn" onClick={sampleSectorXlsx}>sample XLSX</Button>
              </div>
            }
            {header === 'companies' && subHeader === 'industry' &&
              < div >
                <Button className="border_btn" onClick={() => router.push("organisation/industry/add")} > Add new indus.</Button>
                <input type="file" id="actual-btn" onChange={(e) => handleUploadExcelFileIndustry(e)} hidden />
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <Button className="border_btn" onClick={downloadIndustryXlsx}>Dwnld XLSX</Button>
                <Button className="border_btn" onClick={sampleIndustryXlsx}>sample XLSX</Button>
              </div>
            }
            {header === 'profession' &&
              <div>
                <label htmlFor="actual-btn" style={{ cursor: "pointer" }} className="border_btn">Upload XLSX</label>
                <input type="file" id='actual-btn' onChange={(e) => handleProfessionFile(e.target.files)} hidden />
                <Button className="border_btn">Download XLSX</Button>
                <Button className="border_btn" onClick={() => handleRoutes(subHeader)}> Add New </Button>
              </div>
            }
          </Col >
        </Row >
      </div >
      <Row>
        <Col
          xl={12}
          className="text-end  display_btn_row"
        >
          {
            subHeader === "companies" ?
              header === 'companies' &&
              <div>
                <Button className="border_btn">Upload XLSX</Button>
                <Button className="border_btn">Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("organisation/company/add")}
                >
                  Add New
                </Button>
              </div>
              : header === 'companies' &&
              < div >
                <Button
                  className="border_btn"
                  onClick={() => router.push("organisation/sector/add")}
                >
                  Add new sector
                </Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("organisation/industry/add")}
                >
                  Add new industry
                </Button>
              </div>
          }
          {header === 'profession' &&
            <div>
              <Button className="border_btn">Upload XLSX</Button>
              <Button className="border_btn">Download XLSX</Button>
              <Button
                className="border_btn green"
                onClick={() =>
                  handleRoutes(subHeader)
                }
              >
                Add New
              </Button>
            </div>
          }
        </Col>
      </Row>
      <ScrollingCarousel show={5.5} slide={4} swiping={true}>
        <ul className="nav mt-2">
          {subHeaderTabs.map((item, index) => {
            if (item.showFor === header)
              return (
                <li
                  key={index}
                  onClick={() => setSubHeader(item.key)}
                  className={`border_tabs_padding border_btn_tabs mobile_font_12 ${item.key === subHeader && "active_btn_tabs"}`}
                >
                  {item.name}
                </li>
              );
          })}
        </ul>
      </ScrollingCarousel>
      {/* {isLoading && <LoaderPage />} */}
      {subHeader && tabData[subHeader] && (
        <>
          <div className="admin_stream_table">
            <Row>
              <Table responsive className="admin_table" bordered hover>
                <thead>
                  <tr>
                    {tabData[subHeader] && tabData[subHeader]?.tableHeadings.map((tableHead, index) => {
                      return (
                        <th className="table_head" key={index}>
                          {tableHead}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {subHeader && tabData[subHeader] && tabData[subHeader].list &&
                    tabData[subHeader].list.length > 0 && tabData[subHeader].list.filter((item) => {
                      if (router.query.search && item?.name) {
                        return item?.name.toLowerCase().includes(router.query.search.toLowerCase())
                      }
                      if (router.query.search && item?.OrganisationCompany?.companyName) {
                        return item?.OrganisationCompany?.companyName.toLowerCase().includes(router.query.search.toLowerCase())
                      }
                      if (router.query.search && item?.familyName) {
                        return item?.familyName.toLowerCase().includes(router.query.search.toLowerCase())
                      }
                      if (router.query.search && item?.professionName) {
                        return item?.professionName.toLowerCase().includes(router.query.search.toLowerCase())
                      }
                      if (router.query.search && item?.alsoCalled) {
                        return item?.alsoCalled.toLowerCase().includes(router.query.search.toLowerCase())
                      }
                      return true
                    })?.map((item, index) => tableRows(subHeader, item, index))}
                </tbody>
              </Table>
              {subHeader && tabData[subHeader] && tabData[subHeader].list &&
                tabData[subHeader].list.length === 0 && <NoDataPage />}
            </Row>
          </div>
          {subHeader && tabData[subHeader] && tabData[subHeader].list &&
            tabData[subHeader].list.length !== 0 && (
              <div className="admin_table_footer">
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  list={tabData[subHeader].list}
                />
              </div>
            )}
        </>
      )}
      <DeleteModal
        show={modalShow}
        onHide={() => handleHide()}
        handleDelete={handleDelete}
        deleteItem={deleteItem}
        subHeader={subHeader}
      />
    </>
  );
}

export default Organisation;
