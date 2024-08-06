import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import {
  PaginatedService,
  Service,
  ServiceDocument,
} from './entities/service.entity';
import { PinoLogger } from 'nestjs-pino';
import { FilterServiceInput } from './dto/filter-service.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';

@Injectable()
export class ServiceService {
  constructor(
    private logger: PinoLogger,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {
    this.logger.setContext(ServiceService.name);
  }
  async create(
    createServiceInput: CreateServiceInput,
  ): Promise<ServiceDocument> {
    try {
      this.logger.info('ServiceService#create.input %o', createServiceInput);
      const createdservice = new this.serviceModel(createServiceInput);
      const result = await createdservice.save();
      this.logger.info('ServiceService#create.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#create %o', error);
      throw new BadRequestException(
        'Lỗi tạo Service, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findAll(filter: FilterServiceInput): Promise<PaginatedService> {
    try {
      this.logger.info('ServiceService#findAll %o', filter);
      const { pageNumber, pageSize, search } = filter;
      const _search = _.omitBy(search, _.isEmpty);
      const total = await this.serviceModel
        .find({
          $and: [
            { name: RegExp(_search?.name) },
            { code: RegExp(_search?.code) },
            { statsu: _search?.statsus },
          ],
        })
        .countDocuments();
      const result = await this.serviceModel
        .find(
          {
            $and: [
              { name: RegExp(_search?.name, 'i') },
              { code: RegExp(_search?.code, 'i') },
              { status: _search?.status },
            ],
          },
          {},
          { skip: (pageNumber - 1) * pageSize, limit: pageSize },
        )
        // .sort({ updatedAt: -1 })
        .exec();
      this.logger.info('ServiceService#findAll.result %o', result);
      return {
        nodes: result,
        totalCount: total,
      };
    } catch (error) {
      this.logger.error('UsersService#findAll.errot %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Service, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findOne(id: string): Promise<Service> {
    try {
      this.logger.info('ServiceService#findOne %o', id);
      const result = await this.serviceModel.findById(id).exec();
      this.logger.info('ServiceService#findAll %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Service, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async update(id: string, updateServiceInput: UpdateServiceInput) {
    try {
      this.logger.info('ServiceService#update %o', id);
      const result = await this.serviceModel
        .findByIdAndUpdate(id, updateServiceInput, { new: true })
        .exec();
      this.logger.info('ServiceService#update %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#update %o', error);
      throw new BadRequestException(
        'Lỗi cập nhật Service, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async remove(_id: string) {
    try {
      this.logger.info('ServiceService#remove %o', _id);
      const result = await this.serviceModel.findByIdAndDelete({ _id }, {});
      this.logger.info('ServiceService#remove %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#remove %o', error);
      throw new BadRequestException(
        'Lỗi Xoá Service, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }
}
