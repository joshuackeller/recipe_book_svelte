export interface User {
  id: number;
  name: string;
  email: string;
  recipes: Recipe[];
  tags: Tag[];
  groups: UserGroup[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserGroup {
  userId: number;
  user: User;
  groupId: number;
  group: Group;
  autoAddRecipes: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: number;
  name: string;
  invitations: GroupInvite[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupUser {
  id: number;
  name: string;
  email: string;
}

export interface GroupInvite {
  id: number;
  name: string;
  email: string;
  groupId?: number;
  group?: Group;
}

export interface Recipe {
  id: number;
  name: string;
  html: string;
  userId: number;
  user: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: number;
  name: string;
  userId: number;
  user: User;
  recipes: Recipe[];
}
