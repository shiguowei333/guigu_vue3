// 对外暴露配置常量路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    // 组件
    component: () => import('@/views/login/index.vue'),
    // 路由名称
    name: 'login',
    // 路由元信息
    meta: {
      title: '登录',// 路由标题
      hidden: true,// 该路由是否为菜单
    }
  },
  {
    // 登陆之后菜单
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        // 菜单首页路由
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'Promotion' // 菜单图标
        }
      }
    ]
  },
  {
    // 数据大屏路由
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'DataAnalysis'
    }
  },
  {
    // 404页面路由
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  }
]

export const asyncRoute = [
  {
    // 权限管理菜单路由
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    redirect: '/acl/user',
    children: [
      {
        // 用户管理路由
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        // 角色管理路由
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        // 菜单管理路由
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    // 商品管理路由
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    redirect: '/product/trademakr',
    children: [
      {
        // 品牌管理路由
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull'
        }
      },
      {
        // 属性管理路由
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled'
        }
      },
      {
        // SPU管理路由
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar'
        }
      },
      {
        // SKU管理路由
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange'
        }
      }
    ]
  }
]

export const anyRoute = {
  // 任意路由，跳转404
  path: '/:pathMatch(.*)*',
  redirect:'/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true
  }
}