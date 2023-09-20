import React from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'

function ClientLeadAnalyticsTable() {
  const Heading = ['No.', 'Name of the entity', 'Entity type', 'Interested for', 'SPOC Name', 'E-mail', 'Contact', 'Date', 'Action']
  const data = [
    {
      entity: 'Ram College',
      entityType: 'College',
      InterestedFor: 'Training & Development',
      SPOCname: 'Abhishek',
      Email: 'a@gmail.com',
      contact: '123456',
      mode: 'online',
      date: '12-12-2022',
    },
    {
      entity: 'Ram College',
      entityType: 'College',
      InterestedFor: 'Lead Generation',
      SPOCname: 'Abhishek',
      Email: 'a@gmail.com',
      contact: '123456',
      mode: 'online',
      date: '12-12-2022',
    },
    {
      entity: 'Ram College',
      entityType: 'College',
      InterestedFor: 'Training & Development | Lead Generation',
      SPOCname: 'Abhishek',
      Email: 'a@gmail.com',
      contact: '123456',
      mode: 'online',
      date: '12-12-2022',
    },
    {
      entity: 'Ram College',
      entityType: 'College',
      InterestedFor: 'Lead Generation',
      SPOCname: 'Abhishek',
      Email: 'a@gmail.com',
      contact: '123456',
      mode: 'online',
      date: '12-12-2022',
    },
    {
      entity: 'Ram College',
      entityType: 'College',
      InterestedFor: 'Lead Generation',
      SPOCname: 'Abhishek',
      Email: 'a@gmail.com',
      contact: '123456',
      mode: 'online',
      date: '12-12-2022',
    },
  ]
  return (
    <>
      <Row className="padding_top">
        <Col  lg={6}>
          <div className="d-flex table_heading_header">
            <h4 className="table_list_heading master_heading">Client Leads</h4>
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Form.Select aria-label="Default select example" className='me-0'>
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>
          </div>
        </Col>
        <Col  lg={6} className="text-end mt-2">
          <div>
            <Button className="border_btn ">Download XLSX</Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {Heading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data && data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center admin_table_data">{index + 1}</td>
                  <td className="text-center admin_table_data">{item.entity}</td>
                  <td className="text-center admin_table_data">{item.entityType}</td>
                  <td className="text-center admin_table_data">{item.InterestedFor}</td>
                  <td className="text-center admin_table_data">{item.SPOCname}</td>
                  <td className="text-center admin_table_data">{item.Email}</td>
                  <td className="text-center admin_table_data">{item.contact}</td>
                  <td className="text-center admin_table_data no_wrap_no">{item.date}</td>
                  <td className="text-center admin_table_data no_wrap_no">
                    <img
                      className="mx-1 admin_table_action_icon"
                      src="/images/edit-icon-blue.png"
                      onClick={() => handleEdit(item)}
                    />
                    <img
                      className="mx-1 admin_table_action_icon"
                      src="/images/delete-icon-blue.png"
                      onClick={() => {
                        setModalShow(true)
                        setDeleteItem(item)
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
    </>
  )
}

export default ClientLeadAnalyticsTable