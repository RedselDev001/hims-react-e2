import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const RenderCmoFormSection = ({ section, handleChange, cmoFormData }) => {
  const [selectedSection, setSelectedSection] = useState("Cmo");
  const [reviseOption, setReviseOption] = useState("Daily");

  const handleRadioChange = (event) => {
    setSelectedSection(event.target.value);
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleReviseOptionChange = (event) => {
    setReviseOption(event.target.value);
  };

  //============== main_return_function =============//
  return (
    <div key={section.rxRecordId} className="form-complainSection Form-Section_Blk">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        Tretment Cmo {isCollapsed ? "▼" : "▲"}
      </h3>
      {isCollapsed && (
        <Row>
          <div className="d-flex mt-4 gap-4">
            <Label>
              <Input
                type="radio"
                name="sectionType"
                value="Cmo"
                checked={selectedSection === "Cmo"}
                onChange={handleRadioChange}
              />
              &nbsp;Cmo
            </Label>
            <Label>
              <Input
                type="radio"
                name="sectionType"
                value="Revise"
                checked={selectedSection === "Revise"}
                onChange={handleRadioChange}
              />
              &nbsp;Revise
            </Label>
          </div>

          {selectedSection === "Cmo" && (
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="findings">Findings:</Label>
                  <Input
                    type="textarea"
                    name="findings"
                    id="findings"
                    placeholder="Enter Findings"
                    rows="4"
                    value={
                      cmoFormData[section.viewOrder - 1].description.cmo
                        .findings || ""
                    }
                    data-section-index={section.viewOrder - 1}
                    data-field="findings"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="investigation">Investigation:</Label>
                  <Input
                    type="textarea"
                    name="investigation"
                    id="investigation"
                    placeholder="Enter Investigation"
                    rows="4"
                    value={
                      cmoFormData[section.viewOrder - 1].description.cmo
                        .investigation || ""
                    }
                    data-section-index={section.viewOrder - 1}
                    data-field="investigation"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="prescription">Prescription:</Label>
                  <Input
                    type="textarea"
                    name="prescription"
                    id="prescription"
                    placeholder="Enter Prescription"
                    rows="4"
                    value={
                      cmoFormData[section.viewOrder - 1].description.cmo
                        .prescription || ""
                    }
                    data-section-index={section.viewOrder - 1}
                    data-field="prescription"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="notes">Notes:</Label>
                  <Input
                    type="textarea"
                    name="notes"
                    id="notes"
                    placeholder="Enter Notes"
                    rows="4"
                    value={
                      cmoFormData[section.viewOrder - 1].description.cmo
                        .notes || ""
                    }
                    data-section-index={section.viewOrder - 1}
                    data-field="notes"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          {selectedSection === "Revise" && (
            <Row className="ml-3">
              <div className="d-flex gap-4">
                <Label>
                  <Input
                    type="radio"
                    name="reviseOption"
                    value="Daily"
                    checked={reviseOption === "Daily"}
                    onChange={handleReviseOptionChange}
                  />
                  &nbsp;Daily
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="reviseOption"
                    value="Discharge"
                    checked={reviseOption === "Discharge"}
                    onChange={handleReviseOptionChange}
                  />
                  &nbsp;Discharge
                </Label>
              </div>
              {reviseOption === "Daily" && (
                <Row>
                  <Col md="4">
                    <Label for="dailyNotes">Investigation:</Label>
                    <FormGroup className="border card">Investigation</FormGroup>
                  </Col>
                  <Col md="4">
                    <Label for="dailyNotes">Medication:</Label>
                    <FormGroup className="border card">Medication</FormGroup>
                  </Col>
                  <Col md="4">
                    <Label for="dailyNotes">Notes:</Label>
                    <FormGroup className="border card">Notes</FormGroup>
                  </Col>
                </Row>
              )}

              {reviseOption === "Discharge" && (
                <Row>
                  <Col md="6"></Col>
                </Row>
              )}
            </Row>
          )}
        </Row>
      )}
    </div>
  );
};

export default RenderCmoFormSection;
