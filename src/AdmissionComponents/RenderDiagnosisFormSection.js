import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const RenderDiagnosisFormSection = ({ section, handleChange, cmoFormData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div key={section.rxRecordId} className="form-complainSection  Form-Section_Blk">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        Diagnosis {isCollapsed ? "▼" : "▲"}
      </h3>
      {isCollapsed && (
        <Row className="mt-3 pb-0">
          <Col md="12">
            <FormGroup>
              <Label for="provisional">Provisional:</Label>
              <Input
                type="text"
                name="provisional"
                data-section-index={section.viewOrder - 1} // Ensure index matches with cmoFormData
                data-field="provisional"
                id="provisional"
                placeholder="Enter Provisional"
                value={
                  cmoFormData[section.viewOrder - 1].description.provisional
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="final">Final:</Label>
              <Input
                type="text"
                name="final"
                data-section-index={section.viewOrder - 1}
                data-field="final"
                id="final"
                placeholder="Enter Final"
                value={cmoFormData[section.viewOrder - 1].description.final}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="icd_10_code">ICD-10 Code:</Label>
              <Input
                type="text"
                name="icd_10_code"
                data-section-index={section.viewOrder - 1}
                data-field="icd_10_code"
                id="icd_10_code"
                placeholder="Enter ICD-10 Code"
                value={
                  cmoFormData[section.viewOrder - 1].description.icd_10_code
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

export default RenderDiagnosisFormSection;
