$(function () {

    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return ('昵称长度必须为1-6位')
            }
        }
    })
    initUserInfo()
    //获取用户基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                console.log(res);
                //调用form.val为表单快速赋值
                form.val('formUserInfo', res.data)

            },

        })
    }
    // 重置按钮绑定点击事件
    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //监听表单提交事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('修改信息成功')
                window.parent.getUserInfo()
            }
        })
    })

})
