// Change the o language (output) pre code to samp
(function() {
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
})();
