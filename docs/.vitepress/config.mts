import {defineConfig} from 'vitepress'
// import {generate_sidebar} from './utils/generate_sidebar.js'
import generate_sidebar from './utils/generate_sidebar.js'

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
            // {text: 'guide', link: '/guide'},
            {
                text: '前端', items: [
                    {
                        items: [
                            {text: 'HTML', link: '/frontend/html'},
                            {text: 'CSS', link: '/frontend/css'},
                            {text: 'JavaScript', link: '/frontend/javaScript'}
                        ]
                    },
                    {
                        items: [
                            {text: 'Vue2', link: '/frontend/vue2'},
                            {text: 'Vue3', link: '/frontend/vue3'},
                            // {text: '小程序 Wechat', link: '/frontend/miniapp'},
                            {text: '客户端 QT', link: "/frontend/qt"}
                        ]
                    }
                ]
            },
            {
                text: 'Java', items: [
                    {
                        items: [
                            {text: '基础', link: '/Java/base'},
                            {text: '并发编程', link: '/Java/concurrent'},
                            {text: 'Maven', link: '/Java/maven'},
                        ]
                    },
                    {
                        items: [
                            {text: 'SpringBoot', link: '/Java/SpringBoot'},
                            {text: 'SpringMVC', link: '/Java/springmvc'},
                            {text: 'Mybatis', link: '/Java/mybatis'},
                            {text: 'SpringDataJPA', link: "/Java/SpringDataJPA"},
                        ]
                    },
                    {
                        items: [
                            {text: 'SpringCloudAlibaba', link: '/Java/SpringCloudAlibaba'},
                        ]
                    },
                    {
                        items: [
                            {text: 'JVM', link: '/Java/jvm'},
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
            {text: 'Golang', link: '/golang'},
            {
                text: '数据库', items: [
                    {
                        items: [
                            {text: 'MySQL', link: '/Database/MySQL/'},
                            {text: 'Redis', link: '/Database/Redis'},
                            {text: 'Postgresql', link: '/Database/Postgresql'},
                        ]
                    },
                    {
                        items: [
                            {text: '数据库设计', link: '/Database/Design'},
                            {text: '国家编号', link: 'https://baobaoqiming.wen7.online'},
                            {text: '行政编号', link: 'https://zhaoguilv.wen7.online'},
                        ]
                    },
                    {
                        items: [
                            {text: 'ElasticSearch', link: '/Database/ElasticSearch'},
                            {text: 'MongoDB', link: '/Database/MongoDB'},
                            {text: 'Neo4j', link: '/Database/Neo4j'},
                            {text: 'Milvus', link: '/Database/Milvus'},
                            {text: 'ClickHouse', link: '/Database/ClickHouse'},
                            {text: 'HBase', link: '/Database/HBase'},
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
                    {text: '设计模式', link: '/other/DesignPatterns'},
                    {text: '数据结构与算法', link: '/dsa'},
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
            '/frontend/html': generate_sidebar('/frontend/html'),
            '/frontend/css': generate_sidebar('/frontend/css'),
            '/frontend/javaScript': generate_sidebar('/frontend/javaScript'),
            '/frontend/vue2': generate_sidebar('/frontend/vue2'),
            '/frontend/vue3': generate_sidebar('/frontend/vue3'),
            '/frontend/miniapp': generate_sidebar('/frontend/miniapp'),
            '/frontend/qt': generate_sidebar('/frontend/qt'),


            '/Java/maven': generate_sidebar('/Java/maven'),
            '/Java/SpringBoot': generate_sidebar('/Java/SpringBoot'),
            '/Java/springmvc': generate_sidebar('/Java/springmvc'),
            '/Java/mybatis': generate_sidebar('/Java/mybatis'),
            '/Java/SpringDataJPA': generate_sidebar('/Java/SpringDataJPA'),
            '/Java/SpringCloudAlibaba': generate_sidebar('/Java/SpringCloudAlibaba'),
            '/Java/jvm': generate_sidebar('/Java/jvm'),


            '/golang': generate_sidebar('/golang'),

            '/Database/MySQL': generate_sidebar('/Database/MySQL'),
            '/Database/Redis': generate_sidebar('/Database/Redis'),
            '/Database/Postgresql': generate_sidebar('/Database/Postgresql'),
            '/Database/Design': generate_sidebar('/Database/Design'),
            '/Database/ElasticSearch': generate_sidebar('/Database/ElasticSearch'),
            '/Database/MongoDB': generate_sidebar('/Database/MongoDB'),
            '/Database/Neo4j': generate_sidebar('/Database/Neo4j'),
            '/Database/Milvus': generate_sidebar('/Database/Milvus'),
            '/Database/ClickHouse': generate_sidebar('/Database/ClickHouse'),
            '/Database/HBase': generate_sidebar('/Database/HBase'),


            '/dsa': generate_sidebar('/dsa'),
            '/other/DesignPatterns': generate_sidebar('/other/DesignPatterns'),
            '/other/JetBrains': generate_sidebar('/other/JetBrains'),
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