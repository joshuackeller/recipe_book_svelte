export interface User {
  id: number;
  name: string;
  email: string;
  recipes: Recipe[];
  tags: Tag[];
  groups: UserGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  userId: number;
  user: User;
  groupId: number;
  group: Group;
  autoAddRecipes: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: number;
  name: string;
  invitations: GroupInvite[];
  createdAt: string;
  updatedAt: string;
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
  groupId: number;
  group?: Group;
}

export interface Recipe {
  id: number;
  name: string;
  html: string;
  userId: number;
  user: User;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  userId: number;
  user: User;
  recipes: Recipe[];
}
