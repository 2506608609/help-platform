import axios from "axios";

let whitelist = ['users/login', 'users/reg'] // 拦截器白名单，登录时不添加 token

let instance = axios.create({
    // 基本的路由配置和时常
    baseURL: "http://localhost:3000",
    timeout: 5000,
});
// 第一个回调：请求拦截的方法；第二个回调：请求失败的方法
instance.interceptors.request.use(
    (config) => {
        //请求拦截要处理的内容
        if (window.localStorage.token) {
            config.headers.authorization = "Bearer " + localStorage.token;
        }
        return config;
    },
    (err) => {
        console.error("请求失败", err);
    }
);

// 响应拦截
instance.interceptors.response.use(
    (res) => {
        // console.log(res)
        return res;
    },
    (err) => {
        console.error("响应失败", err);
    }
);

async function http(option = {}) {
    let result = null;
    if (option.method === "get" || option.method === "delete") {
        await instance[option.method](option.path, {
            params: option.params,
        })
            .then((res) => {
                result = res;
            })
            .catch((err) => {
                result = err;
            });
    } else if (option.method === "post" || option.method === "put") {
        await instance[option.method](option.path, option.params)
            .then((res) => {
                result = res;
            })
            .catch((err) => {
                result = err;
            });
    }
    return result;
}

export default http;