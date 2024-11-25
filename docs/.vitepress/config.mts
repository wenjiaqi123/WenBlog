import {defineConfig} from 'vitepress'
// import {generate_sidebar} from './utils/generate_sidebar.js'
import generate_sidebar from './utils/helloworld.js'

export default defineConfig({
    /**
     * 站点配置
     */
    lang: 'zh',
    title: "Blog",
    titleTemplate: '闻',
    description: "闻家奇",
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
    srcDir: 'src',      //配置了 srcDir,注意需要把类似 public 的文件夹放在 src 下
    appearance: true,   //配置了 appearance,可以在主题配置中配置 appearance
    lastUpdated: true,  //开启最后更新时间,时间是根据提交到 Github 上时间计算的,需要部署之后才能看到效果
    lastUpdatedText: '最后更新时间',
    markdown: {         //配置 markdown
        lineNumbers: true,      //开启行号
        image: {
            lazyLoading: true,  //开启图片懒加载
        }
    },
    vite: {},
    vue: {},


    /**
     * 默认主题配置
     */
    themeConfig: {
        i18nRouting: true,      //开启国际化路由,需要添加多语言配置
        logo: '/logo.jpg',      //配置 logo,logo 放在 public 文件夹下
        siteTitle: '闻家奇',     //配置 logo 后面的站点标题
        search: {               //开启搜索
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: "搜一搜",          //搜索框的 placeholder
                        buttonAriaLabel: "搜索文档",

                    },
                    modal: {                            //搜索结果的弹窗
                        resetButtonTitle: "清除搜索条件",
                        displayDetails: "显示详情",
                        noResultsText: "未找到相关结果,尝试更换关键词",
                        footer: {
                            selectText: "确定",
                            navigateText: "切换",
                            closeText: "关闭",
                        },
                    },
                },
            }
        },
        darkModeSwitchLabel: "深浅模式",
        nav: [
            {text: '首页', link: '/'},
            {text: 'guide', link: '/guide'},
            {
                text: '前端', items: [
                    {
                        items: [
                            {text: 'HTML', link: '/html'},
                            {text: 'CSS', link: '/css'},
                            {text: 'JavaScript', link: '/javaScript'}
                        ]
                    },
                    {
                        items: [
                            {text: 'Vue2', link: '/Html'},
                            {text: 'Vue3', link: '/Html'},
                            {text: '小程序 Wechat', link: '/markdown-examples'},
                            {text: '客户端 QT', link: "/markdown-examples"}
                        ]
                    }
                ]
            },
            {
                text: 'Java', items: [
                    {
                        items: [
                            {text: '基础', link: '/Html'},
                            {text: '并发编程', link: '/Html'},
                            {text: 'Maven', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'SpringBoot', link: '/markdown-examples'},
                            {text: 'SpringMVC', link: '/markdown-examples'},
                            {text: 'Mybatis', link: '/markdown-examples'},
                            {text: 'SpringDataJPA', link: "/markdown-examples"},
                        ]
                    },
                    {
                        items: [
                            {text: 'SpringCloudAlibaba', link: '/markdown-examples'},
                        ]
                    }
                ]
            },
            {
                text: 'Python', items: [
                    {
                        items: [
                            {text: '基础语法', link: '/Html'},
                            {text: 'Numpy', link: '/Html'},
                            {text: 'Scipy', link: '/markdown-examples'},
                            {text: 'Pandas', link: '/markdown-examples'},
                            {text: 'Matplotlib', link: "/markdown-examples"},
                        ]
                    },
                    {
                        items: [
                            {text: 'Machine Learning', link: '/Html'},
                            {text: 'NLP', link: '/Html'},
                            {text: 'OpenCV', link: '/Html'},
                        ]
                    }
                ]
            },
            {text: 'Golang', link: '/aa'},
            {
                text: '数据库', items: [
                    {
                        items: [
                            {text: 'MySQL', link: '/database/mysql/01240_DML_查询'},
                            {text: 'Redis', link: '/markdown-examples'},
                            {text: 'Postgresql', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: '数据库设计', link: '/Html'},
                            {text: '国家编号', link: 'https://baobaoqiming.wen7.online'},
                            {text: '行政编号', link: 'https://zhaoguilv.wen7.online'},
                        ]
                    },
                    {
                        items: [
                            {text: 'ElasticSearch', link: '/markdown-examples'},
                            {text: 'MongoDB', link: '/markdown-examples'},
                            {text: 'Neo4j', link: '/markdown-examples'},
                            {text: 'Milvus', link: '/markdown-examples'},
                            {text: 'ClickHouse', link: '/markdown-examples'},
                            {text: 'HBase', link: '/markdown-examples'},
                        ]
                    }

                ]
            },
            {
                text: 'Operation', items: [
                    {
                        items: [
                            {text: 'Linux', link: '/Html'},
                            {text: 'Shell', link: '/Html'},
                            {text: 'Nginx', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'Docker', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'Jenkins', link: '/Html'},
                            {text: 'Skywalking', link: '/Html'},
                            {text: 'Prometheus', link: '/Html'},
                            {text: 'Grafana', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'MinIO', link: '/Html'},
                            {text: 'Nacos', link: '/Html'},
                            {text: 'RabbitMQ', link: '/markdown-examples'},
                            {text: 'RocketMQ', link: '/markdown-examples'},
                        ]
                    },
                    {
                        items: [
                            {text: 'Kubernetes', link: '/markdown-examples'},
                        ]
                    }
                ]
            },
            {
                text: '大数据', items: [
                    {text: 'HDFS', link: '/Html'},
                    {text: 'Yarn', link: '/Html'},
                    {text: 'MapReduce', link: '/Html'},
                ]
            },
            {
                text: '其他', items: [
                    {text: 'Git', link: '/Html'},
                    {text: 'JetBrains', link: '/Html'},
                    {text: '设计模式', link: '/Html'},
                    {text: '数据结构与算法', link: '/Html'},
                    {text: '网络', link: '/howusevitepress'},
                    {
                        items: [
                            {text: '系统架构', link: '/Html'},
                            {text: '项目管理', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: '教程 VitePress', link: '/Html'},
                            {text: '教程 Markdown', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'GisOnline', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: '宝宝起名网', link: 'https://baobaoqiming.wen7.online'},
                            {text: '找规律网', link: 'https://zhaoguilv.wen7.online'},
                            {text: 'ExampleAdmin', link: 'https://exampleadmin.wen7.online'},
                        ]
                    },
                    {
                        items: [
                            {text: '关于本站', link: '/other/aboutMe'},
                        ]
                    }
                ]
            },
        ],

        /**
         * 基本使用:可以 [] 类型,单侧边栏,手动指定,切换上面的 nav 时 sidebar不会变化,除非手动修改,应用场景较少
         * 多侧边栏:但是也不会使用,因为不好维护,应用场景较少
         *             '/guide': [
         *                 {
         *                     text: 'first_chapter',
         *                     collapsed: true,
         *                     items: [
         *                         {text: 'one', link: '/guide/first_chapter/one'},
         *                         {text: 'two', link: '/guide/first_chapter/two'},
         *                     ]
         *                 },
         *                 {
         *                     text: 'secondary_chapter',
         *                     collapsed: true,
         *                     items: [
         *                         {text: 'three', link: '/guide/secondary_chapter/three'},
         *                         {text: 'four', link: '/guide/secondary_chapter/four'},
         *                     ]
         *                 }
         *             ],
         *  多侧边栏:脚本自动生成,根据 markdown 文件夹生成,应用场景较多
         */
        sidebar: {
            '/css':generate_sidebar('/frontend/css'),
        },
        aside: 'left',

        socialLinks: [
            {icon: 'wechat', link: '/social/social_wechat'},
            {icon: 'github', link: 'https://github.com/wenjiaqi123'},
            {icon: 'gitee', link: 'https://gitee.com/wjq303812'},
            {icon: 'csdn', link: 'https://blog.csdn.net/Wen_J_Q'}
        ],
        returnToTopLabel: "返回顶部",
        outline: 'deep',
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        footer: {
            // message: 'Released under the MIT License',
            copyright: 'Copyright © wen7'
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // }
    }
})