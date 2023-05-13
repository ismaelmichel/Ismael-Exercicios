/* eslint-disable prettier/prettier */
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import FabricaFornecedor from 'App/Models/FabricaFornecedor'
 import { GenericResponse } from 'App/Utils/basicMethod'
 import Produto from 'App/Models/Produto';

 let genericResponse: GenericResponse

export default class FabricaFornecedorsController {

    constructor (){
        genericResponse = new GenericResponse()
    }

    // List fabricaFornecedor
    public async index({request, response}: HttpContextContract){
        const data = request.qs();
        try {
            const produtoCor = await Produto.query().if(data.cor, (query)=>{
                query.where('cor', data.cor )
            })

            const fabricaFornecedor = await FabricaFornecedor.query().if(data.numero_fab, (query)=>{
                query.where('numero_fab', data.numero_fab)
            })

            genericResponse.msg="Operção com sucesso"
            genericResponse.data= fabricaFornecedor
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
            const data = await FabricaFornecedor.create(body)

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

    //List fabrica by id
    public async show({params, response}: HttpContextContract){
        try {
            const data = await FabricaFornecedor.findOrFail(params.id)

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        } 
    }


    //update fabricafornecedor
    public async update({request, response, params}: HttpContextContract){
        const body = request.qs();
        try {
            const data = await FabricaFornecedor.findOrFail(params.id)

            data.numeroFor = body.numero_for
            data.numeroFab = body.numero_fab

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
            const data = await FabricaFornecedor.findOrFail(params.id)

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
