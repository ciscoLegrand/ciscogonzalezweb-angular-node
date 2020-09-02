import { Schema, model, Document} from 'mongoose'

const sobreMiSchema = new Schema({
  titulo: {
    type: String,
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

interface iSobreMi extends Document{
  titulo: string,
  texto1: string,
  texto2: string,
  texto3: string,
  texto4: string,
  texto5: string,
}

export const SobreMi = model<iSobreMi>('SobreMi', sobreMiSchema)