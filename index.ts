import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import RouterAlternatif from './api/routes/alternatif'
import RouterKriteria from './api/routes/kriteria'
import RouterRentangSkor from './api/routes/rentangSkort'
import cors from 'cors'
import RouterResult from './api/routes/result'
import RouteMatrix from './api/routes/matrix'

dotenv.config()
const port: Number = 4000

const app: Application = express()
// const port = process.env.PORT

app.use(express.json())

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://127.0.0.1:5500',
//     'http://127.0.0.1:5501',
//   ], // Izinkan asal ini
//   optionsSuccessStatus: 200,
// }

// app.use(cors(corsOptions))

app.use('/api/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200' })
})

app.use('/api/alternatif', RouterAlternatif)
app.use('/api/kriteria', RouterKriteria)
app.use('/api/rentang', RouterRentangSkor)
app.use('/api/matrix', RouteMatrix)
app.use('/api/result', RouterResult)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

// import express, { Application, Request, Response, NextFunction } from 'express'

// const app: Application = express()
// const port: Number = 4000

// app.use('/api/health', (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send({ status: '200' })
// })

// app.listen(port, () => console.log(`Server is listening on port ${port}`))
