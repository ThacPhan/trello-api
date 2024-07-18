import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  try {
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Thacphan')
    res.status(StatusCodes.CREATED).json({ message: "Post from controller: API create new board" })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
