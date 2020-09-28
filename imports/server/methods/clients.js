Meteor.authMethods({
  'clients.new' (data) {
    Meteor.isOAuthAdmin()
    data.createdAt = new Date()
    data.updatedAt = new Date()
    data.active = true
    return Clients.insert(data)
  },

  'clients.edit' (_id, data) {
    Meteor.isOAuthAdmin()
    data.updatedAt = new Date()
    return Clients.update(_id, { $set: data })
  },

  'clients.remove' (_id) {
    Meteor.isOAuthAdmin()
    return Clients.remove(_id)
  }
})
