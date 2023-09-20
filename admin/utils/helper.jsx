import mammoth from 'mammoth';

export const FieldTypes = {
  fields: "fields",
  fieldArray: "fieldArray",
  actions: "actions",
};

export const inputFieldTypes = {
  reactselect: "reactselect",
  textarea: "textarea",
  text: "text",
  date: "date",
  file: "file",
  password: "password",
  email: "email",
  number: "number",
  year: "year",
  radio: "radio",
  checkbox: "checkbox",
};

export const buttonTypes = {
  submit: "submit",
  reset: "reset",
  push: "push",
  pop: "pop",
  remove: "remove",
};

export const refined = (title) =>
  title?.toLowerCase()?.replace(/[/\s?]+/g, "-");

export const collegeAbout = [
  { title: "Intro", key: "aboutIntro" },
  { title: "Highlights", key: "aboutHighLights" },
  { title: "Ranking & Awards", key: "aboutRankingAndAwards" },
  { title: "Courses", key: "aboutCourses" },
  { title: "Scholarship Placements", key: "aboutScholarShipPlacements" },
  { title: "Facilities", key: "aboutFacilities" },
];

export const collegeadmission = [
  { title: "Intro", key: "admissionIntro" },
  { title: "About Test", key: "admissionAboutTest" },
  { title: "Imp. Dates", key: "admissionImportantDates" },
  { title: "Admission Highlights", key: "admissionHighLights" },
  { title: "Application Process", key: "applicationProcess" },
  { title: "PHD Admission Process", key: "PHDadmissionProcess" },
];

export const distanceeducation = [
  { title: "Basic Info", key: "basicInfo" },
  { title: "Course Details", key: "courseDetails" },
  { title: "Honors", key: "honors" },
];

export const scholarship = [
  { title: "Intro", key: "scholarShipIntro" },
  { title: "Based on Uni Exams", key: "basedOnUniExams" },
  { title: "Based on Admission Test", key: "basedOnAdmissionTest" },
  { title: "Based on Sports Quota", key: "basedOnSportsQuota" },
  { title: "Based on Diploma, Grad", key: "basedOnDiplomaGraduates" },
];

export const placements = [
  { title: "Intro", key: "placeMentIntro" },
  { title: "Highlights 2021", key: "highLights2021" },
  { title: "MBA Highlights", key: "MBAhighLights" },
  { title: "BTECH Highlights", key: "BTECHhighLights" },
  { title: "Year Wise Placements", key: "yearWisePlaceMents" },
  { title: "Top Recruiters", key: "topRecruiters" },
];

export const userRoles = {
  superadmin: "superadmin",
  admin: "admin",
  user: "user",
};

export const wordToJSON = async (file) => {
  let json;
  if (file) {
    json = await mammoth.convertToHtml({ arrayBuffer: file })
  }
  return json;
};
