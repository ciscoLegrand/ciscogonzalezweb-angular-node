
  export interface Noticia {
      _id?: string;
      titulo?: string;
      autor?: string;
      img?: string;
      imgYo?: string;
      texto1?: string;
      texto2?: string;
      texto3?: string;
      texto4?: string;
      texto5?: string;
      created?: Date;
  }

  export interface RespuestaNoticia {
      ok: boolean;
      pagina: number;
      noticias: Noticia[];
  }



