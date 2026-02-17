import { requireAuth } from "@clerk/express";
import { User } from "../models/User.model.js";

// here protect route is an array, with different methods. as middleware express will execute each method one by one.
export const protectRoute = [
    requireAuth({signInUrl: "/signin"}),
    async(req,res,next) => {

        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg: "Unauthorized - invalid token"})

                //find user in db by clerk ID

                const user = await User.findOne({clerkId})

                if(!user) return res.status(404).json({msg: "User not found"});

                req.user = user;
                    next();
        } catch (error) {
            console.error("Error in protectRoute",error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

]


