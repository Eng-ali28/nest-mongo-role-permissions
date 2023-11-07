import { BadRequestException } from '@nestjs/common';
import mongoose, { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(entityFilterQuery: FilterQuery<T>, option: QueryOptions<T> = {}): Promise<T | null> {
        return this.entityModel.findOne(entityFilterQuery, {}, option).exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[]> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T> {
        try {
            const entity = new this.entityModel(createEntityData);

            return (await entity.save()) as T;
        } catch (error) {
            if (error instanceof mongoose.mongo.MongoError) {
                if (error.code === 11000) {
                    throw new BadRequestException('Duplicate key error. Document already exists!');
                } else {
                    throw new BadRequestException('An error occurred:', error);
                }
            }
        }
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
        options?: QueryOptions<T>,
    ): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { ...options, new: true });
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}
