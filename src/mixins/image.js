import nophoto from "../assets/players/nophoto.png";

export default {
  methods: {
    /*função de retorno caso não ache foto no diretório com id*/
    replaceByDefault(e) {
      e.target.src = nophoto;
    },
    /*função procurar imagem com o mesmo nome do id*/
    getImagePath(path, id) {
      return `/${path}/${id}.png`;
    },
    /*função para procurar imagem no diretório*/
    fileExists(filename) {
      var http = new XMLHttpRequest();
      http.open("HEAD", filename, false);
      http.send();

      if (http.status === 404) {
        filename = nophoto;
        http = new XMLHttpRequest();
        http.open("HEAD", filename, false);
        http.send();

        return http.status !== 404;
      }
      return http.status !== 404;
    },
  },
};
