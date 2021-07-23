import { NextFunction, Request, Response } from "express";
import ErrorDTO from "../../../../domain/errors/ErrorDTO";
import ValidationError from "../../../../domain/errors/ValidationError";

export default function validate(  
  request: Request, 
  response: Response, 
  next:NextFunction): void {

  var erros:ErrorDTO[] = []
  const { fullName, cpf, email, password } = request.body;
  console.log(fullName.length)

  if (fullName.length === 0) {
    erros.push({
      input: 'fullName',
      message: 'Required field'
    })
  }
  if (cpf === undefined) {
    erros.push({
      input: 'cpf',
      message: 'Required field'
    })
  } 
  if (email == undefined) {
    erros.push({
      input: 'email',
      message: 'Required field'
    })
  }

  if (password == undefined) {
    erros.push({
      input: 'password',
      message: 'Required field'
    })
  }

  if (erros.length === 0) {
    return next()
  } else {
    throw new ValidationError(erros, 403);
  }
  
}