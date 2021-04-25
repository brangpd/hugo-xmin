// Change the o language (output) pre code to samp
document.addEventListener("DOMContentLoaded", function () {
  lang_pre_code_o = document.querySelectorAll('[class="language-o"]');
  for (let i = 0; i < lang_pre_code_o.length; ++i) {
    code_elem = lang_pre_code_o[i];
    code_text = code_elem.innerText;
    samp_elem = document.createElement('samp');
    samp_elem.innerText = code_text;
    blockquote_elem = document.createElement('blockquote');
    blockquote_elem.innerHTML = samp_elem.outerHTML;
    pre_node = code_elem.parentNode;
    pre_node.parentNode.replaceChild(blockquote_elem, pre_node);
  }
});

// Render math with KaTeX
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false }
    ]
  });
});

// Change the math language pre code to tex rendered
document.addEventListener("DOMContentLoaded", function () {
  // method 1: use <span class=math>
  math_spans = document.querySelectorAll('[class="math"]');
  for (let i = 0; i < math_spans.length; ++i) {
    span_elem = math_spans[i];
    math_text = span_elem.innerText;
    new_span_elem = document.createElement('span');
    new_span_elem.innerText = math_text;
    katex.render(math_text, new_span_elem, {
      throwOnError: false
    });
    span_elem.replaceWith(new_span_elem);
    console.log(math_text);
  }

  // method 2: use ```math
  lang_pre_code_math = document.querySelectorAll('[class="language-math"]');
  for (let i = 0; i < lang_pre_code_math.length; ++i) {
    code_elem = lang_pre_code_math[i];
    code_text = code_elem.innerText;
    span_elem = document.createElement('span');
    katex.render(code_text, span_elem, {
      throwOnError: false
    });
    pre_node = code_elem.parentNode;
    pre_node.parentNode.replaceChild(span_elem, pre_node);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // see bilibili.html
  function av2bv(av) {
    var table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
    var tr = {}
    for (let i = 0; i < 58; i++) {
      tr[table[i]] = i
    }
    var s = [11, 10, 3, 8, 4, 6]
    var xor = 177451812
    var add = 8728348608
    return (function (x) {
      x = parseInt(x)
      x = (x ^ xor) + add
      var r = Array.from('BV1  4 1 7  ')
      for (let i = 0; i < 6; i++) {
        r[s[i]] = table[Math.floor(x / Math.pow(58, i)) % 58]
      }
      return r.join('')
    })(av)
  }
  var as = document.getElementsByClassName('bilibili-a')
  for (let index = 0; index < as.length; index++) {
    var element = as[index];
    var aid = element.getAttribute('id').substr(2)
    var bvid = av2bv(aid)
    var src = element.getAttribute('asrc')
    src = src.replace(/aid=.+?&/, 'bvid=' + bvid + '&')
    element.setAttribute('src', src)
    element.reload(true)
  }
});