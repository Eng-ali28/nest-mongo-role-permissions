import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(entityFilterQuery: FilterQuery<T>, option: QueryOptions<T> = {}): Promise<T | null> {
        return this.entityModel.findOne(entityFilterQuery, {}, option).exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[]> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T> {
        const entity = this.entityModel.create(createEntityData);

        return entity;
    }

    async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>, options?: QueryOptions<T>): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { ...options, new: true });
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}
