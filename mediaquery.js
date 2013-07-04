/*
 * MediaQuery V0.9 - http://blog.hafees.com
 *
 * This extension finds the platform, screen resolution, devcie names, aspect ratio etc 
 * and adds it as class names to any selected element(s) so that you can target various platforms
 * and screen resolutions.
 *
 * TERMS OF USE - jQuery MediaQuery
 * 
 * Open source under the BSD License. 
 * 
 * Copyright (c) 2013 Hafees Shamsudeen 
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
(function($) {
    "use strict";
    var resolution = "";
    var phone = "";
    var aspectRatio = "";
    var pixelRatio = "";
    var platform = "";
    var orientation = "";
    var userAgent = navigator.userAgent;
    var debug = true;
    //Expand this array as needed
    var phones = {
        "i91\\d\\d": "s2",
        "i93\\d\\d": "s3",
        "i95\\d\\d": "s4",
        "iphone": "iphone",
        "ipad": "ipad"
    };
    var methods = {
        findResolution: function() {
            resolution = "res" + Math.min(screen.width, screen.height) + "p";
        },
        findAspectRatio: function() {
            aspectRatio = "_" + screen.width + "x" + screen.height;
        },
        findPixelRatio: function() {
            if (window.devicePixelRatio) {
                pixelRatio = "ratio-" + window.devicePixelRatio;
            }
        },
        getOrientation: function() {
            if (typeof window.orientation !== 'undefined') {
                return (window.orientation === 0 || window.orientation === 180) ? "portrait" : "landscape";
            }
            // //else detect using media query. Eg: Windows Phone 8
            var mediaQuery = window.matchMedia("(orientation: portrait)");
            return mediaQuery.matches ? "portrait" : "landscape";


        },
        registerOrientationChangeHandler: function() {
            orientation = this.getOrientation();
            if (typeof window.orientation !== 'undefined') { //If orientation is available 
                $(window).bind("orientationchange", function() {
                    $("body").removeClass("landscape portrait").addClass(methods.getOrientation());
                });
            } else {
                $(window).bind("resize", function() {
                    $("body").removeClass("landscape portrait").addClass(methods.getOrientation());
                });
            }
        },
        findPlatform: function() {
            /* user agents from http://detectmobilebrowsers.com */
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4))) {
                var values = userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i);
                platform = values !== null ? "mobile " + values[0].toLowerCase() : "mobile";
            } else {
                platform = "desktop";
            }
        },
        findPhone: function() {
            this.log(userAgent);
            for (var key in phones) {
                var expr = new RegExp(key, "i");
                if (expr.test(userAgent)) {
                    this.log("match");
                    phone = phones[key];
                    break;
                }
            }
        },
        log: function(item) {
            if (debug && window.console && console.log) {
                console.log(item);
            }
        }
    };

    //Plugin
    $.fn.mediaQuery = function(options) {
        methods.findAspectRatio();
        methods.findPhone();
        methods.findResolution();
        methods.findPixelRatio();
        methods.findPlatform();
        methods.registerOrientationChangeHandler();
        return this.each(function() {
            var $this = $(this);
            var classesStr = platform + " " + phone + " " + orientation + " " + resolution + " " + aspectRatio + " " + pixelRatio;
            $this.addClass(classesStr);
        });

    };
})(jQuery);
