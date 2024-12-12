import React, { useState } from "react";
import { Input, FormGroup, Label, Row, Col } from "reactstrap";

const RenderTPRSection = ({ section, cmoFormData, handleChange }) => {
  const labelsAndPlaceholders = {
    bp: "Blood Pressure",
    resp: "Respiration Rate",
    pulse: "Pulse Rate",
    temp: "Temperature",
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //================ main_return_function =============//
  return (
    <div>
      <div key={section.rxRecordId} className="form-complainSection Form-Section_Blk">
        <h3
          className="h5class"
          onClick={toggleCollapse}
          style={{ cursor: "pointer" }}
        >
          Tpr {isCollapsed ? "▼" : "▲"}
        </h3>
        {isCollapsed && (
          <div className="attributes-container">
            <Row className="mt-3">
              <Col sm="11">
                <FormGroup>
                  <Label for="bp">Blood Pressure:</Label>
                  <Input
                    type="number"
                    name="bp"
                    data-section-index={section.viewOrder - 1}
                    data-field="bp"
                    id="bp"
                    placeholder={labelsAndPlaceholders["bp"]}
                    value={
                      cmoFormData[section.viewOrder - 1].description.bp || ""
                    }
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col sm="11">
                <FormGroup>
                  <Label for="resp">Respiration Rate:</Label>
                  <Input
                    type="number"
                    name="resp"
                    data-section-index={section.viewOrder - 1}
                    data-field="resp"
                    id="resp"
                    placeholder={labelsAndPlaceholders["resp"]}
                    value={
                      cmoFormData[section.viewOrder - 1].description.resp || ""
                    }
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="12">
                <FormGroup>
                  <Label for="pulse">Pulse Rate:</Label>
                  <Input
                    type="number"
                    name="pulse"
                    data-section-index={section.viewOrder - 1}
                    data-field="pulse"
                    id="pulse"
                    placeholder={labelsAndPlaceholders["pulse"]}
                    value={
                      cmoFormData[section.viewOrder - 1].description.pulse || ""
                    }
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="temp">Temperature:</Label>
                  <Input
                    type="number"
                    name="temp"
                    data-section-index={section.viewOrder - 1}
                    data-field="temp"
                    id="temp"
                    placeholder={labelsAndPlaceholders["temp"]}
                    value={
                      cmoFormData[section.viewOrder - 1].description.temp || ""
                    }
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

export default RenderTPRSection;
