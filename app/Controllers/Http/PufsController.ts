/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Puf from 'App/Models/Puf';
import { GenericResponse } from 'App/Utils/basicMethod';

    let genericResponse: GenericResponse

export default class PufsController {    

    constructor (){
        genericResponse = new GenericResponse()
    }

    // List Puf
    public async index({request, response}: HttpContextContract){
        try {
            const data = request.qs();
            const puf = await Puf.query().if(data.numero_fab, (query)=>{
                query.where('numero_fab', data.numero_fab)
            }).if(data.numero_prod, (query)=>{
                query.where('numero_prod', data.numero_prod)
            })

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=puf
            genericResponse.error=false
      
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        }  
    }

    // create
    public async store({request, response}: HttpContextContract){
        const body = request.body()
        try {
            const data = await Puf.create(body)
            
            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
      
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        } 
    }

    //update puf
    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const data = await Puf.findOrFail(params.id)

            data.numero_for = body.numero_for
            data.numero_fab = body.numero_fab
            data.numero_prod = body.numero_prod
            data.quantidade = body.quantidade

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

    //List fabrica by id
    public async show({params, response}: HttpContextContract){
        try {
            const data = await Puf.findOrFail(params.id)

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        } 
    }

    //Delete fabrica by id
    public async destroy({params, response}: HttpContextContract){
        try {
            const data = await Puf.findOrFail(params.id)

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
