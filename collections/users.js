Users = Meteor.users

Users.isOAuthAdmin = function(userId) {
  const user = Users.findOne(userId) || {}
  return user._id === userId && user._isOAuthAdmin === true
}

Meteor.methods({
  'users.new'(user) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    _.omit(user, ['_isOAuthAdmin'])
    Accounts.createUser(user)
  },

  'users.edit'(_id, user) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    _.omit(user, ['password'])
    Users.update(_id, { $set: user })
  },

  'users.remove'(_id) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    Users.remove(_id)
  },

  'administrators.new'(user) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    user._isOAuthAdmin = true
    Accounts.createUser(user)
  },

  'administrators.edit'(_id, user) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    _.omit(user, ['password'])
    Users.update(_id, { $set: user })
  },
})

if (Meteor.isServer) {

  Meteor.publish(null, function() {
    const _id = this.userId
    if (!_id) return this.ready()

    const selector = { _id }

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find(selector, opts)
  })

  Meteor.publish('users', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    const selector = { _isOAuthAdmin: { $exists: false } }

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find(selector, opts)
  })

  Meteor.publish('user', function(_id) {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    return Users.find({ _id })
  })

  Meteor.publish('administrators', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    const selector = { _isOAuthAdmin: true }

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find(selector, opts)
  })

}
