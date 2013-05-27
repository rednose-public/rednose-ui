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
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].code=["YUI.add('libbit-anim', function (Y, NAME) {","","/**"," * Several animation class methods to be used throughout the LiBBiT framework."," */","function Anim() {","    Anim.superclass.constructor.apply(this);","}","","/**"," * Animates a slide-in of an collapsed element as a post process."," */","Anim.slideInY = function (node) {","    // Animate the object to a height of 0.","    node.transition({","        duration: 0.25,","        easing: 'ease-in',","        height: '0px'","    }, function() {","        // Restore the 'display' style attribute and reset the height to 100%.","        node.setStyle('display', 'none');","        node.setStyle('height', '100%');","    });","};","","/**"," * Animates a slide-out of an expanded element as a post process."," */","Anim.slideOutY = function (node) {","    // Make sure the chileElement is not hidden, otherwise height cannot be","    // calculated.","    node.setStyle('display', 'block');","","    var height = node.getComputedStyle('height');","","    node.setStyle('height', 0);","","    node.transition({","        duration: 0.25,","        easing: 'ease-out',","        height: height","    }, function() {","        node.setStyle('height', null);","    });","};","","/**"," * Clone the node, position it on top of the original for secondary animation."," */","Anim.fadeOut = function (node) {","    var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),","        anim;","","    Y.one('body').appendChild(n);","    n.setXY(node.getXY());","","    anim = new Y.Anim({","        node    : n,","        to      : { opacity: 0 },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.on('end', function () {","        n.remove();","    });","","    anim.run();","};","","/**"," * Animate a slide in of a node."," */","Anim.slideIn = function (node) {","    var width  = node.get('offsetWidth'),","        height = node.get('offsetHeight'),","        anim;","","    node.setStyle('width', '0');","    node.setStyle('height', '0');","","    anim = new Y.Anim({","        node    : node,","        duration: '.25',","        easing  : Y.Easing.easeOut,","        to      : {","            width: width,","            height: height","        }","    });","","    anim.run();","};","","/**"," * Animate a node to a given width"," */","Anim.width = function (node, width) {","    var anim = new Y.Anim({","        node    : node,","        to      : { width: width },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.run();","};","","/**"," * Vortext effect, animate to a given location"," * while reducing dimensions and opacity"," */","Anim.vortex = function (node, x, y) {","    var anim;","","    anim = new Y.Anim({","        node: node,","        to: {","            height : 20,","            width  : 20,","            opacity: 0,","            top    : x,","            left   : y","        }, from: {","            width : node.get('offsetWidth'),","            height: node.get('offsetHeight')","        },","        duration: '.25'","    });","","    anim.on('end', function () {","        node.remove();","    });","","    anim.run();","};","","/**"," * Squeeze the node and remove it"," */","Anim.squeeze = function (node) {","    var anim;","","    node.setStyle('opacity', 0);","","    anim = new Y.Anim({","        node: node,","        to: {","            width: 0","        },","        duration: '.25',","        easing: Y.Easing.easeOut","    });","","    anim.on('end', function () {","        node.remove();","    });","","    anim.run();","};","","/**"," * Morphs between two nodes."," */","Anim.morph = function (oldNode, newNode, animOut, animIn) {","    animOut(oldNode);","    oldNode.set('innerHTML', newNode.get('outerHTML'));","    animIn(oldNode);","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Anim = Anim;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].lines = {"1":0,"6":0,"7":0,"13":0,"15":0,"21":0,"22":0,"29":0,"32":0,"34":0,"36":0,"38":0,"43":0,"50":0,"51":0,"54":0,"55":0,"57":0,"64":0,"65":0,"68":0,"74":0,"75":0,"79":0,"80":0,"82":0,"92":0,"98":0,"99":0,"106":0,"113":0,"114":0,"116":0,"131":0,"132":0,"135":0,"141":0,"142":0,"144":0,"146":0,"155":0,"156":0,"159":0,"165":0,"166":0,"167":0,"168":0,"172":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].functions = {"Anim:6":0,"(anonymous 2):19":0,"slideInY:13":0,"(anonymous 3):42":0,"slideOutY:29":0,"(anonymous 4):64":0,"fadeOut:50":0,"slideIn:74":0,"width:98":0,"(anonymous 5):131":0,"vortex:113":0,"(anonymous 6):155":0,"squeeze:141":0,"morph:165":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredLines = 48;
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 1);
YUI.add('libbit-anim', function (Y, NAME) {

/**
 * Several animation class methods to be used throughout the LiBBiT framework.
 */
_yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 6);
function Anim() {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "Anim", 6);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 7);
Anim.superclass.constructor.apply(this);
}

