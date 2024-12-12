import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const RenderComplaintsSection = ({ section, handleChange, cmoFormData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //========== main-return_function ============//
  return (
    <div className="form-complainSection Form-Section_Blk">
      <h3
        className="h5class"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        Complaints
        {isCollapsed ? "▼" : "▲"}
      </h3>
      {isCollapsed && (
        <FormGroup className="mt-3">
          <Label for="complaints">Complaints:</Label>
          <Input
            placeholder="Enter text here"
            rows="7"
            type="textarea"
            name="complaints"
            data-section-index="0"
            data-field="complaints"
            value={cmoFormData[0].description.complaints}
            onChange={handleChange}
          />
        </FormGroup>
      )}
    </div>
  );
};

export default RenderComplaintsSection;
