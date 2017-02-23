Clients = oAuth2Server.collections.client

Meteor.methods({
  'clients.new'(data) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    data.createdAt = new Date()
    data.updatedAt = new Date()
    data.active = true
    Clients.insert(data)
  },

  'clients.edit'(_id, data) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    data.updatedAt = new Date()
    Clients.update(_id, { $set: data })
  },

  'clients.remove'(_id) {
    if (!Users.isOAuthAdmin(Meteor.userId())) return
    Clients.remove(_id)
  }
})

if (Meteor.isServer) {

  Meteor.publish('clients', function() {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    const opts = {
      sort: {
        createdAt: -1
      }
    }

    return Clients.find({}, opts)
  })

  Meteor.publish('client', function(_id) {
    const userId = this.userId
    if (!userId) return this.ready()

    if (!Users.isOAuthAdmin(userId)) return this.ready()

    return Clients.find({ _id })
  })

}
