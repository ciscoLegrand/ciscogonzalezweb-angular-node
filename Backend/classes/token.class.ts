import jwt from 'jsonwebtoken'

export default class Token {
  private static semilla: string = 'semilla-seed,privacidadYPropia-CiscoLegrand'
  private static caducidad: string = '1h' 
  // 1h = 1hora; 1d = 1 dia

  constructor(){}

  static getToken(payload: any): string {
    return jwt.sign({
      usuario: payload
    }, this.semilla, { expiresIn: this.caducidad })
  }

  static comprobarToken(userToken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, this.semilla, (err, decoded) => {
        if(err){
          reject()
        }else {
          resolve(decoded)
        }
      })
    })
  }
}

