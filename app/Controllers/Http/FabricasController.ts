/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fabrica from 'App/Models/Fabrica'
import { GenericResponse } from 'App/Utils/basicMethod';

let genericResponse: GenericResponse

export default class FabricasController {

  constructor(){
    genericResponse=new GenericResponse()
  }

  public async index({request, response}: HttpContextContract){

    try {
      const data = await request.qs();

      const fabrica = await Fabrica.query().if(data.cidade_fab, (query)=>{
        query.where('cidade_fab', data.cidade_fab)
      });

      genericResponse.msg="Operção com sucesso"
      genericResponse.data=fabrica
      genericResponse.error=false
      
      return response.status(200).json(genericResponse)

    } catch (error) {
      genericResponse.error=true
      genericResponse.msg="Operação falhada"
        
      return response.status(500).json(genericResponse)
    }    

  }

  // Create fabrica
  public async store({request, response}: HttpContextContract) {

    const body = request.body()
    try {
      const data = await Fabrica.create(body);
      response.status(201)
      return {
        message: "Fabrica registado com sucesso!!!",
        data: data,
      }
    } catch (error) {
      return response.json("Erro")
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

    fabrica.numero_fab = body.numero_fab,
    fabrica.nome_fab = body.nome_fab,
    fabrica.cidade_fab = body.cidade_fab,

    await fabrica.save()

    return{
      message: `Fabrica ${params.id} atualizado com sucesso`,
      data: fabrica
    }
  }


}
