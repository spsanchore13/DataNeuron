const Component = require("../models/Component.model");

let addApiCount = 0;
let updateApiCount = 0;

const getApiRequestCount = (req, res) => {
  try {
    res
      .status(200)
      .send({ addApiCount: addApiCount, updateApiCount: updateApiCount });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getComponentData = async (req, res) => {
  try {
    const data = await Component.find();

    executionTime = res.executionTime();
    console.log(`[GET] Request Execution Time ${executionTime}ms`);

    res
      .status(200)
      .send({ data: data, addApiCount, updateApiCount, executionTime });
  } catch (error) {}
};

// Add component data
const addComponentData = async (req, res) => {
  try {
    const { componentId, componentName, componentContent } = req.body;

    let isExist = await Component.find({ componentId });

    if (isExist) {
      // Clear existing data
      await Component.deleteOne({ componentId });
    }

    // Create new component
    const component = new Component({
      componentId,
      componentName,
      componentContent,
    });
    await component.save();

    addApiCount++;

    executionTime = res.executionTime();
    console.log(`[POST] Request Execution Time ${executionTime}ms`);
    res.status(200).json({
      message: "Component content added successfully",
      component: component,
      executionTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComponentData = async (req, res) => {
  try {
    const { componentId, componentContent } = req.body;

    let isExist = await Component.find({ componentId });

    if (!isExist) {
      res.status(404).send({ message: "Component not found!" });
    }

    // Create new component
    await Component.updateOne(
      { componentId: componentId },
      { componentContent: componentContent }
    );

    updateApiCount++;

    executionTime = res.executionTime();
    console.log(`[PATCH] Request Execution Time ${executionTime}ms`);
    res.status(200).json({
      message: "Component content updated successfully",
      executionTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const componentController = {
  getApiRequestCount,
  getComponentData,
  addComponentData,
  updateComponentData,
};

module.exports = componentController;
