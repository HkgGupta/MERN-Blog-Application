import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (token) {
            token = token.replace("Bearer ", "");
            const verify = jwt.verify(token, process.env.JWT_SECRET);

            if (verify) {
                req.userInfo = verify.credential;
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};