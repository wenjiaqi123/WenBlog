export default () => {
    return [
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
                        {text: '并发编程', link: '/Java/Concurrent'},
                        {text: 'Maven', link: '/Java/Maven'},
                    ]
                },
                {
                    items: [
                        {text: 'SpringBoot', link: '/Java/SpringBoot'},
                        {text: 'SpringMVC', link: '/Java/SpringMVC'},
                        {text: 'Mybatis', link: '/Java/Mybatis'},
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
                        {text: 'JavaVirtualMachine', link: '/Java/JavaVirtualMachine'},
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
        {text: 'Golang', link: '/Golang'},
        {
            text: '数据库', items: [
                {
                    items: [
                        {text: 'MySQL', link: '/Database/MySQL'},
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
                {text: 'Git', link: '/Git'},
                {text: 'JetBrains', link: '/other/JetBrains'},
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
                        {text: '教程 VitePress', link: '/other/VitePress'},
                        {text: '教程 Markdown', link: '/other/Markdown'},
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
                        {text: '关于本站', link: '/other/aboutWebsite'},
                        {text: '联系我', link: '/other/contactMe'},
                    ]
                }
            ]
        },
    ]
}