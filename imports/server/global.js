Meteor.authMethods = function (methods) {
    const _methods = {}

    _.each(methods, (method, methodName) => {
      _methods[methodName] = function (...args) {
        try {
          return _isUserLogin(this, args, method)
        } catch (err) {
          console.error(err)
          throw new Meteor.Error(err.code || 500, err.reason || 'fatal error')
        }
      }
    })

    Meteor.methods(_methods)
  }

Meteor.authPublish = function (name, func) {
  Meteor.publish(name, function (...args) {
    try {
      return _isUserLogin(this, args, func)
    } catch (err) {
      console.error(err)
      throw new Meteor.Error(500, 'errors.fatal')
    }
  })
}

function _isUserLogin(ctx, args, fn) {
  if (!ctx.userId) {
    throw new Meteor.Error(401, 'errors.unauthorized')
  }

  return fn.apply(ctx, args)
}

Meteor.isOAuthAdmin = function () {
  if (!Users.isOAuthAdmin()) {
    throw new Meteor.Error(401, 'errors.unauthorized')
  }
}
