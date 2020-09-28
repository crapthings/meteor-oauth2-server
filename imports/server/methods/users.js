Meteor.authMethods({
  'users.new' ({ _isOAuthAdmin, ...user } = {}) {
    Meteor.isOAuthAdmin()
    return Accounts.createUser(user)
  },

  'users.edit' (_id, { password, ...user } = {}) {
    Meteor.isOAuthAdmin()
    return Users.update(_id, { $set: user })
  },

  'users.remove' (_id) {
    Meteor.isOAuthAdmin()
    if (Meteor.userId() === _id) {
      throw new Meteor.Error(400, '无法删除自己')
    }
    return Users.remove(_id)
  },

  'administrators.new' (user) {
    Meteor.isOAuthAdmin()
    user._isOAuthAdmin = true
    return Accounts.createUser(user)
  },

  'administrators.edit' (_id, { password, ...user }) {
    Meteor.isOAuthAdmin()
    if (password) {
      Accounts.setPassword(_id, password, { logout: true })
    }
    return Users.update(_id, { $set: user })
  },
})
