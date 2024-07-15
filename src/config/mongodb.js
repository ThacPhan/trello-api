import { env } from '~/config/environment';

import { MongoClient, ServerApiVersion } from "mongodb";
let trelloDatabase = null


// khởi tạo 1 đối tượng để kết nối mongodb
const mongoClient = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClient.connect()

  trelloDatabase = mongoClient.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabase) throw new Error('Must connect to Database first!')
  return trelloDatabase
}

// đóng connect db
export const CLOSE_DB = async () => {
  await mongoClient.close()
}