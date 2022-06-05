// ref: https://umijs.org/config/
export default {
  theme: {
    '@background-input': '#EDF2F7',
    'font-family': 'Open Sans, serif',
  },
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: '../pages/Login/index',
    },
    {
      path: '/',
      authority: ['ROLE_ADMIN'],
      Routes: ['./src/wrappers/auth'],
      component: '../layouts/index',
      routes: [
        {
          path: '/dashboard',
          component: './Dashboard/index',
        },
        {
          path: '/category',
          component: './Category/index',
        },
        {
          path: '/category/create',
          component: './Category/createCategory/index',
        },
        {
          path: '/category/edit/:id',
          component: './Category/editCategory/index',
        },
        {
          path: '/brands',
          component: './Brands/index',
        },
        {
          path: '/products',
          component: './Products/index',
        },
        {
          path: '/products/create',
          component: './Products/createProduct/index',
        },
        {
          path: '/products/edit/:id',
          component: './Products/editProduct/index.js',
        },
        {
          path: '/products/:pk/variants/:id',
          component: './Products/editVariant/index.js',
        },
        {
          path: '/imports',
          component: './Import/index',
        },
        {
          path: '/import/create',
          component: './Import/createImport/index',
        },
        {
          path: '/import/edit/:id',
          component: './Import/editImport/index.js',
        },
        {
          path: '/import/invoice/:id?',
          component: './importInvoice/index.js',
        },
        {
          path: '/orders',
          component: './Orders/index',
        },
        {
          path: '/orders/invoice/',
          component: './orderInvoice/index',
        },
        {
          path: '/users',
          component: './User/index',
        },
        {
          path: '/user/create',
          component: './User/createUser/index',
        },
        {
          path: '/vouchers',
          component: './Voucher/index',
        },
        {
          path: '/voucher/create',
          component: './Voucher/createVoucher/index',
        },
        {
          path: '/voucher/edit',
          component: './Voucher/editVoucher/index',
        },
        {
          path: '/report',
          component: './Report/index',
        },
        {
          path: '/',
          component: './Dashboard/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'gearshop-admin',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
