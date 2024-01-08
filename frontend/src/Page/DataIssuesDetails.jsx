import React from "react";

function DataIssuesDetails(props) {
  return (
    <div>
      <div className="help-wrrapper">
        <h6 className="lable-id">Ticket ID: {props?.data?.ticket_id}</h6>
        <div className="help-box">
          <h5>
            <b>
              Subject: <span className="text-capitalization">{props?.data?.issue}</span>
            </b>
          </h5>
          <div className="Msg-reply d-flex mb-3 flex-column">
            <p>
              Description:{" "}
              <span>
                <i>{props?.data?.desc}</i>
              </span>
            </p>
            <p className="bg-light p-3 rounded">
              <b>Solution </b>
              <br />{" "}
              <span className="mt-3">
                <i> {props?.data?.reply === null ? "NO Replay Found" : props?.data?.reply}</i>
              </span>
            </p>
          </div>

        </div>
      
      </div>
    
    </div>
  );
}

export default DataIssuesDetails;
