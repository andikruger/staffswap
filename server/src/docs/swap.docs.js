/**
 * @swagger
 * components:
 *  schemas:
 *    Swap:
 *      type: object
 *      required:
 *        - userID
 *        - name
 *        - threeLetterCode
 *        - date
 *        - startTime
 *        - endTime
 *        - shiftWish
 *        - qualifications
 *        - note
 *        - exchanges
 *        - priority:
 *        - email
 *      properties:
 *        userID:
 *          type: string
 *          description: ID of the user
 *        name:
 *          type: string
 *          description: Name of the user
 *        threeLetterCode:
 *          type: string
 *          description: Three letter code of the user
 *        date:
 *          type: string
 *          description: Date of the swap
 *        startTime:
 *          type: string
 *          description:  Start time of the swap
 *        endTime:
 *          type: string
 *          description: End time of the swap
 *        shiftWish:
 *          type: string
 *          description: Shift wish of the swap
 *          example: Frühdienst
 *        qualifications:
 *          type: array
 *          description: Qualifications of the swap
 *        note:
 *          type: string
 *          description: Note of the swap
 *        exchanges:
 *          type: array
 *          example: [{date: 2021-01-01, startTime: 08:00, endTime: 16:00}, {date: 2021-01-02, startTime: 08:00, endTime: 16:00}]
 *          description: Exchanges of the swap
 *        priority:
 *          type: string
 *          description: Priority of the swap 1 (low) - 3 (high)
 *          example: 1
 *          values: [1, 2, 3]
 *        email:
 *          type: string
 *          description: Email of the user
 */

/**
 * @swagger
 * /api/v1/swaps/new:
 *  post:
 *    description: Create a new Swap
 *    tags: [Swaps]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Swap'
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /api/v1/swaps/:
 *  get:
 *    summary: Returns all Swaps
 *    security:
 *      - bearerAuth: []
 *    description: Get Users
 *    tags: [Swaps]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Swap'
 *      401:
 *        description: not authorised
 */

/**
 * @swagger
 * /api/v1/swaps/{id}:
 *  get:
 *    summary: Get a specific Swap
 *    security:
 *      - bearerAuth: []
 *    description: Get a Swap based on the id
 *    tags: [Swaps]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *      description: ID of the Swap
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Swap'
 *      401:
 *        description: not authorised
 *      404:
 *        description: No User with this id was found
 */

/**
 * @swagger
 * /api/v1/swaps/{id}:
 *  put:
 *    summary: Update a Swap
 *    security:
 *      - bearerAuth: []
 *    description: Update a Swap based on the id
 *    tags: [Swaps]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *      description: ID of the Swap
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Swap'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      401:
 *        description: not authorised
 */

/**
 * @swagger
 * /api/v1/swaps/{id}:
 *  delete:
 *    summary: Delete a specific Swap
 *    security:
 *      - bearerAuth: []
 *    description: Delete a Swap based on the id
 *    tags: [Swaps]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *        description: ID of the Swap
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Swap'
 *      401:
 *        description: not authorised
 */
