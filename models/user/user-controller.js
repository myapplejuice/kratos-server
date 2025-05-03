/*!!! ALL FUNCTIONS ARE TEMPORARY, CREATE PROPER PROTOCOLS LATER !!!*/
/*!!! USE REGEX !!!*/
/*!!! ENCRYPTION REQUIRED !!!*/
/*!!! USE JWT FOR AUTHENTICATION !!!*/
/*!!! USE PROPER ERROR HANDLING !!!*/
/*!!! ADJUST REQUESTS AND RESPONSES TO BE MORE USER FRIENDLY, ALL RESPONSES ARE TEMPORARY !!!*/

import { fetchUsers, newUser } from "./user-model.js"

export async function getUsers(req, res) {
    let users = await fetchUsers()

    if (!users) return res.status(404).json({ message: 'getUsers() Request fail! No users found!' })
    return res.status(200).json({ message: 'getUsers() Request success!', users })
}

export async function getUserById(req, res) {
    //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
    if (String(req.params.id).length != 12) return res.status(400).json({ message: 'getUsers(req.params.id) Request fail! Invalid ID!' })

    let user = await fetchUsers(req.params.id)

    if (!user) return res.status(404).json({ message: 'getUsers(req.params.id) Request fail! User not found!' })
    return res.status(200).json({ message: 'getUsers(req.params.id) Request success!', user })
}

export async function createUser(req, res) {
    //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
    if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.age || !req.body.email || !req.body.password || !req.body.role)
        return res.status(400).json({ message: 'createUser() Request fail! Missing data!' })

    let user = await newUser(req.body)

    if (!user) return res.status(404).json({ message: 'createUser() Request fail! User creation failed!' })
    return res.status(200).json({ message: 'createUser() Request success!', user })
}

export async function updateUser(req, res) {
    res.send('updateUser')
}

export async function deleteUser(req, res) {
    res.send('deleteUser')
}
