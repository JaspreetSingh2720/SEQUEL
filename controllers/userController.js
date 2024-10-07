const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const { UserModel } = require("../models/users");
const { userSchema } = require("../middlewares/userValidate");
const Joi = require("joi");
const { ProfileModel } = require("../models/profileModels");
const { PostModel } = require("../models/postModels");

// exports.createUser = async (req, res) => {
//   //To insert data in db
//   /*
//     const newUser = {
//         firstName: 'vivek',
//         lastName: 'kumar',
//         email: 'vivek@gmail.com',
//         password: 'Admin@123',
//         age: 40,
//     }*/
//   const data = [
//     {
//       firstname: "vivek",
//       lastname: "kumar",
//       email: "vivek@gmail.com",
//       password: "Admin@123",
//       age: 40,
//     },
//     {
//       firstname: "aarav",
//       lastname: "sharma",
//       email: "aarav.sharma@example.com",
//       password: "Aarav@123",
//       age: 29,
//     },
//     {
//       firstname: "anaya",
//       lastname: "verma",
//       email: "anaya.verma@example.com",
//       password: "Anaya#456",
//       age: 25,
//     },
//     {
//       firstname: "krishna",
//       lastname: "iyer",
//       email: "krishna.iyer@example.com",
//       password: "Krishna@789",
//       age: 34,
//     },
//     {
//       firstname: "neha",
//       lastname: "patel",
//       email: "neha.patel@example.com",
//       password: "Neha@2022",
//       age: 28,
//     },
//     {
//       firstname: "rohan",
//       lastname: "singh",
//       email: "rohan.singh@example.com",
//       password: "Rohan@345",
//       age: 32,
//     },
//     {
//       firstname: "sanya",
//       lastname: "gupta",
//       email: "sanya.gupta@example.com",
//       password: "Sanya@678",
//       age: 27,
//     },
//     {
//       firstname: "rahul",
//       lastname: "mishra",
//       email: "rahul.mishra@example.com",
//       password: "Rahul@901",
//       age: 37,
//     },
//     {
//       firstname: "riya",
//       lastname: "nair",
//       email: "riya.nair@example.com",
//       password: "Riya@234",
//       age: 30,
//     },
//     {
//       firstname: "arjun",
//       lastname: "joshi",
//       email: "arjun.joshi@example.com",
//       password: "Arjun@567",
//       age: 35,
//     },
//   ];

//   // const users = await UserModel.bulkCreate(data);
//   // return res.json(users);

//   //Select queries (SELECT * FROM ......)
//   // const users = await User.findAll();
//   // return res.json(users);

//   //Specifying attributes only (SELECT firstName, lastName FROM .....)
//   //   const users = await User.findAll({ attributes: ["firstname", "lastname"] });

//   //Attributes can be rename (SELECT firstName as FN, lastName as LN FROM .....)
//   //   const users = await UserModel.findAll({
//   //     attributes: [
//   //       ["firstName", "FN"],
//   //       ["lastName", "LN"],
//   //     ],
//   //   });
//   //   return res.json(users);

//   //Aggregation using sequelize function (SELECT count(firstName) as count FROM .....)
// //   const users = await UserModel.findAll({
// //     attributes:[[sequelize.fn('SUM', sequelize.col('id')), 'sum']],
// //   });
// //   return res.json(users);

//   ///Exclude attributes
//   // const users = await UserModel.findAll({
//   //       attributes:{exclude: ["firstname", "password"]}
//   //     });
//   //     return res.json(users);

// //Filter query (SELECT * FROM ...... WHERE id=2 AND isActive = true)
//   // const users = await UserModel.findAll({
//   //   where: {
//   //     // id : {
//   //     //   // [Op.eq]: 2
//   //     //   // [Op.in]: [2,4,50]
//   //     // }
//   //     [Op.and]:[{id: 3},{isActive: true}]
//   //   }
//   // })
//   // return res.json({users})

//   //Update ... where id....
//   const users = await UserModel.update({
//     lastname: "kumar",
//     age: 40
//   },
//   {
//     where: {
//       id: 2
//     }
//   }
// )
//   return res.json({users})

// };

const createUser = async (req, res) => {
  try {
    const user = await UserModel.create({ username: "abhi" });
    // const profile  = await ProfileModel.create({bio: 'Hello, vivek', userId: user.id})
    const post1 = await PostModel.create({
      content: "this is my first post",
      userId: user.id,
    });
    const post2 = await PostModel.create({
      content: "This is my 2nd post",
      userId: user.id,
    });
    return res.status(201).json({ user, post1, post2 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    // const users = await sequelize.query("SELECT * FROM users", {
    //   types: QueryTypes.SELECT,
    //   model: UserModel  ,
    //   mapToModel: true,
    // });

    // const users = await sequelize.query("SELECT * FROM users WHERE id=? AND firstname=?",{
    //   replacements: ["1", "vivek"],
    //   type:QueryTypes.SELECT
    // })

    // const userWithProfile = await UserModel.findAll({
    //   include: {
    //     model: ProfileModel,
    //     as: "profile info",
    //   },
    // });

    //Eager Loading
    // const userWithPosts = await UserModel.findAll({
    //   include: {
    //     model: PostModel,
    //     as: "posts"
    //   }
    // })

    //Lazy Loading
    const users = await UserModel.findAll();
    const user = await UserModel.findByPk(3);
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    const posts = await user.getPosts();
    return res.status(200).json({ users, user, posts });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(500).json({ error: "User not found" });

    await user.update(req.body);
    return res.status(200).json({ msg: "User updated" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(500).json({ error: "User not found" });
    await user.destroy();
    return res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
