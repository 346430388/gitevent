$(function () {
    getUserInfo()

    var layer = layui.layer
    //点击按钮实现退出功能  layui模板快 弹出层
    $("#btnLogoOut").on("click", function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            layer.close(index);
            //清空本地存储
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = ('/login.html')
            //关闭confirm框
            layer.close(index)
        });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 请求头
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            // 调用render Avatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //跳转登录页面
        //         location.href = ('/login.html')
        //     }
        // }
    });
}



//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    //设置文本内容
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片的头像
        $('.layui-nav-img').attr('scr', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        //渲染用户文本头像
        // $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}