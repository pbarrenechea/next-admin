type BreadcrumbiItem = {
  label: string;
  link: string;
};
export type BreadcrumbsType = {
  [key: string]: Array<BreadcrumbiItem>;
};
const Breadcrumbs: BreadcrumbsType = {
  '/users': [{ label: 'Users', link: '/users' }],
  '/profile': [{ label: 'Profile', link: '/profile' }],
  '/todos': [{ label: 'Todos', link: '/todos' }],
  '/': [],
};

export default Breadcrumbs;
