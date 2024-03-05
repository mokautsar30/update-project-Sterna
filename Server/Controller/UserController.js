const { User, UserProfile } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequired" };
      }
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "UserNotExist" };
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "PasswordInvalid" };
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token, id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    const token = req.headers['google-token']
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    console.log({payload});

    let user = await User.findOne({
      where: {email}
    })

    console.log("user found", !!user);
    if (!user) {
      console.log("new user");
      user = await User.create({
        username: payload.name,
        email,
        password: 'dummy-password' + Date.now()
      }, {
        hooks: false
      })
    }

    const access_token = signToken({ id: user.id });

    res.status(200).json({access_token})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async createUserProfile(req, res, next) {
    try {
      const { fullName, email, imgProfile, subscription, UserId } = req.body;
      
      //check jika user sudah punya profile
      const existingProfile = await UserProfile.findOne({
        where: { UserId: req.user.id },
      });

      if (existingProfile) {
        return res.status(400).json({ message: "User profile already exists" });
      }

      const userProfile = await UserProfile.create({
        fullName: fullName,
        email: email,
        imgProfile: imgProfile,
        subscription: subscription,
        UserId: req.user.id,
      });
      res.status(201).json({ message: "User profile successfully created" });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getProfile(req,res, next) {
    try {
        const userId = req.params.userId;

        const user = await User.findByPk(userId);
        if (!user) {
            throw { name: "UserNotExist" };
          }

        const userProfile = await UserProfile.findOne({
            where: {UserId: userId},
        })

        if(!userProfile) {
            throw { name: "UserNotExist" };
        }
        res.status(200).json({user, userProfile})
    } catch (error) {
        console.log(error);
        next(error)
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { fullName, email, imgProfile } = req.body;
      const userId = req.params.userId;

      //check dulu usernya ada ga?
      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "UserNotExist" };
      }
      //check userprofilenya
      const existingProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      if (!existingProfile) {
        return res.status(400).json({ message: "User profile already exists" });
      }

      await existingProfile.update({
        fullName,
        email,
        imgProfile,
      });
      res.status(200).json({ message: "Your profile has been updated" });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      const userId = req.params.userId;

      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "UserNotExist" };
      }

      const existingProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      if (!existingProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      await existingProfile.destroy();
      res.status(200).json({ message: "Your profile has been deleted" });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = UserController;
