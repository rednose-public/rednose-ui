if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-anim/libbit-anim.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-anim/libbit-anim.js",
    code: []
};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].code=["YUI.add('libbit-anim', function (Y, NAME) {","","var Anim;","","/**"," * Several animation class methods to be used throughout the LiBBiT framework."," */","function Anim() {","    Anim.superclass.constructor.apply(this);","}","","/**"," * Animates a slide-in of an collapsed element as a post process."," */","Anim.slideInY = function (node) {","    // Animate the object to a height of 0.","    node.transition({","        duration: 0.25,","        easing: 'ease-in',","        height: '0px'","    }, function() {","        // Restore the 'display' style attribute and reset the height to 100%.","        node.setStyle('display', 'none');","        node.setStyle('height', '100%');","    });","};","","/**"," * Animates a slide-out of an expanded element as a post process."," */","Anim.slideOutY = function (node) {","    // Make sure the chileElement is not hidden, otherwise height cannot be","    // calculated.","    node.setStyle('display', 'block');","","    var height = node.getComputedStyle('height');","","    node.setStyle('height', 0);","","    node.transition({","        duration: 0.25,","        easing: 'ease-out',","        height: height","    }, function() {","        node.setStyle('height', null);","    });","};","","/**"," * Clone the node, position it on top of the original for secondary animation."," */","Anim.fadeOut = function (node) {","    var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),","        anim;","","    Y.one('body').appendChild(n);","    n.setXY(node.getXY());","","    anim = new Y.Anim({","        node    : n,","        to      : { opacity: 0 },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.on('end', function () {","        n.remove();","    });","","    anim.run();","};","","/**"," * Animate a slide in of a node."," */","Anim.slideIn = function (node) {","    var width  = node.get('offsetWidth'),","        height = node.get('offsetHeight'),","        anim;","","    node.setStyle('width', '0');","    node.setStyle('height', '0');","","    anim = new Y.Anim({","        node    : node,","        duration: '.25',","        easing  : Y.Easing.easeOut,","        to      : {","            width: width,","            height: height","        }","    });","","    anim.run();","};","","/**"," * Animate a node to a given width"," */","Anim.width = function (node, width) {","    var anim = new Y.Anim({","        node    : node,","        to      : { width: width },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.run();","};","","/**"," * Vortext effect, animate to a given location"," * while reducing dimensions and opacity"," */","Anim.vortex = function (node, x, y) {","    var anim;","","    anim = new Y.Anim({","        node: node,","        to: {","            height : 20,","            width  : 20,","            opacity: 0,","            top    : x,","            left   : y","        }, from: {","            width : node.get('offsetWidth'),","            height: node.get('offsetHeight')","        },","        duration: '.25'","    });","","    anim.on('end', function () {","        node.remove();","    });","","    anim.run();","};","","/**"," * Squeeze the node and remove it"," */","Anim.squeeze = function (node) {","    var anim;","","    node.setStyle('opacity', 0);","","    anim = new Y.Anim({","        node: node,","        to: {","            width: 0","        },","        duration: '.25',","        easing: Y.Easing.easeOut","    });","","    anim.on('end', function () {","        node.remove();","    });","","    anim.run();","};","","/**"," * Morphs between two nodes."," */","Anim.morph = function (oldNode, newNode, animOut, animIn) {","    animOut(oldNode);","    oldNode.set('innerHTML', newNode.get('outerHTML'));","    animIn(oldNode);","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Anim = Anim;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].lines = {"1":0,"3":0,"8":0,"9":0,"15":0,"17":0,"23":0,"24":0,"31":0,"34":0,"36":0,"38":0,"40":0,"45":0,"52":0,"53":0,"56":0,"57":0,"59":0,"66":0,"67":0,"70":0,"76":0,"77":0,"81":0,"82":0,"84":0,"94":0,"100":0,"101":0,"108":0,"115":0,"116":0,"118":0,"133":0,"134":0,"137":0,"143":0,"144":0,"146":0,"148":0,"157":0,"158":0,"161":0,"167":0,"168":0,"169":0,"170":0,"174":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].functions = {"Anim:8":0,"(anonymous 2):21":0,"slideInY:15":0,"(anonymous 3):44":0,"slideOutY:31":0,"(anonymous 4):66":0,"fadeOut:52":0,"slideIn:76":0,"width:100":0,"(anonymous 5):133":0,"vortex:115":0,"(anonymous 6):157":0,"squeeze:143":0,"morph:167":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredLines = 49;
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 1);
YUI.add('libbit-anim', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 3);
var Anim;

