Clients = oAuth2Server.collections.client

if (Meteor.isServer) {

  Meteor.publish('clients', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    const user = Users.findOne(userId)
    if (user._isAdmin !== true) return this.ready()

    return Clients.find()
  })

}
