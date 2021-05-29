# HUGO XMIN

## _Keep it simple, but not simpler_

本主题原是[谢益辉/Yihui Xie](https://yihui.name)前辈写的一个非常精简的Hugo主题。经过fork后一番改进适应到我现在的静态站点中。原主题很适合非前端程序员上手魔改。

Fork后主要的更改如下：
- KaTeX的数学公式渲染
- ABCJS的乐谱渲染
- Beaudar评论
- 亮暗模式适应
- 目录和标题链接
- 文章列表展示
- Bilibili和网易云音乐链接短代码
- 文章的唯一ID编号，该ID用于别名永久链接跳转和评论编号
- 用于创建、发布、部署文章的Python脚本和Github工作流YAML文件

参考`exampleSite`。

我并不是数据工程师，也没有使用RMarkdown的需求，更改到现在并没有针对RMarkdown进行适配。目前还是使用Hugo内建的Goldmark进行Markdown文档的渲染。
