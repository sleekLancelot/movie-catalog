import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    ParseIntPipe,
    Query,
    Delete,
  } from '@nestjs/common';
  import { MovieService } from './movie.service';
import { MovieDto } from './movie.dto';
import { Movie } from './movie.entity';
  
  @Controller('movies')
  export class MovieController {
    constructor(private readonly movieService: MovieService) {}
  
    @Post()
    async create(@Body() MovieDto: MovieDto) {
      return await this.movieService.create(MovieDto);
    }
  
    @Get()
    async findAll(
      @Query('page', ParseIntPipe) page: number = 1,
      @Query('limit', ParseIntPipe) limit: number = 10,
      @Query('order') order: 'ASC' | 'DESC' = 'ASC',
      @Query('title') title: string = '',
      @Query('genre') genre: string = '',
    ) {
      const [movies, total, currentPage] = await this.movieService.findAll(
        page,
        limit,
        order,
        title,
        genre,
      );
      return { data: movies, total, currentPage, last_page: Math.ceil(total / limit), };
    }
  
    @Get('details/:id')
    async getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
      return this.movieService.getMovieById(id);
    }

    @Get('genres')
    async getAllGenres() {
      return await this.movieService.getAllGenres();
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.movieService.delete(id);
    }
  }
  