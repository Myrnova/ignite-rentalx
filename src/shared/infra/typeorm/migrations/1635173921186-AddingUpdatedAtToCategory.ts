import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddingUpdatedAtToCategory1635173921186
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'categories',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('categories', 'updated_at')
    }
}
