// @deno-types="npm:@types/express@4.17.15"
import express, { Request, Response } from 'npm:express@5.0.1'
import { LivroModel } from "../database/model.ts";
import { RawLivroZodSchema, livro_zod_schema } from "../database/schema.ts";
import { EditoraModel } from "../database/model.ts";
const livros_routes=express()


async function getAllLivros()
{
	const pipeline=[
		{
			
			$lookup: {
				from: "editoras",
				localField: "codEditora",
				foreignField: "codigo",
				as: "editora"
			},
		},
		{ $unwind: "$editora" } ,
		{
			$project:{
				resumo: 1,
				autores: 1,
				titulo: 1,

				editora: '$editora.name'
			},
		}
	 ]
	return await LivroModel.aggregate(pipeline)
}

async function deleteLivro(id : string)
{
	return await LivroModel.deleteOne({_id: id})
}
async function findEditoraByCodigo(codigo : number)
{
	return await EditoraModel.findOne({codigo})
}
async function validateLivro(req : Request,res : Response)
{
	const {body}=req

	const valid_livro=livro_zod_schema.safeParse(body)
	if(!valid_livro.success)
	{
		res.status(400).json({ message: valid_livro.error });
		return 
	}

	const found_editora=await findEditoraByCodigo(valid_livro.data.codEditora)
	if(found_editora==null)
	{
		res.status(400).json({message: 'Código da editora informado não existe'})
		return 
		
	}
	return valid_livro
}
async function createLivro(res: Response,livro_data : RawLivroZodSchema)
{
	const new_livro=new LivroModel(livro_data)
	await new_livro.save()
	res.status(201).json({message: 'Livro criado com sucesso'})
}


livros_routes.route('/livros')
.get(async(req,res)=>{
	try{
		const livros=await getAllLivros()	
		res.status(200).json(livros)
	}catch(e)
	{
		res.status(500).json({message: 'Houve um problema inesperado ao realizar a busca por livros',detail: e})
	}

})
.post(async(req,res)=>{
	try{
		const valid_livro=await validateLivro(req,res)
		if(valid_livro==undefined)
		{
			return
		}
		await createLivro(res,valid_livro.data)

	}catch(e)
	{
	
		res.status(500).json({message: 'Não foi possível cria um livro ',e})
	}

})





livros_routes.delete('/livros/:id',async (req,res)=>{
	try{
		const id=req.params.id

		await deleteLivro(id)	
		res.status(200).json({message: 'Livro deletado com sucesso'})
	}catch(e)
	{
		res.status(500).json({message: 'Houve um problema inesperado ao deletar o livro',detail: e})
	}

	
})


export default livros_routes