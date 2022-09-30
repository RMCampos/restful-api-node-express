import { Request, Response } from 'express';
import { MovieModel } from '../models/Movie';
import Logger from '../../config/logger';
import { json } from 'stream/consumers';
import mongoose from 'mongoose';

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    return res.status(201).json(movie);
  } catch (e: any) {
    Logger.error(`System error: ${e.message}`);
  }
}

export async function findMovieById(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Wrong object id!'});
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({error: 'Moovie not found!'});
    }
    return res.status(200).json(movie);
  } catch (e: any) {
    Logger.error(`System error: ${e.message}`);
    return res.status(500);
  }
}

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json(movies);
  } catch (e: any) {
    Logger.error(`System error: ${e.message}`);
    return res.status(500);
  }
}

export async function removeMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Wrong object id!'});
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({error: 'Moovie not found!'});
    }

    await movie.delete();

    return res.status(200).json({msg: 'Movie removed!'});
  } catch (e: any) {
    Logger.error(`System error: ${e.message}`);
    return res.status(500);
  }
}

export async function updateMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Wrong object id!'});
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({error: 'Moovie not found!'});
    }

    await MovieModel.updateOne({_id: id}, data);

    return res.status(201).json(data);
  } catch (e: any) {
    Logger.error(`System error: ${e.message}`);
    return res.status(500);
  }
}