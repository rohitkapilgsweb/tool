import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const AdminTable = (props) => {
  let tableData = props.data;
  let tableHeading = tableData[0].Heading;
  let tableContent = tableData[1].Content;
  return (
    <>
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
          {tableContent &&
            tableContent?.map((row, index) => {
              let serialNo = index + 1;
              return (
                <tr>
                  <td className="text-center admin_table_serial">{serialNo}</td>
                  {Object.keys(tableContent[0])?.map((column) => {
                    if (row[column].length > 50) {
                      let num = 50;
                      return (
                        <td className="text-start admin_table_data">
                          {row[column].slice(0, num)}
                          <a
                            className="table_read_more"
                            onClick={() => {
                              if (num === 50) {
                                num = row[column].length;
                              } else {
                                num = 50;
                              }
                            }}
                          >
                            {num === 50 ? "...Read More" : "...Read Less"}
                          </a>
                        </td>
                      );
                    } else {
                      return (
                        <td className="text-center admin_table_data">
                          {row[column]}
                        </td>
                      );
                    }
                  })}
                  <td className="text-center admin_table_data">
                    {props.action.edit ? (
                      <>
                        <img
                          className="mx-1 admin_table_action_icon"
                          src={props.action.edit.src}
                          onClick={() => props.action.edit.action(index)}
                        />
                        <img
                          className="mx-1 admin_table_action_icon"
                          src={props.action.delete.src}
                          onClick={() => props.action.delete.action(index)}
                        />
                      </>
                    ) : (
                      <img
                        className="mx-1 admin_table_action_icon"
                        src={props.action.delete.src}
                        onClick={() => props.action.delete.action(index)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="admin_table_footer">
        <Row>
          <Col md={6} className="table_footer_start">
            <h6>Showing 1 to 6 of 50 enteries</h6>
          </Col>
          <Col md={6}>
            <div className="table_footer_end">
              <Button className="border_btn green">Previous</Button>
              <Button className="border_btn green">Next</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminTable;
