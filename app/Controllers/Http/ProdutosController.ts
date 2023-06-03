/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto';
import { GenericResponse } from 'App/Utils/basicMethod';
import I18n from '@ioc:Adonis/Addons/I18n'
import CreateprodutoValidator from 'App/Validators/CreateprodutoValidator';

let genericResponse : GenericResponse

export default class ProdutosController {
    constructor(){
        genericResponse = new GenericResponse()
    }

    public async index({request, response}: HttpContextContract){        
        try {
            const body = request.qs();
            /* const data = await Produto.query().if(body.numero_for, (query)=>{
                query.where('numero_prod', body.numero_for )
            }) */

            let data = await Produto.query().preload('fornecedorproduto')
            
            genericResponse.msg = I18n.locale(body.locale).formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true
            console.log("EEERRR", error)
            return response.status(500).json(genericResponse)
        }
    }


    public async store({request, response}: HttpContextContract){
        let body ;
        try {            
            body = await request.validate(CreateprodutoValidator)
        } catch (error) {
            let data = error.messages.errors.map((e)=>{
                return {
                    field: e.field,
                    message: e.message
                }
            })
            genericResponse.msg = data
            genericResponse.error = true
          
            return response.status(400).json(genericResponse)
        }

        try {
            const data = await Produto.create(body)
            
            genericResponse.msg = "Produto registado com sucesso!!!"
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true
            return response.status(500).json(genericResponse)
        }
        
    }

    public async show({response,params}: HttpContextContract){
        try {
            const data = await Produto.findOrFail(params.id)

            genericResponse.msg = "Operação feita com sucesso!!!"
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        }
    }

    //update produto
    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const produto = await Produto.findOrFail(params.id)

            produto.numeroProd = body.numero_prod
            produto.nomeProd = body.nome_prod
            produto.cor = body.cor
            produto.peso = body.peso

            await produto.save()


            genericResponse.msg = "Operação feita com sucesso!!!"
            genericResponse.data = produto
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        }

    }

    public async destroy({response, params}){
        try {
            const data = await Produto.findOrFail(params.id)

            await data.delete();

            genericResponse.msg = I18n.locale('en').formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        } 
    }    

}
