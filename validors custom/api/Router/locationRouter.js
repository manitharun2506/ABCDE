import express from "express";
import * as locationController from "../Controller/Locations.js";
const locationRouter = express.Router();
locationRouter.get("/", locationController.getLocations);

locationRouter.post('/',locationController.addLocation)
locationRouter.get('/data',locationController.getAllLocationsData)
locationRouter.delete('/:id',locationController.deleteLocation)
locationRouter.put('/:id',locationController.updateLocation)


export default locationRouter;
