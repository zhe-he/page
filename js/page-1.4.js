/*
*Page 分页
*by:    hezhe
*e-mail: 460013464@qq.com
*版本1.4

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
*330行替换218行
*
*/

(function (window){             
    function Page(json){
        if (!json) {return};
        var itemClassName = 'item-ajax'
                ,baseClassName = 'item'
                ,dotClassName = 'dot'
                ,numClassName = 'num'
                ,itemPrev = 'prev'
                ,prevIcon = 'icon-btn-prev-2'
                ,itemNext = 'next'
                ,nextIcon = 'icon-btn-next-2'
                ,total = 'total'
                ,input = 'input'
                ,btn =  'btn';
        var _this = this;
        this._activeClass = 'active';
        this._preDisabled = 'prev-disabled';
        this._nextDisabled = 'next-disabled';
        this._preDisabledIcon = 'icon-btn-prev-2-disable';
        this._nextDisabledIcon = 'icon-btn-next-2-disable';
        this.box = document.getElementById(json.id);
        this.json = json;
        this.num = this.json.num || 5;
        this.count = this.json.count || 10;
        this.index = this.json.targetPage > this.count ? this.count - 1 : (this.json.targetPage || 1) - 1;

        var arrClass = [itemClassName, baseClassName, dotClassName, numClassName, itemPrev, prevIcon, itemNext, nextIcon, total, input, btn, this._activeClass, this._preDisabled, this._nextDisabled, this._preDisabledIcon, this._nextDisabledIcon];
        this.Inner(arrClass);
        this._aLi = getByClass(this.box, itemClassName);
        this._pre = getByClass(this.box, itemPrev)[0];
        this._pre.icon = getByClass(this.box, prevIcon)[0];
        this._next = getByClass(this.box, itemNext)[0];
        this._next.icon = getByClass(this.box, nextIcon)[0];
        this._total = getByClass(this.box, total)[0];
        this._input = getByClass(this.box, input)[0];
        this._btn = getByClass(this.box, btn)[0];
        this._preDot = this.CreateItem('li', baseClassName + ' ' + dotClassName, '...');
        this._nextDot = this.CreateItem('li', baseClassName + ' ' + dotClassName, '...');
        this._firstItem = this.CreateItem('li', baseClassName, '1', numClassName);
        this._secondItem = this.CreateItem('li', baseClassName, '2', numClassName);
        this._lastItem = this.CreateItem('li', baseClassName, this.count, numClassName);

        var addLi = [this._firstItem, this._secondItem, this._lastItem];
        
        this.BaseFn(this._aLi);
        this.BaseFn(addLi);
        _this.Next();

        this._pre.onclick = function(){
            _this.Pre();
        };

        this._next.onclick = function (){
            _this.Next();
        };

        this._btn.onclick = function (){
            _this.Btn();
        }
    };

    Page.prototype.Inner = function (arr){
        this.box.className = 'm-page g-clearfix';
        
        var innerStr = '';
        var num = this.num < this.count ? this.num : this.count;
        for (var i = 0; i < num; i++) {
            var oLi = this.CreateItem('li', arr[0] + ' ' + arr[1], i + 1, arr[3]);
            innerStr += oLi.outerHTML;
        };
        this.box.innerHTML = '<div class="wraper"><div class="inner clearfix"><ul class="items"><li class="'
                           + arr[1] + ' ' + arr[4] + ' ' + arr[12]
                           + '"><a class="'
                           + arr[3]
                           +' icon-tag" href="javascript:;" trace="srp_bottom_pageup"><span class="icon '
                           + arr[5] + ' ' + arr[14]
                           + '"></span><span>上一页</span></a></li>'
                           + innerStr
                           + '<li class="item '
                           + arr[6]
                           + '"><a class="'
                           + arr[3]
                           + ' icon-tag" href="javascript:;" trace="srp_bottom_pagedown"><span>下一页</span><span class="icon '
                           + arr[7]
                           + '"></span></a></li></ul><div class="'
                           + arr[8]
                           + '">共 '
                           + this.count
                           + ' 页，</div><div class="form"><span class="text">到第</span><input class="'
                           + arr[9]
                           + '" value="2" min="1" max="'
                           + this.count
                           + '" aria-label="页码输入框" type="number"><span class="text">页</span><span class="'
                           + arr[10]
                           + '" role="button" tabindex="0">确定</span></div></div></div>';
        if(num == 1 || !num) this.box.style.display = 'none';
    }


    Page.prototype.BaseFn = function (aLi){
        var _this = this;
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].innerCon = aLi[i].children[0];
            aLi[i].onclick = function (){
                _this.LiClick(this)
            };
        };
    };

    Page.prototype.LiClick = function (ele){
        this.index = parseInt(ele.innerCon.innerHTML, 10);
        this.Change(ele);
    };

    Page.prototype.Next = function (){
        this.index++;
        if (this.index >= this.count + 1) {
            this.index = this.count;
        }else{
            this.Change();
        };
    }; 

    Page.prototype.Pre = function (){
        this.index--;
        if (this.index <= 0) {
            this.index = 1;
        }else{
            this.Change();
        };
    };

    Page.prototype.Btn = function (){   
        var count = parseInt(this._input.value, 10);
        count = count > this.count ? this.count : count;
        if(isNaN(count))return false;
        this.index = count;
        this.Change();
    };

    Page.prototype.CreateItem = function (tag, sClass, content, children){
        var dot = document.createElement(tag);
        dot.className = sClass;
        content = !children ? content : '<a class="' + children + '" href="javascript:;" aria-label="第' + content + '页" trace="srp_bottom_page' + content + '">' + content + '</a>';
        dot.innerHTML = content;
        return dot
    };

    Page.prototype.RemoveItem = function (){
        this.parentNode && this.parentNode.removeChild(this);
    };

    Page.prototype.Change = function (ele){
        //点自己返回
        if (ele && hasClass(ele, this._activeClass)) {
            return false;
        };
        this.json.waiting && this.json.waiting();
        this.json.success && this.Ajax();
        //替换s
        this.Success();
        //替换e
    };

    Page.prototype.Success = function(){
        var start = Math.ceil(this._aLi.length / 2);
        var end = Math.floor(this._aLi.length / 2);
        
        for (var i = 0; i < this._aLi.length; i++) {
            removeClass(this._aLi[i], this._activeClass);
        };
        if (this.index <= start - 1) {
            var index = this.index - 1; 
        }else if(this.index >= this.count - end + 1){
            var index = this._aLi.length - 1 + this.index - this.count;  
        }else{
            var index = start - 1;  
        };
        addClass(this._aLi[index], this._activeClass);
        for (var i = 0; i < this._aLi.length; i++) {
            var now = this.index - index + i; 
            this._aLi[i].innerCon.innerHTML = now;
            this._aLi[i].innerCon.setAttribute('aria-label', '第' + now + '页');
            this._aLi[i].innerCon.setAttribute('trace', 'srp_bottom_page' + now);
        };

        removeClass(this._pre, this._preDisabled);
        removeClass(this._pre.icon, this._preDisabledIcon);
        removeClass(this._next, this._nextDisabled);
        removeClass(this._next.icon, this._nextDisabledIcon);
        if (this.index == 1) {
            addClass(this._pre, this._preDisabled);
            addClass(this._pre.icon, this._preDisabledIcon);
        };
        if(this.index == this.count){
            addClass(this._next, this._nextDisabled);
            addClass(this._next.icon, this._nextDisabledIcon);
        };

        //总数大于5开启
        if (this.count > this._aLi.length) {
            if (this.index < this.count - start) {
                //console.log(' 插入右省略号')
                this._next.parentNode.insertBefore(this._nextDot, this._next);
            }else{
                //console.log(' 移除右省略号')
                this.RemoveItem.call(this._nextDot);
            };
        };
        //总数大于5开启
        if (this.count >  this._aLi.length) {
            if (this.index == this.count - start) {
                //console.log(' 插入最后一页')
                this._next.parentNode.insertBefore(this._lastItem, this._next);
            }else {
                //console.log(' 移除最后一页')
                this.RemoveItem.call(this._lastItem);
            };
        };
        //总数大于5开启
        if (this.count >  this._aLi.length) {
            if (this.index >= start + 1) {
                //console.log(' 插入1')
                this._next.parentNode.insertBefore(this._firstItem, this._aLi[0]);
            }else{
                //console.log(' 移除1')
                this.RemoveItem.call(this._firstItem);
            };
        };
        //总数大于6开启
        if (this.count >  this._aLi.length + 1) {
            if (this.index >= start + 2) {
                //console.log(' 插入2')
                this._next.parentNode.insertBefore(this._secondItem, this._aLi[0]);
            }else{
                //console.log(' 移除2')
                this.RemoveItem.call(this._secondItem);
            };
        };
        //总数大于7开启
        if (this.count > this._aLi.length + 2) {
            if (this.index > start + 2) {
                //console.log(' 插入左省略号')
                this._next.parentNode.insertBefore(this._preDot, this._aLi[0]);
            }else{
                //console.log(' 移除左省略号')
                this.RemoveItem.call(this._preDot);
            };
        };
    };

    Page.prototype.Ajax = function (){
        var _this = this
            ,data = {}
            ,page;
        for (var name in this.json.data){
            if (name == 'page' && !!this.json.data[name]) {
                data[this.json.data[name]] = this.index;
                page = true;
            }else{
                data[name] = this.json.data[name]
            };
        }
        if (!page) data.page = this.index;

        ajax({
            url:    this.json.url,
            data:    data,
            type:   this.json.type,
            succ:   function (data){
                var data = eval('(' + data + ')');
                //替换s
                //_this.Success();
                //替换e
                _this.json.success(data);
            },
            error:  function (err){
                _this.json.error && _this.json.error(err)
            }

        })
    }

    window.Page = function (json){
        return new Page(json);
    };
  
    //方法
    function addClass(obj, sClass){
        var re = new RegExp('\\b' + sClass + '\\b');
        if (!re.test(obj.className)){
            if (obj.className) {
                obj.className += ' '+sClass;
            }else{
                obj.className = sClass;
            };
        };
    };

    function removeClass(obj, sClass){
        var re = new RegExp('\\b' + sClass + '\\b', 'g');

        if (!re.test(obj.className)) return;

        var arr = obj.className.replace(re, '').match(/\S+/g);
        
        if (arr) {

            obj.className=arr.join(' ');
        }else{
            obj.className = '';//IE6、7去掉class仍然有样式
            obj.removeAttribute('class');
        };
    };


    function hasClass(obj, sClass){
        var re = new RegExp('\\b' + sClass + '\\b');
        return re.test(obj.className);
    };

    function getByClass(oParent, sClass){
        if(document.getElementsByClassName){
            return oParent.getElementsByClassName(sClass);
        }else{
            var aEle = oParent.getElementsByTagName('*');
            var re = new RegExp('\\b' + sClass + '\\b');
            var result = [];
            
            for (var i = 0; i < aEle.length; i++) {
                if(re.test(aEle[i].className)){
                    result.push(aEle[i]);
                }
            }
            return result;
        };
    }



    function json2url(json){
        json.t=Math.random();
        var arr=[];
        for(var name in json){
            arr.push(name+'='+json[name]);
        }
        return arr.join('&');
    };

    function ajax(json){
        var timer=null;
        json=json || {};
        if(!json.url){
            console.log('用法不符合规范,请输入url');
            return;
        }
        json.type=json.type || 'get';
        json.data=json.data || {};
        json.data.t=Math.random();          
        json.time=json.time || 0;
        json.dataType=json.dataType || 'json';

        if(window.XMLHttpRequest){
            var oAjax=new XMLHttpRequest();
        }else{
            var oAjax=new ActiveXObject('Microsoft.XMLHTTP');   
        }
        
        
        switch(json.type.toLowerCase()){
            case 'get':
                oAjax.open('GET',json.url+'?'+json2url(json.data),true);
                oAjax.send();
                break;
            case 'post':
                oAjax.open('POST',json.url,true);
                oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                oAjax.send(json2url(json.data));
                break;
        };
        
        oAjax.onreadystatechange=function(){
            if(oAjax.readyState==4){
                if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
                    if(json.dataType=='xml'){
                        json.succ && json.succ(oAjax.responseXML);  
                    }else{
                        json.succ && json.succ(oAjax.responseText);
                    }
                    clearTimeout(timer);
                }else{
                    json.error && json.error(oAjax.status); 
                    clearTimeout(timer);
                }   
            }
        };


        //网络超时
        if(json.time){
            timer=setTimeout(function (){
                console.log('网络不给力');
                oAjax.onreadystatechange=null;
            },json.time*1000);
        };
    };

})(window);