/**
 * Several animation class methods to be used throughout the LiBBiT framework.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 8);
function Anim() {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "Anim", 8);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 9);
Anim.superclass.constructor.apply(this);
}

/**
 * Animates a slide-in of an collapsed element as a post process.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 15);
Anim.slideInY = function (node) {
    // Animate the object to a height of 0.
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideInY", 15);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 17);
node.transition({
        duration: 0.25,
        easing: 'ease-in',
        height: '0px'
    }, function() {
        // Restore the 'display' style attribute and reset the height to 100%.
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 2)", 21);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 23);
node.setStyle('display', 'none');
        _yuitest_coverline("build/libbit-anim/libbit-anim.js", 24);
node.setStyle('height', '100%');
    });
};

/**
 * Animates a slide-out of an expanded element as a post process.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 31);
Anim.slideOutY = function (node) {
    // Make sure the chileElement is not hidden, otherwise height cannot be
    // calculated.
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideOutY", 31);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 34);
node.setStyle('display', 'block');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 36);
var height = node.getComputedStyle('height');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 38);
node.setStyle('height', 0);

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 40);
node.transition({
        duration: 0.25,
        easing: 'ease-out',
        height: height
    }, function() {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 3)", 44);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 45);
node.setStyle('height', null);
    });
};

/**
 * Clone the node, position it on top of the original for secondary animation.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 52);
Anim.fadeOut = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "fadeOut", 52);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 53);
var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 56);
Y.one('body').appendChild(n);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 57);
n.setXY(node.getXY());

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 59);
anim = new Y.Anim({
        node    : n,
        to      : { opacity: 0 },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 66);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 4)", 66);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 67);
n.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 70);
anim.run();
};

/**
 * Animate a slide in of a node.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 76);
Anim.slideIn = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideIn", 76);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 77);
var width  = node.get('offsetWidth'),
        height = node.get('offsetHeight'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 81);
node.setStyle('width', '0');
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 82);
node.setStyle('height', '0');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 84);
anim = new Y.Anim({
        node    : node,
        duration: '.25',
        easing  : Y.Easing.easeOut,
        to      : {
            width: width,
            height: height
        }
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 94);
anim.run();
};

/**
 * Animate a node to a given width
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 100);
Anim.width = function (node, width) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "width", 100);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 101);
var anim = new Y.Anim({
        node    : node,
        to      : { width: width },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 108);
anim.run();
};

/**
 * Vortext effect, animate to a given location
 * while reducing dimensions and opacity
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 115);
Anim.vortex = function (node, x, y) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "vortex", 115);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 116);
var anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 118);
anim = new Y.Anim({
        node: node,
        to: {
            height : 20,
            width  : 20,
            opacity: 0,
            top    : x,
            left   : y
        }, from: {
            width : node.get('offsetWidth'),
            height: node.get('offsetHeight')
        },
        duration: '.25'
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 133);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 5)", 133);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 134);
node.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 137);
anim.run();
};

/**
 * Squeeze the node and remove it
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 143);
Anim.squeeze = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "squeeze", 143);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 144);
var anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 146);
node.setStyle('opacity', 0);

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 148);
anim = new Y.Anim({
        node: node,
        to: {
            width: 0
        },
        duration: '.25',
        easing: Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 157);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 6)", 157);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 158);
node.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 161);
anim.run();
};

/**
 * Morphs between two nodes.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 167);
Anim.morph = function (oldNode, newNode, animOut, animIn) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "morph", 167);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 168);
animOut(oldNode);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 169);
oldNode.set('innerHTML', newNode.get('outerHTML'));
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 170);
animIn(oldNode);
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 174);
Y.namespace('Libbit').Anim = Anim;


}, '1.0.0');
