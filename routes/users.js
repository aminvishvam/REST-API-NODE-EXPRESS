import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = []

//all the routes from this file us staring with the /users
router.get('/', (req, res) => {
    console.log(users)
    res.send(users)
})

router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED')
    const user = req.body;

    const userId = uuidv4();

    const userWithID = { ...user, id: userId }

    users.push(userWithID);

    res.send(`user with the name ${user.fName} added to the data base`)
})

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(users)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { fName, lName, phoneNumber } = req.body
    const userToBeFound = users.find((user) => user.id === id);

    if (fName) {
        userToBeFound.fName = fName
    }
    if (lName) {
        userToBeFound.lName = lName
    }
    if (phoneNumber) {
        userToBeFound.phoneNumber = phoneNumber
    }

    res.send(users)
})

export default router;