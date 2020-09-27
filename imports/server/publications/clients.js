Meteor.authPublish('clients', function clientList () {
  if (!Users.isOAuthAdmin(this.userId)) return this.stop()
  return Clients.find({}, { sort: { createdAt: -1 } })
})

Meteor.authPublish('client', function clientItem (_id) {
  check(_id, String)
  if (!Users.isOAuthAdmin(this.userId)) return this.stop()
  return Clients.find({ _id })
})
