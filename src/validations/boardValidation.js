import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const createNew = async (req, res) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    console.log('req.body:', req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    res.status(StatusCodes.CREATED).json( { message: 'Get APIs list boards' })
    // next()
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }


}

export const boardValidation = {
  createNew
}