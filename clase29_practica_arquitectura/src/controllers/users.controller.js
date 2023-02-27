export const getUsers = async(req, res) => {
    res.send({status: 'success', result: 'getUsers'})
}

export const getUserByID = async(req, res) => {
    res.send({status: 'success', result: 'getUserByID'})
}

export const saveUsers = async(req, res) => {
    res.send({status: 'success', result: 'saveUsers'})
}