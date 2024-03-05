const HomeController = require("../Controller/HomeController");
const ShazamController = require("../Controller/ShazamController");
const UserController = require("../Controller/UserController");
const authentication = require('../middlewares/authentication')

const router = require("express").Router();



router.get('/', HomeController.showHome);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);

router.use(authentication)

router.post('/userProfile',UserController.createUserProfile);

router.get('/userProfile/:userId', UserController.getProfile);
router.put('/userProfile/:userId', UserController.updateProfile);
router.delete('/userProfile/:userId', UserController.deleteProfile);
router.get('/discover/charts/world', ShazamController.discoverDashboard)




  module.exports = router