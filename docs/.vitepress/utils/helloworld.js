import path from "node:path";
import fs from "node:fs";
import { defineConfig } from 'vitepress';

//白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
    "*.md",
    "*.doc"
]
//判断是否是白名单中的文件
const matchesWhiteList = (fileName) => {
    return WHITE_LIST.some(pattern => {
        const extension = pattern.replace("*", "");
        return fileName.endsWith(extension);
    });
}

//当前文件所在的文件夹,例如  F:\WenBlog\docs\.vitepress\utils
const PATH_DIR_PATH = path.resolve();
console.log("PATH_DIR_PATH",PATH_DIR_PATH);

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

function getList(prefix,dirPath){
    console.log(`prefix:${prefix},dirPath:${dirPath}`);
    const res = [];
    const absolutePath = prefix+dirPath;
    console.log("@",absolutePath);
    const files = fs.readdirSync(absolutePath);                 //读取指定文件夹下的所有文件
    for (let file of files) {
        let absolutePathName = absolutePath + "\\" + file
        if(isDirectory(absolutePathName)){
            console.log(absolutePathName + '是个目录,遍历目录');
            res.push({
                text: file,
                collapsible: true,
                items: getList(absolutePathName)
            })
        }else{
            const b = matchesWhiteList(file);
            if(!b){
                console.log(file + " 不是白名单中的文件规则,不处理");
            }else {
                console.log(file + " 是白名单中的文件规则,添加到 res");
                res.push({
                    text: file,
                    link: `${dirPath}/${file}`
                })
            }
        }
    }
    return res;
}
// const DIR_PATH = "F:\\xj\\WenBlog\\docs";
// const list = getList("F:\\xj\\WenBlog\\docs\\src","/frontend/css");
// console.log(list);

/**
 * 根据目录 path 获取该目录下的所有文件的
 * @param path
 */
export default (path)=>{
    const prefix = "F:\\xj\\WenBlog\\docs\\src";
    const list = getList(prefix,path);
    console.log(list);
    return list;
}