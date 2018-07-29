import * as env from 'dotenv'
env.config()

import { readFileSync } from 'fs'
import { resolve } from 'path'
let serviceAreaDataRaw = readFileSync(resolve(__dirname, '..', 'data', 'formatted-districts.json'), 'UTF-8');
const serviceAreaData = JSON.parse(serviceAreaDataRaw)

import * as express from 'express'
import Server from './server'
import ServiceAreaRoute from './servicearea/route'

const app = new Server(express(), 'v1');

app.addRoutes(new ServiceAreaRoute(serviceAreaData))
app.run(3000)