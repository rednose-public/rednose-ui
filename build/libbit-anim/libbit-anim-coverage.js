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
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].code=["YUI.add('libbit-anim', function (Y, NAME) {","","var Anim;","","/**"," * Several animation class methods to be used throughout the LiBBiT framework."," */","function Anim() {","    Anim.superclass.constructor.apply(this);","}","","/**"," * Animates a slide-in of an collapsed element as a post process."," */","Anim.slideInY = function (node) {","    // Animate the object to a height of 0.","    node.transition({","        duration: 0.25,","        easing: 'ease-in',","        height: '0px'","    }, function() {","        // Restore the 'display' style attribute and reset the height to 100%.","        node.setStyle('display', 'none');","        node.setStyle('height', '100%');","    });","}","","/**"," * Animates a slide-out of an expanded element as a post process."," */","Anim.slideOutY = function (node) {","    // Hide potential scrollbars","    node.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');","","    // Make sure the chileElement is not hidden, otherwise height cannot be","    // calculated.","    node.setStyle('display', 'block');","","    var height = node.getComputedStyle('height');","","    node.setStyle('height', 0);","","    node.transition({","        duration: 0.25,","        easing: 'ease-out',","        height: height","    }, function() {","        node.setStyle('height', null);","    });","}","","/**"," * Clone the node, position it on top of the original for secondary animation."," */","Anim.fadeOut = function (node) {","    var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),","        anim;","","    Y.one('body').appendChild(n);","    n.setXY(node.getXY());","","    anim = new Y.Anim({","        node    : n,","        to      : { opacity: 0 },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.on('end', function () {","        n.remove();","    });","","    anim.run();","}","","/**"," * Animate a slide in of a node."," */","Anim.slideIn = function (node) {","    var width  = node.get('offsetWidth'),","        height = node.get('offsetHeight'),","        anim;","","    node.setStyle('width', '0');","    node.setStyle('height', '0');","","    anim = new Y.Anim({","        node    : node,","        duration: '.25',","        easing  : Y.Easing.easeOut,","        to      : {","            width: width,","            height: height","        }","    });","","    anim.run();","}","","/**"," * Animate a node to a given width"," */","Anim.width = function (node, width) {","    var anim = new Y.Anim({","        node    : node,","        to      : { width: width },","        duration: '.25',","        easing  : Y.Easing.easeOut","    });","","    anim.run();","}","","/**"," * Morphs between two nodes."," */","Anim.morph = function (oldNode, newNode, animOut, animIn) {","    animOut(oldNode);","    oldNode.set('innerHTML', newNode.get('outerHTML'));","    animIn(oldNode);","}","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Anim = Anim;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].lines = {"1":0,"3":0,"8":0,"9":0,"15":0,"17":0,"23":0,"24":0,"31":0,"33":0,"37":0,"39":0,"41":0,"43":0,"48":0,"55":0,"56":0,"59":0,"60":0,"62":0,"69":0,"70":0,"73":0,"79":0,"80":0,"84":0,"85":0,"87":0,"97":0,"103":0,"104":0,"111":0,"117":0,"118":0,"119":0,"120":0,"124":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].functions = {"Anim:8":0,"(anonymous 2):21":0,"slideInY:15":0,"(anonymous 3):47":0,"slideOutY:31":0,"(anonymous 4):69":0,"fadeOut:55":0,"slideIn:79":0,"width:103":0,"morph:117":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredLines = 37;
_yuitest_coverage["build/libbit-anim/libbit-anim.js"].coveredFunctions = 11;
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
}

/**
 * Animates a slide-out of an expanded element as a post process.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 31);
Anim.slideOutY = function (node) {
    // Hide potential scrollbars
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideOutY", 31);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 33);
node.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');

    // Make sure the chileElement is not hidden, otherwise height cannot be
    // calculated.
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 37);
node.setStyle('display', 'block');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 39);
var height = node.getComputedStyle('height');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 41);
node.setStyle('height', 0);

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 43);
node.transition({
        duration: 0.25,
        easing: 'ease-out',
        height: height
    }, function() {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 3)", 47);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 48);
node.setStyle('height', null);
    });
}

/**
 * Clone the node, position it on top of the original for secondary animation.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 55);
Anim.fadeOut = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "fadeOut", 55);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 56);
var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 59);
Y.one('body').appendChild(n);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 60);
n.setXY(node.getXY());

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 62);
anim = new Y.Anim({
        node    : n,
        to      : { opacity: 0 },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 69);
anim.on('end', function () {
        _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "(anonymous 4)", 69);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 70);
n.remove();
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 73);
anim.run();
}

/**
 * Animate a slide in of a node.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 79);
Anim.slideIn = function (node) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "slideIn", 79);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 80);
var width  = node.get('offsetWidth'),
        height = node.get('offsetHeight'),
        anim;

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 84);
node.setStyle('width', '0');
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 85);
node.setStyle('height', '0');

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 87);
anim = new Y.Anim({
        node    : node,
        duration: '.25',
        easing  : Y.Easing.easeOut,
        to      : {
            width: width,
            height: height
        }
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 97);
anim.run();
}

/**
 * Animate a node to a given width
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 103);
Anim.width = function (node, width) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "width", 103);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 104);
var anim = new Y.Anim({
        node    : node,
        to      : { width: width },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 111);
anim.run();
}

/**
 * Morphs between two nodes.
 */
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 117);
Anim.morph = function (oldNode, newNode, animOut, animIn) {
    _yuitest_coverfunc("build/libbit-anim/libbit-anim.js", "morph", 117);
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 118);
animOut(oldNode);
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 119);
oldNode.set('innerHTML', newNode.get('outerHTML'));
    _yuitest_coverline("build/libbit-anim/libbit-anim.js", 120);
animIn(oldNode);
}

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-anim/libbit-anim.js", 124);
Y.namespace('Libbit').Anim = Anim;


}, '1.0.0');
