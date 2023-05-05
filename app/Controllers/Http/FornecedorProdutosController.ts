/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FornecedorProduto from 'App/Models/FornecedorProduto';
import { GenericResponse } from 'App/Utils/basicMethod';
import Produto from 'App/Models/Produto';
import Database from '@ioc:Adonis/Lucid/Database';
import Fornecedor from 'App/Models/Fornecedor';


let genericResponse: GenericResponse

export default class FornecedorProdutosController {        

    constructor (){
        genericResponse = new GenericResponse()
    }

    // List FornecedorProduto
    public async index({request, response}: HttpContextContract){
        const data = request.qs();
        try {

            const fornecedorProduto = await FornecedorProduto.query().if(data.numero_for, (query)=>{
                query.where('numero_for', data.numero_for)
            })            
            
            genericResponse.msg="Operção com sucesso"
            genericResponse.data=  fornecedorProduto
            genericResponse.error=false
      
            return response.status(200).json(genericResponse)
            
        } catch (error) {
            genericResponse.error=true
            genericResponse.msg="Operação falhada"
              
            return response.status(500).json(genericResponse)
        }  
    }

    // Listar nome cor produto fornecido pelo fornecedor X
    public async produtoFornecedor({request, response}: HttpContextContract){
        const data = request.qs()
        try {
            if(!data.numero_for) {
                genericResponse.error=true
                genericResponse.msg="Operação falhada... Tem de indicar numero fornecedor"
                
                return response.status(500).json(genericResponse)
            }
            const fornecedorProduto = await Database.from(FornecedorProduto.table + ' as fp')
                .select({
                    nome_fornecedor: 'f.nome_for',
                    nome_produto: 'p.nome_prod',
                    cor: 'p.cor'
                })
                .innerJoin(Produto.table+' as p','p.numero_prod','fp.numero_prod')
                .innerJoin(Fornecedor.table+' as f','f.numero_for','fp.numero_for')
                .where('fp.numero_for', data.numero_for)           

            genericResponse.msg="Operção com sucesso"
            genericResponse.data= fornecedorProduto
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
