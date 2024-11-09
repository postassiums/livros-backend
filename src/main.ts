// @deno-types="npm:@types/express"
import express from "npm:express@5.0.1";
// @deno-types="npm:@types/cors"
import cors from 'npm:cors@2.8.5'
import "jsr:@std/dotenv/load";
import { pallete } from "./helpers/index.ts";
import livro_routes from "./routes/livros.ts";
import editora_routes from "./routes/editoras.ts";



const app=express()

const PORT=Deno.env.get('BACKEND_PORT') || '9000'

async function getConfigFileData() : Promise<ConfigFile >
{
	try{
		const decoder=new TextDecoder('utf-8')
		const file=await Deno.readFile('config.json')
		return JSON.parse(decoder.decode(file))
	}catch(e)
	{
		console.error(pallete.red('Failed to read config file ',e))
		Deno.exit(1)
	}
}

type ConfigFile ={
	allowed_origins: string[] | string
	tls:{
		private_key_path: string
		certifica_path: string
	}
}

const CONFIG_FILE =await getConfigFileData()


app.use(cors({origin: CONFIG_FILE.allowed_origins,methods: ['GET','POST','DELETE'],maxAge: 99999}))
app.use(express.json())
app.use(livro_routes)
app.use(editora_routes)


app.listen(PORT,()=>{
	console.log(pallete.green(`Listening on ${PORT}`))
})


