import { CircleDollarSign, ClipboardCheck, Cog, Home, PiggyBank, User } from 'lucide-react';

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
    name: 'My Apps',
    icon: Cog,
    roles: ['admin', 'user'],
    items: [
      {
        name: 'Todos',
        icon: ClipboardCheck,
        link: '/todos',
        roles: ['admin', 'user'],
      },
      {
        name: 'Expenses',
        icon: CircleDollarSign,
        link: '/expenses',
        roles: ['admin', 'user'],
      },
      {
        name: 'Savings',
        icon: PiggyBank,
        link: '/savings',
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
