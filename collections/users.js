Users = Meteor.users

Users.isOAuthAdmin = function(userId) {
  const user = Users.findOne(userId) || {}
  return user._id === userId && user._isOAuthAdmin === true
}

Meteor.methods({
  'users.remove'(_id) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    Users.remove(_id)
  }
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
