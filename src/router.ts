import { Router, Request, Response } from 'express';
import { createMovie, findMovieById, getAllMovies, removeMovie, updateMovie } from './controllers/movieController';
import { movieCreateValidation } from './middleware/movieValidationMiddleware';
import { validate } from './middleware/validationMiddleware';

const router = Router();

export default router
  .get('/test', (req: Request, res:Response) => {
    res.status(200).send('API Works!');
  })
  .post('/moovie', movieCreateValidation(), validate, createMovie)
  .get('/moovie/:id', findMovieById)
  .get('/moovie', getAllMovies)
  .delete('/moovie/:id', removeMovie)
  .patch('/moovie/:id', movieCreateValidation(), validate, updateMovie);
