const userBehavior: AuthRoute.Route = {
  name: 'user-behavior',
  path: '/user-behavior',
  component: 'self',
  meta: {
    title: '用户行为监控',
    icon: 'ic:baseline-spatial-tracking',
    singleLayout: 'basic',
    order: 4
  }
};

export default userBehavior;
