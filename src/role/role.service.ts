import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PinoLogger } from 'nestjs-pino';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedRole, Roles } from './entities/role.entity';
import { Model } from 'mongoose';
import { FilterRoleInput } from './dto/filter-role.input';
import _ from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    private logger: PinoLogger,
    @InjectModel(Roles.name) private roleModel: Model<Roles>,
  ) {
    this.logger.setContext(RoleService.name);
  }
  async create(createRoleInput: CreateRoleInput): Promise<Roles> {
    try {
      this.logger.info('RoleService#create.input %o', createRoleInput);
      const createdservice = new this.roleModel(createRoleInput);
      const result = await createdservice.save();
      await result.populate([
        {
          path: 'menus',
          populate: 'menuId',
        },
      ]);
      this.logger.info('RoleService#create.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#create %o', error);
      throw new BadRequestException(
        'Lỗi tạo Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findById(id: string): Promise<Roles> {
    try {
      this.logger.info('RoleService#create.fingByCode %o', id);
      console.time('process fingByCode Role');
      const result = this.roleModel.findById(id).populate([
        {
          path: 'menus',
          populate: {
            path: 'menuId',
            populate: 'services',
          },
        },
      ]);
      this.logger.info('RoleService#fingByCode.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#fingByCode %o', error);
      throw new BadRequestException(
        'Lỗi tìm Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findAll(filter: FilterRoleInput): Promise<PaginatedRole> {
    try {
      this.logger.info('RoleService#findAll %o', filter);
      const { pageNumber, pageSize, search } = filter;
      const _search = _.omitBy(search, _.isEmpty);
      const total = await this.roleModel
        .find({
          $and: [
            { name: RegExp(_search?.name) },
            { code: RegExp(_search?.code) },
            { statsu: _search?.statsus },
          ],
        })
        .countDocuments();
      const result = await this.roleModel
        .find(
          {
            $and: [
              { name: RegExp(_search?.name) },
              { code: RegExp(_search?.code) },
              { statsu: _search?.statsus },
            ],
          },
          {},
          { skip: (pageNumber - 1) * pageSize, limit: pageSize },
        )
        .populate([
          {
            path: 'menus',
            populate: {
              path: 'menuId',
              populate: 'services',
            },
          },
        ]);
      this.logger.info('RoleService#findAll %o', result);
      return { nodes: result, totalCount: total };
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findOne(code: string) {
    try {
      this.logger.info('RoleService#findOne %o', code);
      const result = await this.roleModel.findOne({ code }).populate([
        {
          path: 'menus',
          populate: {
            path: 'menuId',
            populate: 'services',
          },
        },
      ]);
      this.logger.info('RoleService#findAll %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tìm kiếm Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }
  async update(id: string, updateServiceInput: UpdateRoleInput) {
    try {
      this.logger.info('RoleService#update %o', id);
      const result = await this.roleModel
        .findByIdAndUpdate(id, updateServiceInput, { new: true })
        .populate([
          {
            path: 'menus',
            populate: {
              path: 'menuId',
              populate: 'services',
            },
          },
        ]);

      this.logger.info('RoleService#update %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#update %o', error);
      throw new BadRequestException(
        'Lỗi cập nhật Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async remove(_id: string): Promise<boolean> {
    try {
      this.logger.info('RoleService#remove %o', _id);
      const result = await this.roleModel.deleteOne({ _id });
      this.logger.info('RoleService#remove %o', result);
      return result ? true : false;
    } catch (error) {
      this.logger.error('UsersService#remove %o', error);
      throw new BadRequestException(
        'Lỗi Xoá Menu, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }
}
