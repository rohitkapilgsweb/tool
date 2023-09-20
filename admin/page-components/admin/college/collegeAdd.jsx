import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form, useForm, useFormState } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import { cityDropdown } from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";
import {
  addCollege,
  collegeColstreams,
  collegeSubstreams,
  deleteAssociateCOllege,
  deleteCollegeAgency,
  deleteCollegeFees,
  deleteCollegeStreams,
  getCollegebyId,
  getColleges,
  updateCollege,
} from "../../../redux/actions/college/college";
import { getAllMasterFilter } from "../../../redux/actions/masterfilter/createmasterfilter";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import {
  getColStream,
  getColStreamlist,
} from "../../../redux/actions/streams/addColStream";
import {
  getSubStream,
  getSubstreamData,
} from "../../../redux/actions/streams/addSubStream";
import {
  adminexamList,
  getAllExams,
} from "../../../redux/actions/exams/createExam";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import {
  collegeAbout,
  collegeadmission,
  placements,
  scholarship,
  distanceeducation,
  wordToJSON,
} from "../../../utils/helper";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import CKeditorGenerator from "../../../components/admin/Ckeditor/CKeditor";
import LoaderPage from "../../../components/common-components/loader";
import { Form as FormBoot } from "react-bootstrap";
import Select, { components } from "react-select";

