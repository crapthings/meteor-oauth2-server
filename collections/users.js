Users = Meteor.users

Users.isOAuthAdmin = function(userId) {
  const user = Users.findOne(userId) || {}
  return (user._id === userId && user._isOAuthAdmin === true) ? true : false
}

if (Meteor.isServer) {

  Meteor.publish(null, function() {
    const _id = this.userId
    if (!_id) return this.ready()

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find({ _id }, opts)
  })

  Meteor.publish('users', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find({ _isOAuthAdmin: { $exists: false } }, opts)
  })

  Meteor.publish('administrators', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    const opts = {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    }

    return Users.find({ _isOAuthAdmin: true }, opts)
  })

}
