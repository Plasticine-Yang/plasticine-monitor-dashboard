const performance: AuthRoute.Route = {
  name: 'performance',
  path: '/performance',
  component: 'self',
  meta: {
    title: '性能数据监控',
    icon: 'gg:performance',
    singleLayout: 'basic',
    order: 2
  }
};

export default performance;
