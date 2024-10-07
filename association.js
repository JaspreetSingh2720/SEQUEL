const { UserModel } = require("./models/users");
const { ProfileModel } = require("./models/profileModels");
const { PostModel } = require("./models/postModels");
UserModel.hasOne(ProfileModel, {
  foreignKey: "userId",
  as: "profile info",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user Info",
});

UserModel.hasMany(PostModel, {
  foreignKey: "userId",
  as: "posts",
});

PostModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});

// UserModel.belongsToMany(PostModel, {
//   through: "User_posts",
// });

// PostModel.belongsToMany(UserModel, {
//   through: "User_posts",
// });
