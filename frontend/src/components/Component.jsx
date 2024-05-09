import React, { useState } from "react";

const Component = ({
  componentId,
  handleAddContent,
  handleUpdateContent,
  componentDetails,
  addApiCount,
  updateApiCount,
}) => {
  const [componentContent, setComponentContent] = useState("");

  const [update, setUpdate] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2>Component {componentId}</h2>
      <p>Add Api Called {addApiCount} Times</p>
      <p>Update Api Called {updateApiCount} Times</p>

      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          onChange={(e) => setComponentContent(e.target.value)}
          placeholder="Type here..."
        />
        <button onClick={() => handleAddContent(componentId, componentContent)}>
          Add Content
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <h3>{componentDetails?.componentContent}</h3>
        <button onClick={() => setUpdate((prev) => !prev)}>
          {update ? "Cancel" : "Update"}
        </button>
      </div>

      {update && (
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="text"
            onChange={(e) => setComponentContent(e.target.value)}
            placeholder={componentDetails?.componentContent}
          />
          <button
            onClick={() => handleUpdateContent(componentId, componentContent)}
          >
            Update Content
          </button>
        </div>
      )}
    </div>
  );
};

export default Component;
