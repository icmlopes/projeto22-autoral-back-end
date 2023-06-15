import cors from 'cors'
// import express, { Express } from 'express'
import express from 'express'


// import { loadEnv, connectDb, disconnectDB } from '@/config'
import { authenticationRouter, usersRouter, lawyerRouter, clientRouter } from './routers'

// loadEnv()

const app = express()

app
.use(cors())
.use(express.json())
.get('/verifying', (_req, res) => res.send('OK!'))
.use('/', usersRouter)
.use('/', authenticationRouter)
.use('/', lawyerRouter)
.use('/', clientRouter)

// export function init(): Promise<Express>{
//     connectDb();
//     return Promise.resolve(app);
// }

// export async function close(): Promise<void> {
//     await disconnectDB();
// }

export default app;

