/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto';
import { GenericResponse } from 'App/Utils/basicMethod';
import I18n from '@ioc:Adonis/Addons/I18n'

let genericResponse : GenericResponse

export default class ProdutosController {
    constructor(){
        genericResponse = new GenericResponse()
    }

    public async index({request, response}: HttpContextContract){        
        try {
            const body = request.qs();
            const data = await Produto.query().if(body.numero_for, (query)=>{
                query.where('numero_prod', body.numero_for )
            })

            genericResponse.msg = I18n.locale(body.locale).formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false

            return response.status(201).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg = "Operação falhada!!!"
            genericResponse.error = true

            return response.status(500).json(genericResponse)
        }
    }


    public async store({request, response}: HttpContextContract){
        const body = request.body();
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

    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const produto = await Produto.findOrFail(params.id)

            produto.numero_prod = body.numero_prod
            produto.nome_prod = body.nome_prod
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
