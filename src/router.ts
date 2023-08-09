import { createWebHashHistory } from "vue-router";
import { createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Snake from "./components/games/Snake.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: "/", component: Home },
        { path: "/game/snake", component:Snake},
    ],
});

export default router;