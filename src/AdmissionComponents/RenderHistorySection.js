import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const RenderHistorySection = ({
  section,
  handleChange,
  handleCheckboxChange,
  cmoFormData,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Ensure social_history is defined
  const socialHistory =
    cmoFormData[section.viewOrder - 1].description.social_history || {};

  return (
    <div key={section.rxRecordId} className="form-complainSection">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        History {isCollapsed ? "▼" : "▲"}
      </h3>

      {isCollapsed && (
        <Row form className="mt-3 pb-0">
          <Col md="12">
            <FormGroup>
              <Label for="medical_history">Medical History:</Label>
              <Input
                type="text"
                name="medical_history"
                data-section-index={section.viewOrder - 1}
                data-field="medical_history"
                id="medical_history"
                placeholder="Enter Medical History"
                value={
                  cmoFormData[section.viewOrder - 1].description.medical_history
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="surgical_history">Surgical History:</Label>
              <Input
                type="text"
                name="surgical_history"
                data-section-index={section.viewOrder - 1}
                data-field="surgical_history"
                id="surgical_history"
                placeholder="Enter Surgical History"
                value={
                  cmoFormData[section.viewOrder - 1].description
                    .surgical_history
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <Label>Social History</Label>
            <FormGroup tag="fieldset" className="d-flex gap-2">
              {["tobacco", "alcohol", "drugs", "smoking"].map((item, index) => (
                <FormGroup check key={index}>
                  <Label check className="checkHistory">
                    <Input
                      type="checkbox"
                      name={item}
                      className="checkBox"
                      data-section-index={section.viewOrder - 1}
                      checked={socialHistory[item] || false}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {capitalizeFirstLetter(item)}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="allergy_history">Allergy History:</Label>
              <Input
                type="text"
                name="allergy_history"
                data-section-index={section.viewOrder - 1}
                data-field="allergy_history"
                id="allergy_history"
                placeholder="Enter Allergy History"
                value={
                  cmoFormData[section.viewOrder - 1].description.allergy_history
                }
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="family_history">Family History:</Label>
              <Input
                type="text"
                name="family_history"
                data-section-index={section.viewOrder - 1}
                data-field="family_history"
                id="family_history"
                placeholder="Enter Family History"
                value={
                  cmoFormData[section.viewOrder - 1].description.family_history
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

export default RenderHistorySection;
