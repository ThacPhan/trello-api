import exitHook from 'async-exit-hook';
import express from "express";
import { env } from '~/config/environment';
import { CLOSE_DB, CONNECT_DB } from "~/config/mongodb";
import { APIs_V1 } from '~/routes/v1';

// khởi chạy db
const START_SERVER = () => {
  const app = express();

  app.use('/v1', APIs_V1 )

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR} Trello Web, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  })

  // đóng db
  exitHook(() => {
    console.log('Server is shutting down...')
    CLOSE_DB();
  })
}

(async () => {
  try {
    console.log('1 Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
