
const Users = require('../models/User')

const login = async (req, res) => {
    let { username, password } = req.body;

    try {
        // Use findOne() to find a single document that matches the criteria
        let existingUser = await Users.findOne({ username, password });

        if (!existingUser) {
            // Send a 401 Unauthorized response
            // res.status(401).json({
            //     success: false,
            //     error: "Wrong details, please check again"
            // });

            console.error('Error fetching products:', error.message);
            res.status(401).json({success:false, error: 'Wrong details, please check again' });
        } else {
            // Send a 200 OK response
            res.status(200).json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    role: existingUser.role
                },
            });
        }
    } catch (err) {
        console.error(err);
        // Send a 500 Internal Server Error response
        res.status(500).json({
            success: false,
            error: "Error! Something went wrong."
        });
    }
};




module.exports = {
   login
  };
  