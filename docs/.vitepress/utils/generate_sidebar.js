import path from "node:path";
import fs from "node:fs";

/**
 * 生成侧边栏
 * 导航栏 nav 的配置一般两种:要么导航到具体某一个文件,要么导航到某一个目录
 * 文件示例: {text: 'Mysql', link: '/database/mysql.md'}
 * 目录示例: {text: 'PGSQL', link: '/database/postgresql'}
 * .
 * └── database
 *     ├── mysql.md
 *     └── postgresql
 *         ├── install.md
 *         ├── sql.md
 *         └── uninstall.md
 * 我的期望:
 * 导航到目录: 生成的侧边栏是目录下的文件,左侧有三个,分别是 install, sql, uninstall
 * 导航到文件: 生成的侧边栏是文件里的 h2, h3, h4 标题等
 * @Author: wen7
 */
// 文件根目录
const DIR_PATH = path.resolve();

// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
    "index.md",
    ".vitepress",
    "node_modules",
    ".idea",
    "assets",
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值
const intersections = (arr1, arr2) =>
    Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
    // 存放结果
    const res = [];
    // 开始遍历params
    for (let file in params) {
        // 拼接目录
        const dir = path.join(path1, params[file]);
        // 判断是否是文件夹
        const isDir = isDirectory(dir);
        if (isDir) {
            // 如果是文件夹,读取之后作为下一次递归参数
            const files = fs.readdirSync(dir);
            res.push({
                text: params[file],
                collapsible: true,
                items: getList(files, dir, `${pathname}/${params[file]}`),
            });
        } else {
            // 获取名字
            const name = path.basename(params[file]);
            // 排除非 md 文件
            const suffix = path.extname(params[file]);
            if (suffix !== ".md") {
                continue;
            }
            res.push({
                text: name,
                link: `${pathname}/${name}`,
            });
        }
    }
    // 对name做一下处理，把后缀删除
    res.map((item) => {
        item.text = item.text.replace(/\.md$/, "");
    });
    return res;
}

export const generate_sidebar = (pathname) => {
    // 获取pathname的路径
    const dirPath = path.join(DIR_PATH, pathname);
    // 读取pathname下的所有文件或者文件夹
    const files = fs.readdirSync(dirPath);
    // 过滤掉
    const items = intersections(files, WHITE_LIST);
    // getList 函数后面会讲到
    return getList(items, dirPath, pathname);
};