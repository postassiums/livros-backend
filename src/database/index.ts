import moongose from 'npm:mongoose'
import { pallete } from "../helpers/index.ts";


const DATABASE_USER=Deno.env.get('DATABASE_USER')
const DATABASE_PASSWORD=Deno.env.get('DATABASE_PASSWORD')
const DATABASE_NAME=Deno.env.get('DATABASE_NAME')
const DATABASE_HOST=Deno.env.get('DATABASE_HOST')
const DATABASE_PORT=Deno.env.get('DATABASE_PORT')

const URL=`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}`

async function getDatabaseConnection()
{
	try{
		return await moongose.connect(URL,{socketTimeoutMS: 15000,dbName: DATABASE_NAME})
	}catch(e)
	{
		console.error(pallete.red('It was not possible to connect to the database ',e))
		console.warn(pallete.yellow(`Connection string is: ${URL}`))
		Deno.exit(1)
	}
}

const db= await getDatabaseConnection()

export default db