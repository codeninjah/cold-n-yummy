const Icecream = require('./icecream')
const Users = require('./users')

Icecream.hasMany( Users, { foreignKey:'ice_id' })
Users.belongsTo( Icecream )

module.exports = {Icecream, Users}