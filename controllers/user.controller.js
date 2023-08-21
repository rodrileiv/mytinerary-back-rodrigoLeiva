import User from "../models/User.js";

const controller = {
    getUsers: (req, res) => {
        res.json({
            user: "Rodrigo Leiva",
            email: "rodrigoleiva@example.com"
        });
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'User generated'
            });
        } catch (error) {
            console.log(error).json({
                success: false,
                message: 'Error creating user'
            })
        }
    },
    deleteUser: () => {},
}

export default controller;