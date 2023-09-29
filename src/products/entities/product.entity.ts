import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  Index,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from "./category.entity";

@Entity({name : 'products'})
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Index()
  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({
    name: 'created_at ',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({name: 'brand_id'})
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ 
    name: 'products_categories', //nombre de la tabla que tambien puede ser products_has_categories
    joinColumn: {
      name: 'product_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'category_id', // Relación con la otra entidad.
    },
  })
  categories: Category[];
}
