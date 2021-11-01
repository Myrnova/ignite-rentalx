import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('car_images')
class CarImages {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    image_name: string

    @Column()
    car_id: string

    @CreateDateColumn()
    created_at: Date
}

export { CarImages }
