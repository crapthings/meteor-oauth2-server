Users = Meteor.users

if (Meteor.isServer) {

  Meteor.publish(null, function() {
    const _id = this.userId
    if (!_id) return this.ready()

    return Users.find({ _id }, {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    })
  })

  Meteor.publish('users', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    const user = Users.findOne(userId)
    if (user._isAdmin !== true) return this.ready()

    return Users.find({}, {
      fields: {
        services: false
      },

      sort: {
        createdAt: -1
      }
    })
  })

}
