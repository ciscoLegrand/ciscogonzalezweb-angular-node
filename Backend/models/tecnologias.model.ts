import { Schema, model, Document} from 'mongoose'

const tecnologiasSchema = new Schema({
  icono: {
    type: String,
    required: [true, 'El icono es obligatorio']
  },
  tecnologia: {
    type: String,
    required: [true, ' La tecnologia es obligatoria']
  },
  experiencia: {
    type: String,
    required: [true, 'La experiencia es obligatoria']
  }
})


interface iTecnologias extends Document{
  icono: string
  tecnologia: string
  experiencia: string
}

export const Tecnologias = model<iTecnologias>('Tecnologias', tecnologiasSchema)