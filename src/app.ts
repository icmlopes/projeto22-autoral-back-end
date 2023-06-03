import cors from 'cors'
import express, { Express } from 'express'

import { loadEnv, connectDb, disconnectDB } from '@/config'
import { usersRouter } from './routers'

loadEnv()

const app = express()

app
.use(cors())
.use(express.json())
.get('/verifying', (_req, res) => res.send('OK!'))
.use('/', usersRouter)

export function init(): Promise<Express>{
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;

