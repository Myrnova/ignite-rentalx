import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

@Entity('rentals')
class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column()
    expected_return_date: Date

    @Column()
    total: number

    @Column()
    user_id: string

    @Column()
    car_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    car: Car

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export { Rental }
