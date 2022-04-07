const { Icecream, Users}= require('../models')

async function setup(){
    await Icecream.sync({force: true})
    await Users.sync({force: true})
}
  setup()