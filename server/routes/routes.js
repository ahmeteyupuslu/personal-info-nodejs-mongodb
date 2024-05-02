import express from 'express';
import {AddUser, Login, Auth, getUsers, getUser, editUser,deleteUser} from '../controller/userController.js'
const router = express.Router();
import {body} from 'express-validator';
import { VerifyUser } from '../middleware/VerifyUser.js';

router.get('/users/', VerifyUser, getUsers),
router.get('/user/:id', VerifyUser, getUser),
router.put('/users/edit-user/:id', VerifyUser, editUser),
router.delete('/users/delete-user/:id', VerifyUser, deleteUser),
router.post('/users/add-user', 
[
    body('firstName').trim().notEmpty().withMessage('Name is required'),
    body('lastName').trim().notEmpty().withMessage('Surname is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('tc').trim().notEmpty().withMessage('TC is required').isInt().withMessage('TC must be string'),
    body('tel').trim().notEmpty().withMessage('Tel is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('isAdmin').trim().notEmpty().withMessage('isAdmin is required')
]
,AddUser)

router.post('/login', [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').trim().notEmpty().withMessage('Password is required')
],Login)

router.get('/verify',VerifyUser,Auth)




export {router as Router};
