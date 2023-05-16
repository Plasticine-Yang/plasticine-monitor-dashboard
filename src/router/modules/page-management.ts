const pageManagement: AuthRoute.Route = {
  name: 'page-management',
  path: '/page-management',
  component: 'self',
  meta: {
    title: '页面管理',
    icon: 'fluent:document-one-page-sparkle-20-filled',
    singleLayout: 'basic',
    order: 3
  }
};

export default pageManagement;
