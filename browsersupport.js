/**
 * Detect IE browser and alert message.
 * @see https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
 */
(function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  // If Internet Explorer, alert msg
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    alert('Stork Meet 不支援 IE 瀏覽器，請使用 Edge 或 Chrome。');
  }
  return;
})();

/**
 * String.replaceAll() pollyfill
 * @see https://vanillajstoolkit.com/polyfills/stringreplaceall/
 */
 (function stringPollyfill() {
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){
      if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
        return this.replace(str, newStr);
      }
      return this.replace(new RegExp(str, 'g'), newStr);
    };
  }
})();