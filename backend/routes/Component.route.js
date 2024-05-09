const express = require("express");
const componentController = require("../controllers/Component.controller");

const componentRouter = express.Router();

componentRouter.get("/api/count", componentController.getApiRequestCount);
componentRouter.get("/details", componentController.getComponentData);
componentRouter.post("/content/add", componentController.addComponentData);

componentRouter.patch(
  "/content/update",
  componentController.updateComponentData
);

module.exports = componentRouter;
