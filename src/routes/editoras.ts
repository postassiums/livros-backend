// @deno-types="npm:@types/express@4.17.15"
import express from 'npm:express@5.0.1'
import { getAllEditoras } from "../database/query.ts";
const editora_routes=express()





editora_routes.route('/editoras')
.get(async(req,res)=>{
	try{
		const livros=await getAllEditoras()	
		res.status(200).json(livros)
	}catch(e)
	{
		res.status(500).json({message: 'Houve um problema inesperado ao realizar a busca por editoras',detail: String(e)})
	}

})









export default editora_routes