$('.item-icon').each(function () {
  var icon_name = $(this).attr('id');
  var icon_url_20 = '/thumb.php?f=' + icon_name + '&width=20';
  var icon_url_30 = '/thumb.php?f=' + icon_name + '&width=30';
  var icon_url_40 = '/thumb.php?f=' + icon_name + '&width=40';
  $(this).html('<img src="' + icon_url_20 + '" width="20" height="20" srcset="' + icon_url_30 + ' 1.5x, ' + icon_url_40 + ' 2x">');
});
// 计算MD5
window.calcHexMD5 = function () { for (var m = [], l = 0; 64 > l;)m[l] = 0 | 4294967296 * Math.abs(Math.sin(++l)); return function (c) { var e, g, f, a, h = []; c = unescape(encodeURI(c)); for (var b = c.length, k = [e = 1732584193, g = -271733879, ~e, ~g], d = 0; d <= b;)h[d >> 2] |= (c.charCodeAt(d) || 128) << 8 * (d++ % 4); h[c = 16 * (b + 8 >> 6) + 14] = 8 * b; for (d = 0; d < c; d += 16) { b = k; for (a = 0; 64 > a;)b = [f = b[3], (e = b[1] | 0) + ((f = b[0] + [e & (g = b[2]) | ~e & f, f & e | ~f & g, e ^ g ^ f, g ^ (e | ~f)][b = a >> 4] + (m[a] + (h[[a, 5 * a + 1, 3 * a + 5, 7 * a][b] % 16 + d] | 0))) << (b = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * b + a++ % 4]) | f >>> 32 - b), e, g]; for (a = 4; a;)k[--a] = k[a] + b[a] } for (c = ""; 32 > a;)c += (k[a >> 3] >> 4 * (1 ^ a++ & 7) & 15).toString(16); return c } }();

window.getImageUrl = function (filename) {
  var hex = window.calcHexMD5(filename)
  return [
    'https://huiji-public.huijistatic.com/' + mw.config.get('wgHuijiPrefix') + '/uploads',
    hex[0],
    hex[0] + hex[1],
    filename
  ].join('/')
}
$("#copy-button").click(function () {
  var range = document.createRange();
  range.selectNode(document.getElementById("build-template-1"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Build代码已复制到剪贴板!");
});



/**
 * 下面是对本站使用 react 开发零件的处理，由于 mw 的加载器只能识别 es3 的代码。工具链对 es3 的支持不好，所以换个实现方式。
 * gadget 的配置仍然受到用户配置项的把控。gadget 的实现迁移到 cdn 外面。
 */
function handleCDNGadgets() {
  const CDN_GADGETS = [
    "TestNews"
  ]
  var oldLoader = window.mw.loader.load;

  function loadHostPackages() {
    window.mw.loader.getScript("https://unpkg.com/react@17/umd/react.production.min.js")
    window.mw.loader.getScript("https://unpkg.com/react-dom@17/umd/react-dom.production.min.js")
  }
  // 白名单策略，筛选出走 CDN 的 gadget
  function handleGadgets(modules) {
    if (modules.length) {
      // 为宿主容器添加 react 依赖。
      loadHostPackages();

    }
  }
  //
  window.mw.loader.load = (modules, type) => {
    const cdnGadgets = CDN_GADGETS.map(item => `ext.gadget.${item}`)
    const _modules = [];
    const cdnModules = [];
    if (Array.isArray(modules)) {
      modules = modules.forEach(module => {
        if (cdnGadgets.indexOf(module) > -1) {
          cdnModules.push(module);
        } else {
          _modules.push(module);
        }
      })
    }
    oldLoader(_modules, type)
  }
}

