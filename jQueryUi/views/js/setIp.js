/**
 * Created by gebb on 2017/9/15.
 */
jQuery(function () {
    if ($.cookie("auto_iploc") && $.cookie("auto_iploc") != "") {
        var winurl = window.location.href;
        if (/city=\d+/ig.test(winurl)) {
        } else {
            if (winurl.indexOf("?") > 0) {
                window.location.href = window.location.href + "&city=" + getNum($.cookie("auto_iploc"))
            } else {
                window.location.href = window.location.href + "?city=" + getNum($.cookie("auto_iploc"))
            }
        }
    } else {
        gpsloc()
    }
    $(".excity_ok").click(function () {
        if ($("#numflag").attr("value") == 1) {
            $(".changecitywrap").hide();
            window.location.href = "?c=index&a=city"
        } else {
            $(".changecitywrap").hide();
            $.cookie("auto_iploc", "");
            $.cookie("auto_iploccity", "");
            $.cookie("auto_iploc", $("#numflag").attr("data-code"), {expires: 1});
            $.cookie("auto_iploccity", $("#numflag").attr("data-city"), {expires: 1});
            var winurl = window.location.href;
            if (/city=\d+/ig.test(winurl)) {
            } else {
                if (winurl.indexOf("?") > 0) {
                    window.location.href = window.location.href + "&city=" + getNum($.cookie("auto_iploc"))
                } else {
                    window.location.href = window.location.href + "?city=" + getNum($.cookie("auto_iploc"))
                }
            }
        }
    });
    $(".excity_cancel").click(function () {
        $(".changecitywrap").hide()
    })
});
function apploc() {
    var map = new BMap.Map("allmap");
    if (GetQueryString("lat") != "" && GetQueryString("lon") != "") {
        map.clearOverlays();
        var new_point = new BMap.Point(GetQueryString("lon"), GetQueryString("lat"));
        var gc = new BMap.Geocoder();
        gc.getLocation(new_point, function (result) {
            getCitycodeajax(result.addressComponents.city)
        })
    }
}
function oldloc() {
    jQuery.ajax({
        url: "//s.auto.ifeng.com/locip/getLocUp", type: "get", async: false, success: function (data) {
            if (data == null || data == undefined || data.code < 0) {
                undefinecity(1)
            } else {
                getCitycodeajax(data.name)
            }
        }
    })
}
function gpsloc() {
    var winurl = window.location.href;
    if (!/city=\d+/ig.test(winurl)) {
        if (navigator.geolocation) {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(onSuccess, onFail, {enableHighAccuracy: true})
        } else {
            layer.msg("你的浏览器不支持获取地理位置！")
        }
    }
}
function onSuccess(r, error) {
    var loc_lng, loc_lat;
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        loc_lng = r.point.lng;
        loc_lat = r.point.lat;
        console.log(loc_lng, loc_lat);
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(loc_lng, loc_lat), function (result) {
            if (result) {
                getCitycodeajax(result.addressComponents.city)
            }
        })
    }
}
function onFail(error) {
    console.log(error.PERMISSION_DENIED)
}
function getCitycode(cityname) {
    var data;
    for (var i = 0; i < arrCity.length; i++) {
        if (cityname.replace("市", "") == arrCity[i][1]) {
            data = arrCity[i]
        }
    }
    if (data == null || data == "" || data == undefined) {
        undefinecity(1)
    } else {
        showcity(data[4], data[2], data[1])
    }
}
function getCitycodeajax(cityname) {
    if (cityname == null || cityname == "" || cityname == undefined) {
        undefinecity(1)
    } else {
        jQuery.ajax({
            url: "//s.auto.ifeng.com/district/code",
            type: "GET",
            data: {name: cityname},
            success: function (data) {
                if (data.data == null || data.data == "" || data.data == undefined) {
                    undefinecity(1)
                } else {
                    var code = parseInt(getNum(data.data.code));
                    showcity(code, data.data.pinyin, data.data.name)
                }
            }
        })
    }
}
function showcity(curcode, curpinyin, curcity) {
    var isopen = checkCity(curcode);
    if (isopen) {
        if (curcode != "110000") {
            undefinecity(2, curcity, curcode, curpinyin)
        }
    } else {
        undefinecity(3, curcity, curcode, curpinyin)
    }
}
function checkCity(curcode) {
    var flag;
    jQuery.ajax({
        url: "//api.auto.ifeng.com/app/city/data_interface/cityInfo_new.php?match=1&citycode=" + curcode,
        async: false,
        jsonp: "CallBack",
        jsonpCallBack: "tmpfun",
        success: function (json) {
            var data = eval(json);
            var citycode = data.data[0].match[0].match_citycode;
            if (citycode == curcode) {
                flag = 1
            } else {
                flag = 0
            }
        }
    });
    return flag
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2])
    }
    return ""
}
function isApp(lat, lon) {
    var latflg = GetQueryString(lat);
    var lonflg = GetQueryString(lon);
    if (latflg == "" || lonflg == "") {
        return false
    } else {
        return true
    }
}
function undefinecity(num, curcity, curcode, curpinyin) {
    $(".changecitywrap").show();
    var b_h = $(window).height() / 3;
    var b_w = ($(window).width() - $(".changecity").outerWidth()) / 2;
    $(".changecity").css("top", b_h);
    $(".changecity").css("left", b_w);
    if (num == 1) {
        $("#changecity").text("当前定位失败，请手动选择城市");
        $("#numflag").attr("value", "1")
    }
    if (num == 2) {
        $("#changecity").text("当前城市：" + curcity + "，是否切换？");
        $("#numflag").attr("value", "2");
        $("#numflag").attr("data-city", curcity);
        $("#numflag").attr("data-code", curcode);
        $("#numflag").attr("data-pinyin", curpinyin)
    }
    if (num == 3) {
        $("#changecity").text("当前站点未开通已为您选择就近站点");
        $("#numflag").attr("value", "3");
        $("#numflag").attr("data-city", curcity);
        $("#numflag").attr("data-code", curcode);
        $("#numflag").attr("data-pinyin", curpinyin)
    }
}
function getNum(text) {
    var value;
    value = text.replace(/[^0-9]/ig, "");
    return value
};