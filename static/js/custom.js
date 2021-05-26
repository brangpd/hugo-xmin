// Change the o language (output) pre code to samp
document.addEventListener("DOMContentLoaded", function () {
  var lang_pre_code_o = document.querySelectorAll('[class="language-o"]');
  for (let i = 0; i < lang_pre_code_o.length; ++i) {
    var code_elem = lang_pre_code_o[i];
    var code_text = code_elem.innerText;
    var samp_elem = document.createElement('samp');
    samp_elem.innerText = code_text;
    var blockquote_elem = document.createElement('blockquote');
    blockquote_elem.innerHTML = samp_elem.outerHTML;
    var pre_node = code_elem.parentNode;
    pre_node.parentNode.replaceChild(blockquote_elem, pre_node);
  }
});

// Render ABC JS music notation
document.addEventListener('DOMContentLoaded', function () {
  var lang_pre_code_abcjs = document.querySelectorAll('[class="language-abcjs"]')
  for (let i = 0; i < lang_pre_code_abcjs.length; ++i) {
    var elem = lang_pre_code_abcjs[i]
    var text = elem.innerText
    var div_elem = document.createElement('div')
    var obj = ABCJS.renderAbc(div_elem, text, {
      viewportHorizontal: true,
      scrollHorizontal: true,
      minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 4,
      // responsive: "resize"
    })
    div_elem.firstChild.style['overflow-x'] = 'visible'
    var pre_node = elem.parentNode
    pre_node.parentNode.replaceChild(div_elem, pre_node)

    var audioObj = document.createElement('div')
    var random_id = 'i' + Date.now()
    audioObj.id = random_id
    div_elem.appendChild(audioObj)
    var synthControl = new ABCJS.synth.SynthController()
    synthControl.load('#' + random_id, null, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true
    })
    synthControl.setTune(obj[0], false)
  }
})

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
    var aid = element.getAttribute('aid').substr(2)
    var bvid = av2bv(aid)
    var src = element.getAttribute('asrc')
    src = src.replace(/aid=.+?&/, 'bvid=' + bvid + '&')
    element.setAttribute('src', src)
  }
  for (let index = 0; index < as.length; index++) {
    element.reload()
  }
});