/**
 * Animates a slide-in of an collapsed element as a post process.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 13);
Anim.slideInY = function (node) {
    // Animate the object to a height of 0.
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideInY", 13);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 15);
node.transition({
        duration: 0.25,
        easing: 'ease-in',
        height: '0px'
    }, function() {
        // Restore the 'display' style attribute and reset the height to 100%.
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 2)", 19);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 21);
node.setStyle('display', 'none');
        _yuitest_coverline("build/libbit-anim/libbit-anim.js", 22);
node.setStyle('height', '100%');
    });
};

/**
 * Animates a slide-out of an expanded element as a post process.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 29);
Anim.slideOutY = function (node) {
    // Make sure the chileElement is not hidden, otherwise height cannot be
    // calculated.
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideOutY", 29);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 32);
node.setStyle('display', 'block');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 34);
var height = node.getComputedStyle('height');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 36);
node.setStyle('height', 0);

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 38);
node.transition({
        duration: 0.25,
        easing: 'ease-out',
        height: height
    }, function() {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 3)", 42);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 43);
node.setStyle('height', null);
    });
};

/**
 * Clone the node, position it on top of the original for secondary animation.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 50);
Anim.fadeOut = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "fadeOut", 50);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 51);
var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 54);
Y.one('body').appendChild(n);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 55);
n.setXY(node.getXY());

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 57);
anim = new Y.Anim({
        node    : n,
        to      : { opacity: 0 },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 64);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 4)", 64);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 65);
n.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 68);
anim.run();
};

/**
 * Animate a slide in of a node.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 74);
Anim.slideIn = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideIn", 74);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 75);
var width  = node.get('offsetWidth'),
        height = node.get('offsetHeight'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 79);
node.setStyle('width', '0');
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 80);
node.setStyle('height', '0');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 82);
anim = new Y.Anim({
        node    : node,
        duration: '.25',
        easing  : Y.Easing.easeOut,
        to      : {
            width: width,
            height: height
        }
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 92);
anim.run();
};

/**
 * Animate a node to a given width
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 98);
Anim.width = function (node, width) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "width", 98);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 99);
var anim = new Y.Anim({
        node    : node,
        to      : { width: width },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 106);
anim.run();
};

/**
 * Vortext effect, animate to a given location
 * while reducing dimensions and opacity
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 113);
Anim.vortex = function (node, x, y) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "vortex", 113);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 114);
var anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 116);
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

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 131);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 5)", 131);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 132);
node.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 135);
anim.run();
};

/**
 * Squeeze the node and remove it
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 141);
Anim.squeeze = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "squeeze", 141);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 142);
var anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 144);
node.setStyle('opacity', 0);

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 146);
anim = new Y.Anim({
        node: node,
        to: {
            width: 0
        },
        duration: '.25',
        easing: Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 155);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 6)", 155);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 156);
node.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 159);
anim.run();
};

/**
 * Morphs between two nodes.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 165);
Anim.morph = function (oldNode, newNode, animOut, animIn) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "morph", 165);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 166);
animOut(oldNode);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 167);
oldNode.set('innerHTML', newNode.get('outerHTML'));
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 168);
animIn(oldNode);
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 172);
Y.namespace('Libbit').Anim = Anim;


}, '1.0.0');
