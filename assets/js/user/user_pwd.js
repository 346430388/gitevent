$(function () {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $("[name=oldPwd]").val()) return '新旧密码不能一致'

        } ,
        requestPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return '两次密码必须一致'
        }
    })
    //重置密码发送ajax 请求
    $(".layui-form").on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)  return layer.msg(res.message)
                console.log(res);
                layer.msg = '更改密码成功'
                //然后2秒后跳转到登录页面
                setTimeout( function(){
                    window.parent.location.href = '/login.html'
                },2000)
            }
        })
    })
})