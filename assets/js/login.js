$(function () {
  $("#link_login").on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  $("#link_reg").on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name="password"]').val();
      if (pwd !== value) return '两次密码输入不一致'
    }
  })
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/reguser', data, function (res) {
      if (res.status !== 0) return layer.msg(res.message)

      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })
  //监听登录表单提交事件
  $('#form_login').on('submit', function (e) {
    //阻止默认行为
    console.log(11);
    e.preventDefault()
    //2发起ajax请求
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    });
  });
});      