var passiveSupported = false;

try {
  var options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  });
  window.addEventListener('range', null, options)
} catch (err) {}

module.exports = passiveSupported;
