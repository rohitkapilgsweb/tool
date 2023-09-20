import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Table, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../../redux/actions/exams/createExam";
import {
  deleteMocktestCorporate,
  getMockTestCorporatelist,
} from "../../../../redux/actions/corporate/addmocktestcorporate";
import DeleteModal from "../../../modals/deleteModal";
import { toast } from "react-toastify";

function MockTable() {

  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10
  })
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const handleHide = () => {
    setModalShow(false)
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const mocktestlistData = useSelector(
    (state) => state?.corporateMocktest?.mocktestcorporatelist?.data?.rows
  );

  const mocktestlistDataCount = useSelector(
    (state) => state?.corporateMocktest?.mocktestcorporatelist
  );

  useEffect(() => {
    dispatch(getAllExams(pagination));
  }, [pagination]);

  const tableHeading = [
    "No.",
    "Main Category",
    "Sub Category",
    "Topic",
    "Sub Topic",
    "T.Questions",
    "Attempts",
    "Date",
    "Action",
  ];

  const handleDelete = (item) => {
    dispatch(deleteMocktestCorporate(item?.id)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success('Deleted', { autoClose: 1000 })
        dispatch(getMockTestCorporatelist())
      }
    });
  };

  const handleEdit = (item) => {
    router.push(`/admin/corporate/mocktest/update/${item.id}`);
  };

  useEffect(() => {
    const timerDebounceMocktest = setTimeout(() => {
      dispatch(getMockTestCorporatelist({ ...pagination, search: router.query.search }));
    }, 600)
    return () => clearTimeout(timerDebounceMocktest)
  }, [pagination, router.query.search]);

  return (
    <>
      <div>
        <Table responsive className="admin_table" bordered hover>
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
            {mocktestlistData &&
              mocktestlistData?.filter((item) => {
                if (router.query.search && item?.topicName) {
                  return item?.topicName.toLowerCase().includes(router.query.search.toLowerCase())
                }
                return true
              })?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.MainCategory.mainCategory}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.SubCategory?.subCategory}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.topicName}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.subTopic}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.totalQuestions}
                    </td>
                    {mocktestlistDataCount?.countDetail?.map((elem) => {
                      if (item?.id == elem?.Mocktestss?.id) {
                        return (
                          <>
                            <td className="text-center admin_table_data">{elem?.AttemptCount}</td>
                          </>
                        )
                      }
                    })

                    }
                    <td className="text-center admin_table_data">
                      {item?.createdAt.split('T')[0]}
                    </td>

                    <td className="text-center admin_table_data no_wrap_no">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      ></img>
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => {
                          setModalShow(true)
                          setDeleteItem(item)
                        }}
                      ></img>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={setPagination} list={mocktestlistData} />
        <DeleteModal
          show={modalShow}
          onHide={() => handleHide()}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
}

export default MockTable;
