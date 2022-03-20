import { RequestHandler } from 'express';
import httpStatus from 'http-status'
import { prisma } from '../app'
import { findEuclidianDistance } from '../util/math'
import { recognize } from '../util/recognize'

const MAX_DISTANCE_THRESHOLD = 0.4

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.user.findMany()
    res.send(items)
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export const findUnique: RequestHandler = async (req, res) => {
  const imgData = req.body.data
  if (!imgData) {
    res.send(httpStatus.BAD_REQUEST)
  }
  const users = await prisma.user.findMany({
    include: {
      settings: true
    }
  })
  if (!users?.length) {
    res.send(httpStatus[400])
  }
  const embeddings = await recognize(imgData)

  let minDistance = Infinity
  let minDistanceUser = null

  users.forEach((user) => {
    const distance = findEuclidianDistance(user.embeddings, embeddings)
    if (minDistance > distance) {
      minDistance = distance
      minDistanceUser = user
    }
  })

  if (minDistance >= MAX_DISTANCE_THRESHOLD) {
    res.send(httpStatus[400])
  }
  console.log('USER FOUND')
  res.send(minDistanceUser)
}

export const create: RequestHandler = async (req, res) => {
  const body = req.body
  if (!body) {
    res.send(httpStatus[400])
  }
  const embeddings = await recognize(body.image)
  try {
    const result = await prisma.user.create({
      data: {
        name: body.name,
        settings: {
          create: {
            ...body.settings
          }
        },
        embeddings
      },
      include: {
        settings: true
      }
    })
    console.log('USER CREATED')
    res.send(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export const change: RequestHandler = async (req, res) => {
  const userId = req.params['id']
  const newSettings = req.body.settings
  if (!userId || !newSettings) {
    res.send(httpStatus.BAD_REQUEST)
  }

  const user = await prisma.user.findUnique({ where: {
    id: userId
  }, include: {
    settings: true
  } })

  await prisma.settings.update({
    select: {
      id: true
    },
    where: {
      id: user.settings.id
    },
    data: {
      ...newSettings
    }
  })

  const updatedUser = await prisma.user.findUnique({ where: {
    id: userId
  }, include: {
    settings: true
  } })
  console.log('USER CHANGED')
  res.send(updatedUser)
} 
