import React, { useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetMedia, MediaUploads, get_Facebook_Pages } from "../redux/actions/LoginAction";
import CommonModal from "../admin/components/CommonModal";

function Media() {
  const [media, setMedia] = useState();
  const dispatch = useDispatch();
  const [facebook, setFacebook] = useState();
  const [show, setShow] = useState(false);
  const [mediaArryFile, SetMediaArryFile] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
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
 
useEffect(() => {
    dispatch(GetMedia()).then((res) => {
        setMedia(res?.payload?.data);
      });
}, [])


const onChange = (change) => {
    setFacebook(change)
    if (change === "pages") {
      if(userAccountId){
        dispatch(
          get_Facebook_Pages(userAccountId[0]?.facebook_id)
        );
      }
    }
  };


    
let mediaArry = []

const handleChange = (event) => {
    console.log(event)

  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  dispatch(MediaUploads(formData)).then((res) => {

    let mediaList = {
      mediaID: res?.payload?.data?.id,
      filename: res?.payload?.data?.file,
    }
    handleClose()
    dispatch(GetMedia()).then((res) => {
        setMedia(res?.payload?.data);

      });
    // SetFileNamePost(res?.payload?.data?.file)
    mediaArry.push(mediaList)

    let a = [...mediaArryFile]
    a.push(mediaList)
    SetMediaArryFile(a)

  }

  )

};

  return (
    <div className="container py-5">
      <div className="row justify-content-start align-items-center g-2">
        <div className="col-4">
          <button type="button" onClick={handleShow} className="btn btn-primary">
            <IoMdCloudUpload size={30} className="mr-3" />
            Upload
          </button>
        </div>
      </div>
      <div className="row justify-content-start align-items-center g-2 py-3">
        {media?.map((item,index) => {
          return (
            <>
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="img-wrraper w-100">
                  <img
                    src={item?.file_url}
                    className="img-fluid rounded-top"
                    alt=""
                  />
                  <button
                    type="button"
                    style={{ height:"46px" }}
                    className="btn hero-body px-4"
                  >
                    Select
                  </button>
                  
                </div>
              </div>
            </>
          );
        })}
      </div>
      <CommonModal
      show={show}
      Title={"Upload New Media"}
      size={"md"}
      handleCloseBtn={handleClose}
      Content={
      <input
      id="textInput"
      className="form-control mb-3"
      name="file"
      type="file"
      placeholder="Enter Message"
      onChange={(e) => {
      onChange(e);
      handleChange(e);
        }}
    />
    }
      />
    </div>
  );
}

export default Media;
