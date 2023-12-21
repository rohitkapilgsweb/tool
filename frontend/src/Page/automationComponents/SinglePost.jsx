import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
// import FormSelect from "react-bootstrap/esm/FormSelect";
import Row from "react-bootstrap/esm/Row";
import { AiTwotoneHighlight } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
    FacbookPostPublish,
  MediaUploads,
  getAllPost,
  getSigleMedia,
  get_Facebook_Data,
  get_Facebook_Pages,
} from "../../redux/actions/LoginAction";
import { getUserId } from "../../utils/auth";
import Loader from "../Components/Loader";
import { Field, Form } from "react-final-form";
import { CurrentApi } from "../../config/config";
import CommonModal from "../../admin/components/CommonModal";
import Media from "../Media";
import ClockLoader from "react-spinners/ClockLoader";

function SinglePost(props) {
  const [socialColor, setSocialColor] = useState();
  const [facebook, setFacebook] = useState();
  const [onShow, setOnShow] = useState(false);
  const [pageDetails, setPageDetails] = useState();
  const [show, setShow] = useState(false);
  const [showINputs, setShowINputs] = useState(false);
  const [file__uri, setFile__uri] = useState();
  const [uploadTime, setUploadTime] = useState(false);
  const [post_platform, setPost_platform] = useState('');
  // Select States

  const [isSearchable, setIsSearchable] = useState(true);
  const [mediaArryFile, SetMediaArryFile] = useState([])
  const [fileData, SetFileData] = useState()
  const [fileNamePost, SetFileNamePost] = useState(true)
  const [getFacebookAccounts, setGetFacebookAccounts] = useState();
  const dispatch = useDispatch();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setStore = (id) => {
    dispatch(getSigleMedia(id)).then((res)=>{
      SetFileData(res?.payload?.data?.file_url)
      handleClose()
    })
  }
  useEffect(()=>{
    dispatch(get_Facebook_Data()).then((res) => {
      setGetFacebookAccounts(res?.payload?.data);
    });
  },[])

const meinImage = fileData
// console.log(post_platform)
  const SelectSocial = (clicked,e) => {
    if (clicked === "facebook") {
      setPost_platform({facebook_type: clicked,e})
      setSocialColor(clicked);
      dispatch(get_Facebook_Data(getUserId()?.user)).then((res) => {
        setOnShow(true);
      });
    } else if (clicked === "instagram") {
      setSocialColor(clicked);
    }
  };
  const userAccountId = useSelector(
    (state) => state?.GetFacebookAccount?.Facebook?.data
  );

  const userAccountIdLoading = useSelector(
    (state) => state?.GetFacebookAccount?.isLoading
  );
  const AllFacebookPage = useSelector(
    (state) => state?.getPages?.getFacebookPages.data
  );
  const AllFacebookPageLoading = useSelector(
    (state) => state?.getPages?.isLoading
  );

  let optionsValues;
  let MapPages = [];
  if(AllFacebookPage){
    for (let i = 0; i < AllFacebookPage?.length; i++) {
        optionsValues = {
          value: AllFacebookPage[i]?.id,
          label: AllFacebookPage[i]?.name,
          key: AllFacebookPage[i]?.access_token
        };
        MapPages.push(optionsValues);
      }
  }
 
  const onChange = (change) => {
    setFacebook(change)
    if (change === "pages") {
      if(userAccountId){
        const payloadData = {
          accessToken:{accessToken: userAccountId[1]?.facebook_token},
          id: userAccountId[1]?.facebook_id
      }
        dispatch(
          get_Facebook_Pages(payloadData)
        );
      }
    }
  };
  const selectPageChange = (values) => {
    setShowINputs(true)
    setPageDetails(values)
  };

  const onSubmit = async (values) => {
   
    values.media = meinImage;
    setUploadTime(true)
     if(values?.messege && !values?.link && !values?.media){
       dispatch(FacbookPostPublish({post_type: post_platform?.facebook_type, page_name: pageDetails?.label ,page_id: pageDetails?.value, page: pageDetails?.key, msg:values?.messege})).then((res)=>{
          setUploadTime(false)
          dispatch(getAllPost())
           props.close()
            
      })
    }
    if(values?.link && !values?.media && !values?.messege){
      dispatch(FacbookPostPublish({post_type:post_platform?.facebook_type, page_name:pageDetails?.label, page_id: pageDetails?.value, page: pageDetails?.key, link:values?.link})).then((res)=>{
        setUploadTime(false)
        dispatch(getAllPost())
        props.close()
      })
    }
     if(values?.media && !values?.link && !values?.messege){
      dispatch(FacbookPostPublish({post_type:post_platform?.facebook_type, page_name:pageDetails?.label, page_id: pageDetails?.value, page: pageDetails?.key, media: values?.media})).then((res)=>{
        setUploadTime(false)
        dispatch(getAllPost())
        props.close()
      })
    }
    if(values?.media && !values?.link && values?.messege){
      dispatch(FacbookPostPublish({post_type:post_platform?.facebook_type, page_name:pageDetails?.label,page_id: pageDetails?.value, page: pageDetails?.key, msg: values?.messege, media: values?.media})).then((res)=>{
        setUploadTime(false)
        dispatch(getAllPost())
        props.close()
    })
    }
        
       
  }


  const colourOptions = [];
  // const facebookPages = [];

  getFacebookAccounts?.map((item) => {
    colourOptions.push({
      value: item?.facebook_id,
      label: item?.facebook_name,
      key: item?.facebook_token,
    });
  });
  // getPages?.map((item) => {
  //   facebookPages.push({
  //     value: item?.id,
  //     label: item?.name,
  //     key: item?.access_token,
  //   });
  // });

  const handelChange = (e) => {
console.log(e)
    SelectSocial("facebook",e)
  };




  return (
    <div className="position-relative">
      {uploadTime && <div className="w-100 loader-clock"><ClockLoader color="#2f65f1" /></div>}
      {AllFacebookPageLoading ? <Loader /> :""}
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
                  <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
                  name="colors"
                  placeholder="Select Accounts..."
                  options={colourOptions}
                  className="basic-multi-select w-100"
                  classNamePrefix="select"
                  onChange={(e) => handelChange(e)}
                />
                    {/* <button
                      className="border-0 bg-transparent"
                      // onClick={() => SelectSocial("facebook")}
                    >
                      <BsFacebook
                        color={
                          socialColor === "facebook" ? "#3b5998" : "#808080"
                        }
                        size={35}
                      />
                    </button> */}
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
                      {facebook === "pages" && onShow ?  (
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Select Page"}
                        isSearchable={isSearchable}
                        name="color"
                        options={MapPages}
                        onChange={selectPageChange}
                        />
                      ) : ""}
                    
                    </div>
                  </>
                )}
            </Col>
              <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
      {showINputs && <>
        <Col sm={12}>
        <div className="btn hero-body mb-3 mt-3" onClick={handleShow}>Select Media</div>
        <Field
            id="textInput"
              className="form-control mb-3"
              name="messege"
              component="textarea"
              type="text"
              placeholder="Enter Message"
            />

            <Field
              className="form-control mb-3 select-input-media"
              name="media"
              component="input"
              type="text"
              placeholder="Enter Message"
            />
            <Field
              className="form-control mb-3"
              name="link"
              component="input"
              type="text"
              placeholder="Enter Link"
            />
            

          </Col>
         </>
         }
           <Col sm={12}>
             
             <div className="text-end d-flex gap-3 justify-content-end">
               <button className="bg-black btn text-white" disabled={fileNamePost ? false : true}>
                 Publish 
               </button>
               <button disabled  className="bg-black btn text-white">
                 Schedule
               </button>
             </div>
           </Col>
          </form>
            )}
            />
          </Row>
        </div>
      </Container>
      <CommonModal
      show={show}
      Title={"Select Images"}
      size={"xl"}
      handleCloseBtn={handleClose}
      Content={<Media select={true} media_uri={setStore} close={handleClose}  />}
      />


    </div>
  );
}

export default SinglePost;
