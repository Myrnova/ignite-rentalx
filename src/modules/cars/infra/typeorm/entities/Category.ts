import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm'

import { Car } from './Car'

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @OneToMany(() => Car, (car) => car.category)
    car: Car
}

export { Category }
