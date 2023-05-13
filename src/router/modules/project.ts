const project: AuthRoute.Route = {
  name: 'project',
  path: '/project',
  component: 'self',
  meta: {
    title: '项目管理',
    singleLayout: 'basic',
    icon: 'ph:app-store-logo',
    order: 0
  }
};

export default project;
