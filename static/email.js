(async function() {
  var d = document.querySelectorAll('.email');
  if (!d.length) return;
  var k = 'VTrEHyNyMg8NYsZmc3gtAt9IEj-tOQXHvkl2VvuMimQ';
  var raw = Uint8Array.from(atob(k.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
  var key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
  for (var el of d) {
    var buf = Uint8Array.from(atob(el.dataset.e.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
    var iv = buf.slice(0, 12);
    var tag = buf.slice(12, 28);
    var ct = buf.slice(28);
    var combined = new Uint8Array(ct.length + 16);
    combined.set(ct);
    combined.set(tag, ct.length);
    var plain = new TextDecoder().decode(await crypto.subtle.decrypt({name: 'AES-GCM', iv: iv}, key, combined));
    var a = document.createElement('a');
    a.href = 'mailto:' + plain;
    a.textContent = plain;
    el.replaceWith(a);
  }
})();
