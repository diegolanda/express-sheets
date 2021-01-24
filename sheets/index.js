const express = require('express')
const { setTab } = require('./google-sheet')

const get = async (req, res) => {
  const data = await req.google.actions.get()

  res.status(200).send(data)
}

const getById = async (req, res) => {
  const data = await req.google.actions.getById(req.params.id)

  res.status(200).send(data)
}

const add = async (req, res) => {
  const data = await req.google.actions.add(req.body)

  res.status(201).send(data)
}

const del = async (req, res) => {
  const result = await req.google.actions.deleteById(req.params.id)

  const status = result ? 201 : 204

  return res.status(status).send()
}

const update = async (req, res) => {
  const result = await req.google.actions.updateById(req.params.id, req.body)

  const status = result ? 200 : 204

  return res.status(status).send()
}

const connectTab = (tabName) => {
  const router = express.Router()

  router.use(setTab(tabName))

  router.get('/', get)
  router.get('/:id', getById)
  router.post('/', add)
  router.delete('/:id', del)
  router.put('/:id', update)

  return router
}

module.exports.connectTab = connectTab
