import {defineConfig} from 'vitepress'

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
    },
    vite: {},
    vue: {},

    /**
     * 默认主题配置
     */
    themeConfig: {
        i18nRouting: true,
        logo: '/logo.jpg',
        siteTitle: '闻家奇',
        search: {
            provider: 'local'
        },
        nav: [
            {text: '首页', link: '/'},
            {
                text: '前端', items: [
                    {
                        items: [
                            {text: 'HTML', link: '/Html'},
                            {text: 'CSS', link: '/Html'},
                            {text: 'JavaScript', link: '/Html'}
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
                            {text: 'MySQL', link: '/Html'},
                            {text: 'Redis', link: '/markdown-examples'},
                            {text: 'Postgresql', link: '/Html'},
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
                    {text: '架构', link: '/Html'},
                    {
                        items: [
                            {text: 'VitePress', link: '/Html'},
                            {text: 'Markdown', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'BaoBaoQiMing', link: '/Html'},
                            {text: 'ZhaoGuiLv', link: '/Html'},
                        ]
                    },
                    {
                        items: [
                            {text: 'ExampleAdmin', link: '/Html'},
                        ]
                    }
                ]
            },
        ],

        sidebar: {
            '/Html': [
                {
                    text: "HTML", collapsed: true, items: [
                        {text: 'a', link: "aa"},
                        {text: 'b', link: "bb"},
                        {text: 'c', link: "cc"},
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'wechat', link: '/social/social_wechat'},
            {icon: 'github', link: 'https://github.com/wenjiaqi123'},
            {icon: 'gitee', link: 'https://gitee.com/wjq303812'},
            {icon: 'csdn', link: 'https://blog.csdn.net/Wen_J_Q'}
        ],

        returnToTopLabel: "返回顶部",
        footer: {
            message: 'Released under the MIT License',
            copyright: 'Copyright © wen7'
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // }
    },

    // Layout: () => {
    //     return h(Layout, null, {
    //         // https://vitepress.dev/guide/extending-default-theme#layout-slots
    //     });
    // }
})