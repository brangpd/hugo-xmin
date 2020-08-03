var gitalk = new Gitalk({
clientID: '',
clientSecret: '',
repo: 'repo-for-comment',
owner: 'brangpd',
admin: ['brangpd'],
id: 'First Issue',      // Ensure uniqueness and length less than 50
number: 1,
distractionFreeMode: false,  // Facebook-like distraction free mode
language: 'zh-CN'
})

gitalk.render('gitalk-container')
