import moongose from 'npm:mongoose'
import { pallete } from "../helpers/index.ts";


const DATABASE_USER=Deno.env.get('DATABASE_USER')
const DATABASE_PASSWORD=Deno.env.get('DATABASE_PASSWORD')
const DATABASE_NAME=Deno.env.get('DATABASE_NAME')
const DATABASE_HOST=Deno.env.get('DATABASE_HOST')
const DATABASE_PORT=Deno.env.get('DATABASE_PORT')

const URL=`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}}`




const db= await moongose.connect(URL)
export default db