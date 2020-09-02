import { Schema, model, Document} from 'mongoose'

const contactoSchema = new Schema({
  created: {
    type: Date
  },
  email: {
    type: String,
    required: [true, ' el email es obligatorio'],
  },
  mensaje: {
    type: String,
    required: [true, 'el mensaje es obligatorio']
  }
})

contactoSchema.pre<iContacto>('save', function (next) {
  this.created = new Date()
  next()
})

interface iContacto extends Document{
  created: Date
  emai: string
  mensaje: string
}

export const Contacto = model<iContacto>('Contacto', contactoSchema)