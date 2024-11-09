// @deno-types="npm:@types/express@4.17.15"
import express from 'npm:express@5.0.1'
import { LivroModel } from "../database/model.ts";
import z from 'npm:zod@3.23.8'
import { EditoraModel } from "../database/model.ts";
const editora_routes=express()


async function getAllEditoras()
{
	return await EditoraModel.find()
}


editora_routes.route('/editoras')
.get(async(req,res)=>{
	try{
		const livros=await getAllEditoras()	
		res.status(200).json(livros)
	}catch(e)
	{
		res.status(500).json({message: 'Houve um problema inesperado ao realizar a busca por livros',detail: e})
	}

})









export default editora_routes