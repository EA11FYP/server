const express = require('express');
const router = express.Router();

const placementControllers = require('../controllers/placement-controllers');

router.get('/', placementControllers.allPlacements);

router.post('/new',placementControllers.newPlacement);

router.get('/one/:id',placementControllers.placementById);

router.delete('/delete/:id',placementControllers.deletePlacement);

router.post('/edit/:id',placementControllers.editPlacement);


module.exports = router;