
gpsloc()

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