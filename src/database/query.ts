import { ObjectId } from "npm:mongodb@6.10.0";
import { editora_collection, livro_collection } from "./schema.ts";
import chalk from "npm:chalk";
import { pallete } from "../helpers/index.ts";

export async function fillEditoras()
{
	const EDITORAS : readonly string[]=["Companhia das Letras",
				"Editora Globo",
				"Grupo Editorial Record",
				"Editora Intrínseca",
				"Editora Rocco",
				"Editora Objetiva",
				"Editora Planeta",
				"Editora Sextante",
				"Editora Saraiva",
				"Editora Moderna",
				"Editora Melhoramentos",
				"Editora FTD",
				"Editora Ática",
				"Editora Scipione",
				"Editora Vozes",
				"Ediouro",
				"Martins Fontes",
				"Editora Paz e Terra",
				"Editora Leya",
				"Editora Autêntica"]
	for(let i=0;i<EDITORAS.length;i++)
	{
		const nome=EDITORAS[i]
		const codigo=(i+1)*2000
		await editora_collection.insertOne({nome,codigo})
	}
	console.warn(pallete.green(`Inserted ${EDITORAS.length} editoras`))
	

}

export async function getAllEditoras()
{
	return await editora_collection.find().toArray()
}

export async function deleteLivro(id : string)
{
	const result=await livro_collection.deleteOne({_id: new ObjectId(id)})
	return result
}

export async function fillDatabaseWithData()
{
	const editora_count=await editora_collection.countDocuments()
	if(editora_count>0)
	{
		console.warn(pallete.yellow('Database already has data, skipping...'))
		return
	}
	console.warn(pallete.yellow('Initializing database'))
	await fillEditoras()
	
}


export async function findEditoraByCodigo(codigo : number)
{
	return await editora_collection.findOne({codigo: codigo})
}


export function getAllLivros()
{
	const pipeline=[
		{
			
			$lookup: {
				from: editora_collection.collectionName,
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

				editora: '$editora.nome'
			},
		}
	 ]
	return  livro_collection.aggregate(pipeline).toArray()
}