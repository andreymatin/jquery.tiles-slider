'use strict';

/*!
 * Tiles Slider jQuery plugin
 * Author: Andrey Matin
 * Date: 11.14.2018
 * Licensed under the MIT license
 */

(function ($, window, document, undefined) {
  $(function () {

    /**
     * Check if namespace has already been initialized
     */
    if (!$.tilesSlider) {
      $.tilesSlider = {};
    }

    /**
     * Tiles Slider jQuery Plugin
     */
    $.fn.tilesSlider = function (options) {

      /**
       * Defaults
       */
      var defaults = {
        delay: 400, // Timer Delay
        tiles: 16, // Tiles in the shape
        effect: 'stairway'
      };

      /**
       * Settings
       */
      var opt = $.extend({}, defaults, options);

      // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events and functions.
      var base = this;

      /**
       * Properties
       */
      base.imgs = base.find('img');
      base.imgsLength = base.imgs.length;

      /**
       * Init
       */
      base.init = function () {
        var shapes = []; // Shape Elements

        /**
         * Create List of the shapes
         */
        for (var i = 0; i < base.imgsLength; i++) {
          for (var j = 0; j < opt.tiles; j++) {
            var imgSrc = base.imgs[i].src;
            var imgClass = 'o-' + j;
            var imgTile = '<img src="' + imgSrc + '" alt="" class="o ' + imgClass + '" style="z-index:' + i + '" data-index="' + i + '">';
            shapes.push(imgTile);
          }
        }

        /**
         * Add shapes to DOM
         */
        base.append(shapes.reverse().join(''));

        /**
         * Launch Slider
         */
        if (opt.effect == 'stairway') {
          stairway();
        } else {
          chaotic();
        }
      };

      base.init();

      /**
       * Stairway effect
       */
      function stairway() {
        var list = $(base.find('.o')); // Tiles List
        var len = list.length; // Tiles Count
        var i = 0; // Tales Index
        var dip = base.imgsLength;

        // Stairs slider
        var interval = setInterval(function () {
          var listItem = $(list[i]);
          listItem.fadeOut('slow', function () {
            var obj = $(this);
            var z = obj.css("z-index");
            z = z - dip;
            obj.attr('style', 'z-index: ' + z).show();

            // Reset z-index
            if (i == 0) {
              for (var j = 0; j < len; j++) {
                var listJItem = $(list[j]);
                var dataIndex = listJItem.data('index');
                listJItem.attr('style', 'z-index: ' + dataIndex);
              }
            }
          });

          // Reset recursion
          i++;
          if (i > len - 1) {
            i = 0;
            clearInterval(interval);
            stairway();
          }
        }, opt.delay);
      }

      /**
       * Chaotic effect
       */
      function chaotic() {
        var list = $(base.find('.o')); // Tiles List
        var len = list.length; // Tiles Count
        var i = 0; // Tales Index
        var dip = base.imgsLength;
        var src = list;
        var data = [];
        var step = opt.tiles;
        var start = 0 - step;
        var end = step;
        var img = '';

        var interval = setInterval(function () {
          if (data.length) {
            img = data.splice(data.length * Math.random() | 0, 1)[0];
            var listItem = $(img);

            listItem.fadeOut('slow', function () {
              var obj = $(this);
              var z = obj.css("z-index");
              z = z - dip;
              obj.attr('style', 'z-index: ' + z).show();

              // Reset z-index
              if (i == 0) {
                for (var j = 0; j < len; j++) {
                  var listJItem = $(list[j]);
                  var dataIndex = listJItem.data('index');
                  listJItem.attr('style', 'z-index: ' + dataIndex);
                }
              }
            });

            i++;
          } else {
            start += step;
            end = start + step;
            data = src.slice(start, end);
          }

          if (end == len + step) {
            i = 0;
            clearInterval(interval);
            chaotic();
          }
        }, opt.delay);
      }

      return this;
    };
  });
})(jQuery, window, document);
