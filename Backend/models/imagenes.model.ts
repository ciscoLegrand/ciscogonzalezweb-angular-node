import { Schema, model, Document} from 'mongoose'

const imagenesSchemema = new Schema( {
  img: {
    type: String,
    unique:true
  }
})

interface iImagenes extends Document{
  img: string
}

export const Imagenes = model<iImagenes>('Imagenes', imagenesSchemema)