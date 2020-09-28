Meteor.publish(null, function () {
  if (!this.userId) return this.stop()
  return Users.find({ _id: this.userId }, { fields: { services: false }, sort: { createdAt: -1 } })
})

Meteor.authPublish('users', function () {
  if (Users.isOAuthAdmin(this.userId)) {
    return Users.find({ _isOAuthAdmin: { $exists: false } }, { fields: { services: false }, sort: { createdAt: -1 } })
  } else {
    return Users.find({ _id: this.userId }, { fields: { services: false } })
  }
})

Meteor.authPublish('user', function (_id) {
  if (Users.isOAuthAdmin(this.userId)) {
    return Users.find({ _id })
  } else {
    return Users.find({ _id: this.userId })
  }
})

Meteor.authPublish('administrators', function () {
  if (!Users.isOAuthAdmin(this.userId)) return this.stop()
  return Users.find({ _isOAuthAdmin: true }, { fields: { services: false }, sort: { createdAt: -1 } })
})
