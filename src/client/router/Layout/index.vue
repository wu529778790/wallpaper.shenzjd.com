<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="xl" collapsed-width="0">
      <div class="logo">神族九帝</div>
      <a-menu v-model:selectedKeys="currentKey" mode="inline" theme="dark" :items="menus" :openKeys="['/puppeteer']"
        @click="handleClick" />
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from '@/router/'

const router = useRouter();

const generateMenus = routes => {
  return routes.map(route => {
    if (route?.meta?.menu === false) {
      return route.children && route.children.length > 0 && generateMenus(route?.children)[0]
    } else {
      const menu = {
        key: route.path,
        icon: route?.meta?.icon,
        label: route?.meta?.title,
        title: route?.meta?.title,
        meta: route?.meta
      }
      if (route.children && route.children.length > 0) {
        const children = generateMenus(route.children)
        if (!(children.length === 1 || children[0] === undefined)) {
          menu.children = generateMenus(route.children)
        }
      }
      return menu
    }
  })
}
const menus = generateMenus(routes)

/**
 * Returns the default current key from the given routes.
 *
 * @param {Array} routes - The array of routes to search through.
 * @return {String} The default current key.
 */
const getDefaultCurrentKay = (routes) => {
  routes.forEach(route => {
    if (!route.redirect) {
      return route.path
    } else {
      return getDefaultCurrentKay(route.children)
    }
  })
}
const currentKey = ref([getDefaultCurrentKay(routes)]);

/**
 * Handles the click event on a menu item. If the item has the `newPage` meta property set to true,
 * it opens the corresponding route in a new tab. Otherwise, it navigates to the route.
 *
 * @param {Object} options - The options object containing the clicked item, key, and keyPath.
 * @param {Object} options.item - The clicked menu item.
 * @param {string} options.key - The key of the clicked menu item.
 * @param {Array} options.keyPath - The path of the clicked menu item.
 * @return {void} This function does not return anything.
 */
const handleClick = ({ item, key, keyPath }) => {
  if (item?.meta?.newPage === true) {
    const routeData = router.resolve({ path: key })
    window.open(routeData.href, '_blank')
  } else {
    router.push(key);
  }
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .logo {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    background-color: black;
  }

  .content {
    padding: 16px;
    overflow: auto;
  }
}
</style>
