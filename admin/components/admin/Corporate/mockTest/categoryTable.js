import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Col, Row, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubCategory,
  getSubCategory,
} from "../../../../redux/actions/corporate/addsubcategory";

const CategoryTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const subcategoryList = useSelector(
    (state) => state?.corporateSubCategory?.addsubcategory?.rows
  );

  const handleDelete = (item) => {
    dispatch(deleteSubCategory(item.id)).then((res) => {
      if (res?.payload?.data?.success) {
        dispatch(getSubCategory());
      }
    });
  };

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  const tableHeading = ["No.", "Sub Category", "Action"];

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
            {subcategoryList &&
              subcategoryList?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>

                    <td className="text-center admin_table_data">
                      {item?.subCategory}
                    </td>

                    <td className="text-center admin_table_data">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      ></img>
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => handleDelete(item)}
                      ></img>
                    </td>
                  </tr>
                );
              })}{" "}
            *
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CategoryTable;
