/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FabricaProduto from 'App/Models/FabricaProduto';
import { GenericResponse } from 'App/Utils/basicMethod';

let genericResponse: GenericResponse

export default class FabricaProdutosController {    

    constructor (){
        genericResponse = new GenericResponse()
    }

    // List FabricaProduto
    public async index({request, response, i18n}: HttpContextContract){
        try {
            const data = request.qs();
            const fabricaProduto = await FabricaProduto.query().if(data.numero_fab, (query)=>{
                query.where('numero_fab', data.numero_fab)
            })

            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data=fabricaProduto
            genericResponse.error=false
      
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg = i18n.formatMessage('messages.error')
              
            return response.status(500).json(genericResponse)
        }  
    }

    // create
    public async store({request, response, i18n}: HttpContextContract){
        const body = request.body();
        try {
            const data = await FabricaProduto.create(body)

            genericResponse.msg = i18n.formatMessage('messages.sucesso')
            genericResponse.data = data
            genericResponse.error = false
      
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg = i18n.formatMessage('messages.error')
              
            return response.status(500).json(genericResponse)
        } 
    }

    //List fabrica by id
    public async show({params, response}: HttpContextContract){
        try {
            const data = await FabricaProduto.findOrFail(params.id)

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        } 
    }

    //update fabricaproduto
    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const data = await FabricaProduto.findOrFail(params.id)

            data.numeroFab = body.numero_fab
            data.numeroProd = body.numero_prod

            await data.save()

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

    //Delete fabrica by id
    public async destroy({params, response}: HttpContextContract){
        try {
            const data = await FabricaProduto.findOrFail(params.id)

            await data.delete()

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        }
    }
}
