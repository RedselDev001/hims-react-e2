import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const RenderProcedureSection = ({ section, handleChange, cmoFormData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //============= main-return_function ==========//
  return (
    <div key={section.rxRecordId} className="form-complainSection Form-Section_Blk">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
       procedure {isCollapsed ? "▼" : "▲"}
      </h3>
      {isCollapsed && (
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <Label for="insurance_type">Insurance Type:</Label>
              <Input
                type="text"
                name="insurance_type"
                data-section-index={section.viewOrder - 1}
                data-field="insurance_type"
                id="insurance_type"
                placeholder="Enter Insurance Type"
                value={
                  cmoFormData[section.viewOrder - 1].description.insurance_type
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="procedure">Procedure:</Label>
              <Input
                type="text"
                name="procedure"
                data-section-index={section.viewOrder - 1}
                data-field="procedure"
                id="procedure"
                placeholder="Enter Procedure"
                value={cmoFormData[section.viewOrder - 1].description.procedure}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="procedure_date">Procedure Date:</Label>
              <Input
                type="date"
                name="procedure_date"
                data-section-index={section.viewOrder - 1}
                data-field="procedure_date"
                id="procedure_date"
                placeholder="Enter Procedure Date"
                value={
                  cmoFormData[section.viewOrder - 1].description.procedure_date
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default RenderProcedureSection;
