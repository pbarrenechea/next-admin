import { Cog, Home, User } from 'lucide-react';

export const MenuItems = [
  {
    name: 'Menu',
    icon: Cog,
    roles: ['admin', 'user'],
    items: [
      {
        name: 'Dashboard',
        icon: Home,
        link: '/',
        roles: ['admin', 'user'],
      },
    ],
  },
  {
    name: 'Administration',
    icon: Cog,
    roles: ['admin'],
    items: [
      {
        name: 'Users',
        icon: User,
        link: '/users',
        roles: ['admin'],
      },
    ],
  },
];
