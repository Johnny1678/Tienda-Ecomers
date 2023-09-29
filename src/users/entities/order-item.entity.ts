import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from "class-transformer";

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  //tabal terniaria entre ordenes y productos anadiendo una columna llammada cantidad
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()//Este decorador hace que no aparesca en el request Get, el dato
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  
  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int' }) // columna que se agrega a la relacion
  quantity: number;

  @ManyToOne(() => Product) // en este caso no es funcional la relación bidireccional
  //ya que, no se consulta los productos dentro de que ordenes esta relacionada
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.items) //
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
