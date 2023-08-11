import { createWebHashHistory } from "vue-router";
import { createRouter } from "vue-router";
import GameHandler from "./components/GameHandler.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: "/", component: GameHandler },
    ],
});

export default router;