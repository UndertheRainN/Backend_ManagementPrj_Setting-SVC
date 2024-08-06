import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { PinoLogger } from 'nestjs-pino';
import { FilterMenuInput } from './dto/filter-menu.input';
import { Service } from 'src/service/entities/service.entity';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(
    private readonly menuService: MenuService,
    private looger: PinoLogger,
  ) {
    this.looger.setContext(MenuResolver.name);
  }

  @Mutation(() => Menu, { name: 'createMenu' })
  createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
    return this.menuService.create(createMenuInput);
  }

  @Query(() => [Menu], { name: 'listMenu' })
  findAll(@Args('filterMenuInput') filterMenuInput: FilterMenuInput) {
    return this.menuService.findAll(filterMenuInput);
  }

  @Query(() => Menu, { name: 'menu' })
  findOne(@Args('_id', { type: () => Int }) _id: string) {
    return this.menuService.findOne(_id);
  }

  @Mutation(() => Menu)
  updateMenu(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
    return this.menuService.update(updateMenuInput._id, updateMenuInput);
  }

  @Mutation(() => Menu)
  removeMenu(@Args('_id', { type: () => String }) _id: string) {
    return this.menuService.remove(_id);
  }
}
