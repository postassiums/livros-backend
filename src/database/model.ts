import db from "./index.ts";
import { EditoraSchema, livroSchema } from "./schema.ts";

const {model}=db

export const LivroModel=model('Livro',livroSchema,'livros')

export const EditoraModel=model('Editora',EditoraSchema,'editoras')