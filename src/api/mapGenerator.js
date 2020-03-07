
export default {
    backgroundColor: '#FFFFFF',
    title: {
        text: 'nCoV疫情地图',
        subtext: '累计确诊病例数',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },

    //左侧小导航图标
    visualMap: {
        show : true,
        x: 'left',
        y: 'bottom',
        splitList: [
            {start: 0, end:99},{start: 100, end: 499},
            {start: 500, end: 999},{start: 1000, end: 9999},
            {start: 10000, },
        ],
        color: ['#AF1106', '#F94444', '#FA8383', '#FBB8B8', '#FAE4E4',]
    },

    // layoutCenter: ['50%', '50%'],
    // layoutSize: 750,
    //配置属性
    series: [{
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
            normal: {
                show: true  //省份名称
            },
            emphasis: {
                show: false
            }
        },
        data: [],
        // data: [
        //     {name: '北京',value: Math.round(Math.random()*500) },
        //     {name: '天津',value: Math.round(Math.random()*500) },
        //     {name: '上海',value: Math.round(Math.random()*500) },
        //     {name: '重庆',value: Math.round(Math.random()*500) },
        //     {name: '河北',value: Math.round(Math.random()*500) },
        //     {name: '河南',value: Math.round(Math.random()*500) },
        //     {name: '云南',value: Math.round(Math.random()*500) },
        //     {name: '辽宁',value: Math.round(Math.random()*500) },
        //     {name: '黑龙江',value: Math.round(Math.random()*500) },
        //     {name: '湖南',value: Math.round(Math.random()*500) },
        //     {name: '安徽',value: Math.round(Math.random()*500) },
        //     {name: '山东',value: Math.round(Math.random()*500) },
        //     {name: '新疆',value: Math.round(Math.random()*500) },
        //     {name: '江苏',value: Math.round(Math.random()*500) },
        //     {name: '浙江',value: Math.round(Math.random()*500) },
        //     {name: '江西',value: Math.round(Math.random()*500) },
        //     {name: '湖北',value: Math.round(Math.random()*500) },
        //     {name: '广西',value: Math.round(Math.random()*500) },
        //     {name: '甘肃',value: Math.round(Math.random()*500) },
        //     {name: '山西',value: Math.round(Math.random()*500) },
        //     {name: '内蒙古',value: Math.round(Math.random()*500) },
        //     {name: '陕西',value: Math.round(Math.random()*500) },
        //     {name: '吉林',value: Math.round(Math.random()*500) },
        //     {name: '福建',value: Math.round(Math.random()*500) },
        //     {name: '贵州',value: Math.round(Math.random()*500) },
        //     {name: '广东',value: Math.round(Math.random()*500) },
        //     {name: '青海',value: Math.round(Math.random()*500) },
        //     {name: '西藏',value: Math.round(Math.random()*500) },
        //     {name: '四川',value: Math.round(Math.random()*500) },
        //     {name: '宁夏',value: Math.round(Math.random()*500) },
        //     {name: '海南',value: Math.round(Math.random()*500) },
        //     {name: '台湾',value: Math.round(Math.random()*500) },
        //     {name: '香港',value: Math.round(Math.random()*500) },
        //     {name: '澳门',value: Math.round(Math.random()*500) }
        //   ]//数据
    }],

};
