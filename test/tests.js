var $test = $('.test');

/**
 * Registration
 */
QUnit.test('Registration', function (assert) {
  assert.ok($.fn.tilesSlider, 'registered as a jQuery plugin');
  assert.equal(typeof $.fn.tilesSlider, "function", "has function inside jquery.fn");
  assert.equal(typeof $test.tilesSlider, "function", "another way to test it");
});

/**
 * Inheritance
 */
QUnit.test('Inheritance', function (assert) {

  // Returns jQuery functions after called (chaining)
  assert.equal(
    typeof $test.tilesSlider().on,
    "function",
    "'on' function must exist after plugin call");

  // Chainability
  assert.ok($test.tilesSlider().addClass('testing'), 'can be chained');
  assert.ok($test.hasClass('testing'), 'successfully chained');
});

/**
 * Cleanup
 */
QUnit.test('Cleanup', function (assert) {
  $test.tilesSlider();
  $test.tilesSlider('destroy');

  assert.notOk($test.data('tilesSlider'), 'destroyed successfully');
});

















