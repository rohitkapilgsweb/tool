import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import {
  getlistSector,
  getIndustryList,
} from "../../../redux/actions/organisation/addsector";
import { getState } from "../../../redux/actions/location/createState";
import { cityDropdown } from "../../../redux/actions/location/createCity";
import { useRouter } from "next/router";
import {
  addOrganisation,
  companyBrandList,
  companyGroupList,
  companyNameList,
  getOrganisationbyid,
  updateOrganisation,
} from "../../../redux/actions/organisation/addorganisation";
import { toast } from "react-toastify";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import LoaderPage from "../../common-components/loader";
import { wordToJSON } from "../../../utils/helper";
import { typeOfCompany, natureOfBuisness, companylevel, organisationType, companySize, cms } from "../../utils/allJson";
import he from 'he'

const CKeditorGenerator = dynamic(() => import("../Ckeditor/CKeditor"), {
  ssr: false,
});

function AddOrganisation() {
  const [dataValue, setDataValue] = useState(0);
  const [filestate, setFilestate] = useState({
    companycover: "",
    companyLogo: "",
  });

  const [selectSectorids, setSelectSectorids] = useState({ sectorId: [] });
  const FormSteps = ["Register", "CMS"];
  const router = useRouter();
  const { Id } = router.query;
  const dispatch = useDispatch();

  const orgdata = useSelector((state) => {
    if (state?.sectorData?.organisation?.rows?.length > 0) {
      return state?.sectorData?.organisation?.rows[0];
    }
  });

  const isLoading = useSelector((state) => state.sectorData.isLoading);

  const [CompanyCMS, setCompanyCMS] = useState(cms[0].key);

  let payload = {}

  const handlewordupload = (e) => {
    wordToJSON(e[0]).then((res) => {
      let data = res?.value?.split("<p>**********</p>");
      payload = {
        CMS: {
          companyAddress: he.unescape(data[0]),
          testimonials: he.unescape(data[1]),
          csr: he.unescape(data[2]),
          clients: he.unescape(data[3]),
          awardsAndRecognisations: he.unescape(data[4]),
          department: he.unescape(data[5]),
          cultureAndValues: he.unescape(data[6]),
          glance: he.unescape(data[7]),
        }
      }
    })
  }

  let tempValues = {}

  const handleSubmit = (values) => {
    tempValues = { ...values };
    if (dataValue === 0) {
      setDataValue(1);
    } else {
      if (Id) {
        var formData = new FormData();
        if (filestate.companycover) {
          formData.append("companyCoverFile", filestate.companycover);
        }
        if (filestate.companyLogo) {
          formData.append("companyLogoFile", filestate.companyLogo);
        }

        if (payload.CMS !== undefined) {
          tempValues.CMS = payload.CMS[0];
        } else {
          tempValues.CMS = values.CMS[0];
        }
        // tempValues.CMS = values.CMS
        tempValues.groupId = values.groupId.value;
        tempValues.brandId = values.brandId.value;
        tempValues.companyId = values.companyId.value;

        // delete tempValues.cms;

        formData.append("organisationData", JSON.stringify(tempValues));
        dispatch(updateOrganisation(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            router.push("/admin/organisation");
            toast.success("updated");
          } else {
            toast.error("error");
          }
        });
      } else {
        let data = { payload: [], CMS: {} };
        data.CMS = tempValues.cms;
        // delete tempValues.cms;
        data.payload[0] = values;
        data.payload[0].brandId = values.brandId.value;
        data.payload[0].groupId = values.groupId.value;
        data.payload[0].companyId = values.companyId.value;

        var formData = new FormData();
        formData.append("organisationData", JSON.stringify(data));
        formData.append("companyLogoFile", filestate.companyLogo);
        formData.append("companyCoverFile", filestate.companycover);

        dispatch(addOrganisation(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Organisation Added");
            router.push("/admin/organisation");
          } else {
            toast.error("error");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (Id) {
      dispatch(getOrganisationbyid(Id));
    }
    dispatch(getlistSector());
    // dispatch(getIndustryList(selectSectorids));
    dispatch(getIndustryList());
    dispatch(getState());
    dispatch(cityDropdown(""));
    dispatch(companyGroupList());
    dispatch(companyBrandList());
    dispatch(companyNameList());
  }, [Id, selectSectorids]);

  const handleCityList = (e) => {
    dispatch(cityDropdown({ stateId: e.target.value }));
  };

  const handleSectorSelect = (e, values) => {
    // let x = selectSectorids;
    // if (!x.sectorId.includes(Number(e.target.value))) {
    //   x.sectorId.push(Number(e.target.value));
    // }
    // setSelectSectorids(x);
    // dispatch(getIndustryList(selectSectorids));
  };

  const handleSectorremove = (values, Id) => {
    let x = [];
    values.sector.map((item) => {
      if (Id.sectorId == item.sectorId) {
        x.push(item);
      }
    });
    if (x.length === 1) {
      let y = selectSectorids;
      let index = y.sectorId.indexOf(Number(Id.sectorId));
      y.sectorId.splice(index, 1);
      setSelectSectorids(y);
      dispatch(getIndustryList(selectSectorids));
    }
  };

  const sectorlist = useSelector((data) => data?.sectorData?.sectorlist?.rows);
  const industrylist = useSelector(
    (data) => data?.sectorData?.industrylist?.rows
  );
  const statelist = useSelector(
    (data) => data?.stateList?.stateList?.data?.data?.rows
  );
  const citylist = useSelector(
    (data) => data?.cityList?.cityList?.data?.result
  );
  const companynamelist = useSelector(
    (data) => data?.sectorData?.companyNamelist
  );
  const grouplist = useSelector((data) => data?.sectorData?.grouplist);
  const brandnamelist = useSelector((data) => data?.sectorData?.brandlist);

  const handleFileChange = (filesObject, name) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);

    file["nameType"] = name;

    if (name === "logo") {
      setFilestate({
        ...filestate,
        companyLogo: file,
      });
    }
    if (name === "cover") {
      setFilestate({
        ...filestate,
        companycover: file,
      });
    }
  };

  const init = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    let initialValues = {};
    if (Id) {
      initialValues = {
        id: Id,
        orgCatgeory: orgdata?.orgCatgeory,
        groupId: {
          value: orgdata?.OrganisationGroup?.id,
          label: orgdata?.OrganisationGroup?.groupName,
        },
        industryId: orgdata?.industryId,
        brandId: {
          value: orgdata?.OrganisationBrand?.id,
          label: orgdata?.OrganisationBrand?.brandName,
        },
        companyId: {
          value: orgdata?.OrganisationCompany?.id,
          label: orgdata?.OrganisationCompany?.companyName,
        },
        companyLevel: orgdata?.companyLevel,
        streetAddress: orgdata?.streetAddress,
        plotNumber: orgdata?.plotNumber,
        natureOfBuisness: orgdata?.natureOfBuisness,
        typeOfCompany: orgdata?.typeOfCompany,
        companySize: orgdata?.companySize,
        establishedYear: orgdata?.establishedYear,
        webSite: orgdata?.webSite,
        competitors: orgdata?.competitors,
        headOffice: orgdata?.headOffice,
        stateId: orgdata?.stateId,
        cityId: orgdata?.cityId,
        contactNumber: orgdata?.contactNumber,
        email: orgdata?.email,
        yourRole: orgdata?.yourRole,

        CMS: [
          {
            id: orgdata?.OrganisationCMS[0]?.id,
            companyAddress: orgdata?.OrganisationCMS[0]?.companyAddress,
            testimonials: orgdata?.OrganisationCMS[0]?.testimonials,
            csr: orgdata?.OrganisationCMS[0]?.csr,
            clients: orgdata?.OrganisationCMS[0]?.clients,
            awardsAndRecognisations:
              orgdata?.OrganisationCMS[0]?.awardsAndRecognisations,
            department: orgdata?.OrganisationCMS[0]?.department,
            cultureAndValues: orgdata?.OrganisationCMS[0]?.cultureAndValues,
            glance: orgdata?.OrganisationCMS[0]?.glance,
          },
        ],
      };

      initialValues.sector = orgdata?.orgSector?.map((item, index) => {
        return {
          sectorId: item?.Sector?.id,
          organisationId: Number(Id),

          id: item?.id,
        };
      });

      initialValues.industry = orgdata?.orgIndustry?.map((item, index) => {
        return {
          industryId: item?.Industry?.id,
          organisationId: Number(Id),

          id: item?.id,
        };
      });

      initialValues.levelOfCompany = orgdata?.CompanyLevel?.map(
        (item, index) => {
          return {
            companyLevel: item?.companyLevel,
            organisationId: Number(Id),

            id: item?.id,
          };
        }
      );

      initialValues.businessNature = orgdata?.BusinessNature?.map(
        (item, index) => {
          return {
            natureOfBusiness: item?.natureOfBusiness,
            organisationId: Number(Id),

            id: item?.id,
          };
        }
      );
    } else {
      initialValues = {
        orgCatgeory: "",
        groupId: "",
        sector: [{ sectorId: "" }],
        industry: [{ industryId: "" }],
        brandId: "",
        companyId: "",
        levelOfCompany: [{ companyLevel: "" }],
        businessNature: [{ natureOfBusiness: "" }],
        typeOfCompany: "",
        companySize: "",
        establishedYear: "",
        webSite: "",
        competitors: "",
        headOffice: null,
        stateId: "",
        cityId: "",
        plotNumber: "",
        streetAddress: "",
        contactNumber: "",
        email: "",
        yourRole: "",
        CMS: [
          {
            companyAddress: "",
            testimonials: "",
            csr: "",
            clients: "",
            awardsAndRecognisations: "",
            department: "",
            cultureAndValues: "",
            glance: "",
          },
        ],
      };
    }
    return initialValues;
  };

  const validate = (values) => {
    let industryerror = {};
    let industryitemArray = [];
    let sectorerror = {};
    let sectoritemArray = [];
    let levelerror = {};
    let levelitemArray = [];
    let natureerror = {};
    let natureitemArray = [];
    let errors = {};
    if (dataValue === 0) {
      if (!values.orgCatgeory || !values.orgCatgeory === "") {
        errors["orgCatgeory"] = "*";
      }
      if (!values.groupId || !values.groupId === "") {
        errors["groupId"] = "*";
      }
      if (!values.brandId || !values.brandId === "") {
        errors["brandId"] = "*";
      }
      if (!values.companyId || !values.companyId === "") {
        errors["companyId"] = "*";
      }
      if (!values.typeOfCompany || !values.typeOfCompany === "") {
        errors["typeOfCompany"] = "*";
      }
      if (!values.companySize || !values.companySize === "") {
        errors["companySize"] = "*";
      }
      if (!values.establishedYear || !values.establishedYear === "") {
        errors["establishedYear"] = "*";
      }
      if (!values.webSite || !values.webSite === "") {
        errors["webSite"] = "*";
      }
      if (!values.headOffice || !values.headOffice === "") {
        errors["headOffice"] = "*";
      }
      if (!values.stateId || !values.stateId === "") {
        errors["stateId"] = "*";
      }
      if (!values.cityId || !values.cityId === "") {
        errors["cityId"] = "*";
      }
      if (!values.plotNumber || !values.plotNumber === "") {
        errors["plotNumber"] = "*";
      }
      if (!values.streetAddress || !values.streetAddress === "") {
        errors["streetAddress"] = "*";
      }
      if (!values.email || !values.email === "") {
        errors["email"] = "*";
      }
      values?.sector?.map((item, index) => {
        if (!item.sectorId) {
          sectorerror["sectorId"] = "*";
          sectoritemArray.push(sectorerror);
        }
        errors["sector"] = sectoritemArray;
      });
      values?.industry?.map((item, index) => {
        if (!item.industryId) {
          industryerror["industryId"] = "*";
          industryitemArray.push(industryerror);
        }
        errors["industry"] = industryitemArray;
      });
      values?.levelOfCompany?.map((item, index) => {
        if (!item.companyLevel) {
          levelerror["companyLevel"] = "*";
          levelitemArray.push(levelerror);
        }
        errors["levelOfCompany"] = levelitemArray;
      });
      values?.businessNature?.map((item, index) => {
        if (!item.natureOfBusiness) {
          natureerror["natureOfBusiness"] = "*";
          natureitemArray.push(natureerror);
        }
        errors["businessNature"] = natureitemArray;
      });
    }
    return errors;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.3125rem",
      maxHeight: "48px",
      fontFamily: "Inter",
      fontSize: "15px",
      fontWeight: "400",
      color: "#939198",
      border: "0.0625rem solid #c8c1df",
      padding: " 5px 10px",
      fontFamily: "poppins",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#463196" : null,
        color: isFocused ? "#fff" : null,
      };
    },
  };



  return (
    <>
      {isLoading && <LoaderPage />}
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

      <Row className="mt-4">
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            keepDirtyOnReinitialize
            validate={validate}
            initialValues={useMemo((e) => init(e), [orgdata])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                {dataValue === 0 ? (
                  <>
                    <Row>
                      <Col md={12} lg={6}>
                        <Field name={`orgCatgeory`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Organisation Category
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
                                  Select an Organisation Category
                                </option>
                                {organisationType?.map((item, index) => {
                                  return <option key={index}>{item}</option>;
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
                        <Field name={`groupId`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Group Name
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg ">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <Creatable
                                {...input}
                                styles={customStyles}
                                className="select_div margin_bottom "
                                placeholder="Enter Group Name"
                                isSearchable={true}
                                options={grouplist?.map((item) => {
                                  return {
                                    label: item?.groupName,
                                    value: item?.id,
                                  };
                                })}
                              />
                            </>
                          )}
                        </Field>
                      </Col>

                      <Col md={12} lg={6}>
                        <FieldArray name="sector">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div className="d-flex" key={index}>
                                  <Field name={`${name}.sectorId`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        <div className="d-flex">
                                          {index === 0 && (
                                            <>
                                              <label className="signup_form_label">
                                                Select Sector
                                              </label>

                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg ">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div className="d-flex">
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input "
                                            onChange={(e) => {
                                              input.onChange(e);
                                              handleSectorSelect(e, values);
                                            }}
                                          >
                                            <option value="">
                                              Select Sector
                                            </option>
                                            {sectorlist &&
                                              sectorlist?.map((item, index) => {
                                                return (
                                                  <option
                                                    value={item?.id}
                                                    key={index}
                                                  >
                                                    {item?.name}
                                                  </option>
                                                );
                                              })}
                                          </select>
                                        </div>
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
                                    {!router.query.Id && (
                                      <div
                                        type="button"
                                        className="add_remove_btn"
                                        onClick={() =>
                                          fields.push({
                                            sectorId: "",
                                          })
                                        }
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/plus.png"
                                        />
                                      </div>
                                    )}
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
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>
                      <Col md={12} lg={6}>
                        <FieldArray name="industry">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div className="d-flex">
                                  <Field name={`${name}.industryId`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        <div className="d-flex">
                                          {index === 0 && (
                                            <>
                                              <label className="signup_form_label">
                                                Select Industry
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg ">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div className="d-flex">
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input "
                                          >
                                            <option value="">
                                              Select Industry
                                            </option>
                                            {industrylist &&
                                              industrylist?.map((ele, i) => {
                                                return values?.sector?.map(
                                                  (item, index) => {
                                                    if (
                                                      item.sectorId ==
                                                      ele?.sectorId
                                                    ) {
                                                      return (
                                                        <option
                                                          value={ele?.id}
                                                          key={index}
                                                        >
                                                          {ele?.name}
                                                        </option>
                                                      );
                                                    }
                                                  }
                                                );
                                              })}
                                          </select>
                                        </div>
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
                                    {!router.query.Id && (
                                      <div
                                        type="button"
                                        className="add_remove_btn"
                                        onClick={() =>
                                          fields.push({
                                            industryId: "",
                                          })
                                        }
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/plus.png"
                                        />
                                      </div>
                                    )}
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
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>

                      <Col md={12} lg={6}>
                        <Field name={`brandId`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Brand Name
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <Creatable
                                {...input}
                                styles={customStyles}
                                className="margin_bottom"
                                placeholder="Enter Brand Name"
                                isSearchable={true}
                                options={brandnamelist?.map((item) => {
                                  return {
                                    label: item?.brandName,
                                    value: item?.id,
                                  };
                                })}
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`companyId`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Company Name
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <Creatable
                                styles={customStyles}
                                {...input}
                                className="margin_bottom"
                                placeholder="Enter Compay Name"
                                isSearchable={true}
                                options={companynamelist?.map((item) => {
                                  return {
                                    label: item?.companyName,
                                    value: item?.id,
                                  };
                                })}
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <FieldArray name="levelOfCompany">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div className="d-flex">
                                  <Field name={`${name}.companyLevel`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        <div className="d-flex">
                                          {index === 0 && (
                                            <>
                                              <label className="signup_form_label">
                                                Company Level
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg ">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div className="d-flex">
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input "
                                          >
                                            <option value="">
                                              Select Company Level
                                            </option>
                                            {companylevel?.map(
                                              (item, index) => {
                                                return (
                                                  <option key={index}>
                                                    {item}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </div>

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
                                    {!router.query.Id && (
                                      <div
                                        type="button"
                                        className="add_remove_btn"
                                        onClick={() =>
                                          fields.push({
                                            companyLevel: "",
                                          })
                                        }
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/plus.png"
                                        />
                                      </div>
                                    )}
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
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>
                      <Col md={12} lg={6}>
                        <FieldArray name="businessNature">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <div className="d-flex">
                                  <Field name={`${name}.natureOfBusiness`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        <div className="d-flex">
                                          {index === 0 && (
                                            <>
                                              <label className="signup_form_label">
                                                Nature of Business
                                              </label>
                                              {meta.error && meta.touched && (
                                                <span className="text-danger required_msg ">
                                                  {meta.error}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div className="d-flex">
                                          <select
                                            {...input}
                                            className="form-control select-style signup_form_input "
                                          >
                                            <option value="">
                                              Select Nature of Business
                                            </option>
                                            {natureOfBuisness?.map(
                                              (item, index) => {
                                                return (
                                                  <option key={index}>
                                                    {item}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </div>

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
                                    {!router.query.Id && (
                                      <div
                                        type="button"
                                        className="add_remove_btn"
                                        onClick={() =>
                                          fields.push({
                                            companyLevel: "",
                                          })
                                        }
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/plus.png"
                                        />
                                      </div>
                                    )}
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
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`typeOfCompany`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Type of Company
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
                                <option value="">Select Type of Company</option>
                                {typeOfCompany?.map((item, index) => {
                                  return <option key={index}>{item}</option>;
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
                        <Field name={`companySize`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Company's Size
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
                                <option value="">Select Company size</option>
                                {companySize?.map((item, index) => {
                                  return <option key={index}>{item}</option>;
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
                        <Field name={`establishedYear`}>
                          {({ input, meta }) => {
                            let yearList = [];
                            for (let i = 0; i < 300; i++) {
                              yearList.push(new Date().getFullYear() - i);
                            }
                            return (
                              <>
                                <div className="d-flex">
                                  <label className="signup_form_label">
                                    Established Year
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
                                  <option value="">Select Company size</option>
                                  {yearList?.map((item, index) => {
                                    return <option key={index}>{item}</option>;
                                  })}
                                </select>
                                <div className="text-end">
                                  <img
                                    className="select_down_icon"
                                    src="/images/down.png"
                                  />
                                </div>
                              </>
                            );
                          }}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`webSite`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Website
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
                                placeholder="Enter Website"
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`competitors`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Competitors
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
                                placeholder="Enter Competitors"
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`headOffice`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Head Office
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
                                <option value="">Is it head office?</option>
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
                        <Field name={`stateId`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  State
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
                                onChange={(e) => {
                                  input.onChange(e);
                                  handleCityList(e);
                                }}
                              >
                                <option value="">Select State</option>

                                {statelist &&
                                  statelist?.map((item, index) => {
                                    return (
                                      <option value={item?.id} key={index}>
                                        {item?.state}
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
                        <Field name={`cityId`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  City
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
                                <option value="">Select City</option>

                                {citylist &&
                                  citylist?.map((item, index) => {
                                    return (
                                      <option key={index} value={item?.id}>
                                        {item.name}
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
                        <Field name={`plotNumber`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Plot No.
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
                                placeholder="Enter Plot No."
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`streetAddress`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Street Address
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
                                placeholder="Enter Street Address"
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`contactNumber`}>
                          {({ input, meta }) => (
                            <>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Contact no.
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
                                placeholder="Enter Contact no."
                              />
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`email`}>
                          {({ input, meta }) => (
                            <div>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Email
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                {...input}
                                type="email"
                                className="form-control select-style signup_form_input margin_bottom"
                                placeholder="Enter Email"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`yourRole`}>
                          {({ input, meta }) => (
                            <div>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  {" "}
                                  Your Role in Organisation
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
                                placeholder="Enter Role"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`logo`}>
                          {({ input, meta }) => (
                            <div>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Company's Logo
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                onChange={(e) => {
                                  handleFileChange(e.target.files, "logo");
                                }}
                                type="file"
                                className="form-control signup_form_input"
                              />
                            </div>
                          )}
                        </Field>
                      </Col>
                      <Col md={12} lg={6}>
                        <Field name={`cover`}>
                          {({ input, meta }) => (
                            <div>
                              <div className="d-flex">
                                <label className="signup_form_label">
                                  Company's Cover
                                </label>
                                {meta.error && meta.touched && (
                                  <span className="text-danger required_msg">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                              <input
                                onChange={(e) => {
                                  handleFileChange(e.target.files, "cover");
                                }}
                                type="file"
                                className="form-control signup_form_input"
                              />
                            </div>
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
                          Next
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : null}
                {dataValue === 1 ? (
                  <>
                    {/* <Row>
                      <Col>
                        <FieldArray name="cms">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <Tabs
                                  key={index}
                                  defaultActiveKey={0}
                                  className="mb-3 "
                                >
                                  {cms.map((item, index) => {
                                    return (
                                      <Tab
                                        style={{
                                          padding: "10px",
                                          border: "1px solid black",
                                          borderRadius: "5px",
                                          backgroundColor: "#FFF",
                                        }}
                                        className="tabs_scroll"
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

                        <FieldArray name="CMS">
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
                                        {cms &&
                                          cms.map(
                                            (steps, stepsIndex) => (
                                              <li
                                                className="nav-item"
                                                key={steps.key}
                                              >
                                                <a
                                                  className={`nav-link admin_tabs_name cms_tabs ${CompanyCMS ===
                                                    steps.key &&
                                                    "cms_active"
                                                    }`}
                                                  active="true"
                                                  onClick={() =>
                                                    setCompanyCMS(
                                                      steps.key
                                                    )
                                                  }
                                                >
                                                  {steps.title}
                                                </a>
                                              </li>
                                            )
                                          )}
                                      </ul>
                                    </ScrollingCarousel>
                                  </div>

                                  {cms &&
                                    cms.map(
                                      (steps, stepsIndex) =>
                                        CompanyCMS === steps.key && (
                                          <Field
                                            name={`${name}.${steps.key}`}
                                          >
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

export default AddOrganisation;
