# cube
分页插件

<pre>
/*
*Page 分页
*by:    zhe-he
*last-updata: 2015-01-11
*version: 1.4

Page({
    id:     'hPage',
    num:    5,
    count:  20,
    targetPage: 10,
    url:    '',
    data:   {
        page:   'page'
    },
    type:   'get',
    waiting:    function (){},
    success:    function (data){},
    error:      function (err){}
});
* id:   分页控制的盒子id
* num:  活动分页个数        默认5
* count: 总数
* targetPage: 目标页
* url: ajax请求的地址
* type: get请求或post请求
* data: 请求地址的参数
* data.page: 分页参数名
* waiting:  请求数据等待时间执行的事件
* success:  请求数据成功执行的事件
* error:    请求失败执行的事件
*/


/*
*修正历史
*
*1.修正IE7去掉class名,class仍然渲染的问题
*
*2.添加插件Page2 省略号 （测试版）
*
*3.添加page跳到指定分页
*
*4.添加属性this.Success
*
*5.删除 Page2
* 
*6.增加跳页、第一页、第二页,删除html、mod、chooseClass、activeclass、activeClass2参数
*
*7.简化引用
* 
*8.翻页反应灵敏问题
*273行替换161行
*
*9.修复分页切换page不显示的bug
*/
</pre>