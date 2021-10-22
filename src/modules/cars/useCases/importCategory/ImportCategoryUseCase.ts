import csvParse from 'csv-parse'
import fs from 'fs'

import { ICategoryRepository } from '../../repositories/interface/ICategoryRepository'

interface IImportCategory {
    name: string
    description: string
}

class ImportCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    private loadCategories(
        file: Express.Multer.File
    ): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = []
            const stream = fs.createReadStream(file.path)

            const parseFile = csvParse()

            stream.pipe(parseFile)
            // we need to await when using the parseFile to get the complete value
            parseFile
                .on('data', (line) => {
                    const [name, description] = line
                    categories.push({ name, description })
                })
                .on('end', () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on('error', (err) => {
                    reject(err)
                })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file)

        // using async on map makes the return unnecessary
        categories.map(async (category) => {
            const { name, description } = category

            const existCategory = this.categoryRepository.findByName(name)

            if (!existCategory)
                this.categoryRepository.create({ name, description })
        })
    }
}

export { ImportCategoryUseCase }
