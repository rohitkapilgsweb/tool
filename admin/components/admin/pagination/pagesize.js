import React from 'react'
import { Form } from 'react-bootstrap'

function Pagesize({ setPagination }) {
    const handlePageSize = (e) => {
        setPagination({
            pageNo: 1,
            pageSize: Number(e)
        })
    }
    return (
        <>
            <Form.Select className='num_dropdown me-0' aria-label="Default select example" name="pagesize" onChange={(e) => { handlePageSize(e.target.value) }}>
                <option >100</option>
                <option >50</option>
                <option >25</option>
                <option >10</option>
            </Form.Select>
        </>
    )
}

export default Pagesize