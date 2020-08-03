new Vue({
  el: '#vssue',

  render: h => h('Vssue', {
    props: {
      // 在这里设置当前页面对应的 Issue 标题
      title: 'Vssue',

      // 在这里设置你使用的平台的 OAuth App 配置
      options: {
        owner: 'brangpd',
        repo: 'repo-for-comment',
        clientId: '',
        clientSecret: '',  // 只有在使用某些平台时需要
      },
    }
  })
})