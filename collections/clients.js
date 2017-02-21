Clients = oAuth2Server.collections.client

Meteor.methods({
  'clients.add'(data) {
    data.createdAt = new Date()
    data.updatedAt = new Date()
    Clients.insert(data)
  }
})

if (Meteor.isServer) {

  Meteor.publish('clients', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    const user = Users.findOne(userId)
    if (user._isOAuthAdmin !== true) return this.ready()

    return Clients.find({}, {
      sort: {
        createdAt: -1
      }
    })
  })

}
