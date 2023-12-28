import React, { useEffect, useState } from 'react'
import CommonModal from './components/CommonModal';
import AddPlan from './components/AddPlan';
import { useDispatch, useSelector } from 'react-redux';
import { Deleteplan, getPlans, singlePlan, updatePlans } from '../redux/actions/LoginAction';
import moment from 'moment';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../Page/Components/Loader';
import { IoIosAddCircle } from "react-icons/io";

function ManagePlance() {
  const dispatch =useDispatch()

    const [show, setShow] = useState(false);
    const [dataGeting, setDataGeting] = useState(false);
    const [activeUpdate, SetActiveUpdate] =useState(0)
    const [dataUpdate, SetDataUpdate] =useState()
    const handleClose = () => {
      setShow(false)
      setDataGeting(false)
    };
    const handleShow = () => setShow(true);


    const IsUpdating = useSelector((state)=> state?.updatePlans?.isLoading)
    const getPlan = useSelector((state)=> state?.getPlans?.data?.plan)
    const PlanError = useSelector((state)=> state?.getPlans?.error)
    const isLoading = useSelector((state)=> state?.getPlans?.isLoading)
    const isDeleteing = useSelector((state)=> state?.DeletePIanItem?.isLoading)
    const isSingleLoading = useSelector((state)=> state?.singlePlan?.isLoading)

    useEffect(()=>{
        dispatch(getPlans())
    },[])

    const colourOptions = [
      { value: 'active', label: 'Active'},
      { value: 'inactive', label: 'Inactive'}
    ]
    const handelChange=(e,id)=>{
      const meberUpdate = {
        id: id,
        update:{
          status:e?.value
        }
      }
      SetActiveUpdate(0)
      dispatch(updatePlans(meberUpdate)).then((res)=>{
        toast(res?.payload?.message)
        dispatch(getPlans())
        SetActiveUpdate(0)
      })
    }

    const PlanDataUpdate = (id) =>{
      
      handleShow()
      dispatch(singlePlan(id)).then((res)=>{
      SetDataUpdate(res?.payload?.plan)
      setDataGeting(true)
      })
    }

    const DletePlansItem = (id)=>[
      dispatch(Deleteplan(id)).then((res)=>{
        toast(res?.payload?.message)
        dispatch(getPlans())

      })
      
    ]
  return (
    <div className='mt-4 mb-5 px-4'>
      {isLoading || IsUpdating || isSingleLoading || isDeleteing ? <Loader/> : ''}
                <div className="container-fluid p-md-0">
            <div className="row align-items-center g-2">
                <div className="col-md-6 mb-3">
                    <button onClick={handleShow} type="button" className="btn text-white py-2 fs-4 " style={{ background:'var(--theme-mein)' }}><IoIosAddCircle size={28}/> Add New Plan</button>
                </div>
            </div>
        </div>
    <div className="table-responsive meintable border rounded-2">

      <table className="table position-relative w-100">
        <thead className='bg-light sticky-top top-0'>
          <tr >
            <th scope="col">Plan Id</th>
            <th scope="col">Title</th>
            <th scope="col">Sell Price</th>
            <th scope="col">Actual Price</th>
            <th scope="col">status</th>
            <th scope="col">Created Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className={PlanError ? "error-no":""}>
        {PlanError&& <span>{PlanError}</span>}
          {!PlanError && getPlan?.map((item,key)=>{
          return(
            <tr className="" key={key}>
              <td>{item?.id}</td>
            <td scope="row">{item?.title}</td>
            <td>{item?.sell_price}</td>
            <td>{item?.actual_price}</td>
            <td>
            {activeUpdate !== item?.id ? (<span className={item?.status === 'active'? "status-active" : "status-inactive"}>{item?.status} {activeUpdate !== item?.id && <button type="button" className="btn rounded px-0" onClick={()=>SetActiveUpdate(item?.id)}><FiEdit2  /></button>}</span>) : 
             <Select
             onChange={(e)=>handelChange(e,item?.id)}
              options={colourOptions}
            /> 
             }
           
          
            </td>
            <td>{moment(item?.created_at).utc().format('DD-MM-YYYY')}</td>
            <td><button type="button" className="btn btn-outline-primary" onClick={()=>PlanDataUpdate(item?.id)}>Edit</button> <button type="button" className="btn btn-danger" onClick={()=>DletePlansItem(item?.id)}>Delete</button></td>
          </tr>
          )
          }).reverse()}
         
        </tbody>
      </table>
    </div>
    
    <CommonModal 
    Title="Add New Plans"
    show={show} 
    size={'lg'} 
    handleCloseBtn={handleClose} 
    Content={<AddPlan update={dataUpdate} handelChangeKey={handleClose} updating={dataGeting} options={colourOptions}/>}
    />
  </div>
  )
}

export default ManagePlance
