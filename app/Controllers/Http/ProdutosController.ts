/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto';
import { GenericResponse } from 'App/Utils/basicMethod';
import CreateprodutoValidator from 'App/Validators/CreateprodutoValidator';

let genericResponse : GenericResponse

export default class ProdutosController {
    constructor(){
        genericResponse = new GenericResponse()
    }

    public async index({request, response, i18n}: HttpContextContract){        
        try {
            const body = request.qs();
            let data = await Produto.query().preload('fornecedorproduto').if(body.numero_for, (query)=>{
                query.where('numero_prod', body.numero_for )
            })

            //I18n.locale(body.locale).formatMessage('messages.sucesso') 
            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = i18n.formatMessage('messages.error')
            genericResponse.error = true
            return response.status(500).json(genericResponse)
        }
    }


    public async store({request, response, i18n}: HttpContextContract){
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
            
            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = i18n.formatMessage('messages.error')
            genericResponse.error = true
            return response.status(500).json(genericResponse)
        }
        
    }

    public async show({response,params, i18n}: HttpContextContract){
        try {
            const data = await Produto.findOrFail(params.id)

            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = i18n.formatMessage('messages.error')
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        }
    }

    //update produto
    public async update({request, response, params, i18n}: HttpContextContract){
        const body = request.body();
        try {
            const produto = await Produto.findOrFail(params.id)

            produto.numeroProd = body.numero_prod
            produto.nomeProd = body.nome_prod
            produto.cor = body.cor
            produto.peso = body.peso

            await produto.save()


            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = produto
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = i18n.formatMessage('messages.error')
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        }

    }

    public async destroy({response, params, i18n}){
        try {
            const data = await Produto.findOrFail(params.id)

            await data.delete();
            
            //I18n.locale('en').formatMessage('messages.sucesso')
            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = i18n.formatMessage('messages.error')
            genericResponse.error = true

            return response.status(500).json(genericResponse) 
        } 
    }    

}