function CreateCollege() {
  const dispatch = useDispatch();
  const [courseMainstreamState, setCourseMainstreamState] = useState([]);
  const [courseSubstreamState, setCourseSubstreamState] = useState([]);
  const [dataValue, setDataValue] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [deleteCourse, setDeleteCourse] = useState([]);

  const [CollegeAboutCMS, setCollegeAboutCMS] = useState(collegeAbout[0].key);
  const [CollegeAdmissionCMS, setCollegeAdmissionCMS] = useState(
    collegeadmission[0].key
  );
  const [DistanceEducationCMS, setDistanceEducationCMS] = useState(
    distanceeducation[0].key
  );
  const [ScholarshipCMS, setScholarshipCMS] = useState(scholarship[0].key);
  const [PlacementCMS, setPlacementCMS] = useState(placements[0].key);

  const router = useRouter();
  const { Id } = router.query;

  const cityList = useSelector(
    (State) => State.cityList?.cityList?.data?.result
  );
  const stateList = useSelector(
    (State) => State.stateList?.stateList?.data?.data?.rows
  );
  const masterFilterData = useSelector(
    (state) => state?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const mainStreamlist = useSelector(
    (state) => state?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );
  const substreamSelectVal = useSelector(
    (state) => state?.subStreamList?.subStreamDetails?.data?.data?.rows
  );
  const examList = useSelector((state) => state?.examList?.adminExamList?.rows);
  const colstreamSelectVal = useSelector(
    (state) => state?.colStreamList?.colstreamDetails?.data?.data?.rows
  );

  const tableHeading = ["No.", "Course Name", "Action"];

  const [FileState, setFileState] = useState([]);

  const collegeDetails = useSelector((data) => {
    if (data?.collegelist?.college?.rows?.length > 0) {
      return data?.collegelist?.college?.rows[0];
    }
  });

  const [collegeArr, setCollegeArr] = useState({
    0: { substreamData: substreamSelectVal, colStreamData: colstreamSelectVal },
  });

  const loadercollegecard = useSelector((data) => data?.collegelist?.isLoading);

  const handleDeleteAssociate = (deletecourse) => {
    let deletepayload = {
      id: deletecourse.id,
      collegeId: Id,
    };

    dispatch(deleteAssociateCOllege(deletepayload)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getColleges());
        toast.success("Deleted", { autoClose: 1000 });
        setDeleteCourse([...deleteCourse, deletecourse.id]);
      }
    });
  };



  const handleSubmit = (values, form) => {
    if (!Id) {
      let formData = new FormData();
      if (values.college[0].collegeLogo) {
        formData.append("collegeImageFile", values.college[0].collegeLogo);
      }
      if (values.college[0].collegeImage) {
        formData.append("collegeLogoFile", values.college[0].collegeImage);
      }

      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        // console.log(values?.collegeCourse,'uwehioufhwuehf')
        setDataValue(2);
      } else if (dataValue === 2) {
        values?.collegeCourse?.map((x, index) => {
          x?.testcourse?.map((item) => {
            item?.testsublist?.map((ele) => {
              if (ele?.testcol?.length > 0) {
                ele?.testcol?.map((e) => {
                  values?.collegeCourse[index]?.collegeStreams?.push({
                    mainStreamId: Number(item?.testmain),
                    subStreamId: Number(ele?.testsub),
                    colStreamId: Number(e?.value),
                  });
                });
              } else {
                values?.collegeCourse[index]?.collegeStreams?.push({
                  mainStreamId: Number(item?.testmain),
                  subStreamId: Number(ele?.testsub),
                });
              }
            });
          });
        });
        if (FileState && FileState.length > 0) {
          values.faq.map((item, index) => {
            let x = FileState[index].name.split("_")[0];
            item.uniqueId = x;
          });
          for (let i = 0; i < FileState.length; i++) {
            formData.append("imageFile", FileState[i]);
          }
        }
        delete values.college[0].collegeLogo;
        delete values.college[0].collegeImage;
        const tempvalues = { ...values };

        const data = { payload: [tempvalues] };

        formData.append("collegeData", JSON.stringify(data));

        dispatch(addCollege(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            Router.push("/admin/college");
            toast.success("College added", { autoClose: 1000 });
          } else {
            toast.error("Error");
          }
        });
      }
    } else {
      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        // setDataValue(2);
      } else if (dataValue === 2) {
        let x = values;
        x?.collegeCourse?.map((e, index) => {
          // x?.collegeCourse?[index]?.collegeStreams = []
          let datatest = []
          e?.testcourse?.map((item) => {
            item?.testsublist?.map((ele) => {
              let subid = {}
              if (ele?.id) {
                subid = { id: ele?.id }
              }
              if (ele?.testcol?.length > 0) {
                ele?.testcol?.map((e) => {
                  let id = {}
                  if (e?.id) {
                    id = { id: e?.id }
                  }
                  datatest?.push({
                    mainStreamId: Number(item?.testmain),
                    subStreamId: Number(ele?.testsub),
                    colStreamId: Number(e?.value),
                    ...id
                  });
                });
              } else {
                datatest?.push({
                  mainStreamId: Number(item?.testmain),
                  subStreamId: Number(ele?.testsub),
                  ...subid
                });
              }
            });
          });
          x.collegeCourse[index] = {
            ...x?.collegeCourse[index],
            collegeStreams: datatest
          }
        });

        let collegeUpdateObj = {};

        let formdata = new FormData();
        if (x.college[0]?.collegeLogo) {
          formdata.append("collegeImageFile", x.college[0].collegeLogo);
        }
        if (x.college[0]?.collegeImage) {
          formdata.append("collegeLogoFile", x.college[0].collegeImage);
        }

        x.college[0] = values.college[0];

        delete x.college[0].collegeLogo;
        delete x.college[0].collegeImage;

        Object.keys(x).map((key) => {
          if (key === "college") {
            Object.keys(x[key][0]).map((ele) => {
              collegeUpdateObj[ele] = x[key][0][ele];
            });
          }
          if (
            key === "scholarShip" ||
            key === "placements" ||
            key === "distanceEducation" ||
            key === "collegeAdmissions" ||
            key === "collegeAbouts"
          ) {
            collegeUpdateObj[key] = x[key][0];
          }
          if (key === "collegeAgencies" || key === "faq") {
            collegeUpdateObj[key] = x[key];
          }
          if (key === "collegeCourse") {
            collegeUpdateObj[key] = x[key];
          }
        });

        if (collegeDetails?.collegeName === collegeUpdateObj?.collegeName) {
          delete collegeUpdateObj?.collegeName;
        }

        formdata.append("collegeData", JSON.stringify(collegeUpdateObj));
        if (formdata !== 0) {
          dispatch(updateCollege(formdata)).then((res) => {
            if (res?.payload?.data?.success) {
              Router.push("/admin/college");
              toast.success("College updated", { autoClose: 1000 });
            } else {
              toast.error("Error");
            }
          });
        }
      }
    }
  };

  const handleFileChange = (filesObject, name) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);

    file["nameType"] = name;

    if (FileState.length === 0) {
      setFileState([file]);
    } else {
      FileState.map((ele, index) => {
        if (ele.nameType == name) {
          FileState.splice(index, 1);
        }
      });
      setFileState([...FileState, file]);
    }
  };

  const validate = (values) => {
    const errors = {};
    let itemArray1 = [];
    let itemArray2 = [];
    let itemArray3 = [];
    let itemArray4 = [];
    let itemArray5 = [];

    if (dataValue === 0) {
      values?.college?.map((item, index) => {
        const error = {};
        if (!item.chooseAffiliationId) {
          error["chooseAffiliationId"] = "*";
        }
        if (!item.collegeName) {
          error["collegeName"] = "*";
        }
        if (!item.collegeMailId) {
          error["collegeMailId"] = "*";
        }
        if (!item.collegeTypeId) {
          error["collegeTypeId"] = "*";
        }
        if (!item.collegeEstablishedDate) {
          error["collegeEstablishedDate"] = "*";
        }
        if (!item.chooseApprovalId) {
          error["chooseApprovalId"] = "*";
        }
        if (!item.collegeStateId) {
          error["collegeStateId"] = "*";
        }
        if (!item.collegeCityId) {
          error["collegeCityId"] = "*";
        }
        if (!item.collegeNaacGrade) {
          error["collegeNaacGrade"] = "*";
        }
        if (!item.collegeStatusId) {
          error["collegeStatusId"] = "*";
        }
        if (!item.collegeLogo) {
          error["collegeLogo"] = "*";
        }
        if (!item.collegeImage) {
          error["collegeImage"] = "*";
        }
        itemArray1.push(error);
      });
      errors["college"] = itemArray1;

      values?.collegeAgencies?.map((item, index) => {
        const error = {};
        if (!item.collegeAgencyId) {
          error["collegeAgencyId"] = "*";
        }
        if (!item.collegeAgencyFor) {
          error["collegeAgencyFor"] = "*";
        }
        if (!item.totalAgency) {
          error["totalAgency"] = "*";
        }
        if (!item.totalAgencyForYears) {
          error["totalAgencyForYears"] = "*";
        }
        itemArray2.push(error);
      });
      errors["collegeAgencies"] = itemArray2;
    }
    if (dataValue === 1) {
      values?.collegeCourse?.map((item, index) => {
        let error = {};
        if (!item.courseTypeId) {
          error["courseTypeId"] = "*";
        }
        if (!item.courseName) {
          error["courseName"] = "*";
        }
        if (!item.coursePlaceId) {
          error["coursePlaceId"] = "*";
        }
        if (!item.courseDuration) {
          error["courseDuration"] = "*";
        }
        if (!item.courseDuration) {
          error["courseDuration"] = "*";
        }
        if (!item.courseEligibility) {
          error["courseEligibility"] = "*";
        }
        if (!item.courseLevel) {
          error["courseLevel"] = "*";
        }
        if (!item.programTypeId) {
          error["programTypeId"] = "*";
        }
        if (!item.courseCategoryId) {
          error["courseCategoryId"] = "*";
        }
        if (!item.chooseExamAcceptedId) {
          error["chooseExamAcceptedId"] = "*";
        }
        // if (!item.ShowonFiltering) {
        //   error["ShowonFiltering"] = "*";
        // }

        item?.collegeStreams?.map((items) => {
          let error = {};
          if (!items.mainStreamId) {
            error["mainStreamId"] = "*";
          }
          if (!items.subStreamId) {
            error["subStreamId"] = "*";
          }
          if (!items.colStreamId) {
            error["colStreamId"] = "*";
          }
          itemArray3.push(error);
        });
        itemArray4.push(error);

        item?.courseFees?.map((itemss, index) => {
          let error = {};
          if (!itemss.courseFeeDetailsId) {
            error["courseFeeDetailsId"] = "*";
          }
          if (!itemss.fees) {
            error["fees"] = "*";
          }
          itemArray5.push(error);
        });
        errors["courseFees"] = itemArray5;
      });
      errors["collegeCourse"] = itemArray4;
      itemArray4.map(
        (item, index) => (
          (errors["collegeCourse"][index]["collegeStreams"] = itemArray3),
          (errors["collegeCourse"][index]["courseFees"] = itemArray5)
        )
      );
    }
    return errors;
  };

  const handleTab = (index) => {
    setDataValue(index);
  };

  const masterfilterTypes =
    "affilation,collegetype,approvals,agency,courselevel,coursetype,courseplace,coursefeetype,coursecategory,programtype,eligibility";

  const FormSteps = ["College Register", "Associate Course", "CMS"];

  const dispatchforStreams = (mainArray, subarray) => {
    dispatch(getSubstreamData({ mainStreamId: mainArray }));
    dispatch(getColStreamlist({ subStreamId: subarray }));
  };

  const setInitialValues = (event) => {
    if (event && Object.keys(event).length > 0) {
      return event;
    }
    if (Id) {
      if (collegeDetails) {
        const initialValues = {};
        initialValues.college = [
          {
            id: collegeDetails?.id,
            chooseAffiliationId: collegeDetails?.chooseAffiliationId,
            collegeName: collegeDetails?.collegeName,
            collegeMailId: collegeDetails?.collegeMailId,
            collegeTypeId: collegeDetails?.collegeTypeId,
            collegeEstablishedDate: collegeDetails?.collegeEstablishedDate,
            chooseApprovalId: collegeDetails?.chooseApprovalId,
            collegeStateId: collegeDetails?.collegeStateId,
            collegeCityId: collegeDetails?.collegeCityId,
            collegeNaacGrade: collegeDetails?.collegeNaacGrade,
            collegeStatusId: collegeDetails?.collegeStatusId,
            collegeLogo: collegeDetails?.collegeLogo,
            collegeImage: collegeDetails?.collegeImage,
          },
        ];

        let mainstreamArray = [];
        let substreamArray = [];

        initialValues.collegeCourse = collegeDetails?.AssociateCourse?.map((item) => {
          // let x = item?.CourseAssociateStream?.map((ele) => {
          //   if (!mainStreamArray.includes(ele.mainStreamId))
          //     mainStreamArray.push(ele.mainStreamId);
          //   if (!subStreamArray.includes(ele.subStreamId))
          //     subStreamArray.push(ele.subStreamId);
          //   return {
          //     id: ele?.id,
          //     mainStreamId: ele?.mainStreamId,
          //     subStreamId: ele.subStreamId,
          //     colStreamId: ele?.ColStream?.id,
          //   };
          // });
          let y = []
          if (item?.CourseFees?.length > 1) {
            y = item?.CourseFees?.map((ele) => {
              return {
                id: ele?.id,
                courseFeeDetailsId: ele?.courseFeeDetailsId,
                fees: ele?.fees,
              };
            });
          } else {
            y = [{
              courseFeeDetailsId: "",
              fees: ""
            }]
          }

          let testcourse = [];

          item?.CourseAssociateStream?.map((ele) => {
            // console.log(ele, "uiahefilh");
            let mainStreamId = ele.mainStreamId;
            let substreamId = ele.subStreamId;
            let colstreamId = ele.colStreamId;

            if (!mainstreamArray?.includes(mainStreamId)) {
              mainstreamArray.push(mainStreamId);
            }

            if (!substreamArray?.includes(substreamId)) {
              substreamArray.push(substreamId);
            }

            let existingItem = testcourse.find(
              (outputItem) => outputItem.testmain === mainStreamId
            );

            if (existingItem) {
              let substreamItem = existingItem.testsublist.find(
                (subItem) => subItem.testsub === substreamId
              );
              if (substreamItem) {
                if (colstreamId) {
                  substreamItem.testcol.push({ value: colstreamId, label: ele?.ColStream?.colStreamName, id: ele?.id });
                }
              } else {
                let idlist = {}
                if (!colstreamId) {
                  idlist = { id: ele?.id }
                }
                existingItem.testsublist.push({
                  testsub: substreamId,
                  testcol: colstreamId ? [{ value: colstreamId, label: ele?.ColStream?.colStreamName, id: ele?.id }] : [],
                  ...idlist
                });
              }
            } else {
              let newItem = {
                testmain: mainStreamId,
                testsublist: [],
              };
              if (colstreamId) {
                newItem.testsublist.push({
                  testsub: substreamId,
                  testcol: [{ value: colstreamId, label: ele?.ColStream?.colStreamName, id: ele?.id }],
                });
              } else {
                newItem.testsublist.push({
                  testsub: substreamId,
                  testcol: [],
                  id: ele?.id
                });
              }
              testcourse.push(newItem);
            }
          });
          console.log(testcourse, 'duh8woheld')
          return {
            id: item?.id,
            courseTypeId: item?.courseTypeId,
            courseName: item?.courseName,
            coursePlaceId: item?.coursePlaceId,
            courseDuration: item?.courseDuration,
            courseEligibility: item?.courseEligibility,
            courseLevel: item?.courseLevel,
            programTypeId: item?.programTypeId,
            courseCategoryId: item?.courseCategoryId,
            chooseExamAcceptedId: item?.chooseExamAcceptedId,
            // collegeStreams: x ? [...x] : [],
            testcourse: testcourse,
            courseFees: y ? [...y] : [],
          };
        }
        );


        // initialValues.collegeCourse.map((ele, index) => {
        //   let array = [];
        //   ele?.collegeStreams?.map((item) => {
        //     console.log(item, "uiahefilh");
        //     let mainStreamId = item.mainStreamId;
        //     let substreamId = item.subStreamId;
        //     let colstreamId = item.colStreamId;

        //     if (!mainstreamArray?.includes(mainStreamId)) {
        //       mainstreamArray.push(mainStreamId);
        //     }

        //     if (!substreamArray?.includes(substreamId)) {
        //       substreamArray.push(substreamId);
        //     }

        //     const existingItem = array.find(
        //       (outputItem) => outputItem.testmain === mainStreamId
        //     );

        //     if (existingItem) {
        //       let substreamItem = existingItem.testsublist.find(
        //         (subItem) => subItem.testsub === substreamId
        //       );
        //       if (substreamItem) {
        //         if (colstreamId) {
        //           substreamItem.testcol.push(colstreamId);
        //         }
        //       } else {
        //         existingItem.testsublist.push({
        //           testsub: substreamId,
        //           testcol: colstreamId ? [colstreamId] : [],
        //         });
        //       }
        //     } else {
        //       let newItem = {
        //         testmain: mainStreamId,
        //         testsublist: [],
        //       };
        //       if (colstreamId) {
        //         newItem.testsublist.push({
        //           testsub: substreamId,
        //           testcol: [colstreamId],
        //         });
        //       } else {
        //         newItem.testsublist.push({
        //           testsub: substreamId,
        //           testcol: [],
        //         });
        //       }
        //       array.push(newItem);
        //     }
        //   });
        //   initialValues.collegeCourse[index].testcourse = array;
        // });
        if (collegeDetails?.CollegeAbout?.length > 0) {
          collegeDetails?.CollegeAbout?.map((item) => {
            initialValues.collegeAbouts = [
              {
                aboutIntro: item?.aboutIntro,
                aboutHighLights: item?.aboutHighLights,
                aboutRankingAndAwards: item?.aboutRankingAndAwards,
                aboutCourses: item?.aboutCourses,
                aboutScholarShipPlacements: item?.aboutScholarShipPlacements,
                aboutFacilities: item?.aboutFacilities,
              },
            ];
          });
        } else {
          initialValues.collegeAbouts = [{
            aboutIntro: "",
            aboutHighLights: "",
            aboutRankingAndAwards: "",
            aboutCourses: "",
            aboutScholarShipPlacements: "",
            aboutFacilities: "",
          }]
        }

        if (collegeDetails?.CollegeAdmission?.length > 0) {
          collegeDetails?.CollegeAdmission?.map(
            (item) =>
            (initialValues.collegeAdmissions = [
              {
                admissionIntro: item?.admissionIntro,
                admissionAboutTest: item?.admissionAboutTest,
                admissionImportantDates: item?.admissionImportantDates,
                admissionHighLights: item?.admissionHighLights,
                applicationProcess: item?.applicationProcess,
                PHDadmissionProcess: item?.PHDadmissionProcess,
              },
            ])
          );
        } else {
          initialValues.collegeAdmissions = [{
            admissionIntro: "",
            admissionAboutTest: "",
            admissionImportantDates: "",
            admissionHighLights: "",
            applicationProcess: "",
            PHDadmissionProcess: "",
          }]
        }


        if (collegeDetails?.DistanceEducation?.length > 0) {
          collegeDetails?.DistanceEducation?.map(
            (item) =>
            (initialValues.distanceEducation = [
              {
                basicInfo: item?.basicInfo,
                courseDetails: item?.courseDetails,
                honors: item?.honors,
              },
            ])
          );
        } else {
          initialValues.distanceEducation = [
            {
              basicInfo: "",
              courseDetails: "",
              honors: "",
            },
          ]
        }

        if (collegeDetails?.Placements?.length > 0) {
          collegeDetails?.Placements?.map(
            (item) =>
            (initialValues.placements = [
              {
                placeMentIntro: item?.placeMentIntro,
                highLights2021: item?.highLights2021,
                MBAhighLights: item?.MBAhighLights,
                BTECHhighLights: item?.BTECHhighLights,
                yearWisePlaceMents: item?.yearWisePlaceMents,
                topRecruiters: item?.topRecruiters,
              },
            ])
          );
        } else {
          initialValues.placements = [
            {
              placeMentIntro: "",
              highLights2021: "",
              MBAhighLights: "",
              BTECHhighLights: "",
              yearWisePlaceMents: "",
              topRecruiters: "",
            },
          ]
        }

        if (collegeDetails?.Scholarship?.length > 0) {
          collegeDetails?.Scholarship?.map(
            (item) =>
            (initialValues.scholarShip = [
              {
                scholarShipIntro: item?.scholarShipIntro,
                basedOnUniExams: item?.basedOnUniExams,
                basedOnAdmissionTest: item?.basedOnAdmissionTest,
                basedOnSportsQuota: item?.basedOnSportsQuota,
                basedOnDiplomaGraduates: item?.basedOnDiplomaGraduates,
              },
            ])
          );
        } else {
          initialValues.scholarShip = [{
            scholarShipIntro: "",
            basedOnUniExams: "",
            basedOnAdmissionTest: "",
            basedOnSportsQuota: "",
            basedOnDiplomaGraduates: "",
          }]
        }

        if (collegeDetails?.FAQ?.length > 0) {
          collegeDetails?.FAQ?.map(
            (item) =>
            (initialValues.faq = [
              {
                question: item?.question,
                answerType: item?.answerType,
                answer: item?.answer,
              },
            ])
          )
        }else{
          initialValues.faq = [
            {
              question: "",
              answerType: "",
              answer: "",
            },
          ]
        }

        initialValues.collegeAgencies = [];
        if (collegeDetails?.CollegeAgency?.length > 0) {
          collegeDetails?.CollegeAgency?.map((item) => {
            initialValues.collegeAgencies.push({
              id: item?.id,
              collegeAgencyId: item?.collegeAgencyId,
              collegeAgencyFor: item?.collegeAgencyFor,
              totalAgency: item?.totalAgency,
              totalAgencyForYears: item?.totalAgencyForYears,
            });
          });
        } else {
          initialValues.collegeAgencies.push({
            collegeAgencyId: null,
            collegeAgencyFor: null,
            totalAgency: null,
            totalAgencyForYears: null,
          });
        }
        dispatch(collegeColstreams({ subStreamId: substreamArray }));
        dispatch(collegeSubstreams({ mainStreamId: mainstreamArray }));
        setCourseMainstreamState(mainstreamArray);
        setCourseSubstreamState(substreamArray);
        console.log(initialValues, 'uciashludha')
        return initialValues;
      }
    } else {
      const initialValues = {};
      initialValues.testcourse = [
        {
          testmain: "",
          testsublist: [
            {
              testsub: "",
              testcol: [],
            },
          ],
        },
      ];
      initialValues.college = [
        {
          chooseAffiliationId: "",
          collegeName: "",
          collegeMailId: "",
          collegeTypeId: "",
          collegeEstablishedDate: "",
          chooseApprovalId: "",
          collegeStateId: "",
          collegeCityId: "",
          collegeNaacGrade: "",
          collegeStatusId: "",
          collegeLogo: "",
          collegeImage: "",
        },
      ];

      initialValues.collegeCourse = [
        {
          courseTypeId: "",
          courseName: "",
          coursePlaceId: "",
          courseDuration: "",
          courseEligibility: "",
          courseLevel: "",
          programTypeId: "",
          courseCategoryId: "",
          chooseExamAcceptedId: "",
          // collegeStreams: [
          //   {
          //     mainStreamId: null,
          //     subStreamId: null,
          //     colStreamId: null,
          //   },
          // ],
          collegeStreams: [],
          testcourse: [
            {
              testmain: "",
              testsublist: [
                {
                  testsub: "",
                  testcol: [],
                },
              ],
            },
          ],
          courseFees: [
            {
              courseFeeDetailsId: "",
              fees: "",
            },
          ],
        },
      ];

      initialValues.collegeAbouts = [
        {
          aboutIntro: "",
          aboutHighLights: "",
          aboutRankingAndAwards: "",
          aboutCourses: "",
          aboutScholarShipPlacements: "",
          aboutFacilities: "",
        },
      ];
      initialValues.collegeAdmissions = [
        {
          admissionIntro: "",
          admissionAboutTest: "",
          admissionImportantDates: "",
          admissionHighLights: "",
          applicationProcess: "",
          PHDadmissionProcess: "",
        },
      ];
      initialValues.distanceEducation = [
        {
          basicInfo: "",
          courseDetails: "",
          honors: "",
        },
      ];
      initialValues.placements = [
        {
          placeMentIntro: "",
          highLights2021: "",
          MBAhighLights: "",
          BTECHhighLights: "",
          yearWisePlaceMents: "",
          topRecruiters: "",
        },
      ];
      initialValues.scholarShip = [
        {
          scholarShipIntro: "",
          basedOnUniExams: "",
          basedOnAdmissionTest: "",
          basedOnSportsQuota: "",
          basedOnDiplomaGraduates: "",
        },
      ];
      initialValues.faq = [
        {
          question: null,
          answerType: null,
          answer: null,
        },
      ];
      initialValues.collegeAgencies = [
        {
          collegeAgencyId: "",
          collegeAgencyFor: "",
          totalAgency: "",
          totalAgencyForYears: "",
        },
      ];
      return initialValues;
    }
  };

  const substreamfulllist = useSelector(
    (state) => state?.subStreamList?.subStreamValue?.data?.data?.rows
  );
  const colstreamfulllist = useSelector(
    (state) => state?.colStreamList?.colStreamSlice?.data?.data?.rows
  );

  useEffect(() => {
    dispatch(getState({ pageSize: 50, pageNo: 1 }));
    dispatch(cityDropdown(""));
    // dispatch(getAllExams());
    dispatch(adminexamList({ pageSize: 400, pageNo: 1 }));
    dispatch(getAllMasterFilter(masterfilterTypes));
    dispatch(getMainStream({ pageSize: 100, pageNo: 1 }));
    dispatch(getSubStream());
    dispatch(getColStream());
  }, []);

  useEffect(() => {
    if (Id) dispatch(getCollegebyId({ id: Number(Id) }));
  }, [Id]);

  const handleCityList = (e) => {
    dispatch(cityDropdown({ stateId: e.target.value }));
  };

  const handleAgencyDelete = (fields, index, agencyValue) => {
    if (Id) {
      if ((agencyValue[index].totalAgency = "")) {
        dispatch(
          deleteCollegeAgency({
            id: collegeDetails?.CollegeAgency[index]?.id,
            collegeId: collegeDetails?.id,
          })
        ).then((res) => {
          if (res?.payload?.data?.success) {
            fields.remove(index);
            toast.success("Agency deleted", { autoClose: 1000 });
          }
        });
      } else {
        fields.remove(index);
      }
    } else {
      fields.remove(index);
    }
  };

  const handleFeeDelete = (fields, index, feesValue) => {
    if (Id) {
      if (feesValue[displayIndex].courseFees[index].courseFeeDetailsId != "") {
        dispatch(
          deleteCollegeFees(feesValue[displayIndex].courseFees[index].id)
        ).then((res) => {
          if (res?.payload?.data?.success) {
            fields.remove(index);
            toast.success("Deleted", { autoClose: 1000 });
          }
        });
      } else {
        fields.remove(index);
      }
    } else {
      fields.remove(index);
    }
  };

  const handleCollegeStream = (
    fields,
    index,
    Streamvalues,
    collegeStreamsIndex
  ) => {
    if (Id) {
      if (
        Streamvalues[displayIndex].collegeStreams[collegeStreamsIndex]
          .mainStreamId != ""
      ) {
        dispatch(
          deleteCollegeStreams({
            id:
              Streamvalues[displayIndex].collegeStreams[collegeStreamsIndex].id,
          })
        ).then((res) => {
          if (res?.payload?.data?.success) {
            fields.remove(
              Streamvalues[displayIndex].collegeStreams[collegeStreamsIndex]
            );
            toast.success("deleted", { autoClose: 1000 });
          }
        });
      } else {
        fields.remove(collegeStreamsIndex);
      }
    } else {
      fields.remove(collegeStreamsIndex);
    }
  };

  const handlewordupload = (e) => {
    wordToJSON(e[0]).then((res) => {
      let data = res?.value?.split("<p>**********</p>");
      let cms = {
        payload: [
          {
            collegeAbouts: 
              {
                aboutIntro: data[0],
                aboutHighLights: data[1],
                aboutRankingAndAwards: data[2],
                aboutCourses: data[3],
                aboutScholarShipPlacements: data[4],
                aboutFacilities: data[5],
              },
            collegeAdmissions: 
              {
                admissionIntro: data[6],
                admissionAboutTest: data[7],
                admissionImportantDates: data[8],
                admissionHighLights: data[9],
                applicationProcess: data[10],
                PHDadmissionProcess: data[11],
              },
            distanceEducation: 
              {
                basicInfo: data[12],
                courseDetails: data[13],
                honors: data[14],
              },
            placements: 
              {
                placeMentIntro: data[15],
                highLights2021: data[16],
                MBAhighLights: data[17],
                BTECHhighLights: data[18],
                yearWisePlaceMents: data[19],
                topRecruiters: data[20],
              },
            scholarShip: 
              {
                scholarShipIntro: data[21],
                basedOnUniExams: data[22],
                basedOnAdmissionTest: data[23],
                basedOnSportsQuota: data[24],
                basedOnDiplomaGraduates: data[25],
              },
            faq: [],
          },
        ],
      };
      let x = [];
      for (
        let i = 0;
        i < data[26]?.split("<p>----------</p>").length;
        i = i + 3
      ) {
        cms?.payload[0]?.faq?.push({
          question: data[26]
            ?.split("<p>----------</p>")
          [i].split("Q:")
            .join(""),
          answerType: data[26]
            ?.split("<p>----------</p>")
          [i + 1].split("ANSWERTYPE:")
            .join(""),
          answer: data[26]
            ?.split("<p>----------</p>")
          [i + 2].split("ANSWER:")
            .join(""),
        });
      }
      cms.payload[0].id = Number(Id)
      let collegedata =  cms.payload[0]
      console.log(collegedata, "submit")
      if(Id){
        let formdata = new FormData();
        formdata.append("collegeData",JSON.stringify(collegedata))
        dispatch(updateCollege(formdata)).then((res)=>{
          console.log(res,'iehrufhuerhfhlf')
        })
      }
    });
  };

  const handlemainStreamChange = (id) => {
    if (!courseMainstreamState.includes(id)) {
      setCourseMainstreamState([...courseMainstreamState, Number(id)]);
      dispatch(
        collegeSubstreams({
          mainStreamId: [...courseMainstreamState, Number(id)],
        })
      );
    }
  };

  const handleSubstreamChange = (id) => {
    if (!courseSubstreamState.includes(id)) {
      setCourseSubstreamState([...courseSubstreamState, Number(id)]);
      dispatch(
        collegeColstreams({
          subStreamId: [...courseSubstreamState, Number(id)],
        })
      );
    }
  };

  const substreamCollegeList = useSelector(
    (state) => state?.subStreamList?.subStreamCollegeList
  );
  const colstreamcollegelist = useSelector(
    (state) => state?.colStreamList?.collegeColStream
  );

  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex ",
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        {children}
      </components.Option>
    );
  };

  const iwjeciwjeicj = (values) => {
    let datatest = [];
    values?.map((x) => {
      x?.testcourse?.map((item) => {
        item?.testsublist?.map((ele) => {
          let subid = {}
          if (ele?.id) {
            subid = { id: ele?.id }
          }
          if (ele?.testcol?.length > 0) {
            ele?.testcol?.map((e) => {
              let id = {}
              if (e?.id) {
                id = { id: e?.id }
              }
              datatest.push({
                mainStreamId: Number(item?.testmain),
                substreamId: Number(ele?.testsub),
                colstreamId: Number(e?.value),
                ...id
              });
            });
          } else {
            datatest.push({
              mainStreamId: Number(item?.testmain),
              substreamId: Number(ele?.testsub),
              ...subid
            });
          }
        });
      });
    });
    console.log(datatest, "diwhnelfwuef");
  };

  const handleCourseStreamDelete = (array, name) => {
    if (name === 'substream') {
      let arr = []
      array.testcol.map((item) => {
        if (item?.id) {
          arr.push(item?.id)
        }
      })
      if (array?.id) {
        arr.push(array?.id)
      }
      arr.map((item) => {
        // dispatch(deleteCollegeStreams({id:item})).then(res=>res)
      })
    } if (name === 'mainstream') {
      let arr = []
      array?.testsublist?.map((item) => {
        if (item?.id) {
          arr.push(item.id)
        }
        item?.testcol?.map((ele) => {
          if (ele?.id) {
            arr.push(ele?.id)
          }
        })
      })
      arr.map((item) => {
        // dispatch(deleteCollegeStreams({id:item})).then(res=>res)
      })
    } if (name === "colstream") {
      console.log(array, 'ajoecuac')
    }
  }

  return (
    <>
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
                        onClick={() => handleTab(stepsIndex)}
                      >
                        {steps}
                      </a>
                    </li>
                  ))}
              </ul>
            </ScrollingCarousel>
            {dataValue == 2 && (
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
            // validate={validate}
            initialValues={useMemo((event) => setInitialValues(event), [
              collegeDetails,
            ])}
            render={({
              handleSubmit,
              values,
              initialValues,
              form: {
                mutators: { push, pop, remove },
              },
              form,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                { }
                {console.log(values, 'wjeipjfiwp;je')}
                {loadercollegecard && <LoaderPage />}
                {dataValue === 0 && (
                  <>
                    <FieldArray name="college">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <div key={index}>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.chooseAffiliationId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Choose Affiliation
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
                                          <option value={0}>
                                            Choose Affilation
                                          </option>
                                          {masterFilterData?.affilation?.map(
                                            (item, index) => (
                                              <option
                                                key={`Affilation_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
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
                                  <Field name={`${name}.collegeName`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Name
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="text"
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter College Name"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field
                                    name={`${name}.collegeMailId`}
                                    className="margin_bottom"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Mail Id
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
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter Mail Id"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeTypeId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Type
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value="">
                                            Select College Type..
                                          </option>
                                          {masterFilterData?.collegetype?.map(
                                            (item, index) => (
                                              <option
                                                key={`CollegeType_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
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
                                <Col md={12} lg={6}>
                                  <Field
                                    name={`${name}.collegeEstablishedDate`}
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Established Date
                                          </label>
                                          {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="month"
                                          className="form-control signup_form_input margin_bottom"
                                          // value={Date.now()}
                                          placeholder="Enter Established Date"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.chooseApprovalId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div>
                                          <label className="signup_form_label">
                                            Choose Approval
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value={0}>
                                            Not Selected
                                          </option>
                                          {masterFilterData?.approvals?.map(
                                            (item, index) => (
                                              <option
                                                key={`Approval_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
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
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeStateId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College State
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                          onChange={(e) => {
                                            input.onChange(e);
                                            handleCityList(e);
                                          }}
                                        >
                                          <option value=" ">
                                            Enter college State
                                          </option>
                                          {stateList &&
                                            stateList.length > 0 &&
                                            stateList.map(
                                              (stateItem, stateIndex) => (
                                                <option
                                                  key={`State_${stateIndex}`}
                                                  value={stateItem.id}
                                                >{`${stateItem.state}`}</option>
                                              )
                                            )}
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
                                  <Field name={`${name}.collegeCityId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College City
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value={""}>
                                            Enter College City
                                          </option>
                                          {cityList &&
                                            cityList.length > 0 &&
                                            cityList.map(
                                              (cityItem, cityIndex) => (
                                                <option
                                                  key={`City_${cityIndex}`}
                                                  value={cityItem.id}
                                                >{`${cityItem.name}`}</option>
                                              )
                                            )}
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
                              <Row className="position_label">
                                <Col>
                                  <label className="signup_form_label ">
                                    College Agency
                                  </label>
                                </Col>
                                <FieldArray name={`collegeAgencies`}>
                                  {({ fields }) => (
                                    <div>
                                      <>
                                        {fields.map((name, index) => (
                                          <Row key={`CollegeAgencies_1`}>
                                            <Col md={12} lg={6}>
                                              <div className="d-flex margin_bottom small_screen_for_input">
                                                <Field
                                                  name={`${name}.collegeAgencyId`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <select
                                                        {...input}
                                                        // className="form-control select-style signup_form_input "
                                                        className={
                                                          meta.touched
                                                            ? meta.error
                                                              ? "red_border form-control select-style signup_form_input "
                                                              : "form-control select-style signup_form_input "
                                                            : "form-control select-style signup_form_input "
                                                        }
                                                      >
                                                        <option value={null}>
                                                          select Agencies
                                                        </option>
                                                        {masterFilterData?.agency?.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`Agency_${index}`}
                                                              value={item?.id}
                                                            >
                                                              {item.name}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                      {/* {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )} */}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="item_hide_768">
                                                  <img
                                                    className="select_down_icon_second"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                                <div className="for_input_center">
                                                  For
                                                </div>
                                                <Field
                                                  name={`${name}.collegeAgencyFor`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <select
                                                        {...input}
                                                        // className="form-control select-style signup_form_input "
                                                        className={
                                                          meta.touched
                                                            ? meta.error
                                                              ? "red_border form-control select-style signup_form_input "
                                                              : "form-control select-style signup_form_input "
                                                            : "form-control select-style signup_form_input "
                                                        }
                                                      >
                                                        <option value={null}>
                                                          Overall
                                                        </option>
                                                        {mainStreamlist &&
                                                          mainStreamlist.length >
                                                          0 &&
                                                          mainStreamlist?.map(
                                                            (item, index) => (
                                                              <option
                                                                key={`AgencyFor_${index}`}
                                                                value={item.id}
                                                              >
                                                                {
                                                                  item?.mainStreamName
                                                                }
                                                              </option>
                                                            )
                                                          )}
                                                      </select>
                                                      {/* {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )} */}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="item_hide_768">
                                                  <img
                                                    className="select_down_icon_second"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col md={12} lg={6}>
                                              <div className="d-flex margin_bottom small_screen_for_input">
                                                <Field
                                                  name={`${name}.totalAgency`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        className={
                                                          meta.touched
                                                            ? meta.error
                                                              ? "red_border form-control select-style signup_form_input "
                                                              : "form-control select-style signup_form_input "
                                                            : "form-control select-style signup_form_input "
                                                        }
                                                        placeholder="Enter Total agencies"
                                                      />
                                                      {/* {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )} */}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="for_input_center">
                                                  For
                                                </div>
                                                <Field
                                                  name={`${name}.totalAgencyForYears`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        className={
                                                          meta.touched
                                                            ? meta.error
                                                              ? "red_border form-control select-style signup_form_input "
                                                              : "form-control select-style signup_form_input "
                                                            : "form-control select-style signup_form_input "
                                                        }
                                                        placeholder="Enter Agency Year"
                                                      />
                                                      {/* {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )} */}
                                                    </>
                                                  )}
                                                </Field>

                                                <div className="d-flex plus_minus_btn_row">
                                                  <div
                                                    type="button"
                                                    className="add_remove_btn"
                                                    onClick={() =>
                                                      fields.push({
                                                        collegeAgencyId: "",
                                                        collegeAgencyFor: "",
                                                        totalAgency: "",
                                                        totalAgencyForYears: "",
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
                                                      onClick={
                                                        () =>
                                                          handleAgencyDelete(
                                                            fields,
                                                            index,
                                                            values.collegeAgencies
                                                          )
                                                        // fields.remove(index)
                                                      }
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
                                            </Col>
                                          </Row>
                                        ))}
                                      </>
                                    </div>
                                  )}
                                </FieldArray>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeNaacGrade`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College NAAC Grade
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="number"
                                          min="0"
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter NAAC Grade"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeStatusId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Status
                                          </label>
                                          {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input "
                                        >
                                          <option value={""}>
                                            Enter College Status
                                          </option>
                                          <option value={1}>Enable</option>
                                          <option value={2}>Disable</option>
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
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeLogo`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Logo
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          type="file"
                                          onChange={(e) =>
                                            input.onChange(e.target.files[0])
                                          }
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter logo"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeImage`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Image
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          // {...input}
                                          type="file"
                                          onChange={(e) =>
                                            input.onChange(e.target.files[0])
                                          }
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="College Image"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-center">
                                  <button
                                    className="admin_signup_btn"
                                    onClick={handleSubmit}
                                  >
                                    Add College
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </>
                )}
                {dataValue === 1 && (
                  <>
                    {values?.collegeCourse?.length > 1 && (
                      <div>
                        <Table
                          responsive
                          className="admin_table"
                          bordered
                          hover
                        >
                          <thead>
                            <tr>
                              {tableHeading &&
                                tableHeading?.map((i, index) => {
                                  return (
                                    <>
                                      <th className="table_head" key={index}>
                                        {i}
                                      </th>
                                    </>
                                  );
                                })}
                            </tr>
                          </thead>
                          <tbody>
                            {values?.collegeCourse &&
                              values?.collegeCourse?.map((asscourse, index) => {
                                let x = deleteCourse.find(
                                  (e) => e == asscourse.id
                                );

                                if (!x) {
                                  return (
                                    <tr key={index}>
                                      <td className="text-center admin_table_data">
                                        {displayIndex === index && "*"}
                                        {index + 1}
                                      </td>

                                      <td className="text-center admin_table_data">
                                        {asscourse?.courseName}
                                      </td>

                                      <td className="text-center admin_table_data">
                                        <img
                                          className="mx-1 admin_table_action_icon"
                                          src="/images/edit-icon-blue.png"
                                          onClick={() => setDisplayIndex(index)}
                                        ></img>

                                        {asscourse?.courseName !== "" && Id ? (
                                          <img
                                            className="mx-1 admin_table_action_icon"
                                            src="/images/delete-icon-blue.png"
                                            onClick={() =>
                                              handleDeleteAssociate(asscourse)
                                            }
                                          ></img>
                                        ) : (
                                          <img
                                            className="mx-1 admin_table_action_icon"
                                            src="/images/delete-icon-blue.png"
                                            onClick={() => {
                                              remove("collegeCourse", index);
                                              if (index !== 0) {
                                                setDisplayIndex(index - 1);
                                              } else {
                                                setDisplayIndex(0);
                                              }
                                            }}
                                          ></img>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                    {/* <Row>
                      <button onClick={() => {
                        iwjeciwjeicj(values?.collegeCourse)
                      }}>dwiuegcdujwel</button>
                    </Row> */}
                    <Row>
                      {/* {values && values.collegeCourse && <pre>{JSON.stringify(values.collegeCourse[0].testcourse,0,2)}</pre>} */}
                      <label className="signup_form_label">
                        Choose Streams
                      </label>
                      <FieldArray name="collegeCourse">
                        {({ fields }) => (
                          <>
                            {fields.map(
                              (name, index) =>
                                index === displayIndex && (
                                  <div key={index}>
                                    {/* <Col> */}
                                    <FieldArray name={`${name}.testcourse`}>
                                      {({ fields }) => (
                                        <>
                                          {fields.map((name, streamindex) => {
                                            let existsmain = [];
                                            values?.collegeCourse[
                                              index
                                            ]?.testcourse?.map((item, i) => {
                                              if (item?.testmain) {
                                                existsmain.push(
                                                  Number(item?.testmain)
                                                );
                                              }
                                            });
                                            let sublistbymainstream = substreamCollegeList?.filter(
                                              (ele) =>
                                                ele?.id ==
                                                values?.collegeCourse[index]
                                                  ?.testcourse[streamindex]
                                                  ?.testmain
                                            );
                                            // console.log(sublistbymainstream,'wiuehcujwheu')
                                            return (
                                              <>
                                                <Row>

                                                  <Col md={4} className="mb-3">
                                                    <div className="d-flex streams_slect ">
                                                      <Field
                                                        key={index}
                                                        name={`${name}.testmain`}
                                                      >
                                                        {({ input, meta }) => (
                                                          <>
                                                            {values?.collegeCourse[index]
                                                              ?.testcourse?.length >
                                                              1 && (
                                                                // <button onClick={(e) => handleMainstreamDelete(values, form, index)}>-</button>
                                                                <div
                                                                  className="add_remove_btn m-0 me-2"
                                                                  onClick={(e) => {
                                                                    handleCourseStreamDelete(values?.collegeCourse[index]?.testcourse[streamindex], 'mainstream')
                                                                    fields.remove(
                                                                      streamindex
                                                                    )
                                                                  }
                                                                  }
                                                                >
                                                                  -
                                                                </div>
                                                              )}
                                                            <select
                                                              {...input}
                                                              className="form-control select-style signup_form_input"
                                                              onChange={(e) => {
                                                                input.onChange(e);
                                                                handlemainStreamChange(
                                                                  e.target.value
                                                                );
                                                                if (
                                                                  e.target.value ===
                                                                  ""
                                                                ) {
                                                                  form.change(
                                                                    `collegeCourse[${index}].testcourse[${streamindex}]`,
                                                                    {
                                                                      testmain: "",
                                                                      testsublist: [
                                                                        {
                                                                          testsub:
                                                                            "",
                                                                          testcol: [],
                                                                        },
                                                                      ],
                                                                    }
                                                                  );
                                                                }
                                                              }}
                                                            >
                                                              <option value="">
                                                                select Mainstream
                                                              </option>
                                                              {mainStreamlist &&
                                                                mainStreamlist.map(
                                                                  (e, i) => {
                                                                    if (
                                                                      !existsmain?.includes(
                                                                        e?.id
                                                                      )
                                                                    ) {
                                                                      return (
                                                                        <option
                                                                          key={i}
                                                                          value={Number(
                                                                            e?.id
                                                                          )}
                                                                        >
                                                                          {
                                                                            e?.mainStreamName
                                                                          }
                                                                        </option>
                                                                      );
                                                                    }
                                                                    if (
                                                                      existsmain?.includes(
                                                                        e?.id
                                                                      ) &&
                                                                      values
                                                                        ?.collegeCourse[
                                                                        index
                                                                      ]?.testcourse[
                                                                        streamindex
                                                                      ]?.testmain ==
                                                                      e?.id
                                                                    ) {
                                                                      console.log(
                                                                        e?.mainStreamName,
                                                                        "iohjikcwhasifch"
                                                                      );
                                                                      return (
                                                                        <option
                                                                          key={i}
                                                                          value={Number(
                                                                            e?.id
                                                                          )}
                                                                        >
                                                                          {
                                                                            e?.mainStreamName
                                                                          }
                                                                        </option>
                                                                      );
                                                                    }
                                                                  }
                                                                )}
                                                            </select>
                                                          </>
                                                        )}
                                                      </Field>
                                                    </div>
                                                  </Col>
                                                  <FieldArray
                                                    name={`${name}.testsublist`}
                                                  >
                                                    {({ fields }) => (
                                                      <>
                                                        {fields.map(
                                                          (subs, i) => {
                                                            let existsSub = [];
                                                            values?.collegeCourse[
                                                              index
                                                            ]?.testcourse[
                                                              streamindex
                                                            ]?.testsublist.map(
                                                              (e) => {
                                                                if (
                                                                  e?.testsub
                                                                ) {
                                                                  existsSub.push(
                                                                    Number(
                                                                      e?.testsub
                                                                    )
                                                                  );
                                                                }
                                                              }
                                                            );
                                                            return (
                                                              <>
                                                                {i > 0 && (
                                                                  <Col
                                                                    md={4}
                                                                    className="mb-3"
                                                                  ></Col>
                                                                )}
                                                                <Col md={4} className="mb-3">
                                                                  <Field
                                                                    name={`${subs}.testsub`}
                                                                  >
                                                                    {({
                                                                      input,
                                                                      meta,
                                                                    }) => {
                                                                      let options = () => {
                                                                        let filteredColstreamList = colstreamcollegelist?.filter(
                                                                          (
                                                                            ele
                                                                          ) =>
                                                                            ele?.id ==
                                                                            values
                                                                              ?.collegeCourse[
                                                                              index
                                                                            ]
                                                                              ?.testcourse[
                                                                              streamindex
                                                                            ]
                                                                              ?.testsublist[
                                                                              i
                                                                            ]
                                                                              ?.testsub
                                                                        );
                                                                        let list = [];
                                                                        if (
                                                                          filteredColstreamList?.length >
                                                                          0
                                                                        ) {
                                                                          filteredColstreamList[0]?.ColStreams?.map(
                                                                            (
                                                                              item
                                                                            ) => {
                                                                              list.push(
                                                                                {
                                                                                  label:
                                                                                    item?.colStreamName,
                                                                                  value:
                                                                                    item?.id,
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                        return list;
                                                                      };
                                                                      // console.log(options(), 'icwoieoniwje')

                                                                      return (
                                                                        <select
                                                                          {...input}
                                                                          className="form-control select-style signup_form_input"
                                                                          onChange={(
                                                                            e
                                                                          ) => {
                                                                            input.onChange(
                                                                              e
                                                                            );
                                                                            handleSubstreamChange(
                                                                              e
                                                                                .target
                                                                                .value
                                                                            );
                                                                          }}
                                                                          disabled={!values?.collegeCourse[index]?.testcourse[streamindex]?.testmain}
                                                                        >
                                                                          <option>
                                                                            Select
                                                                            substream
                                                                          </option>
                                                                          {sublistbymainstream?.length >
                                                                            0 &&
                                                                            sublistbymainstream[0]?.SubStreams?.map(
                                                                              (
                                                                                substream
                                                                              ) => {
                                                                                if (!existsSub?.includes(Number(substream?.id))) {
                                                                                  return (
                                                                                    <option
                                                                                      value={Number(
                                                                                        substream?.id
                                                                                      )}
                                                                                    >
                                                                                      {
                                                                                        substream?.subStreamName
                                                                                      }
                                                                                    </option>
                                                                                  );
                                                                                }
                                                                                if (
                                                                                  existsSub?.includes(
                                                                                    Number(
                                                                                      substream?.id
                                                                                    )
                                                                                  ) &&
                                                                                  values
                                                                                    ?.collegeCourse[
                                                                                    index
                                                                                  ]
                                                                                    ?.testcourse[
                                                                                    streamindex
                                                                                  ]
                                                                                    ?.testsublist[
                                                                                    i
                                                                                  ]
                                                                                    ?.testsub ==
                                                                                  substream?.id
                                                                                ) {
                                                                                  return (
                                                                                    <option
                                                                                      value={Number(
                                                                                        substream?.id
                                                                                      )}
                                                                                    >
                                                                                      {
                                                                                        substream?.subStreamName
                                                                                      }
                                                                                    </option>
                                                                                  );
                                                                                }
                                                                              }
                                                                            )}
                                                                        </select>
                                                                      );
                                                                    }}
                                                                  </Field>
                                                                </Col>
                                                                <Col md={4} className="mb-3">
                                                                  <div className="d-flex streams_slect">
                                                                    <Field
                                                                      name={`${subs}.testcol`}
                                                                    >
                                                                      {({
                                                                        input,
                                                                        meta,
                                                                      }) => {
                                                                        let filteredColstreamList = colstreamcollegelist?.filter(
                                                                          (
                                                                            ele
                                                                          ) =>
                                                                            ele?.id ==
                                                                            values
                                                                              ?.collegeCourse[
                                                                              index
                                                                            ]
                                                                              ?.testcourse[
                                                                              streamindex
                                                                            ]
                                                                              ?.testsublist[
                                                                              i
                                                                            ]
                                                                              ?.testsub
                                                                        );
                                                                        let list = [];
                                                                        if (
                                                                          filteredColstreamList?.length >
                                                                          0
                                                                        ) {
                                                                          filteredColstreamList[0]?.ColStreams?.map(
                                                                            (
                                                                              item
                                                                            ) => {
                                                                              list.push(
                                                                                {
                                                                                  label:
                                                                                    item?.colStreamName,
                                                                                  value:
                                                                                    item?.id,
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                        // return list
                                                                        return (
                                                                          <Select
                                                                            {...input}
                                                                            onChange={(e) => {
                                                                              input.onChange(e)
                                                                            }}
                                                                            styles={{
                                                                              control: (
                                                                                baseStyles,
                                                                                state
                                                                              ) => {
                                                                                console.log(
                                                                                  state,
                                                                                  "statat"
                                                                                );
                                                                                return {
                                                                                  ...baseStyles,
                                                                                  background:
                                                                                    "#ffffff",
                                                                                  border:
                                                                                    "0.0625rem solid #c8c1df",
                                                                                  borderRadius:
                                                                                    "0.3125rem",
                                                                                  fontWeight:
                                                                                    "400",
                                                                                  fontSize:
                                                                                    "15px",
                                                                                  lineHeight:
                                                                                    "1.5rem",
                                                                                  color:
                                                                                    "#939198",
                                                                                  maxHeight:
                                                                                    "48px",
                                                                                  padding:
                                                                                    "11px 20px",
                                                                                };
                                                                              },
                                                                            }}
                                                                            isMulti
                                                                            closeMenuOnSelect={
                                                                              false
                                                                            }
                                                                            hideSelectedOptions={
                                                                              false
                                                                            }
                                                                            //   options={[{ value: 'test', label: 'test' }]}
                                                                            // options={() => {
                                                                            //   let filteredColstreamList = colstreamcollegelist?.filter((ele) => ele?.id == values?.testcourse[index]?.testsublist[i]?.testsub)
                                                                            //   let list = []
                                                                            //   if (filteredColstreamList?.length > 0) {
                                                                            //     filteredColstreamList[0]?.ColStreams?.map((item) => {
                                                                            //       list.push({ label: item?.colStreamName, value: item?.id })
                                                                            //     })
                                                                            //   }
                                                                            //   return list
                                                                            // }}
                                                                            options={
                                                                              list
                                                                            }
                                                                            components={{
                                                                              Option: InputOption,
                                                                            }}
                                                                          />
                                                                        );
                                                                      }}
                                                                    </Field>
                                                                    <div className="add_remove_btn" onClick={() => {
                                                                      if (Id) {
                                                                        handleCourseStreamDelete(values?.collegeCourse[index]?.testcourse[streamindex]?.testsublist[i], 'substream')
                                                                      }
                                                                      fields.remove(i)
                                                                      // form.change(`collegeCourse[${index}].testcourse[${streamindex}].testsublist[${i}]`,{testsub:})
                                                                    }}>-</div>
                                                                    {sublistbymainstream?.length >
                                                                      0 &&
                                                                      values
                                                                        ?.collegeCourse[
                                                                        index
                                                                      ]
                                                                        ?.testcourse[
                                                                        streamindex
                                                                      ]
                                                                        ?.testsublist
                                                                        ?.length <
                                                                      sublistbymainstream[0]
                                                                        ?.SubStreams
                                                                        ?.length &&
                                                                      i ===
                                                                      values
                                                                        ?.collegeCourse[
                                                                        index
                                                                      ]
                                                                        ?.testcourse[
                                                                        streamindex
                                                                      ]
                                                                        ?.testsublist
                                                                        ?.length -
                                                                      1 && (
                                                                        <div
                                                                          className="add_remove_btn"
                                                                          onClick={() =>
                                                                            fields.push(
                                                                              {
                                                                                testsub:
                                                                                  "",
                                                                                testcol: [],
                                                                              }
                                                                            )
                                                                          }
                                                                        >
                                                                          +
                                                                        </div>
                                                                      )}
                                                                  </div>
                                                                </Col>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </>
                                                    )}
                                                  </FieldArray>
                                                </Row>
                                                {values?.collegeCourse[index]
                                                  ?.testcourse?.length -
                                                  1 ===
                                                  streamindex &&
                                                  values?.collegeCourse[index]
                                                    ?.testcourse[
                                                    values?.collegeCourse[index]
                                                      ?.testcourse?.length - 1
                                                  ]?.testmain !== "" && (
                                                    <Row>
                                                      <Col>
                                                        <div
                                                          type="button"
                                                          className="add_remove_btn "
                                                          onClick={() =>
                                                            fields.push({
                                                              testmain: "",
                                                              testsublist: [
                                                                {
                                                                  testsub: "",
                                                                  testcol: [],
                                                                },
                                                              ],
                                                            })
                                                          }
                                                        >
                                                          <img
                                                            className="add_remove_icon"
                                                            src="/images/plus.png"
                                                          />
                                                        </div>
                                                      </Col>
                                                      {/* <button className="" onClick={() => fields.push({
                                                    testmain: "",
                                                    testsublist: [
                                                      {
                                                        testsub: "",
                                                        testcol: []
                                                      }
                                                    ]
                                                  })}>+</button> */}
                                                    </Row>
                                                  )}
                                              </>
                                            );
                                          })}
                                        </>
                                      )}
                                    </FieldArray>
                                    {/* </Col> */}
                                    <Row>
                                      <FieldArray
                                        name={`${name}.collegeStreams`}
                                      >
                                        {({ fields }) => (
                                          <div>
                                            {/* <label className="signup_form_label">
                                              Choose Streams
                                            </label> */}

                                            <>
                                              {fields.map(
                                                (
                                                  collegeStreamsname,
                                                  collegeStreamsIndex
                                                ) => (
                                                  <Row>
                                                    <>
                                                      <Col lg={4} md={12}>
                                                        <Field
                                                          name={`${collegeStreamsname}.mainStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => (
                                                            <>
                                                              {/* <div className="d-flex">
                                                                {meta.touched &&
                                                                  meta.error && (
                                                                    <span className="text-danger required_msg">
                                                                      {
                                                                        meta.error
                                                                      }
                                                                    </span>
                                                                  )}
                                                              </div> */}
                                                              <select
                                                                {...input}
                                                                // className="form-control select-style signup_form_input"
                                                                className={
                                                                  meta.touched
                                                                    ? meta.error
                                                                      ? "red_border form-control select-style signup_form_input "
                                                                      : "form-control select-style signup_form_input "
                                                                    : "form-control select-style signup_form_input "
                                                                }
                                                                onChange={(
                                                                  e
                                                                ) => {
                                                                  input.onChange(
                                                                    e
                                                                  );
                                                                  // handleMainstreamselect(
                                                                  //   form
                                                                  // );
                                                                }}
                                                              >
                                                                <option value="">
                                                                  Select Main
                                                                  Stream
                                                                </option>
                                                                {mainStreamlist &&
                                                                  mainStreamlist.length >
                                                                  0 &&
                                                                  mainStreamlist.map(
                                                                    (
                                                                      item,
                                                                      index
                                                                    ) => (
                                                                      <option
                                                                        key={`MainStream_${index}`}
                                                                        value={
                                                                          item?.id
                                                                        }
                                                                      >
                                                                        {
                                                                          item.mainStreamName
                                                                        }
                                                                      </option>
                                                                    )
                                                                  )}
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
                                                      <Col
                                                        lg={4}
                                                        md={12}
                                                        className="  position_relative"
                                                      >
                                                        <Field
                                                          name={`${collegeStreamsname}.subStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => {
                                                            let list = substreamfulllist?.filter(
                                                              (ele) => {
                                                                return (
                                                                  ele?.mainStreamId ==
                                                                  values
                                                                    ?.collegeCourse[
                                                                    index
                                                                  ]
                                                                    ?.collegeStreams[
                                                                    collegeStreamsIndex
                                                                  ]
                                                                    ?.mainStreamId
                                                                );
                                                              }
                                                            );
                                                            return (
                                                              <>
                                                                {/* <div className="d-flex star_position">
                                                                  {meta.touched &&
                                                                    meta.error && (
                                                                      <span className="text-danger required_msg">
                                                                        {
                                                                          meta.error
                                                                        }
                                                                      </span>
                                                                    )}
                                                                </div> */}
                                                                <select
                                                                  {...input}
                                                                  className={
                                                                    meta.touched
                                                                      ? meta.error
                                                                        ? "red_border form-control select-style signup_form_input "
                                                                        : "form-control select-style signup_form_input "
                                                                      : "form-control select-style signup_form_input "
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    input.onChange(
                                                                      e
                                                                    );
                                                                  }}
                                                                  disabled={
                                                                    values
                                                                      ?.collegeCourse[
                                                                      index
                                                                    ]
                                                                      ?.collegeStreams[
                                                                      collegeStreamsIndex
                                                                    ]
                                                                      ?.mainStreamId
                                                                      ? false
                                                                      : true
                                                                  }
                                                                >
                                                                  <option
                                                                    value={""}
                                                                    hidden
                                                                  >
                                                                    Select Sub
                                                                    Stream
                                                                  </option>
                                                                  {substreamfulllist?.map(
                                                                    (ele, i) =>
                                                                      ele?.mainStreamId ==
                                                                      values
                                                                        ?.collegeCourse[
                                                                        index
                                                                      ]
                                                                        ?.collegeStreams[
                                                                        collegeStreamsIndex
                                                                      ]
                                                                        ?.mainStreamId && (
                                                                        <option
                                                                          key={
                                                                            i
                                                                          }
                                                                          value={
                                                                            ele?.id
                                                                          }
                                                                        >
                                                                          {
                                                                            ele?.subStreamName
                                                                          }
                                                                        </option>
                                                                      )
                                                                  )}
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
                                                      <Col
                                                        lg={4}
                                                        md={12}
                                                        className="d-flex  position_relative"
                                                      >
                                                        <Field
                                                          name={`${collegeStreamsname}.colStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => (
                                                            <>
                                                              {/* <div className="d-flex star_position">
                                                                {meta.touched &&
                                                                  meta.error && (
                                                                    <span className="text-danger required_msg">
                                                                      {
                                                                        meta.error
                                                                      }
                                                                    </span>
                                                                  )}
                                                              </div> */}
                                                              <select
                                                                {...input}
                                                                disabled={
                                                                  values
                                                                    ?.collegeCourse[
                                                                    index
                                                                  ]
                                                                    ?.collegeStreams[
                                                                    collegeStreamsIndex
                                                                  ]?.subStreamId
                                                                    ? false
                                                                    : true
                                                                }
                                                                className={
                                                                  meta.touched
                                                                    ? meta.error
                                                                      ? "red_border form-control select-style signup_form_input "
                                                                      : "form-control select-style signup_form_input "
                                                                    : "form-control select-style signup_form_input "
                                                                }
                                                                onChange={(
                                                                  e
                                                                ) => {
                                                                  input.onChange(
                                                                    e
                                                                  );
                                                                }}
                                                              >
                                                                <option
                                                                  value={""}
                                                                  hidden
                                                                >
                                                                  Select Col
                                                                  Stream
                                                                </option>

                                                                {colstreamfulllist?.map(
                                                                  (ele, i) =>
                                                                    ele?.subStreamId ==
                                                                    values
                                                                      ?.collegeCourse[
                                                                      index
                                                                    ]
                                                                      ?.collegeStreams[
                                                                      collegeStreamsIndex
                                                                    ]
                                                                      ?.subStreamId && (
                                                                      <option
                                                                        key={i}
                                                                        value={
                                                                          ele?.id
                                                                        }
                                                                      >
                                                                        {
                                                                          ele?.colStreamName
                                                                        }
                                                                      </option>
                                                                    )
                                                                )}
                                                              </select>
                                                              <div className="">
                                                                <img
                                                                  className="select_down_icon_second"
                                                                  src="/images/down.png"
                                                                />
                                                              </div>
                                                            </>
                                                          )}
                                                        </Field>

                                                        <div className="d-flex ">
                                                          <div
                                                            type="button"
                                                            className="add_remove_btn ms-2"
                                                            onClick={() => {
                                                              fields.push({
                                                                mainStreamId:
                                                                  "",
                                                                subStreamId: "",
                                                                colStreamId: "",
                                                              });
                                                              setCollegeArr({
                                                                ...collegeArr,
                                                                [fields.length]: {
                                                                  substreamData: substreamSelectVal,
                                                                  colStreamData: colstreamSelectVal,
                                                                },
                                                              });
                                                            }}
                                                          >
                                                            <img
                                                              className="add_remove_icon"
                                                              src="/images/plus.png"
                                                            />
                                                          </div>
                                                          {fields.length > 1 ? (
                                                            <div
                                                              className="add_remove_btn ms-2"
                                                              type="button"
                                                              onClick={() =>
                                                                handleCollegeStream(
                                                                  fields,
                                                                  index,
                                                                  values.collegeCourse,
                                                                  collegeStreamsIndex
                                                                )
                                                              }
                                                            >
                                                              <img
                                                                className="add_remove_icon"
                                                                src="/images/minus.png"
                                                              />
                                                            </div>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </div>
                                                      </Col>
                                                    </>
                                                  </Row>
                                                )
                                              )}
                                            </>
                                          </div>
                                        )}
                                      </FieldArray>
                                    </Row>
                                    <Row>
                                      <Col md={12} lg={6}>
                                        <Field name={`${name}.courseTypeId`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Type
                                                </label>
                                                {meta.touched && meta.error && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control select-style signup_form_input"
                                              >
                                                <option value={""}>
                                                  Select Course Type
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData.coursetype
                                                    ?.length > 0 &&
                                                  masterFilterData.coursetype?.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`CourseType_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                        <Field name={`${name}.courseName`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Name
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <input
                                                {...input}
                                                type="text"
                                                className="form-control select-style signup_form_input margin_bottom"
                                                placeholder="Enter Course Name"
                                              // onChange={(e) =>
                                              //   input.onChange(e)
                                              // }
                                              />
                                            </>
                                          )}
                                        </Field>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <FieldArray name={`${name}.courseFees`}>
                                        {({ fields }) => (
                                          <div>
                                            <>
                                              {fields.map((name, index) => (
                                                <Row>
                                                  <Col lg={6} md={12}>
                                                    <Field
                                                      name={`${name}.courseFeeDetailsId`}
                                                    >
                                                      {({ input, meta }) => (
                                                        <>
                                                          <div className="w-100">
                                                            {index === 0 && (
                                                              <>
                                                                <label className="signup_form_label">
                                                                  Course Fee
                                                                  Details
                                                                </label>
                                                                {meta.error &&
                                                                  meta.touched && (
                                                                    <span className="text-danger required_msg">
                                                                      {
                                                                        meta.error
                                                                      }
                                                                    </span>
                                                                  )}
                                                              </>
                                                            )}
                                                          </div>
                                                          <select
                                                            {...input}
                                                            className="form-control select-style signup_form_input "
                                                          >
                                                            <option value={""}>
                                                              Select Fee type
                                                            </option>
                                                            {masterFilterData?.coursefeetype &&
                                                              masterFilterData?.coursefeetype?.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => (
                                                                  <option
                                                                    key={`coruseFee_${index}`}
                                                                    value={
                                                                      item.id
                                                                    }
                                                                  >
                                                                    {item.name}
                                                                  </option>
                                                                )
                                                              )}
                                                          </select>
                                                        </>
                                                      )}
                                                    </Field>
                                                    <div className="text-end">
                                                      <img
                                                        className="select_down_icon"
                                                        src="/images/down.png"
                                                      />
                                                    </div>
                                                  </Col>
                                                  <Col lg={6} md={12}>
                                                    <div className="d-flex ">
                                                      <Field
                                                        name={`${name}.fees`}
                                                      >
                                                        {({ input, meta }) => (
                                                          <div className="w-100">
                                                            <div className="d-flex">
                                                              {index === 0 && (
                                                                <>
                                                                  <label className="signup_form_label">
                                                                    Course Fee
                                                                  </label>
                                                                  {meta.touched &&
                                                                    meta.error && (
                                                                      <span className="text-danger required_msg">
                                                                        {
                                                                          meta.error
                                                                        }
                                                                      </span>
                                                                    )}
                                                                </>
                                                              )}
                                                            </div>

                                                            <input
                                                              {...input}
                                                              type="number"
                                                              min={0}
                                                              className="form-control signup_form_input margin_bottom"
                                                              placeholder="Enter Course Fee"
                                                            />
                                                          </div>
                                                        )}
                                                      </Field>
                                                      <div
                                                        className={
                                                          index === 0
                                                            ? "d-flex m_top_30 "
                                                            : "d-flex"
                                                        }
                                                      >
                                                        <div
                                                          type="button"
                                                          className="add_remove_btn "
                                                          onClick={() =>
                                                            fields.push({
                                                              courseFeeDetailsId:
                                                                "",
                                                              fees: "",
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
                                                            className="add_remove_btn "
                                                            type="button"
                                                            onClick={() =>
                                                              handleFeeDelete(
                                                                fields,
                                                                index,
                                                                values.collegeCourse
                                                              )
                                                            }
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
                                                  </Col>
                                                </Row>
                                              ))}
                                            </>
                                          </div>
                                        )}
                                      </FieldArray>
                                    </Row>
                                    <Row>
                                      <Col md={12} lg={6}>
                                        <Field name={`${name}.coursePlaceId`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Place
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input"
                                              >
                                                <option value={""}>
                                                  Select Course Place
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData?.courseplace?.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`CoursePlace_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                        <Field name={`${name}.courseDuration`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Duration (Years/Months)
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <input
                                                {...input}
                                                type="number"
                                                min={0}
                                                className="form-control signup_form_input margin_bottom"
                                                placeholder="Enter Course Duration"
                                              />
                                            </>
                                          )}
                                        </Field>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col md={12} lg={6}>
                                        <Field
                                          name={`${name}.courseEligibility`}
                                        >
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Eligibility
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>

                                              <select
                                                {...input}
                                                className="form-control signup_form_input "
                                              >
                                                <option value={""}>
                                                  Select Course Eligibility
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData.eligibility &&
                                                  masterFilterData.eligibility
                                                    .length > 0 &&
                                                  masterFilterData.eligibility.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`CourseLEvel_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                        <Field name={`${name}.courseLevel`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Level
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input"
                                              >
                                                <option value="">
                                                  Select Course Level
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData.courselevel &&
                                                  masterFilterData.courselevel
                                                    .length > 0 &&
                                                  masterFilterData.courselevel.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`CourseLEvel_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                      <Col md={12} lg={6}>
                                        <Field name={`${name}.programTypeId`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Program Type
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input "
                                              >
                                                <option value={""}>
                                                  Select programtype
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData.programtype &&
                                                  masterFilterData.programtype
                                                    .length > 0 &&
                                                  masterFilterData.programtype.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`ProgramType_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                        <Field
                                          name={`${name}.courseCategoryId`}
                                        >
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Course Category
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input "
                                              >
                                                <option value={""}>
                                                  Select course category
                                                </option>
                                                {masterFilterData &&
                                                  masterFilterData.coursecategory &&
                                                  masterFilterData
                                                    .coursecategory.length >
                                                  0 &&
                                                  masterFilterData.coursecategory.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`CourseCategory_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
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
                                      <Col md={12} lg={6}>
                                        <Field
                                          name={`${name}.chooseExamAcceptedId`}
                                        >
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Choose Exam Accepted
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input "
                                              >
                                                <option value={""}>
                                                  Choose Exam
                                                </option>
                                                {examList &&
                                                  examList.length > 0 &&
                                                  examList.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`Exam_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item?.examName}
                                                      </option>
                                                    )
                                                  )}
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
                                        {/* <Field name={`${name}.ShowonFiltering`}>
                                          {({ input, meta }) => (
                                            <>
                                              <div className="d-flex">
                                                <label className="signup_form_label">
                                                  Show on Filtering
                                                </label>
                                                {meta.error && meta.touched && (
                                                  <span className="text-danger required_msg">
                                                    {meta.error}
                                                  </span>
                                                )}
                                              </div>
                                              <select
                                                {...input}
                                                className="form-control signup_form_input "
                                              >
                                                <option
                                                  value=""
                                                  disabled={true}
                                                >
                                                  True/False
                                                </option>
                                                <option value={false}>
                                                  True
                                                </option>
                                                <option
                                                  value={false}
                                                  disabled={true}
                                                >
                                                  False
                                                </option>
                                              </select>
                                              <div className="text-end">
                                                <img
                                                  className="select_down_icon"
                                                  src="/images/down.png"
                                                />
                                              </div>
                                            </>
                                          )}
                                        </Field> */}
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col className="text-center">
                                        <button
                                          type="button"
                                          className="admin_signup_btn me-4"
                                          onClick={() => {
                                            push("collegeCourse", {
                                              courseTypeId: "",
                                              courseName: "",
                                              coursePlaceId: "",
                                              courseDuration: "",
                                              courseEligibility: "",
                                              courseLevel: "",
                                              programTypeId: "",
                                              courseCategoryId: "",
                                              chooseExamAcceptedId: "",
                                              collegeStreams: [
                                                // {
                                                //   mainStreamId: "",
                                                //   subStreamId: "",
                                                //   colStreamId: "",
                                                // },
                                              ],
                                              testcourse: [
                                                {
                                                  testmain: "",
                                                  testsublist: [
                                                    {
                                                      testsub: "",
                                                      testcol: [],
                                                    },
                                                  ],
                                                },
                                              ],
                                              courseFees: [
                                                {
                                                  courseFeeDetailsId: "",
                                                  fees: "",
                                                },
                                              ],
                                            });
                                            setDisplayIndex(
                                              values?.collegeCourse?.length
                                            );
                                          }}
                                        >
                                          Add more
                                        </button>
                                        <button
                                          className="admin_signup_btn admin_signup_btn_mobile"
                                          type="submit"
                                          onClick={handleSubmit}
                                        >
                                          Submit
                                        </button>
                                      </Col>
                                    </Row>
                                  </div>
                                )
                            )}
                          </>
                        )}
                      </FieldArray>
                    </Row>
                  </>
                )}

                {dataValue == 2 && (
                  <>
                    <div>
                      <>
                        {/* <Row>
                          <Col>
                            <h4 className="mb-3">College About</h4>
                            <FieldArray name="collegeAbouts">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeAbout &&
                                        collegeAbout?.map((item, index) => {
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
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {}}
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
                            <h4 className="mb-3 commun_heading ps-3">
                              College About
                            </h4>
                            <FieldArray name="collegeAbouts">
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
                                            {collegeAbout &&
                                              collegeAbout.map(
                                                (steps, stepsIndex) => (
                                                  <li
                                                    className="nav-item"
                                                    key={steps.key}
                                                  >
                                                    <a
                                                      className={`nav-link admin_tabs_name cms_tabs ${CollegeAboutCMS ===
                                                        steps.key &&
                                                        "cms_active"
                                                        }`}
                                                      active="true"
                                                      onClick={() =>
                                                        setCollegeAboutCMS(
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

                                      {collegeAbout &&
                                        collegeAbout.map(
                                          (steps, stepsIndex) =>
                                            CollegeAboutCMS === steps.key && (
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

                        {/* <Row>
                          <Col>
                            <h4 className="mt-4">College Admission</h4>
                            <FieldArray name="collegeAdmissions">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeadmission &&
                                        collegeadmission?.map((item, index) => {
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
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {
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
                            <h4 className="mb-3 commun_heading ps-3">
                              College Admission
                            </h4>
                            <FieldArray name="collegeAdmissions">
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
                                            {collegeadmission &&
                                              collegeadmission.map(
                                                (steps, stepsIndex) => (
                                                  <li
                                                    className="nav-item"
                                                    key={steps.key}
                                                  >
                                                    <a
                                                      className={`nav-link admin_tabs_name cms_tabs ${CollegeAdmissionCMS ===
                                                        steps.key &&
                                                        "cms_active"
                                                        }`}
                                                      active="true"
                                                      onClick={() =>
                                                        setCollegeAdmissionCMS(
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

                                      {collegeadmission &&
                                        collegeadmission.map(
                                          (steps, stepsIndex) =>
                                            CollegeAdmissionCMS ===
                                            steps.key && (
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

                        {/* <Row>
                          <Col>
                            <h4 className="mt-4">Distance Education</h4>
                            <FieldArray name="distanceEducation">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {distanceeducation &&
                                        distanceeducation?.map(
                                          (item, index) => {
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
                                                <Field
                                                  name={`${name}.${item?.key}`}
                                                >
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
                                          }
                                        )}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row> */}

                        <Row className="mb-4">
                          <Col lg={12} className="">
                            <h4 className="mb-3 commun_heading ps-3">
                              Distance Education
                            </h4>
                            <FieldArray name="distanceEducation">
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
                                            {distanceeducation &&
                                              distanceeducation.map(
                                                (steps, stepsIndex) => (
                                                  <li
                                                    className="nav-item"
                                                    key={steps.key}
                                                  >
                                                    <a
                                                      className={`nav-link admin_tabs_name cms_tabs ${DistanceEducationCMS ===
                                                        steps.key &&
                                                        "cms_active"
                                                        }`}
                                                      active="true"
                                                      onClick={() =>
                                                        setDistanceEducationCMS(
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

                                      {distanceeducation &&
                                        distanceeducation.map(
                                          (steps, stepsIndex) =>
                                            DistanceEducationCMS ===
                                            steps.key && (
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

                        {/* <Row>
                          <Col>
                            <h4 className="mt-4">Scholarship</h4>
                            <FieldArray name="scholarShip">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {scholarship &&
                                        scholarship?.map((item, index) => {
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
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
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
                            <h4 className="mb-3 commun_heading ps-3">
                              Scholarship
                            </h4>
                            <FieldArray name="placements">
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
                                            {scholarship &&
                                              scholarship.map(
                                                (steps, stepsIndex) => (
                                                  <li
                                                    className="nav-item"
                                                    key={steps.key}
                                                  >
                                                    <a
                                                      className={`nav-link admin_tabs_name cms_tabs ${ScholarshipCMS ===
                                                        steps.key &&
                                                        "cms_active"
                                                        }`}
                                                      active="true"
                                                      onClick={() =>
                                                        setScholarshipCMS(
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

                                      {scholarship &&
                                        scholarship.map(
                                          (steps, stepsIndex) =>
                                            ScholarshipCMS === steps.key && (
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

                        {/* <Row>
                          <Col>
                            <h4 className="mt-4">Placements</h4>
                            <FieldArray name="placements">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {placements &&
                                        placements?.map((item, index) => {
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
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
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
                            <h4 className="mb-3 commun_heading ps-3">
                              Placements
                            </h4>
                            <FieldArray name="placements">
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
                                            {placements &&
                                              placements.map(
                                                (steps, stepsIndex) => (
                                                  <li
                                                    className="nav-item"
                                                    key={steps.key}
                                                  >
                                                    <a
                                                      className={`nav-link admin_tabs_name cms_tabs ${PlacementCMS ===
                                                        steps.key &&
                                                        "cms_active"
                                                        }`}
                                                      active="true"
                                                      onClick={() =>
                                                        setPlacementCMS(
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

                                      {placements &&
                                        placements.map(
                                          (steps, stepsIndex) =>
                                            PlacementCMS === steps.key && (
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
                          <Col>
                            <h4 className="mt-4 commun_heading ps-3">FAQs</h4>
                            <FieldArray name="faq">
                              {({ fields }) => (
                                <>
                                  {fields?.map((name, index) => (
                                    <div key={index}>
                                      <div className="margin_bottom">
                                        <Field name={`${name}.question`}>
                                          {({ input, meta }) => (
                                            <>
                                              <CKeditorGenerator
                                                input={input}
                                                onReady={(editor) => { }}
                                              />
                                            </>
                                          )}
                                        </Field>
                                      </div>
                                      <Row>
                                        <Col lg={6}>
                                          <Field name={`${name}.answerType`}>
                                            {({ input, meta }) => (
                                              <>
                                                <FormBoot.Select
                                                  className="signup_form_input w-100 "
                                                  {...input}
                                                >
                                                  <option value="">
                                                    select Answer Type
                                                  </option>
                                                  <option>Short Answer</option>
                                                  <option>Paragraph</option>
                                                </FormBoot.Select>
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
                                        <Col lg={6}>
                                          <Field name={`${name}.answer`}>
                                            {({ input, meta }) => (
                                              <>
                                                <input
                                                  className="signup_form_input w-100 margin_bottom"
                                                  {...input}
                                                  type="text"
                                                  placeholder="Type Your Answer"
                                                />
                                              </>
                                            )}
                                          </Field>
                                        </Col>
                                        <Col lg={12} className="d-flex">
                                          <Field name={`${name}.image`}>
                                            {({ input, meta }) => (
                                              <>
                                                <input
                                                  // {...input}
                                                  type="file"
                                                  onChange={(e) => {
                                                    handleFileChange(
                                                      e.target.files,
                                                      e.target.name
                                                    );
                                                    // input.onChange(e.target.files[0])
                                                  }}
                                                  className="form-control signup_form_input margin_bottom"
                                                  placeholder="College Image"
                                                />
                                              </>
                                            )}
                                          </Field>
                                          <div className="d-flex plus_minus_btn_row">
                                            <div
                                              type="button"
                                              className="add_remove_btn"
                                              onClick={() =>
                                                fields.push({
                                                  question: null,
                                                  answerType: null,
                                                  answer: null,
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
                                                onClick={() =>
                                                  fields.remove(index)
                                                }
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
                                        </Col>
                                      </Row>
                                      {/* <img
                                        onClick={() =>
                                          fields.push({
                                            question: null,
                                            answerType: null,
                                            answer: null,
                                          })
                                        }
                                        className="add_remove_icon"
                                        src="/images/question-add-icon.png"
                                      />
                                      {fields.length > 1 && (
                                        <img
                                          onClick={() => fields.remove(index)}
                                          className="add_remove_icon"
                                          src="/images/delete-icon-blue.png"
                                        /> */}
                                      {/* )} */}
                                    </div>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>
                      </>
                      <Row>
                        <Col className="text-center">
                          <button
                            className="admin_signup_btn admin_signup_btn_mobile"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default CreateCollege;
