import db from "./index.ts"
import z from 'npm:zod@3.23.8'
const {Schema}=db

export const EditoraSchema=new Schema({
	nome: {
		type: String,
		required: true
	},
	codigo: {
		type: Number,
		required: true,
	}
})



export const livroSchema=new Schema({
	codEditora: {
		type: Number,
		required: true
	},
	titulo: {
		type: String,
		required: true
	},
	resumo: {
		type: String,
		required: true
	},
	autores: {
		type: [String],
		required: true
	}
})



export const livro_zod_schema=z.object({
	titulo: z.string({required_error: 'Título é obrigatório'}),
	resumo: z.string({required_error: 'Resumo é Obrigatório'}),
	autores: z.array(z.string({required_error: 'Autores é obrigatório'})),
	codEditora: z.number({required_error: 'Código da editora é obrigatório',
		invalid_type_error: 'Código da editora deve ser um campo númerico'})
})
export type RawLivroZodSchema=z.infer<typeof livro_zod_schema>

