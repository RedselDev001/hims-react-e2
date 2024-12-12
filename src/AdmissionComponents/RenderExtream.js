import React, { useState } from "react";
import { Input, FormGroup, Label, Row, Col } from "reactstrap";

const RenderExtream = ({ section, handleChange, cmoFormData }) => {

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //============= main_return_function ============//
  return (
    <div>
      <div key={section.rxRecordId} className="form-complainSection Form-Section_Blk">
        <h3 className="h5class" onClick={toggleCollapse}
          style={{ cursor: "pointer" }}>Extream {isCollapsed ? "▼" : "▲"}</h3>
        {isCollapsed && (
        <div className="form-fields">
          <Row className="mt-3">
            <Col sm="12">
              <FormGroup>
                <Label for="immediateCause">Immediate Cause:</Label>
                <Input
                  type="text"
                  id="immediate_cause"
                  name="immediate_cause"
                  placeholder="Enter Immediate Cause"
                  value={
                    cmoFormData[section.viewOrder - 1].description
                      .immediate_cause || ""
                  }
                  data-section-index={section.viewOrder - 1}
                  data-field="immediate_cause"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="antecedentCause">Antecedent Cause:</Label>
                <Input
                  type="text"
                  id="antecedent_cause"
                  name="antecedent_cause"
                  placeholder="Enter Antecedent Cause"
                  value={
                    cmoFormData[section.viewOrder - 1].description
                      .antecedent_cause || ""
                  }
                  data-section-index={section.viewOrder - 1}
                  data-field="antecedent_cause"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        )}
      </div>
    </div>
  );
};

export default RenderExtream;
