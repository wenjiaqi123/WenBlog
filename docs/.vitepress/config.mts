import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    // title: "闻",
    description: "闻家奇的文档",
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
                    {text: 'Web', link: '/Html'},
                    {text: 'App', link: '/markdown-examples'},
                    {text: 'MiniApp', link: '/markdown-examples'},
                    {text: 'Client', link:"/markdown-examples"},
                ]
            },
            {text: 'Java', link: '/Java'},
            {text: 'Python', link: '/Python'},
            {text: 'Golang', link: '/Golang'},
            {text: 'DataBase', link: '/DataBase'},
            {text: 'Operations', link: '/markdown-examples'},
            {text: 'Projects', link: '/markdown-examples'},
        ],

        sidebar:{
            '/Html':[
                {text:"HTML",collapsed:true,items:[
                        {text:'a',link:"aa"},
                        {text:'b',link:"bb"},
                        {text:'c',link:"cc"},
                    ]}
            ]
        },

        socialLinks: [
            {icon: 'wechat', link: 'https://github.com/vuejs/vitepress'},
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
            {icon: 'gitee', link: 'https://github.com/vuejs/vitepress'},
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
