// @deno-types="npm:@types/express@4.17.15"
import express from 'npm:express@5.0.1'
import { LivroModel } from "../database/model.ts";
import z from 'npm:zod@3.23.8'
const livros_routes=express()


async function getAllLivros()
{
	return await LivroModel.find()
}

async function deleteLivro(id : string)
{
	return await LivroModel.deleteOne({_id: id})
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
		const {body}=req
		const livro_zod_schema=z.object({
			titulo: z.string({required_error: 'Título é obrigatório'}),
			resumo: z.string({required_error: 'Resumo é Obrigatório'}),
			autores: z.string({required_error: 'Autores é obrigatório'}),
			codEditora: z.number({required_error: 'Código da editora é obrigaório',
				invalid_type_error: 'Código da editora deve ser um campo númerico'})
		})
		const valid_livro=livro_zod_schema.parse(body)
		const new_livro=new LivroModel(valid_livro)
		await new_livro.save()

	}catch(e)
	{
		if (e instanceof z.ZodError) {
			return res.status(400).json({ errors: e.errors });
		}
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