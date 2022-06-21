import Vue from "vue";
import VueRouter from "vue-router";

// 捕获push replace中的错误
// 当然在replace中的错误也是可以相同的进行捕获
// const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push方法
// push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
// replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};

Vue.use(VueRouter);
export const mainRoutes = [
  {
    path: "/",
    name: "StartChat",
    component: () => import("@/pages/start-chat"), // lazy load
    meta: {},
  },
  {
    path: "/to-chat",
    name: "ToChat",
    component: () => import("@/pages/to-chat"), 
    meta: {},
  },
  {
    // 非正常路徑導回首頁
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { path: '/' }
  }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.NODE_ENV === "production" ? "/cherri-exam/" : "/",
  routes: mainRoutes,
});

// router.beforeEach(async (to, from, next) => {});

export default router;
