import React, { useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetMedia, MediaUploads, deleteMedia, getSigleMedia, get_Facebook_Pages } from "../redux/actions/LoginAction";
import CommonModal from "../admin/components/CommonModal";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import ClockLoader from "react-spinners/ClockLoader";
import { getimageUri } from "../utils/auth";

function Media(props) {
  const [media, setMedia] = useState();
  const dispatch = useDispatch();
  const [facebook, setFacebook] = useState();
  const [show, setShow] = useState(false);
  const [showImag, setShowImag] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [uploadTime, setUploadTime] = useState(false);
  const [mediaArryFile, SetMediaArryFile] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); setShowImag(false)};

  
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

  const deleteMedias=(id)=>{
    dispatch(deleteMedia(id)).then((res)=>{
      toast(res.payload.status)
      dispatch(GetMedia()).then((res) => {
        setMedia(res?.payload?.data);
      });
    })
  }


    
let mediaArry = []
let File__uris;

const handleChange = (event) => {
  setUploadTime(true)
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  dispatch(MediaUploads(formData)).then((res) => {

    let mediaList = {
      mediaID: res?.payload?.data?.id,
      filename: res?.payload?.data?.file,
    }
    handleClose()
    setUploadTime(false)
    dispatch(GetMedia()).then((res) => {
        setMedia(res?.payload?.data);
      });
    mediaArry.push(mediaList)

    let a = [...mediaArryFile]
    a.push(mediaList)
    SetMediaArryFile(a)
  }
  )
};
const sigleDetails = (id) =>{
  if(!props?.select){
    dispatch(getSigleMedia(id)).then((res)=>{
      setShowImag(true)
      setShow(true)
      setShowOne(res?.payload?.data)
    })
  }
  if(props?.select){
    props?.media_uri(id)
  }

}




  return (
    <div className="container py-5">
      <div className="row justify-content-start align-items-center g-2">
        <div className="col-4" key={"1"}>
          <button type="button" onClick={handleShow} className="btn btn-primary">
            <IoMdCloudUpload size={30} className="mr-3" />
            Upload
          </button>
        </div>
      </div>
      <div className="row justify-content-start align-items-center g-2 py-3">
        {media?.slice().reverse().map((item,index) => {
          return (
            <>
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="img-wrraper w-100" data-id={item?.id}>
                  <div className="delete" onClick={()=>deleteMedias(item?.id)}> <RxCross2 /></div>
                  <img
                    src={item?.file_url}
                    className="img-fluid rounded-top"
                    alt=""
                  />
                  <div
                    onClick={(e)=>sigleDetails(item?.id)}
                    style={{ height:"46px" }}
                    className="btn hero-body px-4"
                  >
                    Select
                  </div>
                  
                </div>
              </div>
            </>
          );
        })}
      </div>
      <CommonModal
      show={show}
      Title={!showImag ? "Upload New Media" : "Image Preview"}
      size={"md"}
      handleCloseBtn={handleClose}
      Content={showImag ? <ShowIMags image={showOne?.file_url} /> : Upload(handleChange,onChange,uploadTime) }
      />
    </div>
  );
}

export default Media;

const Upload = (handleChange,onChange,uploadTime) =>{
  return (<>
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
    {uploadTime && <div className="w-100 loader-clock"><ClockLoader color="#2f65f1" /></div>}
    </>
  )
}

export const ShowIMags = (props) =>{
  return (
    <div className="image-wrrapers">
    <img
      src={props?.image}
      className="img-fluid rounded-top w-100"
      alt=""
    />
    </div>
  )
}