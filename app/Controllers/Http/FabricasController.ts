/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Fabrica from 'App/Models/Fabrica'
import FabricaFornecedor from 'App/Models/FabricaFornecedor';
import Fornecedor from 'App/Models/Fornecedor';
import { GenericResponse } from 'App/Utils/basicMethod';
import CreatefabricaValidator from 'App/Validators/CreatefabricaValidator';

let genericResponse: GenericResponse

export default class FabricasController {

  constructor(){
    genericResponse=new GenericResponse()
  }

  public async index({request, response, i18n}: HttpContextContract){

    try {
      const data = await request.qs();

      const fabrica = await Fabrica.query().if(data.cidade_fab, (query)=>{
        query.where('cidade_fab', data.cidade_fab)
      });

      genericResponse.msg = i18n.formatMessage("messages.sucesso")
      genericResponse.data=fabrica
      genericResponse.error=false
      
      return response.status(200).json(genericResponse)

    } catch (error) {
      genericResponse.error=true
      genericResponse.msg = i18n.formatMessage('messages.error')
        
      return response.status(500).json(genericResponse)
    }    

  }

  //Querie 6 => nome fornecedor q abastence fabrica de cidade x em produto cor y
  public async fornecedorfabrica({request, response, i18n}: HttpContextContract){
    const filter = request.qs()
    try {
      const fornecedor = await Database.from(Fabrica.table + ' as f')
      .select({
        nome_fabrica: 'f.nome_fab',
        numero_fabrica: 'f.numero_fab',
        cidade_fabrica: 'f.cidade_fab',
      //  nome_fornecedor: 'for.nome_for',
      //  numero_fornecedor: 'for.numero_for'
      })
     // .innerJoin(FabricaFornecedor.table + ' as ff','f.numero_fab','ff.numero_fab')
     // .innerJoin(Fornecedor.table + ' as for', 'for.numero_for','ff.numero_for')
     // .where('f.cidade_fab', filter.cidade_fab)
      
        genericResponse.msg = i18n.formatMessage('messages.sucesso')
        genericResponse.data= fornecedor
        genericResponse.error=false
      
            return response.status(200).json(genericResponse)
      
    } catch (error) {
      genericResponse.error=true
      genericResponse.msg= i18n.formatMessage('messages.error')
        console.log("ERR", error)
      return response.status(500).json(genericResponse)
    } 
  }

  // Create fabrica
  public async store({request, response, i18n}: HttpContextContract) {
    let body ;
    try {
      body = await request.validate(CreatefabricaValidator)
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
      await Fabrica.create(body);
      
      genericResponse.msg = i18n.formatMessage('messages.sucesso')
      genericResponse.error = false
    
      return response.status(200).json(genericResponse)
      
    } catch (error) {
      genericResponse.msg = i18n.formatMessage('messages.error')
      genericResponse.error = true

      return response.status(500).json(genericResponse)
    }
    
  }

  //List fabrica by id
  public async show({params}: HttpContextContract){
    const data = await Fabrica.findOrFail(params.id)

    return{
      message: `Fabrica ${params.id} encontrada com sucesso`,
      data: data
    }
  }

  //Delete fabrica by id
  public async destroy({params}: HttpContextContract){
    const fabrica = await Fabrica.findOrFail(params.id);

    await fabrica.delete()

    return{
      message: `Fabrica ${params.id} apagada com sucesso`,
      data: fabrica
    }
  }

  //Update fabrica by id
  public async update({request, params}: HttpContextContract){
    const body = request.body()
    const fabrica = await Fabrica.findOrFail(params.id);

    fabrica.numeroFab = body.numero_fab,
    fabrica.nomeFab = body.nome_fab,
    fabrica.cidadeFab = body.cidade_fab,

    await fabrica.save()

    return{
      message: `Fabrica ${params.id} atualizado com sucesso`,
      data: fabrica
    }
  }


}
