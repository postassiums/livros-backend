import db from "./index.ts"

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