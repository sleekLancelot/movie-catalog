import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    order: 'ASC' | 'DESC' = 'ASC',
    title?: string,
    genre: string = '',
  ): Promise<[Movie[], number, number]> {
    let genreArr: string[] = [];
    if (genre) {
      genreArr = genre.split(',');
    }

    const [movies, total] = await this.movieRepository
    // .findAndCount({
    //   where: {
    //     title: Like(`%${title}%`),
    //     // genre: In(genre ? [...genre.split(',')] : []),
    //   },
    //   order: {
    //     title: order,
    //   },
    //   skip: (page - 1) * limit,
    //   take: limit,
    // });

    .createQueryBuilder('movie')
    .where('movie.title ILIKE :title', { title: `%${title}%` })
    .andWhere(genre ? `movie.genre && :genres` : '1=1', { genres: genre?.split(',').map(g => g.trim()).filter(Boolean) })
    .orderBy({ title: order })
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();
    return [movies, total, page];
  }

  async getMovieById(id): Promise<Movie> {
    if (isNaN(Number(id))) {
      throw new NotFoundException(`Invalid movie id ${id}`);
    }
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Can't find a movie with the id ${id}`);
    }
    return movie;
  }

  async delete(id: number): Promise<Movie[]> {
    const movieToDelete  = await this.getMovieById(id);

    if (!movieToDelete ) {
      throw new NotFoundException(`Sorry, can't find any Movie with id: ${id}`);
    }

    await this.movieRepository.remove(movieToDelete );
    
    const moviesLeft = await this.movieRepository.find();
    // if (moviesLeft.length === 0) {
    //   return [];
    // }
    return moviesLeft;
  }

  async getAllGenres(): Promise<string[]> {
    const movies = await this.movieRepository.find();
    if (!movies.length) {
      return [];
    }

    // const genres = await this.movieRepository.query(`
    //   SELECT DISTINCT unnest(genre) AS genre FROM movie;
    // `);

    // console.log(genres, movies)
    // return genres.map((row) => row.genre);

    // const genres = new Set<string>();
    // movies.forEach((movie) => {
    //   movie.genre.forEach((genre) => {
    //     genres.add(genre);
    //   });
    // });
    // return Array.from(genres);

    const genres = await this.movieRepository
    .createQueryBuilder('movie')
    .select('DISTINCT genre')
    .groupBy('genre')
    .execute();
    return genres.flatMap((row) => row.genre);
  }
}
