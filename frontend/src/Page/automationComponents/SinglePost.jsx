import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
// import FormSelect from "react-bootstrap/esm/FormSelect";
import Row from "react-bootstrap/esm/Row";
import { AiTwotoneHighlight } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
// import { BiSmile } from "react-icons/bi";
// import { FaImage } from "react-icons/fa";
// import { AiOutlineFolder } from "react-icons/ai";
// import { AiOutlineGif } from "react-icons/ai";
// import { BsClock } from "react-icons/bs";
// import { AiFillCaretDown } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
    FacbookPostPublish,
  get_Facebook_Data,
  get_Facebook_Pages,
} from "../../redux/actions/LoginAction";
import { getUserId } from "../../utils/auth";
import Loader from "../Components/Loader";
import { Field, Form } from "react-final-form";

function SinglePost() {
  const [socialColor, setSocialColor] = useState();
  const [facebook, setFacebook] = useState();
  const [onShow, setOnShow] = useState(false);
  const [pageDetails, setPageDetails] = useState();
  // Select States

  const [isSearchable, setIsSearchable] = useState(true);


  const dispatch = useDispatch();
  const SelectSocial = (clicked) => {
    if (clicked === "facebook") {
      setSocialColor(clicked);
      dispatch(get_Facebook_Data({ userId: getUserId().id })).then((res) => {
        console.log(res.payload);
        setOnShow(true);
      });
    } else if (clicked === "instagram") {
      setSocialColor(clicked);
    }
  };
  const userAccountId = useSelector(
    (state) => state?.GetFacebookAccount?.Facebook[0]
  );
  const userAccountIdLoading = useSelector(
    (state) => state?.GetFacebookAccount?.isLoading
  );
  const AllFacebookPage = useSelector(
    (state) => state?.getPages?.getFacebookPages
  );

  let optionsValues;
  let MapPages = [];
  if(AllFacebookPage){
    for (let i = 0; i < AllFacebookPage?.length; i++) {
        optionsValues = {
          value: AllFacebookPage[i]?.page_id,
          label: AllFacebookPage[i]?.page_name,
          key: AllFacebookPage[i]?.session
        };
        MapPages.push(optionsValues);
      }
  }
 
  const onChange = (change) => {
    setFacebook(change)
    if (change === "pages") {
      dispatch(
        get_Facebook_Pages({
          id: userAccountId?._id,
          field: "name,access_token",
        })
      );
    }
  };
  const selectPageChange = (values) => {
    console.log(values, "valuesvaluesvalues");
    setPageDetails(values)
  };
  const onSubmit = async (values) => {
    // console.log(values,pageDetails)
    dispatch(FacbookPostPublish({page: pageDetails?.key, page_id: pageDetails?.value, msg: values?.messege}))
  }
  return (
    <div>
      {userAccountIdLoading && <Loader />}
      <Container>
        <h2>
          {" "}
          <AiTwotoneHighlight size={20} /> Create Post
        </h2>
        <div className="">
          <Row>
            <Col sm={6}>
              <div className="  ">
                <ul>
                  <li className="d-inline-block px-2">
                    <p>Sharing to</p>{" "}
                  </li>
                  <li className="d-inline-block px-2 ">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => SelectSocial("facebook")}
                    >
                      <BsFacebook
                        color={
                          socialColor === "facebook" ? "#3b5998" : "#808080"
                        }
                        size={35}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </Col>
            <Col sm={12} className="mb-4">
              {onShow === true && (
                <>
                  <div className="d-flex gap-4 flex-wrap mb-3">
                    <div className="d-flex gap-2">
                      <input
                        id="radio1"
                        type="radio"
                        value="pages"
                        name="facebook"
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <label htmlFor="radio1">Facebook Page</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        id="radio1"
                        type="radio"
                        value="groups"
                        name="facebook"
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <label htmlFor="radio1">Facebook groups</label>
                    </div>
                  </div>
                  <div className="new_select">
                    {facebook === "pages" && (
                      <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={"Select Page"}
                      isSearchable={isSearchable}
                      name="color"
                      options={MapPages}
                      onChange={selectPageChange}
                      />
                    )}
                   
                  </div>
                </>
              )}
            </Col>
            <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>

        <Col sm={12}>
        <Field
            id="textInput"
              className="form-control mb-3"
              name="messege"
              component="textarea"
              type="text"
              placeholder="Enter Message"
            />
             <Field
            id="textInput"
              className="form-control mb-3"
              name="file"
              component="input"
              type="file"
              placeholder="Enter Message"
            />
              
          </Col>
          <Col sm={12}>
              {/* <div className="d-flex justify-content-between border new_border-color my-3 p-2">
                <div>
                  <ul className="mb-0">
                    <li className="d-inline-block px-2">
                      <BiSmile />{" "}
                    </li>
                    <li className="d-inline-block px-2">
                      <FaImage />{" "}
                    </li>
                    <li className="d-inline-block px-2">
                      <AiOutlineFolder />{" "}
                    </li>
                    <li className="d-inline-block px-2">
                      <AiOutlineGif />{" "}
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="mb-0">
                    <li className="d-inline-block px-2">
                      <BsClock />{" "}
                    </li>
                    <li className="d-inline-block">
                      <p className="mb-0">Today 12:00 </p>{" "}
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="text-end d-flex gap-3 justify-content-end">
                <button className="bg-black btn text-white">
                  Publish 
                </button>
                <button disabled  className="bg-black btn text-white">
                Schedule
                </button>
              </div>
            </Col>
          </form>)}/>
           
            
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default SinglePost;
