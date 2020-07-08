/**
 * Verifica se um valor está dentro de uma determinada faixa
 * @param number número a ser verificado
 * @param min valor mínimo (inclusive)
 * @param max valor máximo (inclusive)
 */
exports.inRange = (number, min, max) => ( number - min ) * ( number - max ) <= 0;

/**
 * Verifica se um valor é menor que outro
 * Retornando true caso o valor 'number1' for menor que 'number2'
 * @param number1 número a ser verificado (menor)
 * @param number2 número a ser verificado (maior)
 */
exports.isAreaCoordinatesValid = (number1, number2) => number1 < number2;

/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param error Objeto contendo informações sobre o erro capturado, 
 *              que será exibido no console.
 */
exports.serverError = (response, error) => {
  response.status(500).send({message: "Erro interno do servidor"});
  console.error(error.message, error.stack);
};

exports.validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}