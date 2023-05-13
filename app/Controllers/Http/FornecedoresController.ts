/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fornecedor from 'App/Models/Fornecedor';

import { GenericResponse } from "App/Utils/basicMethod";
import CreatefornecedorValidator from 'App/Validators/CreatefornecedorValidator';


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
        let body;
        try {
            body= await request.validate(CreatefornecedorValidator)
        } catch (error) {
            let data = error.messages.errors.map((e)=>{
                return{
                    field: e.field,
                    message: e.message
                }
            })
            genericResponse.msg = data
            genericResponse.error = true
          
            return response.status(400).json(genericResponse)
        }

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

    //update fornecedor
    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const fornecedor = await Fornecedor.findOrFail(params.id)

            fornecedor.nomeFor = body.nome_for
            fornecedor.estatuto = body.estatuto
            fornecedor.cidadeFor = body.cidade_for            

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
