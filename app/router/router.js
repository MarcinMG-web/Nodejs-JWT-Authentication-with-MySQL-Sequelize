const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

// const config       = require('../config/config')();


/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: integer
 *       password:
 *         type: string
 *       roles:
 *         type: array
 *         items:
 *          type: string
 */

/**
 * @swagger
 * definitions:
 *   UserLogin:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *
 *
 *
 */

/**
 * @swagger
 * definitions:
 *   UserToken:
 *     properties:
 *       auth:
 *         type: boolean
 *       accessToken:
 *         type: string
 */


/**
 * @swagger
 * definitions:
 *   UserTask:
 *     properties:
 *       description:
 *         type: string
 *       user:
 *         type: object
 *
 *
 */

/**
 * @swagger
 * definitions:
 *   Task:
 *     properties:
 *       name:
 *         type: string
 *       done:
 *         type: boolean
 *       content:
 *         type: string
 *       priority:
 *         type: string
 *
 */
/**
 *
 *
 *
 *
 *
 *
 *
 * @swagger
 *  /auth/signup:
 *   post:

 *     tags:
 *       - User
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserLogin'
 *
 *     responses:
 *       200:
 *         description: A single puppy
 *         schema:
 *           $ref: '#/definitions/UserToken'
 */


/**
 * @swagger
 * /task/create:
 *   post:
 *     tags:
 *       - Task
 *     description: Creates a new task
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: content
 *         description: Task object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Successfully created
 */


/**
 * @swagger
 * /task/get-all:
 *   get:
 *     tags:
 *       - Task
 *     description: Returns all tasks for logged user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single user with details
 *         schema:
 *           $ref: '#/definitions/UserTask'
 */

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     tags:
 *       - Task
 *     description: Update task by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: content
 *         description: Task object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     description: Update task by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Successfully deleted
 */


/**
 * @swagger
 * /test/user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single user with details
 *         schema:
 *           $ref: '#/definitions/UserTask'
 */

/**
 * @swagger
 * /test/pm:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json

 *     responses:
 *       200:
 *         description: A single puppy
 *         schema:
 *           $ref: '#/definitions/User'
 */


/**
 * @swagger
 * /test/admin:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: A single puppy
 *         schema:
 *           $ref: '#/definitions/User'
 */


module.exports = function (app) {

    const controller = require('../controller/controller.js');

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    app.post('/api/auth/signin', controller.signin);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userTask);

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);


    app.post('/api/task/create', [authJwt.verifyToken], controller.addTask);

    app.get('/api/task/get-all', [authJwt.verifyToken], controller.getAllTasks);

    app.put('/api/task/:id', [authJwt.verifyToken], controller.updateTask);

    app.delete('/api/task/:id', [authJwt.verifyToken], controller.deleteTask);

}
