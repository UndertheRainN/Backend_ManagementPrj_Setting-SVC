
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ServiceInput {
    _id: string;
    code: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

export interface MenuInput {
    _id: string;
    code: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
    services: ServiceInput[];
    path?: Nullable<string>;
    parent_id?: Nullable<string>;
    level?: Nullable<number>;
    priority?: Nullable<number>;
}

export interface FilterMenuInput {
    code?: Nullable<string>;
    name?: Nullable<string>;
    status?: Nullable<string>;
}

export interface FilterServiceInput {
    search?: Nullable<FilterService>;
    pageNumber?: Nullable<number>;
    pageSize?: Nullable<number>;
}

export interface FilterService {
    code?: Nullable<string>;
    name?: Nullable<string>;
    status?: Nullable<string>;
}

export interface FilterRoleInput {
    search?: Nullable<FilterRole>;
    pageNumber?: Nullable<number>;
    pageSize?: Nullable<number>;
}

export interface FilterRole {
    code?: Nullable<string>;
    name?: Nullable<string>;
    status?: Nullable<string>;
}

export interface CreateMenuInput {
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    path?: Nullable<string>;
    parent_id?: Nullable<string>;
    level?: Nullable<number>;
    priority?: Nullable<number>;
    servicesId?: Nullable<string[]>;
}

export interface UpdateMenuInput {
    _id?: Nullable<string>;
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    path?: Nullable<string>;
    parent_id?: Nullable<string>;
    level?: Nullable<number>;
    priority?: Nullable<number>;
    services?: Nullable<string[]>;
}

export interface CreateServiceInput {
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

export interface UpdateServiceInput {
    _id?: Nullable<string>;
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

export interface CreateRoleInput {
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    menus: RoleMenuInput[];
}

export interface RoleMenuInput {
    menuId: string;
    access: string[];
}

export interface UpdateRoleInput {
    _id?: Nullable<string>;
    code?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    menus?: Nullable<RoleMenuObject[]>;
}

export interface RoleMenuObject {
    menuId: string[];
    access: string[];
}

export interface Service {
    _id: string;
    code: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
}

export interface PaginatedService {
    nodes?: Nullable<Service[]>;
    totalCount: number;
}

export interface Menu {
    _id: string;
    code: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
    services: Service[];
    path?: Nullable<string>;
    parent_id?: Nullable<string>;
    level?: Nullable<number>;
    priority?: Nullable<number>;
}

export interface RoleMenu {
    menuId: Menu;
    access: string[];
}

export interface Roles {
    _id: string;
    code: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
    menus: RoleMenu[];
}

export interface PaginatedRole {
    nodes?: Nullable<Roles[]>;
    totalCount: number;
}

export interface IQuery {
    listMenu(filterMenuInput: FilterMenuInput): Menu[] | Promise<Menu[]>;
    menu(_id: number): Menu | Promise<Menu>;
    listServices(filterServiceInput: FilterServiceInput): PaginatedService | Promise<PaginatedService>;
    service(_id: string): Service | Promise<Service>;
    listRole(filterRoleInput: FilterRoleInput): PaginatedRole | Promise<PaginatedRole>;
    role(_id: string): Roles | Promise<Roles>;
    roleById(_id: string): Roles | Promise<Roles>;
    findRole(code: string): Roles | Promise<Roles>;
}

export interface IMutation {
    createMenu(createMenuInput: CreateMenuInput): Menu | Promise<Menu>;
    updateMenu(updateMenuInput: UpdateMenuInput): Menu | Promise<Menu>;
    removeMenu(_id: string): Menu | Promise<Menu>;
    createService(createServiceInput: CreateServiceInput): Service | Promise<Service>;
    updateService(updateServiceInput: UpdateServiceInput): Service | Promise<Service>;
    removeService(id: string): Service | Promise<Service>;
    createRole(createRoleInput: CreateRoleInput): Roles | Promise<Roles>;
    updateRole(updateRoleInput: UpdateRoleInput): Roles | Promise<Roles>;
    removeRole(_id: string): boolean | Promise<boolean>;
}

export type DateTime = any;
type Nullable<T> = T | null;
