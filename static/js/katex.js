
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
  var math_spans = document.querySelectorAll('[class="math"]');
  for (let i = 0; i < math_spans.length; ++i) {
    var span_elem = math_spans[i];
    var math_text = span_elem.innerText;
    var new_span_elem = document.createElement('span');
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
    var code_elem = lang_pre_code_math[i];
    var code_text = code_elem.innerText;
    var span_elem = document.createElement('span');
    katex.render(code_text, span_elem, {
      throwOnError: false
    });
    var pre_node = code_elem.parentNode;
    pre_node.parentNode.replaceChild(span_elem, pre_node);
  }
});