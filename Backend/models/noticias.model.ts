import { Schema, model, Document} from 'mongoose'

const noticiasSchema = new Schema({
  created: {
    type: Date
  },
  titulo: {
    type: String,
  },
  subtiulo: {
    type: String,
  },
  autor: {
    type: String
  },
  img: {
    type: String
  },
  imgYo: {
    type: String
  },
  texto1: {
    type: String
  },
  texto2: {
    type: String
  },
  texto3: {
    type: String
  },
  texto4: {
    type: String
  },
  texto5: {
    type: String
  },

})

noticiasSchema.pre<iNoticias>('save', function (next) {
  this.created = new Date()
  next()
})

interface iNoticias extends Document{
  created: Date
  titulo: string
  subtitulo: string
  autor: string
  img: string
  imgYo: string
  texto1: string
  texto2: string
  texto3: string
  texto4: string
  texto5: string
}

export const Noticias = model<iNoticias>('Noticias', noticiasSchema)