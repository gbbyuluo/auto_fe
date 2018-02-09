/**
 * Created by gebb on 2017/10/9.
 */
jQuery(function(){

//车展弹窗
    var hidechezhan;
    jQuery("#zht_chezhan").mouseenter(function(e){
        jQuery("#zht_chezhan").addClass("zht-chezhan-on");
        jQuery("#zht_chezhan").css("color","#fff");
        clearTimeout(hidechezhan);
        var chb_t=jQuery(this).offset().top+27;
        var chb_l=jQuery(this).offset().left-15;
        //var chb_t=e.pageX;
        //var chb_l=e.pageY;
        jQuery("#zht_chezhan_box").css({'top':chb_t,'left':chb_l}).show();
    });
    jQuery("#zht_chezhan").mouseleave(function(){
        hidechezhan=setTimeout(function(){
            jQuery("#zht_chezhan").removeClass("zht-chezhan-on");
            jQuery("#zht_chezhan").css("color","#666");
            jQuery("#zht_chezhan_box").hide();
        },300);
    });
    jQuery("#zht_chezhan_box").mouseenter(function(){
        clearTimeout(hidechezhan);
        jQuery("#zht_chezhan").addClass("zht-chezhan-on");
        jQuery("#zht_chezhan").css("color","#fff");
        var chb_t=jQuery("#zht_chezhan").offset().top+27;
        var chb_l=jQuery("#zht_chezhan").offset().left-15;
        //var chb_t=e.pageX;
        //var chb_l=e.pageY;
        jQuery("#zht_chezhan_box").css({'top':chb_t,'left':chb_l}).show();
    });
    jQuery("#zht_chezhan_box").mouseleave(function(){
        hidechezhan=setTimeout(function(){
            jQuery("#zht_chezhan").removeClass("zht-chezhan-on");
            jQuery("#zht_chezhan").css("color","#666");
            jQuery("#zht_chezhan_box").hide();
        },200);
    });


//更多应用弹窗
    jQuery("#zht_m_app").mouseenter(function(){
        var l=jQuery(this).position().left-6;
        jQuery("#zht_m_app_div").css('left',l).show();
    });
    jQuery("#zht_m_app_div").mouseleave(function(){
        jQuery("#zht_m_app_div").hide();
    });

//网站地图弹窗
    jQuery("#zht_netmap").mouseenter(function(){
        jQuery(this).addClass("zht-netmap-on");
        jQuery("#zht_netmap_div").show();
    });
    jQuery("#zht_netmap").mouseleave(function(){
        jQuery(this).removeClass("zht-netmap-on");
        jQuery("#zht_netmap_div").hide();
    });

    jQuery("#zht_netmap_div").mouseenter(function(){
        jQuery("#zht_netmap").addClass("zht-netmap-on");
        jQuery(this).show();
    });
    jQuery("#zht_netmap_div").mouseleave(function(){
        jQuery("#zht_netmap").removeClass("zht-netmap-on");
        jQuery(this).hide();
    });

//导航更多弹窗
    jQuery("#zht_nav_more").mouseenter(function(){
        jQuery(this).addClass("zht-nav-more-on");
        jQuery("#zht-more-box").show();
    });
    jQuery("#zht_nav_more").mouseleave(function(){
        jQuery(this).removeClass("zht-nav-more-on");
        jQuery("#zht-more-box").hide();
    });
    jQuery("#zht-more-box").mouseenter(function(){
        jQuery(this).show();
        jQuery("#zht_nav_more").addClass("zht-nav-more-on");
    });
    jQuery("#zht-more-box").mouseleave(function(){
        jQuery(this).hide();
        jQuery("#zht_nav_more").removeClass("zht-nav-more-on");
    });

//二级导航
    var zht_url=window.location.href;
//var zht_url='http://auto.ifeng.com/shijia/';
    jQuery(".zht-c-menu ul li").each(function(){
        if(jQuery(this).attr("id")!=undefined && jQuery(this).attr("id")!=null && jQuery(this).attr("id")!=""){
            var li_id=jQuery(this).attr("id").replace("nav_","");
            if(zht_url.indexOf(li_id)>-1){
                jQuery(this).addClass("on").siblings().removeClass("on");
                return;
            }
        }
    });

//城市切换
    jQuery("#zht_c_city").mouseenter(function(){
        jQuery(this).addClass("zht-c-city-on");
        jQuery("#zht-cx-city-nn").show();
    });
    jQuery("#zht_c_city").mouseleave(function(){
        jQuery(this).removeClass("zht-c-city-on");
        jQuery("#zht-cx-city-nn").hide();
    });
    jQuery("#zht-cx-city-nn").mouseenter(function(){
        jQuery("#zht_c_city").addClass("zht-c-city-on");
        jQuery("#zht-cx-city-nn").show();
    });
    jQuery("#zht-cx-city-nn").mouseleave(function(){
        jQuery("#zht_c_city").removeClass("zht-c-city-on");
        jQuery("#zht-cx-city-nn").hide();
    });

    /*城市下拉框*/
    var stophidenav;

//选择城市
    jQuery("#zht-cx-city-nlst dl dd a").live("click",function(){
        var c=jQuery(this).html();
        var selcity=retCityarray(c);
        jQuery("#cur_city").html('<a href="http://'+selcity[2]+'.auto.ifeng.com/" target="_blank">'+c+'</a>');
        for(var i=0;i<arrCity.length;i++){
            if(arrCity[i][3]==weather_c){
                area_cityname=arrCity[i][1].replace(/市/g,"");
                break;
            }
        }
        console.log(area_cityname)
        addAreaAD(area_cityname,0,1,false);
        addAreaAD(area_cityname,10266,2,true);
        addAreaAD(area_cityname,10266,3,true);
        addAreaAD(area_cityname,10266,4,true);
        addAreaAD(area_cityname,0,5,false);
        addAreaAD(area_cityname,10266,6,true);
        jQuery("#cityName a").html(c+"车市");
        jQuery("#cityName a").attr("href","http://"+selcity[2]+".auto.ifeng.com/");
        jQuery("#city_more").attr("href","http://"+selcity[2]+".auto.ifeng.com/");
        jQuery(".logo").next().find("li").each(function(){
            if(jQuery(this).find("a").html()=="优惠"){
                jQuery(this).find("a").attr("href","http://"+selcity[2]+".auto.ifeng.com/");
            }
        });

        jQuery(".city-all-li a").each(function(){
            if(jQuery(this).parent().attr("class")!="hot"){
                if(jQuery(this).html()==c){
                    jQuery(this).addClass("on");
                }
                else{
                    jQuery(this).removeClass("on");
                }
            }
        });


    });

//字母排序定位
    jQuery(".zht-cx-city-let").find("li").each(function(){
        jQuery(this).click(function(e){
            //jQuery(this).addClass("on");
            //jQuery(this).siblings().removeClass("on");
            var word=jQuery(this).find("a").html();
            var let=jQuery(this).parent().parent();
            var nlst=jQuery(this).parent().parent().next();
            var t=let.offset().top+66;
            nlst.find("dt").each(function(){
                if(/\w/.exec(jQuery(this).html())==word){
                    var st=jQuery(this).offset().top-t+nlst.scrollTop();
                    nlst.scrollTop(st);
                }
            });
            //阻止事件冒泡执行关闭的click事件
            e.stopPropagation();
        });
    });


    jQuery("#zht_keywords").bind("keyup",function(e){
        /*当按键不是上下时，开始搜索*/
        if(e.keyCode!=38 && e.keyCode!=40){
            ajaxSearch();
        }
        /*搜索内容列表样式归零*/
        jQuery("#zht_autocomplateTip").find("dd").find("a").removeClass("s");
        //上
        if(e.keyCode==38){
            /*显示搜索内容后，第一次点击上按钮列表最下方内容被选中*/
            if(index==-1){
                index=jQuery("#zht_autocomplateTip").find("dd").size()-1;
                jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").addClass("s");
            }
            else{
                if(index==0){
                    index=jQuery("#zht_autocomplateTip").find("dd").size();
                }
                index--;
            }
            jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").addClass("s");
            jQuery("#zht_keywords").val(jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").find(".name").html());
        }
        //下
        if(e.keyCode==40){
            /*显示搜索内容后，第一次点击下按钮列表最上方内容被选中*/
            if(index==-1){
                index=0;
                jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").addClass("s");
            }
            else{
                if(index==jQuery("#zht_autocomplateTip").find("dd").size()-1){
                    index=-1;
                }
                index++;
            }
            jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").addClass("s");
            jQuery("#zht_keywords").val(jQuery("#zht_autocomplateTip").find("dd").eq(index).find("a").find(".name").html());
        }
    });
    /*搜索框失去焦点后，搜索内容列表隐藏，并且上下定位值为-1*/
    jQuery("#zht_keywords").bind("blur",function(){
        index=-1;
        setTimeout(function(){jQuery("#zht_autocomplateTip").html("").hide();},300);
    });

    if(document.body){
        document.body.onclick=function(){
            index=-1;
            setTimeout(function(){jQuery("#zht_autocomplateTip").html("").hide();},300);
        }
    }
    /*点击页面其它部分隐藏搜索内容*/
    jQuery(window).click(function(){
        jQuery("#zht_autocomplateTip").html("").hide();
    });


});



/*登录功能 begin*/
var usid = jQuery.cookie('sid');
if(usid){
    jQuery.getScript("https://id.ifeng.com/api/checklogin?sid="+usid+"&callback=vlogin");
}

function vlogin(data){
    if(data.code){
        jQuery.getScript("https://id.ifeng.com/api/getuserinfo?sid="+usid+"&callback=ulogin");
    }else{
        addCookie('sid','');
        document.getElementById('btnSwapLogin').onclick = function() {
            if ('undefined' !== typeof window['GLOBAL_LOGIN']) {
                window['GLOBAL_LOGIN']();
            }
            window['REG_LOGIN_CALLBACK'](1, function (optionsORname) {
                dologin();
            });
        };
    }
}
function ulogin(data){
    if(data.data.username || data.data.nickname){
        var uname=data.data.username==null?data.data.nickname:data.data.username;
        jQuery("#top-welcome > a").html(uname).attr("href","http://bbs.auto.ifeng.com/home.php?mod=space&username="+uname);
        jQuery("#top-oper").html('<span><a target="_blank" href="http://bbs.auto.ifeng.com/">进入论坛</a><a href="http://bbs.auto.ifeng.com/api/uc_ifeng_user.php?m=logout&refer='+(window.location.href)+'">安全退出</a></span>');
        //window.location.href = "http://bbs.auto.ifeng.com/api/uc_ifeng_user.php?m=login&refer="+window.location.href;
    }else{
        alert("用户名只能输入一次哦，本次提交后将无法修改O(∩_∩)O");
        jQuery("#nickName").click();
    }
}
function addCookie(objName, objValue) {//添加cookie
    var the_cookie =objName + "=" + escape(objValue)+ ";" ;
    var the_cookie = the_cookie+ "path=/;";
    var the_cookie = the_cookie + "domain=ifeng.com;";
    document.cookie =the_cookie;
}
function dologin(){
    window.location.href =window.location.href ;
}
jQuery(function(){
    document.getElementById('btnSwapLogin').onclick = function() {
        if ('undefined' !== typeof window['GLOBAL_LOGIN']) {
            window['GLOBAL_LOGIN']();
        }
        window['REG_LOGIN_CALLBACK'](1, function (optionsORname) {
            dologin();
        });
    };
    var nickName = document.getElementById('nickName');
    nickName.onclick = function(e) {
        e.preventDefault();
        window['NICK_NAME'](true);
    };
    window['NICK_NAME_CALLBACK'](function() {
        dologin();
    });
});
/*登录功能 end*/


var city45_arr=new Array();
city45_arr[0]=new Array('北京,天津,石家庄,唐山,保定,邯郸,邢台,秦皇岛,张家口,承德,廊坊,沧州,衡水','青岛,济南,临沂,潍坊,淄博,济宁,枣庄,东营,泰安,威海,日照,德州,聊城','呼和浩特,包头,鄂尔多斯,乌海,赤峰,通辽,巴彦淖尔,乌兰察布,呼伦贝尔');//华北区
city45_arr[1]=new Array('上海,南京,苏州,无锡,南通,泰州,扬州,常州,镇江,昆山,徐州,连云港,淮安,盐城,宿迁','杭州,宁波,温州,嘉兴,金华,衢州,台州,绍兴,丽水,湖州,舟山','合肥,六安,淮南,淮北,蚌埠,阜阳,芜湖,安庆,宣城','南昌,九江,赣州,景德镇,萍乡,新余,鹰潭,吉安,宜春,抚州,上饶');//华东区
city45_arr[2]=new Array('郑州,濮阳,洛阳,开封,平顶山,安阳,鹤壁,新乡,焦作,许昌,漯河,三门峡,商丘,信阳,周口,驻马店','武汉,十堰,襄阳,黄石,鄂州,荆门,孝感,荆州,黄冈,咸宁,随州,恩施','长沙,株洲,湘潭,衡阳,邵阳,岳阳,常德,张家界,益阳,郴州,永州,怀化,娄底,湘西');//华中区
city45_arr[3]=new Array('广州,深圳,东莞,佛山,中山,珠海,惠州,江门,韶关,汕头,湛江,茂名,肇庆,梅州,汕尾,河源,阳江,青烟,潮州,揭阳,云浮','南宁,梧州,桂林,玉林,防城港,钦州,贵港,百色,贺州,河池,来宾,崇左','海口,三亚');//华南区
city45_arr[4]=new Array('沈阳,大连,本溪,抚顺,鞍山,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛','长春,吉林,延吉,四平,辽源,通化,白山,松原,白城,延边','哈尔滨,大庆,齐齐哈尔,佳木斯,通化,牡丹江,绥化,鸡西,鹤岗,双鸭山,伊春,七台河,黑河');//东北区
city45_arr[5]=new Array('重庆,成都,自贡,攀枝花,泸州,德阳,绵阳,广元,遂宁,内江,乐山,南充,眉山,宜宾,广安,达州,雅安,巴中,资阳','昆明,曲靖,大理,玉溪,保山,丽江,临沧','遵义,贵阳,六盘水');//西南区
city45_arr[6]=new Array('兰州,嘉峪关,白银,天水,武威,张掖,平凉,庆阳,定西','西安,铜川,宝鸡,咸阳,渭南,延安,汉中,榆林,安康,商洛','乌鲁木齐,克拉玛依,石河子,吐鲁番,哈密,昌吉,博尔塔拉,巴音郭楞,阿克苏,塔城','银川,石嘴山,固原,吴忠,中卫');//西北区


/*搜索功能*/

function search(){
    var keywords = jQuery("#zht_keywords").val();

    if(keywords==null||keywords==''){
        window.open("http://data.auto.ifeng.com/search/", "_blank");
    }else{
        jQuery("#zht_normalIndex1").submit();
    }
}

function sou(keyword){
    jQuery("#zht_keywords").val(keyword);
    jQuery("#zht_normalIndex1").submit();
}


function ajaxSearch(){
    var keywords = jQuery("#zht_keywords").val();
    if(keywords==null||keywords==''){
        //document.getElementById("zht_autocomplateTip").style.display = "none";
        return false;
    }else{
        jQuery.ajax({
            /*url :"http://data.auto.ifeng.com/search/ajaxQuery.do",
             type :"post",
             dataType :"string",
             error : function(){},
             data:"keywords="+keywords,*/
            type : "get",
            async:false,
            url: "http://data.auto.ifeng.com/search/crossQuery.do",
            data:{keywords:keywords},
            dataType : "jsonp",
            jsonp: "callbackparam",
            jsonpCallback: "success_jsonpCallback",
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            success :function(json){
                if(json!=null&&json!=''){
                    jQuery("#zht_autocomplateTip").html(json.msg);
                    var bh=jQuery("#zht_keywords").height()+parseFloat(jQuery("#zht_keywords").css("padding-top")?jQuery("#zht_keywords").css("padding-top"):0)+parseFloat(jQuery("#zht_keywords").css("padding-bottom")?jQuery("#zht_keywords").css("padding-bottom"):0)+parseFloat(jQuery("#zht_keywords").parent().parent().css("padding-top")?jQuery("#zht_keywords").parent().parent().css("padding-top"):0)+1;
                    var bw=jQuery("#zht_keywords").width()+parseFloat(jQuery("#zht_keywords").css("padding-left")?jQuery("#zht_keywords").css("padding-left"):0)+parseFloat(jQuery("#zht_keywords").css("padding-right")?jQuery("#zht_keywords").css("padding-right"):0);
                    var bl=parseFloat(jQuery("#zht_keywords").parent().parent().css("padding-left")?jQuery("#zht_keywords").parent().parent().css("padding-left"):0);
                    jQuery("#zht_autocomplateTip").css({top:bh,width:bw,left:bl});
                    if(json.msg==null || json.msg==""){
                        jQuery("#zht_autocomplateTip").hide();
                    }
                    else{
                        jQuery("#zht_autocomplateTip").show();
                    }
                }else{
                    jQuery("#zht_autocomplateTip").hide();
                }
            }
        });
    }
    /*搜索时将上下定位值设置为-1*/
    index=-1;
}

/*上下定位值*/
var index=-1;

