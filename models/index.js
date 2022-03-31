const Icecream = require('./icecream')
const Users = require('./users')

Icecream.hasMany( Users )
Users.belongsTo( Icecream )

module.exports = {Icecream, Users}