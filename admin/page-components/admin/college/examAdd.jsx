import dynamic from "next/dynamic";
import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMasterFilter,
  getMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  addExam,
  editExam,
  examFaqDelete,
  getExamById,
} from "../../../redux/actions/exams/createExam";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import CKeditorGenerator from "../../../components/admin/Ckeditor/CKeditor";
import { Form as FormBoot } from "react-bootstrap";
import { wordToJSON } from "../../../utils/helper";

export default function AddExams() {
  const FormSteps = ["Exam Register", "CMS"];
  const [dataValue, setDataValue] = useState(0);
  const dispatch = useDispatch();
  const [FileState, setFileState] = useState([]);
  const [examlogo, setExamlogo] = useState();
  const router = useRouter();

  const mainStreamdata = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );
  const prevExamData = useSelector(
    (data) => data?.exambyid?.exam?.data?.data?.rows[0]
  );
  const prevExamLoader = useSelector((data) => data?.exambyid);
  const masterFilterData = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const masterValues = "coursetype,applicationmode,exammode,examtype";

  const { Id } = router.query;

  useEffect(() => {
    dispatch(getMainStream({ pageNo: 1, pageSize: 200 }));
    dispatch(getMasterFilter());
    dispatch(getAllMasterFilter(masterValues));
    if (Id) {
      dispatch(getExamById(Number(Id)));
    }
  }, [Id]);

  const examAbout = [
    { title: "Def", key: "examAboutDefination" },
    { title: "Highlights", key: "examAboutHighlights" },
    { title: "Imp. Dates", key: "examAboutImportantDates" },
    { title: "Pattern", key: "examAboutPattern" },
    { title: "Syllabus", key: "examAboutSyllabus" },
    { title: "Imp. Books", key: "examAboutImportantBooks" },
    { title: "Helpline", key: "examAboutHelpLine" },
    { title: "Previous Papers", key: "examAboutPreviousPapers" },
  ];

  const Registration = [
    { title: "Highlights", key: "examRegistrationHighlights" },
    { title: "App. Date", key: "applicationDate" },
    { title: "App. Fees", key: "applicationFees" },
    { title: "Eligibility", key: "eligibility" },
    { title: "Documents Required", key: "documentsRequired" },
    { title: "Guide", key: "guide" },
    { title: "App. Form Correction", key: "applicationFormCorrection" },
  ];

  const AdmitCard = [
    { title: "Highlights", key: "examAdmitCardHighlights" },
    { title: "Release Date", key: "releaseDate" },
    { title: "How To Download", key: "howToDownload" },
    { title: "Sample", key: "sample" },
    { title: "Forgot Login Details", key: "forgotLoginDetails" },
    { title: "Correction", key: "correction" },
  ];

  const ImportantDates = [
    { title: "Intro", key: "examImportantDatesIntro" },
    { title: "Exam Schedule", key: "examSchedule" },
    { title: "Schedule For Other Sessions", key: "scheduleForOtherSession" },
  ];

  const Reservation = [
    { title: "Intro", key: "examReservationIntro" },
    { title: "Highlights", key: "examReservationHighlights" },
    { title: "Criteria", key: "criteria" },
    { title: "Category Wise", key: "categoryWise" },
    { title: "For Women", key: "forWomen" },
    { title: "For Pwd Category", key: "forPWDWomen" },
    { title: "Under EWS Quota", key: "underEWSQuota" },
  ];

  const ExamsCentres = [
    { title: "Intro", key: "examCentreIntro" },
    { title: "List of Exam Centres", key: "listOfExamCentres" },
  ];

  const Eligibility = [
    { title: "Intro", key: "examEligibilityIntro" },
    { title: "Highlights", key: "examEligibilityHighlights" },
    { title: "Detailed Criteria", key: "detailedCriteria" },
    {
      title: "Marks Required For Qualifying",
      key: "marksRequiredForQualifying",
    },
  ];

  const ExamPattern = [
    { title: "Highlights", key: "examPatternHighlights" },
    { title: "Paper 1 Pattern", key: "examPatternPaper1Pattern" },
    { title: "Paper 2 Pattern", key: "examPatternPaper2Pattern" },
    { title: "Paper 3 Pattern", key: "examPatternPaper3Pattern" },
    { title: "Paper 4 Pattern", key: "examPatternPaper4Pattern" },
    { title: "Paper 5 Pattern", key: "examPatternPaper5Pattern" },
    { title: "Paper 6 Pattern", key: "examPatternPaper6Pattern" },
    { title: "Weightage", key: "weightage" },
  ];

  const Syllabus = [
    { title: "Highlights", key: "examSyllabusHighlights" },
    { title: "Paper 1 Pattern", key: "examSyllabusPaper1Pattern" },
    { title: "Paper 2 Pattern", key: "examSyllabusPaper2Pattern" },
    { title: "Paper 3 Pattern", key: "examSyllabusPaper3Pattern" },
    { title: "Paper 4 Pattern", key: "examSyllabusPaper4Pattern" },
    { title: "Paper 5 Pattern", key: "examSyllabusPaper5Pattern" },
    { title: "Paper 6 Pattern", key: "examSyllabusPaper6Pattern" },
    { title: "Best Books", key: "bestBooks" },
  ];

  const PreparationTips = [
    { title: "Best Time", key: "bestTime" },
    {
      title: "Section wise preparation Tips",
      key: "sectionWisePreparationTips",
    },
    { title: "Subject 1 Books", key: "subject1Books" },
    { title: "Subject 2 Books", key: "subject2Books" },
    { title: "Subject 3 Books", key: "subject3Books" },
    { title: "Subject 4 Books", key: "subject4Books" },
  ];

  const Counselling = [
    { title: "Step By Step Process", key: "stepByStepProcess" },
    { title: "Schedule For Exams", key: "scheduleForExams" },
    {
      title: "Other Related Exams Counselling",
      key: "otherRelatedExamsCounselling",
    },
  ];

  const ParticipatingColleges = [
    {
      title: "List of Top Colleges That accepts this exams",
      key: "listOfTopCollegesAcceptingJEE",
    },
  ];

  let payload = {}

  const handlewordupload = (e) => {
    wordToJSON(e[0]).then((res) => {
      let data = res?.value?.split("<p>**********</p>");
      payload = {
        payload: [
          {
            examFAQ: [],
            examAbouts: [
              {
                examAboutDefination: data[0],
                examAboutHighlights: data[1],
                examAboutImportantDates: data[2],
                examAboutPattern: data[3],
                examAboutSyllabus: data[4],
                examAboutImportantBooks: data[5],
                examAboutHelpLine: data[6],
                examAboutPreviousPapers: data[7],
              },
            ],
            examRegistrations: [
              {
                examRegistrationHighlights: data[8],
                applicationDate: data[9],
                applicationFees: data[10],
                eligibility: data[11],
                documentsRequired: data[12],
                guide: data[13],
                applicationFormCorrection: data[14],
              },
            ],
            examAdmitCards: [
              {
                examAdmitCardHighlights: data[15],
                releaseDate: data[16],
                howToDownload: data[17],
                sample: data[18],
                forgotLoginDetails: data[19],
                correction: data[20],
              },
            ],
            examImportantDate: [
              {
                examImportantDatesIntro: data[21],
                examSchedule: data[22],
                scheduleForOtherSession: data[23],
              },
            ],
            examReservations: [
              {
                examReservationIntro: data[24],
                examReservationHighlights: data[25],
                criteria: data[26],
                categoryWise: data[27],
                forWomen: data[28],
                forPWDWomen: data[29],
                underEWSQuota: data[30],
              },
            ],
            examCentre: [
              {
                examCentreIntro: data[31],
                listOfExamCentres: data[32],
              },
            ],
            examEligibilities: [
              {
                examEligibilityIntro: data[33],
                examEligibilityHighlights: data[34],
                detailedCriteria: data[35],
                marksRequiredForQualifying: data[36],
              },
            ],
            examPatterns: [
              {
                examPatternHighlights: data[37],
                examPatternPaper1Pattern: data[38],
                examPatternPaper2Pattern: data[39],
                examPatternPaper3Pattern: data[40],
                examPatternPaper4Pattern: data[41],
                examPatternPaper5Pattern: data[42],
                examPatternPaper6Pattern: data[43],
                weightage: data[44],
              },
            ],
            examSyllabuss: [
              {
                examSyllabusHighlights: data[45],
                examSyllabusPaper1Pattern: data[46],
                examSyllabusPaper2Pattern: data[47],
                examSyllabusPaper3Pattern: data[48],
                examSyllabusPaper4Pattern: data[49],
                examSyllabusPaper5Pattern: data[50],
                examSyllabusPaper6Pattern: data[51],
                bestBooks: data[52],
              },
            ],
            examPreparationTip: [
              {
                bestTime: data[53],
                sectionWisePreparationTips: data[54],
                subject1Books: data[55],
                subject2Books: data[56],
                subject3Books: data[57],
                subject4Books: data[58],
              },
            ],
            examCounsellings: [
              {
                stepByStepProcess: data[59],
                scheduleForExams: data[60],
                otherRelatedExamsCounselling: data[61],
              },
            ],
            examParticipatingCollege: [
              { listOfTopCollegesAcceptingJEE: data[62] },
            ],
          },
        ],
      };
      // let x = [];
      for (
        let i = 0;
        i < data[63]?.split("<p>----------</p>").length;
        i = i + 3
      ) {
        payload?.payload[0]?.examFAQ?.push({
          question: data[63]
            ?.split("<p>----------</p>")
          [i].split("Q:")
            .join(""),
          answerType: data[63]
            ?.split("<p>----------</p>")
          [i + 1].split("ANSWERTYPE:")
            .join(""),
          answer: data[63]
            ?.split("<p>----------</p>")
          [i + 2].split("ANSWER:")
            .join(""),
        });
      }
    });
  };


  const handleSubmit = (values) => {

    if (Id) {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        let tempValues = { ...values };
        let examobj = {};
        let formdata = new FormData();
        if (typeof tempValues === "object" && tempValues !== null) {
          Object.keys(tempValues).map((key) => {
            Object.keys(tempValues[key][0]).map((i) => {

              if (key === "exam") {
                examobj = values.exam[0];
              }
              if (key === "examFAQ") {
                examobj[key] = tempValues[key]
              }
              if (key === "examMainStream") {
                examobj[key] = tempValues[key][0];

              } else {
                if (payload?.payload?.length > 0) {

                  examobj['examAbouts'] = payload.payload[0]?.examAbouts[0]
                  examobj['examRegistrations'] = payload.payload[0]?.examRegistrations[0]
                  examobj['examAdmitCards'] = payload.payload[0]?.examAdmitCards[0]
                  examobj['examImportantDate'] = payload.payload[0]?.examImportantDate[0]
                  examobj['examReservations'] = payload.payload[0]?.examReservations[0]
                  examobj['examCentre'] = payload.payload[0]?.examCentre[0]
                  examobj['examEligibilities'] = payload.payload[0]?.examEligibilities[0]
                  examobj['examPatterns'] = payload.payload[0]?.examPatterns[0]
                  examobj['examSyllabuss'] = payload.payload[0]?.examSyllabuss[0]
                  examobj['examPreparationTip'] = payload.payload[0]?.examPreparationTip[0]
                  examobj['examCounsellings'] = payload.payload[0]?.examCounsellings[0]
                  examobj['examParticipatingCollege'] = payload.payload[0]?.examParticipatingCollege[0]
                  examobj['examFAQ'] = payload.payload[0]?.examFAQ

                } else {
                  if (key !== 'examFAQ')
                    examobj[key] = {
                      ...examobj[key],
                      [i]: tempValues[key][0][i],
                    };
                }
              }
            });
          });
        }

        delete examobj.exam;
        if (prevExamData?.examName === examobj?.examName) {
          delete examobj.examName;
        }
        if (examlogo) {
          examobj.uniqueId = examlogo?.name?.split("_")[0];
          formdata.append("examLogoFile", examlogo);
        }
        formdata.append("examData", JSON.stringify(examobj));

        dispatch(editExam(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Exam updated");
            router.push("/admin/exams");
          } else {
            toast.error("error");
          }
        });
      }
    } else {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        let data = { payload: [{}] };
        data.payload[0] = values;
        let formdata = new FormData();
        FileState.map((item, i) => {
          data.payload[0].examFAQ[item?.index].uniqueId =
            item?.file?.name?.split("_")[0];
          formdata.append("imageFile", item.file);
        });
        data.payload[0].exam[0].uniqueId = examlogo?.name?.split("_")[0];
        formdata.append("examLogoFile", examlogo);

        Object.values(values).map((ele, ind) =>
          ele.map((e) => {
            Object.values(e).some((item) => {
              if (item !== null) {
                data.payload[0][Object.keys(values)[ind]] = ele;
              }
            });
          })
        );

        formdata.append("examData", JSON.stringify(data));
        dispatch(addExam(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Exam Added");
            router.push("/admin/exams");
          } else {
            toast.error("error");
          }
        });
      }
    }
  };

  const validate = (values) => {
    let errors = {};
    const itemArray = [];
    if (dataValue === 0) {
      values.exam?.map((ele, index) => {
        let error = {};
        // if (!ele.mainStreamId) {
        //   error["mainStreamId"] = "*";
        // }
        if (!ele.courseTypeId) {
          error["courseTypeId"] = "*";
        }
        if (!ele.examName) {
          error["examName"] = "*";
        }
        if (!ele.examTypeId) {
          error["examTypeId"] = "*";
        }
        if (!ele.examModeId) {
          error["examModeId"] = "*";
        }
        if (!ele.applicationModeId) {
          error["applicationModeId"] = "*";
        }
        if (!ele.examApplicationDate) {
          error["examApplicationDate"] = "*";
        }
        if (!ele.examDate) {
          error["examDate"] = "*";
        }
        if (!ele.resultAnnouncementDate) {
          error["resultAnnouncementDate"] = "*";
        }
        itemArray.push(error);
      });
      errors["exam"] = itemArray;
    }
    return errors;
  };

  const init = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    if (prevExamData) {
      const initialValues = {
        exam: [
          {
            id: prevExamData?.id,
            mainStreamId: prevExamData?.mainStreamId,
            courseTypeId: prevExamData?.courseTypeId,
            examName: prevExamData?.examName,
            examTypeId: prevExamData?.examTypeId,
            examModeId: prevExamData?.examModeId,
            applicationModeId: prevExamData?.applicationModeId,
            examApplicationDate: prevExamData?.examApplicationDate,
            examDate: prevExamData?.examDate,
            resultAnnouncementDate: prevExamData?.resultAnnouncementDate,
          },
        ],

        examAbouts: [
          {

            id:  prevExamData?.ExamAbout[0]?.id ,
            examAboutDefination:
              prevExamData?.ExamAbout[0]?.examAboutDefination,
            examAboutHighlights:
              prevExamData?.ExamAbout[0]?.examAboutHighlights,
            examAboutImportantDates:
              prevExamData?.ExamAbout[0]?.examAboutImportantDates,
            examAboutPattern:
              prevExamData?.ExamAbout[0]?.examAboutPattern,
            examAboutSyllabus:
              prevExamData?.ExamAbout[0]?.examAboutSyllabus,
            examAboutImportantBooks:
              prevExamData?.ExamAbout[0]?.examAboutImportantBooks,
            examAboutHelpLine:
              prevExamData?.ExamAbout[0]?.examAboutHelpLine,
            examAboutPreviousPapers:
              prevExamData?.ExamAbout[0]?.examAboutPreviousPapers,
          },
        ],
        examRegistrations: [
          {
            id:
              
              prevExamData?.Registration[0]?.id,
            examRegistrationHighlights:
              prevExamData?.Registration[0]?.examRegistrationHighlights || "",
            applicationDate:
              prevExamData?.Registration[0]?.applicationDate || "",
            applicationFees:
              prevExamData?.Registration[0]?.applicationFees || "",
            eligibility: prevExamData?.Registration[0]?.eligibility || "",
            documentsRequired:
              prevExamData?.Registration[0]?.documentsRequired || "",
            guide: prevExamData?.Registration[0]?.guide || "",
            applicationFormCorrection:
              prevExamData?.Registration[0]?.applicationFormCorrection || "",
          },
        ],
        examAdmitCards: [
          {
            id:
              
              prevExamData?.AdmitCard[0]?.id,
            examAdmitCardHighlights:
              prevExamData?.AdmitCard[0]?.examAdmitCardHighlights || "",
            releaseDate: prevExamData?.AdmitCard[0]?.releaseDate || "",
            howToDownload: prevExamData?.AdmitCard[0]?.howToDownload || "",
            sample: prevExamData?.AdmitCard[0]?.sample || "",
            forgotLoginDetails:
              prevExamData?.AdmitCard[0]?.forgotLoginDetails || "",
            correction: prevExamData?.AdmitCard[0]?.correction || "",
          },
        ],
        examImportantDate: [
          {
            id:
              
              prevExamData?.Reservation[0]?.id,
            examImportantDatesIntro:
              prevExamData?.ImportantDates[0]?.examImportantDatesIntro || "",
            examSchedule: prevExamData?.ImportantDates[0]?.examSchedule || "",
            scheduleForOtherSession:
              prevExamData?.ImportantDates[0]?.scheduleForOtherSession || "",
          },
        ],
        examReservations: [
          {
            id:
              
              prevExamData?.Reservation[0]?.id,
            examReservationIntro:
              prevExamData?.Reservation[0]?.examReservationIntro || "",
            examReservationHighlights:
              prevExamData?.Reservation[0]?.examReservationHighlights || "",
            criteria: prevExamData?.Reservation[0]?.criteria || "",
            categoryWise: prevExamData?.Reservation[0]?.categoryWise || "",
            forWomen: prevExamData?.Reservation[0]?.forWomen || "",
            forPWDWomen: prevExamData?.Reservation[0]?.forPWDWomen || "",
            underEWSQuota: prevExamData?.Reservation[0]?.underEWSQuota || "",
          },
        ],
        examCentre: [
          {
            id:
              
              prevExamData?.Centres[0]?.id,
            examCentreIntro: prevExamData?.Centres[0]?.examCentreIntro || "",
            listOfExamCentres:
              prevExamData?.Centres[0]?.listOfExamCentres || "",
          },
        ],
        examEligibilities: [
          {
            id:
              
              prevExamData?.Eligibility[0]?.id,
            examEligibilityIntro:
              prevExamData?.Eligibility[0]?.examEligibilityIntro || "",
            examEligibilityHighlights:
              prevExamData?.Eligibility[0]?.examEligibilityHighlights || "",
            detailedCriteria:
              prevExamData?.Eligibility[0]?.detailedCriteria || "",
            marksRequiredForQualifying:
              prevExamData?.Eligibility[0]?.marksRequiredForQualifying || "",
          },
        ],
        examPatterns: [
          {
            id:
              
              prevExamData?.Pattern[0]?.id,
            examPatternHighlights:
              prevExamData?.Pattern[0]?.examPatternHighlights || "",
            examPatternPaper1Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper1Pattern || "",
            examPatternPaper2Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper2Pattern || "",
            examPatternPaper3Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper3Pattern || "",
            examPatternPaper4Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper4Pattern || "",
            examPatternPaper5Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper5Pattern || "",
            examPatternPaper6Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper6Pattern || "",
            weightage: prevExamData?.Pattern[0]?.weightage || "",
          },
        ],


        examSyllabuss: [
          {
            id:
            
              prevExamData?.Syllabus[0]?.id,
            examSyllabusHighlights:
              prevExamData?.Syllabus[0]?.examSyllabusHighlights || "",
            examSyllabusPaper1Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper1Pattern || "",
            examSyllabusPaper2Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper2Pattern || "",
            examSyllabusPaper3Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper3Pattern || "",
            examSyllabusPaper4Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper4Pattern || "",
            examSyllabusPaper5Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper5Pattern || "",
            examSyllabusPaper6Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper6Pattern || "",
            bestBooks: prevExamData?.Syllabus[0]?.bestBooks || "",
          },
        ],

        examPreparationTip: [
          {
            id:
              
              prevExamData?.PreparationTips[0]?.id,
            bestTime: prevExamData?.PreparationTips[0]?.bestTime || "",
            sectionWisePreparationTips:
              prevExamData?.PreparationTips[0]?.sectionWisePreparationTips ||
              "",
            subject1Books:
              prevExamData?.PreparationTips[0]?.subject1Books || "",
            subject2Books:
              prevExamData?.PreparationTips[0]?.subject2Books || "",
            subject3Books:
              prevExamData?.PreparationTips[0]?.subject3Books || "",
            subject4Books:
              prevExamData?.PreparationTips[0]?.subject4Books || "",
          },
        ],
        examCounsellings: [
          {
            id:
              
              prevExamData?.Counselling[0]?.id,
            stepByStepProcess:
              prevExamData?.Counselling[0]?.stepByStepProcess || "",
            scheduleForExams:
              prevExamData?.Counselling[0]?.scheduleForExams || "",
            otherRelatedExamsCounselling:
              prevExamData?.Counselling[0]?.otherRelatedExamsCounselling || "",
          },
        ],
        examParticipatingCollege: [
          {
            id:
              
              prevExamData?.ParticipatingCollege[0]?.id,
            listOfTopCollegesAcceptingJEE:
              prevExamData?.ParticipatingCollege[0]
                ?.listOfTopCollegesAcceptingJEE || "",
          },
        ],

        examFAQ: prevExamData?.FAQ.length === 0
          ? [
            {
              question: null,
              answer: null,
              answerType: null,
            }
          ]
          : prevExamData?.FAQ.map((item) => {
            let unqId = item.image && Number(item?.image.split("_")[0]);
            return {
              id: item.id,
              question: item.question,
              answerType: item.answerType,
              answer: item.answer,
              uniqueId: unqId,
            };
          }),
        examMainStream: [],

      };

      prevExamData?.MainStreamList?.map((item) => {
        initialValues.examMainStream.push({
          mainStreamId: item?.mainStreamId,
          id: item?.id,
        });
      });

      return initialValues;
    } else {
      const initialValues = {
        exam: [
          {
            // mainStreamId: "",
            courseTypeId: "",
            examName: "",
            examTypeId: "",
            examModeId: "",
            applicationModeId: "",
            examApplicationDate: "",
            examDate: "",
            resultAnnouncementDate: "",
          },
        ],
        examMainStream: [
          {
            mainStreamId: "",
          },
        ],
        examAbouts: [
          {
            examAboutDefination: '',
            examAboutHighlights: '',
            examAboutImportantDates: '',
            examAboutPattern: '',
            examAboutSyllabus: '',
            examAboutImportantBooks: '',
            examAboutHelpLine: '',
            examAboutPreviousPapers: '',
          },
        ],
        examRegistrations: [
          {
            examRegistrationHighlights: null,
            applicationDate: null,
            applicationFees: null,
            eligibility: null,
            documentsRequired: null,
            guide: null,
            applicationFormCorrection: null,
          },
        ],
        examAdmitCards: [
          {
            examAdmitCardHighlights: null,
            releaseDate: null,
            howToDownload: null,
            sample: null,
            forgotLoginDetails: null,
            correction: null,
          },
        ],
        examImportantDate: [
          {
            examImportantDatesIntro: null,
            examSchedule: null,
            scheduleForOtherSession: null,
          },
        ],
        examReservations: [
          {
            examReservationIntro: null,
            examReservationHighlights: null,
            criteria: null,
            categoryWise: null,
            forWomen: null,
            forPWDWomen: null,
            underEWSQuota: null,
          },
        ],
        examCentre: [
          {
            examCentreIntro: null,
            listOfExamCentres: null,
          },
        ],
        examEligibilities: [
          {
            examEligibilityIntro: null,
            examEligibilityHighlights: null,
            detailedCriteria: null,
            marksRequiredForQualifying: null,
          },
        ],
        examPatterns: [
          {
            examPatternHighlights: null,
            examPatternPaper1Pattern: null,
            examPatternPaper2Pattern: null,
            examPatternPaper3Pattern: null,
            examPatternPaper4Pattern: null,
            examPatternPaper5Pattern: null,
            examPatternPaper6Pattern: null,
            weightage: null,
          },
        ],
        examSyllabuss: [
          {
            examSyllabusHighlights: null,
            examSyllabusPaper1Pattern: null,
            examSyllabusPaper2Pattern: null,
            examSyllabusPaper3Pattern: null,
            examSyllabusPaper4Pattern: null,
            examSyllabusPaper5Pattern: null,
            examSyllabusPaper6Pattern: null,
            bestBooks: null,
          },
        ],
        examPreparationTip: [
          {
            bestTime: null,
            sectionWisePreparationTips: null,
            subject1Books: null,
            subject2Books: null,
            subject3Books: null,
            subject4Books: null,
          },
        ],
        examCounsellings: [
          {
            stepByStepProcess: null,
            scheduleForExams: null,
            otherRelatedExamsCounselling: null,
          },
        ],
        examParticipatingCollege: [{ listOfTopCollegesAcceptingJEE: null }],
        examFAQ: [{ question: null, answerType: null, answer: null }],
      };
      return initialValues;
    }
  };

  const handlefaqremove = (index) => {
    let x = [];
    FileState.map((item, i) => {
      if (item.index !== index) {
        x.push(item);
      }
    });
    setFileState(x);
  };

  const handleFileChange = (filesObject, name, index) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);
    file["nameType"] = name;
    if (FileState.length === 0) {
      setFileState([{ file: file, index: index }]);
    } else {
      let x = FileState;
      FileState.map((item, i) => {
        if (item.index === index) {
          FileState.splice(i, 1);
          x.push({ file: file, index: index });
          setFileState(x);
        } else {
          setFileState([...FileState, { file: file, index: index }]);
        }
      });
    }
  };

  const examlogohandles = (filesObject) => {
    if (Id) {
      let uniqueId = prevExamData?.examLogo?.split("_")[0];
      let filename = uniqueId + "_" + filesObject[0].name;
      let file = new File(filesObject, filename);
      setExamlogo(file);
    } else {
      let uniqueId = Date.now();
      let filename = uniqueId + "_" + filesObject[0].name;
      let file = new File(filesObject, filename);
      setExamlogo(file);
    }
  };

  const [ExamAboutCMS, setExamAboutCMS] = useState(examAbout[0].key);
  const [RegistrationCMS, setRegistrationCMS] = useState(Registration[0].key);
  const [AdmitCardCMS, setAdmitCardCMS] = useState(AdmitCard[0].key);
  const [ImportantDatesCMS, setImportantDatesCMS] = useState(
    ImportantDates[0].key
  );
  const [ReservationCMS, setReservationCMS] = useState(Reservation[0].key);
  const [ExamsCentresCMS, setExamsCentresCMS] = useState(ExamsCentres[0].key);
  const [EligibilityCMS, setEligibilityCMS] = useState(Eligibility[0].key);
  const [ExamPatternCMS, setExamPatternCMS] = useState(ExamPattern[0].key);
  const [SyllabusCMS, setSyllabusCMS] = useState(Syllabus[0].key);
  const [PreparationTipsCMS, setPreparationTipsCMS] = useState(
    PreparationTips[0].key
  );
  const [CounsellingCMS, setCounsellingCMS] = useState(Counselling[0].key);
  const [ParticipatingCollegesCMS, setParticipatingCollegesCMS] = useState(
    ParticipatingColleges[0].key
  );


  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0 d-flex">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
              <ul className="nav tabs_scroll">
                {FormSteps &&
                  FormSteps?.map((steps, stepsIndex) => (
                    <li className="nav-item " key={stepsIndex}>
                      <a
                        className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
                          }`}
                        // active={true}
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
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        keepDirtyOnReinitialize
        validate={validate}
        initialValues={useMemo((e) => init(e), [prevExamData])}
        render={({ handleSubmit, values, dirtyFields, initialValues }) => (
          <form onSubmit={handleSubmit}>
            {/* {prevExamLoader.loading && <h1>Loading...</h1>} */}
            {dataValue === 0 && (
              <>
                <FieldArray name="exam">
                  {({ fields }) => (
                    <>
                      {fields.map((name, index) => (
                        <div key={index}>
                          <Row>

                            {/* <Col md={12} lg={6}>
                              <Field name={`${name}.mainStreamId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Main Stream
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
                                        Select Main Stream
                                      </option>
                                      {mainStreamdata &&
                                        mainStreamdata?.map((item, index) => {
                                          return (
                                            <option key={index} value={item.id}>
                                              {item?.mainStreamName}
                                            </option>
                                          );
                                        })}
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
                            </Col> */}

                            <Col md={12} lg={6}>
                              <Field name={`${name}.courseTypeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Course Type
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
                                        Select Course Type
                                      </option>
                                      {masterFilterData &&
                                        masterFilterData?.coursetype?.map(
                                          (item, index) => {
                                            if (item?.types === "coursetype") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={Number(item.id)}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examName`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Name
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
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examTypeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Type
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
                                      {!Id && (
                                        <option value="">
                                          Select Exam Type
                                        </option>
                                      )}
                                      {masterFilterData &&
                                        masterFilterData?.examtype?.map(
                                          (item, index) => {
                                            if (item.types === "examtype") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={Number(item.id)}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examModeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Mode
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
                                      {!Id && (
                                        <option value="">
                                          Select Exam Mode
                                        </option>
                                      )}
                                      {masterFilterData &&
                                        masterFilterData?.exammode?.map(
                                          (item, index) => {
                                            if (item.types === "exammode") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={Number(item.id)}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.applicationModeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Application mode
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
                                      <option>Select Application mode</option>
                                      {masterFilterData &&
                                        masterFilterData?.applicationmode?.map(
                                          (item, index) => {
                                            if (
                                              item.types === "applicationmode"
                                            ) {
                                              return (
                                                <option
                                                  key={index}
                                                  value={Number(item.id)}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examApplicationDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Application Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="input"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="DD/MM/YYYY - DD/MM/YYYY"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="input"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="DD/MM/YYYY - DD/MM/YYYY"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.resultAnnouncementDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Result Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="date"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examLogoFile`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Logo
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      onChange={(e) => {
                                        examlogohandles(e.target.files);
                                      }}
                                      type="file"
                                      className="form-control signup_form_input"
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                              {/* <Field name={`${name}.examLogoFile`} component="input" type="file"/> */}
                            </Col>
                            <label className="signup_form_label">
                              Main Stream
                            </label>
                            <FieldArray name="examMainStream">
                              {({ fields }) => (
                                <>
                                  {fields?.map((name, index) => (
                                    <>
                                      <Col md={12} lg={6}>
                                        <div className="d-flex">
                                          <Field name={`${name}.mainStreamId`}>
                                            {({ input, meta }) => (
                                              <>
                                                <div className="d-flex">
                                                  {meta.error &&
                                                    meta.touched && (
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
                                                    Select Main Stream
                                                  </option>
                                                  {mainStreamdata &&
                                                    mainStreamdata?.map(
                                                      (item, index) => {
                                                        let x =
                                                          values?.examMainStream?.find(
                                                            (ele) => {

                                                              return (
                                                                ele?.mainStreamId ==
                                                                item?.id
                                                              );
                                                            }
                                                          );
                                                        // if(!x){
                                                        return (
                                                          <option
                                                            key={index}
                                                            value={Number(
                                                              item.id
                                                            )}
                                                          >
                                                            {
                                                              item?.mainStreamName
                                                            }
                                                          </option>
                                                        );
                                                        // }
                                                      }
                                                    )}
                                                </select>
                                                {/* <img
                                              onClick={() =>
                                                fields.push({
                                                  mainStreamId: "",
                                                })
                                              }
                                              className="add_remove_icon m-2 cursor_pointer"
                                              src="/images/question-add-icon.png"
                                            /> */}
                                              </>
                                            )}
                                          </Field>

                                          <div className="d-flex plus_minus_btn_row">
                                            <div
                                              type="button"
                                              className="add_remove_btn"
                                              onClick={() =>
                                                fields.push({
                                                  mainStreamId: "",
                                                })
                                              }
                                            >
                                              <img
                                                className="add_remove_icon"
                                                src="/images/plus.png"
                                              />
                                            </div>
                                            {fields.length > 1 && (
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
                                            )}
                                          </div>
                                        </div>
                                      </Col>
                                    </>
                                  ))}
                                </>
                              )}
                            </FieldArray>
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
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </>
            )}
            {dataValue === 1 && (
              <>
                <div>
                  {/* <Row>
                    <Col>
                      <h4>Exam About</h4>
                      <FieldArray name="examAbout">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {examAbout?.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Exam About</h4>
                      <FieldArray name="examAbouts">
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
                                      {examAbout &&
                                        examAbout.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${ExamAboutCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setExamAboutCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {examAbout &&
                                  examAbout.map(
                                    (steps, stepsIndex) =>
                                      ExamAboutCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Registration</h4>
                      <FieldArray name="examRegistration">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                defaultActiveKey={0}
                                className="mb-3"
                                key={index}
                              >
                                {Registration.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Registration</h4>
                      <FieldArray name="examRegistrations">
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
                                      {Registration &&
                                        Registration.map(
                                          (steps, stepsIndex) => (
                                            <li
                                              className="nav-item"
                                              key={steps.key}
                                            >
                                              <a
                                                className={`nav-link admin_tabs_name cms_tabs ${RegistrationCMS ===
                                                  steps.key && "cms_active"
                                                  }`}
                                                active="true"
                                                onClick={() =>
                                                  setRegistrationCMS(steps.key)
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

                                {Registration &&
                                  Registration.map(
                                    (steps, stepsIndex) =>
                                      RegistrationCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Admit Card</h4>
                      <FieldArray name="examAdmitCard">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {AdmitCard.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Admit Card</h4>
                      <FieldArray name="examAdmitCards">
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
                                      {AdmitCard &&
                                        AdmitCard.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${AdmitCardCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setAdmitCardCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {AdmitCard &&
                                  AdmitCard.map(
                                    (steps, stepsIndex) =>
                                      AdmitCardCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Important Dates</h4>
                      <FieldArray name="examImportantDates">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ImportantDates.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">
                        Important Dates
                      </h4>
                      <FieldArray name="examImportantDate">
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
                                      {ImportantDates &&
                                        ImportantDates.map(
                                          (steps, stepsIndex) => (
                                            <li
                                              className="nav-item"
                                              key={steps.key}
                                            >
                                              <a
                                                className={`nav-link admin_tabs_name cms_tabs ${ImportantDatesCMS ===
                                                  steps.key && "cms_active"
                                                  }`}
                                                active="true"
                                                onClick={() =>
                                                  setImportantDatesCMS(
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

                                {ImportantDates &&
                                  ImportantDates.map(
                                    (steps, stepsIndex) =>
                                      ImportantDatesCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Reservation</h4>
                      <FieldArray name="examReservation">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Reservation.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Reservation</h4>
                      <FieldArray name="examReservations">
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
                                      {Reservation &&
                                        Reservation.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${ReservationCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setReservationCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {Reservation &&
                                  Reservation.map(
                                    (steps, stepsIndex) =>
                                      ReservationCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Exams Centres</h4>
                      <FieldArray name="examCentre">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ExamsCentres.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">
                        Exams Centres
                      </h4>
                      <FieldArray name="examCentre">
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
                                      {ExamsCentres &&
                                        ExamsCentres.map(
                                          (steps, stepsIndex) => (
                                            <li
                                              className="nav-item"
                                              key={steps.key}
                                            >
                                              <a
                                                className={`nav-link admin_tabs_name cms_tabs ${ExamsCentresCMS ===
                                                  steps.key && "cms_active"
                                                  }`}
                                                active="true"
                                                onClick={() =>
                                                  setExamsCentresCMS(steps.key)
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

                                {ExamsCentres &&
                                  ExamsCentres.map(
                                    (steps, stepsIndex) =>
                                      ExamsCentresCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Eligibility</h4>
                      <FieldArray name="examEligibility">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Eligibility.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Eligibility</h4>
                      <FieldArray name="examEligibilities">
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
                                      {Eligibility &&
                                        Eligibility.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${EligibilityCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setEligibilityCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {Eligibility &&
                                  Eligibility.map(
                                    (steps, stepsIndex) =>
                                      EligibilityCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Exam Pattern</h4>
                      <FieldArray name="examPattern">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ExamPattern.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Exam Pattern</h4>
                      <FieldArray name="examPatterns">
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
                                      {ExamPattern &&
                                        ExamPattern.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${ExamPatternCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setExamPatternCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {ExamPattern &&
                                  ExamPattern.map(
                                    (steps, stepsIndex) =>
                                      ExamPatternCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Syllabus</h4>
                      <FieldArray name="examSyllabus">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Syllabus.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Syllabus</h4>
                      <FieldArray name="examSyllabuss">
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
                                      {Syllabus &&
                                        Syllabus.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${SyllabusCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setSyllabusCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {Syllabus &&
                                  Syllabus.map(
                                    (steps, stepsIndex) =>
                                      SyllabusCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Preparation Tips</h4>
                      <FieldArray name="examPreparationTips">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {PreparationTips.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">
                        Preparation Tips
                      </h4>
                      <FieldArray name="examPreparationTip">
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
                                      {PreparationTips &&
                                        PreparationTips.map(
                                          (steps, stepsIndex) => (
                                            <li
                                              className="nav-item"
                                              key={steps.key}
                                            >
                                              <a
                                                className={`nav-link admin_tabs_name cms_tabs ${PreparationTipsCMS ===
                                                  steps.key && "cms_active"
                                                  }`}
                                                active="true"
                                                onClick={() =>
                                                  setPreparationTipsCMS(
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

                                {PreparationTips &&
                                  PreparationTips.map(
                                    (steps, stepsIndex) =>
                                      PreparationTipsCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                      <h4 className="mt-4">Counselling</h4>
                      <FieldArray name="examCounselling">
                        {({ fields }) => (
                          <>
                            {fields.map((name, fieldIndex) => (
                              <Tabs
                                key={fieldIndex}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Counselling.map((item, index) => {
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
                      <h4 className="mb-3 commun_heading ps-3">Counselling</h4>
                      <FieldArray name="examCounsellings">
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
                                      {Counselling &&
                                        Counselling.map((steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${CounsellingCMS === steps.key &&
                                                "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setCounsellingCMS(steps.key)
                                              }
                                            >
                                              {steps.title}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </ScrollingCarousel>
                                </div>

                                {Counselling &&
                                  Counselling.map(
                                    (steps, stepsIndex) =>
                                      CounsellingCMS === steps.key && (
                                        <Field name={`${name}.${steps.key}`}>
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
                </div>
                {/* <Row>
                  <Col>
                    <h4 className="mt-4">Participating Colleges</h4>
                    <FieldArray name="examParticipatingColleges">
                      {({ fields }) => (
                        <>
                          {fields?.map((name, fieldIndex) => (
                            <Tabs
                              key={fieldIndex}
                              defaultActiveKey={0}
                              className="mb-3"
                            >
                              {ParticipatingColleges?.map((item, index) => {
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
                    <h4 className="mb-3 commun_heading ps-3">
                      Participating Colleges
                    </h4>
                    <FieldArray name="examParticipatingCollege">
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
                                    {ParticipatingColleges &&
                                      ParticipatingColleges.map(
                                        (steps, stepsIndex) => (
                                          <li
                                            className="nav-item"
                                            key={steps.key}
                                          >
                                            <a
                                              className={`nav-link admin_tabs_name cms_tabs ${ParticipatingCollegesCMS ===
                                                steps.key && "cms_active"
                                                }`}
                                              active="true"
                                              onClick={() =>
                                                setParticipatingCollegesCMS(
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

                              {ParticipatingColleges &&
                                ParticipatingColleges.map(
                                  (steps, stepsIndex) =>
                                    ParticipatingCollegesCMS === steps.key && (
                                      <Field name={`${name}.${steps.key}`}>
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
                    <h4 className="mb-3 commun_heading ps-3">FAQs</h4>
                    <FieldArray name="examFAQ">
                      {({ fields }) => (
                        <>
                          {fields?.map((name, index) => (
                            <div key={index}>
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
                              <Row className="mt-4">
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
                                          type="file"
                                          name={`${name}.image`}
                                          onChange={(e) => {
                                            handleFileChange(
                                              e.target.files,
                                              e.target.name,
                                              index
                                            );
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
                                </Col>
                              </Row>
                            </div>
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
                    // onClick={()=>{ddddddddddd(values,dirtyFields)}}
                    >
                      Add Category
                    </button>
                  </Col>
                </Row>
              </>
            )}
          </form>
        )}
      />
    </>
  );
}
