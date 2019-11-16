const bcrypt = require('bcryptjs')
const Boom = require('@hapi/boom')

const User = require('../models/user')

const DynamoStore = require('./dynamoStore');
const saltRounds = 10

async function create(username, passwordString) {
  let user = await get(username);
  if (!user) {
    let passwordHash = hashPassword(passwordString)
    user = new User(username, passwordHash)
    DynamoStore.putItem('users', user);
    return user
  } else {
    throw new Error(`$Ohh!, Sorry about that but '${username}' is already taken ..`);
  }
}

async function get(username) {
  return DynamoStore.getItem('users', 'username', username);
}

async function authenticate(username, passwordString) {
  const user = await get(username)

  if (!user) throw new Error('User not found')

  const valid = validatePassword(passwordString, user.passwordHash)

  return valid ? user : null
}

function validatePassword(passwordString, passwordHash) {
  return bcrypt.compareSync(passwordString, passwordHash)
}

function hashPassword(passwordString) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(passwordString, salt)
  return hash
}

module.exports = {
  authenticate,
  create,
  get
}
