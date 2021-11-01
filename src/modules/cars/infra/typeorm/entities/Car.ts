import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { Specification } from './Specification'

@Entity('cars')
class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    daily_rate: number

    @Column({ default: true })
    available: boolean

    @Column()
    license_plate: string

    @Column()
    fine_amount: number

    @Column()
    brand: string

    @Column()
    category_id: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @ManyToMany(() => Specification)
    @JoinTable({
        name: 'specifications_cars',
        joinColumns: [{ name: 'car_id' }], // coluna da tabela de relação que referencia a tabela atual(Car)
        inverseJoinColumns: [{ name: 'specification_id' }] // coluna da tabela de relação que referencia a outra tabela
    })
    specifications: Specification[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export { Car }
