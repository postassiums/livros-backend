import {MongoClient} from 'npm:mongodb@6.10.0'
import { pallete } from "../helpers/index.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts"


function getDatabaseConnection()
{
	const DATABASE_USER=Deno.env.get('DATABASE_USER')
	const DATABASE_PASSWORD=Deno.env.get('DATABASE_PASSWORD')
	const DATABASE_NAME=Deno.env.get('DATABASE_NAME')
	const DATABASE_HOST=Deno.env.get('DATABASE_HOST')
	const DATABASE_PORT=Deno.env.get('DATABASE_PORT')
	const URL=`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`
	try{
		const TIMEOUT=6*10**3
		const client=new MongoClient(URL,{connectTimeoutMS: TIMEOUT,socketTimeoutMS: TIMEOUT })
		return client.db(DATABASE_NAME)
	}catch(e)
	{
		console.error(pallete.red('It was not possible to connect to the database ',e))
		console.warn(pallete.yellow(`Connection string is: ${URL}`))
		Deno.exit(1)
	}
}

const db= getDatabaseConnection()




export default db