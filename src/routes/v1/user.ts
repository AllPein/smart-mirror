import express from 'express'
import * as userController from '../../controller/user'

const router = express.Router()

router.route('/find').post(userController.findUnique)
router.route('/create').post(userController.create)
router.route('/:id').patch(userController.change)

export default router