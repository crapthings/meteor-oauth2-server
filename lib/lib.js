_ = require('lodash')
dayjs = require('dayjs')

//

Clients = oAuth2Server.collections.client

//

Users = Meteor.users

Users.isOAuthAdmin = function () {
  return Meteor.user()?._isOAuthAdmin === true
}
