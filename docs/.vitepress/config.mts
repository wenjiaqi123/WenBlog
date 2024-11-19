import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: "Blog",
    titleTemplate:'闻',
    description: "闻家奇的文档",
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    lastUpdated: true,
    themeConfig: {
        logo: './logo.jpg',
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
                    {text: '基础', link: '/Html'},
                    {text: '并发编程', link: '/Html'},
                    {text: 'Maven', link: '/Html'},
                    {text: 'SpringBoot', link: '/markdown-examples'},
                    {text: 'SpringMVC', link: '/markdown-examples'},
                    {text: 'Mybatis', link: '/markdown-examples'},
                    {text: 'SpringDataJPA', link: "/markdown-examples"},
                    {text: 'SpringCloudAlibaba', link: '/markdown-examples'},
                ]
            },
            {
                text: 'Python', items: [
                    {text: '基础语法', link: '/Html'},
                    {text: 'Numpy', link: '/Html'},
                    {text: 'Scipy', link: '/markdown-examples'},
                    {text: 'Pandas', link: '/markdown-examples'},
                    {text: 'Matplotlib', link: "/markdown-examples"},
                ]
            },
            {text: 'Golang', link: '/aa'},
            {
                text: '数据库', items: [
                    {text: 'MySQL', link: '/Html'},
                    {text: 'Redis', link: '/markdown-examples'},
                    {text: 'Postgresql', link: '/Html'},
                    {text: 'ElasticSearch', link: '/markdown-examples'},
                    {text: 'MongoDB', link: '/markdown-examples'},
                    {text: 'Neo4j', link: '/markdown-examples'},
                    {text: 'Milvus', link: '/markdown-examples'},
                ]
            },
            {
                text: '运维', items: [
                    {text: 'Linux', link: '/Html'},
                    {text: 'Shell', link: '/Html'},
                    {text: 'Docker', link: '/Html'},
                    {text: 'Jenkins', link: '/Html'},
                    {text: 'Kubernetes', link: '/markdown-examples'},
                ]
            },
            {
                text: '组件', items: [
                    {text: 'Nginx', link: '/Html'},
                    {text: 'MinIO', link: '/Html'},
                    {text: 'Nacos', link: '/Html'},
                    {text: 'RabbitMQ', link: '/markdown-examples'},
                    {text: 'RocketMQ', link: '/markdown-examples'},
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
                text: '项目', items: [
                    {text: 'BaoBaoQiMing', link: '/Html'},
                    {text: 'ZhaoGuiLv', link: '/Html'},
                    {text: 'Admin', link: '/Html'},
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
                    {text: 'VitePress', link: '/Html'},
                    {text: '其他', link: '/Html'},
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
            {icon: 'wechat', link: '/social_wechat'},
            {icon: 'github', link: 'https://github.com/wenjiaqi123'},
            {icon: 'gitee', link: 'https://gitee.com/wjq303812'},
            {icon: 'csdn', link: 'https://blog.csdn.net/Wen_J_Q'}
        ],

        // returnToTopLabel: "返回顶部",
        footer: {
            message: 'Released under the MIT License',
            copyright: 'Copyright © wen7'
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // }
    },
})