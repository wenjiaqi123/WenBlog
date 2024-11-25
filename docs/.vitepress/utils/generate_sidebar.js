import path from "node:path";
import fs from "node:fs";



//白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
    "*.md",
    "*.pdf",
    "*.doc",
]
//判断是否是白名单中的文件
const matchesWhiteList = (fileName) => {
    return WHITE_LIST.some(pattern => {
        const extension = pattern.replace("*", "");
        return fileName.endsWith(extension);
    });
}
//去除末尾的后缀,根据 WHITE_LIST 去除
const removeSuffix = (fileName) => {
    return WHITE_LIST.reduce((acc, pattern) => {
        return acc.replace(pattern.replace("*", ""), "");
    }, fileName);
}

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

function getList(prefix, dirPath) {
    // console.log(`prefix:${prefix},dirPath:${dirPath}`);
    const res = [];
    const absolutePath = prefix + dirPath;
    const files = fs.readdirSync(absolutePath);                 //读取指定文件夹下的所有文件
    for (let file of files) {
        let absolutePathName = absolutePath + "\\" + file
        if (isDirectory(absolutePathName)) {
            // console.log(`遍历目录: ${absolutePathName}`);
            res.push({
                text: removeSuffix(file),
                collapsed: true,
                items: getList(absolutePath, `/${file}`),
            })
        } else {
            const b = matchesWhiteList(file);
            if (b) {
                // console.log(file + " 是白名单中的文件规则,添加到 res");
                res.push({
                    text: removeSuffix(file),
                    link: `${dirPath}/${file}`
                })
            } else {
                // console.log(file + " 不是白名单中的文件规则,不处理");
            }
        }
    }
    return res;
}

/**
 * 根据目录 path 获取该目录下的所有文件的
 * @param pathname
 */
export default (pathname) => {
    const PATH_DIR_PATH = path.resolve();
    console.log(`运行时项目路径: ${PATH_DIR_PATH}`);

    const absolutePath = PATH_DIR_PATH + "/docs/src";

    let list = getList(absolutePath, pathname);
    console.log(`${pathname} 侧边栏列表 list: ${list}`);
    return list;
}