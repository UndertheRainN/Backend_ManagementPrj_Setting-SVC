import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { PinoLogger } from 'nestjs-pino';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { FilterMenuInput } from './dto/filter-menu.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(
    private logger: PinoLogger,
    // @InjectRepository(Menu)
    // private menuRepository: Repository<Menu>,
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
  ) {
    this.logger.setContext(MenuService.name);
  }
  async create(createMenuInput: CreateMenuInput): Promise<Menu> {
    try {
      this.logger.info('MenuService#create.input %o', createMenuInput);
      const createdservice = new this.menuModel({
        ...createMenuInput,
        services: createMenuInput.servicesId,
      });
      const result = await createdservice.save();

      await result.populate('services');
      this.logger.info('MenuService#create.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#create %o', error);
      throw new BadRequestException(
        'Lỗi tạo Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findAll(filter: FilterMenuInput): Promise<Menu[]> {
    try {
      this.logger.info('MenuService#findAll %o', filter);
      const result = this.menuModel.find(filter).populate('services');

      this.logger.info('MenuService#findAll %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findOne(id: string) {
    try {
      this.logger.info('MenuService#findOne %o', id);
      const result = await this.menuModel.findById(id).exec();
      this.logger.info('MenuService#findAll %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async update(id: string, updateServiceInput: UpdateMenuInput) {
    try {
      this.logger.info('MenuService#update %o', id);
      const result = await this.menuModel
        .findByIdAndUpdate(id, {
          ...updateServiceInput,
          services: updateServiceInput.services,
        })
        .exec();
      this.logger.info('MenuService#update %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#update %o', error);
      throw new BadRequestException(
        'Lỗi cập nhật Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async remove(_id: string) {
    try {
      this.logger.info('MenuService#remove %o', _id);
      const result = await this.menuModel.deleteOne({ _id });
      this.logger.info('MenuService#remove %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#remove %o', error);
      throw new BadRequestException(
        'Lỗi Xoá Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }
}
