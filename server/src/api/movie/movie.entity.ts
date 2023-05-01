import { Entity, PrimaryGeneratedColumn, Column,  } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  rating: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  director: string;

  @Column({ type: 'integer' })
  year: number;

  @Column('text', { array: true, default: [] })
  genre: string[];
}