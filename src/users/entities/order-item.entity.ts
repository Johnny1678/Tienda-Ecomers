import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Entity,
    Column,
    ManyToOne,
  } from 'typeorm';

  import { Product } from '../../products/entities/product.entity';
  import { Order } from './order.entity';

  @Entity()
  export class OrderItem {//tabal terniaria entre ordenes y productos anadiendo una columna llammada cantidad
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @Column({ type: 'int' }) // columna que se agrega a la relacion 
    quantity: number;

    @ManyToOne(() => Product) // en este caso no es funcional la relación bidireccional
    //ya que, no se consulta los productos dentro de que ordenes esta relacionada
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)// 
    order: Order;
  }