import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import "./App.css";
import Component from "./components/Component";
import axios from "axios";

function App() {
  const [componentData, setComponentData] = useState([]);
  const [addApiCount, setAddApiCount] = useState(0);
  const [updateApiCount, setUpdateApiCount] = useState(0);

  const [component1Size, setComponent1Size] = useState({
    width: "40%",
    height: 300,
  });
  const [component2Size, setComponent2Size] = useState({
    width: "40%",
    height: 300,
  });
  const [component3Size, setComponent3Size] = useState({
    width: "81%",
    height: 300,
  });

  const handleResizeComponent1 = (event, direction, ref) => {
    setComponent1Size({ width: ref.style.width, height: ref.style.height });
  };

  const handleResizeComponent2 = (event, direction, ref) => {
    setComponent2Size({ width: ref.style.width, height: ref.style.height });
  };

  const handleResizeComponent3 = (event, direction, ref) => {
    setComponent3Size({ width: ref.style.width, height: ref.style.height });
  };

  const fetchComponent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/component/details`
      );

      setComponentData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApiRequestCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/component/api/count`
      );

      setAddApiCount(response.data.addApiCount);
      setUpdateApiCount(response.data.updateApiCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComponent();
    fetchApiRequestCount();
  }, []);

  const handleAddContent = async (componentId, componentContent) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/component/content/add`,
        {
          componentId,
          componentName: `Component-${componentId}`,
          componentContent,
        }
      );

      fetchComponent();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateContent = async (componentId, componentContent) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/component/content/update`,
        {
          componentId,
          componentContent,
        }
      );

      fetchComponent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="top-components">
        <Resizable
          style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          size={component1Size}
          onResize={handleResizeComponent1}
        >
          <Component
            componentId={1}
            componentDetails={
              componentData &&
              componentData.filter((elem) => elem.componentId === 1)[0]
            }
            handleUpdateContent={handleUpdateContent}
            addApiCount={addApiCount}
            updateApiCount={updateApiCount}
            handleAddContent={handleAddContent}
          />
        </Resizable>
        <Resizable
          style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          size={component2Size}
          onResize={handleResizeComponent2}
          defaultSize={{ width: 500, height: 300 }}
        >
          <Component
            componentId={2}
            componentDetails={
              componentData &&
              componentData.filter((elem) => elem.componentId === 2)[0]
            }
            handleUpdateContent={handleUpdateContent}
            addApiCount={addApiCount}
            updateApiCount={updateApiCount}
            handleAddContent={handleAddContent}
          />
        </Resizable>
      </div>
      <div className="bottom-component">
        <Resizable
          style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          size={component3Size}
          onResize={handleResizeComponent3}
        >
          <Component
            componentId={3}
            componentDetails={
              componentData &&
              componentData.filter((elem) => elem.componentId === 3)[0]
            }
            handleUpdateContent={handleUpdateContent}
            addApiCount={addApiCount}
            updateApiCount={updateApiCount}
            handleAddContent={handleAddContent}
          />
        </Resizable>
      </div>
    </div>
  );
}

export default App;
