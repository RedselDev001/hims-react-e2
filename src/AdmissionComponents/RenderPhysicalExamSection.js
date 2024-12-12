import React, { useState } from "react";
import { FormGroup, Label, Input, Row } from "reactstrap";

const RenderPhysicalExamSection = ({
  section,
  handlePhysicalExamChange,
  cmoFormData,
}) => {
  const attributes = ["cns", "cvs", "rs", "pa"];
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Get the current description from cmoFormData
  const description = cmoFormData[section.viewOrder - 1]?.description || {};

  //============= main-return_function=============//
  return (
    <div key={section.rxRecordId} className="form-complainSection Form-Section_Blk">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        Physical Exam {isCollapsed ? "▼" : "▲"}
      </h3>
      {isCollapsed && (
       <Row className="mt-4">
         <FormGroup tag="fieldset">
          {attributes.map((attr, index) => (
            <FormGroup check key={index}>
              <Label check>
                <Input
                  type="checkbox"
                  name={attr}
                  data-section-index={section.viewOrder - 1}
                  checked={description[attr] || false}
                  onChange={handlePhysicalExamChange}
                />{" "}
                {attr.toUpperCase()}
              </Label>
            </FormGroup>
          ))}
        </FormGroup>
       </Row>
      )}
    </div>
  );
};

export default RenderPhysicalExamSection;
