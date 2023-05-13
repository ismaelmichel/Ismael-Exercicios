/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Fabrica from 'App/Models/Fabrica';
import Fornecedor from 'App/Models/Fornecedor';
import Produto from 'App/Models/Produto';
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

    //Querie 5 => numero fornecedor q abastence fabrica x de produto cor y
    public async fornecedorfabrica({request, response}: HttpContextContract){
        const filter = request.qs()
        try {
            const fornecedor = await Database.from(Puf.table + ' as puf')
            .select({
                nome_fornecedor: 'for.nome_for',
                numero_fornecedor: 'for.numero_for',
                numero_fabrica: 'f.numero_fab',
                nome_fabrica: 'f.nome_fab',
                numero_produto: 'p.numero_prod',
                nome_produto: 'p.nome_prod',
                cor_produto: 'p.cor'
            })
            .innerJoin(Fabrica.table + ' as f', 'puf.numero_fab', 'f.numero_fab')
            .innerJoin(Produto.table + ' as p', 'puf.numero_prod', 'p.numero_prod')
            .innerJoin(Fornecedor.table+ ' as for', 'puf.numero_for','for.numero_for')
            .where('puf.numero_fab', filter.numero_fab)
            .where('p.cor', filter.cor_produto)

            genericResponse.msg="Operção com sucesso"
            genericResponse.data= fornecedor
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

            data.numeroFor = body.numero_for
            data.numeroFab = body.numero_fab
            data.numeroProd = body.numero_prod
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
