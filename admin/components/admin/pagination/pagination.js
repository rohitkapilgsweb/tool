import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

function Pagination({pagination,list,setPagination}) {
    const handlePagination = (e) => {
        let page = {
          ...pagination
        }
        if (e.target.name === 'previous') {
          page.pageNo = pagination.pageNo - 1
        } if (e.target.name === "next") {
          page.pageNo = pagination.pageNo + 1
        }
        setPagination(page)
  }
  return (
    <div className="admin_table_footer">
        <Row>
          <Col md={6} className="table_footer_start">
            <h6>Showing {((pagination.pageNo-1) * pagination.pageSize)+1} to {(pagination.pageNo * pagination.pageSize) < list?.count ? (pagination.pageNo * pagination.pageSize) : list?.count} of {list?.count} enteries</h6>
          </Col>
          <Col md={6}>
            <div className="table_footer_end">
              {pagination.pageNo !== 1 && (
                <Button className="border_btn green" name="previous" onClick={(e) => handlePagination(e)}>Previous</Button>
              )}
              {(pagination.pageNo * pagination.pageSize) < list?.count && (
                <Button className="border_btn green" name="next" onClick={(e) => handlePagination(e)}>Next</Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
  ) 
}

export default Pagination