/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FornecedorProduto from 'App/Models/FornecedorProduto';
import { GenericResponse } from 'App/Utils/basicMethod';

let genericResponse: GenericResponse

export default class FornecedorProdutosController {        

    constructor (){
        genericResponse = new GenericResponse()
    }

    // List FornecedorProduto
    public async index({request, response}: HttpContextContract){
        try {
            const data = request.qs();
            const fornecedorProduto = await FornecedorProduto.query().if(data.numero_for, (query)=>{
                query.where('numero_for', data.numero_fab)
            })

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=fornecedorProduto
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
            const data = await FornecedorProduto.create(body)
            
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
            const data = await FornecedorProduto.findOrFail(params.id)

            genericResponse.msg="Operção com sucesso"
            genericResponse.data=data
            genericResponse.error=false
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        } 
    }

    //update fornecedorproduto
    public async update({request, response, params}: HttpContextContract){
        const body = request.body();
        try {
            const data = await FornecedorProduto.findOrFail(params.id)

            data.numero_for = body.numero_for
            data.numero_prod = body.numero_prod

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
            const data = await FornecedorProduto.findOrFail(params.id)

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
