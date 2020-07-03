const router = require('express').Router();
const controller = require('../controllers/localizacao.controller');

/**
 * @swagger
 * /localizacao/{uid}:
 *  get: 
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Identificador único do dispositivo
 *        required: true
 *        type: string
 *    description: Obtém a última localização de um dispositivo com um determinado UID
 *    responses:
 *      '200': 
 *        description: Localização do dispositivo obtido com sucesso 
 */
router.get('/:uid', controller.getUltimaLocalizacao);


/**
 * @swagger
 * /localizacao:
 *  get: 
 *    description: Obtém a última localização de todos os dispositivos registrados
 *    responses:
 *      '200': 
 *        description: Localização dos dispositivos obtidas com sucesso 
 */
router.get('/', controller.getUltimaLocalizacaoTodos);

/**
 * @swagger
 * /localizacao:
 *  get:
 *    parameters:
 *      - name: latitude
 *        in: path
 *        description: latitude da localização do dispositivo
 *        required: true
 *        type: number
 *        minimum: -90
 *        maximum: 90
 *      - name: longitude
 *        in: path
 *        description: longitude da localização do dispositivo
 *        required: true
 *        type: number
 *        minimum: -180
 *        maximum: 180
 *    description: Obtém o Tempo médio de parmanência das pessoas por local
 *    responses:
 *      '200':
 *        description: Tempo médio de parmanência dos dispositivos obtidas com sucesso
 *      '422':
 *        description: Latitude ou longitude inválida.
 */
router.get('/tempo-medio-permanencia/:latitude/:longitude', controller.getTempoMedioPermanencia);

/**
 * @swagger
 * /localizacao:
 *  get:
 *    parameters:
 *      - name: viewport
 *        in: path
 *        description: uma determinada área visível do mapa
 *        required: true
 *        type: number
 *    description: Frequência (média) de pessoas que visitam o local por hora, dia, semana e mês
 *    responses:
 *      '200':
 *        description: Objeto contendo todas essas estatísticas
 *      '422':
 *        description: Viewport inválida.
 */
router.get('/frequencia-pessoas/:viewport', controller.getFrequenciaMediaVisitantas);

/**
 * @swagger
 * /localizacao/{uid}/{lat}/{long}:
 *  post: 
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Identificador único do dispositivo
 *        required: true
 *        type: string
 *      - name: lat
 *        in: path
 *        description: latitude da localização do dispositivo
 *        required: true
 *        type: number
 *        minimum: -90
 *        maximum: 90
 *      - name: long
 *        in: path
 *        description: longitude da localização do dispositivo
 *        required: true
 *        type: number
 *        minimum: -180
 *        maximum: 180
 *    description: Insere a localização de um dispositivo com um determinado id
 *    responses:
 *      '201': 
 *        description: Localização do dispositivo inserida com sucesso 
 *      '403': 
 *        description: Dispositivo não cadastrado, não sendo autorizado a enviar localização.
 *      '422': 
 *        description: Latitude ou longitude inválida.
 */
router.post('/:uid/:lat/:long', controller.inserir);

module.exports = router;

