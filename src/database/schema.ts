import z from 'npm:zod@3.23.8'
import db from "./index.ts";



export interface Editora{
	nome: string
	codigo: number
}

export interface Livro{
	codEditora: number,
	titulo: string
	resumo: string,
	autores: string[]
}


export const livro_collection=db.collection<Livro>('livros')

export const editora_collection=db.collection<Editora>('editoras')




export const livro_zod_schema=z.object({
	titulo: z.string({required_error: 'Título é obrigatório'}),
	resumo: z.string({required_error: 'Resumo é Obrigatório'}),
	autores: z.array(z.string({required_error: 'Autores é obrigatório'})),
	codEditora: z.number({required_error: 'Código da editora é obrigatório',
		invalid_type_error: 'Código da editora deve ser um campo númerico'})
})
export type RawLivroZodSchema=z.infer<typeof livro_zod_schema>

