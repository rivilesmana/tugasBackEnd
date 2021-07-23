const router = require('express').Router();

const {getAlluser, insertuser, updateDataUser, deleteDataUser, loginUser} = require('../controllers/userController')
const {isLogin} = require('../middleware/auth')
router.get('/', getAlluser);
router.post('/login', loginUser)
router.post('/', insertuser)
router.patch('/:id', isLogin, updateDataUser)
router.delete('/:id', deleteDataUser)

module.exports = router;
