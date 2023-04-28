/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fornecedor from 'App/Models/Fornecedor';

import { GenericResponse } from "App/Utils/basicMethod";


let genericResponse: GenericResponse

export default class FornecedoresController {
    constructor(){
        genericResponse=new GenericResponse()
    }

    public async index({request, response}: HttpContextContract){
        try {
            const data = await request.qs();

            const fornecedor = await Fornecedor.query().if(data.numero_for, (query)=>{
                query.where('numero_for', data.numero_for)
              });
            
            genericResponse.msg="Operção com sucesso"
            genericResponse.data=fornecedor
            genericResponse.error=false
            
            return response.status(200).json(genericResponse)

        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
                
            return response.status(500).json(genericResponse)
        }
        
    }

    public async store({request, response}: HttpContextContract){
        const body = request.body();
        try {
            const data = await Fornecedor.create(body)
            genericResponse.msg="Operção com sucesso"
            genericResponse.data= data
            genericResponse.error= false
            
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.msg="Operação falhada"
            genericResponse.error= true
            return response.status(500).json(genericResponse)
        }
           
    }

    public async show({response,params}: HttpContextContract){
        try {
            const data = await Fornecedor.findOrFail(params.id)

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
            const fornecedor = await Fornecedor.findOrFail(params.id)

            fornecedor.numero_for = body.numero_for
            fornecedor.nome_for = body.nome_for
            fornecedor.estatuto = body.estatuto
            fornecedor.cidade_for = body.cidade_for            

            await fornecedor.save()

            genericResponse.msg = "Operação feita com sucesso!!!"
            genericResponse.data = fornecedor
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
            const data = await Fornecedor.findOrFail(params.id)

            await data.delete();

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
    
}
