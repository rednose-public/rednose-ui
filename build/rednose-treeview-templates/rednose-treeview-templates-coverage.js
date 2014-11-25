if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-treeview-templates/rednose-treeview-templates.js']) {
   __coverage__['build/rednose-treeview-templates/rednose-treeview-templates.js'] = {"path":"build/rednose-treeview-templates/rednose-treeview-templates.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":38},"end":{"line":1,"column":57}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":44,"column":46}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":29}},"3":{"start":{"line":8,"column":0},"end":{"line":41,"column":2}}},"branchMap":{},"code":["(function () { YUI.add('rednose-treeview-templates', function (Y, NAME) {","","/*jshint expr:true, maxlen:200, onevar:false */","","var Micro = Y.Template.Micro;","","// Overrides `gallery-sm-treeview-templates`","Y.namespace('Rednose.TreeView').Templates = {","    children: Micro.compile(","        '<ul class=\"<%= data.classNames.children %>\" ' +","","            '<% if (data.node.isRoot()) { %>' +","                'role=\"tree\" tabindex=\"0\"' +","            '<% } else { %>' +","                'role=\"group\"' +","            '<% } %>' +","","        '></ul>'","    ),","","    node: Micro.compile(","        '<li id=\"<%= data.node.id %>\" class=\"<%= data.nodeClassNames.join(\" \") %>\" title=\"<%= data.node.label %>\" role=\"treeitem\" aria-labelled-by=\"<%= data.node.id %>-label\">' +","            '<div class=\"<%= data.classNames.row %>\" data-node-id=\"<%= data.node.id %>\" data-rednose-type=\"<%= data.node.data.name %>\" data-rednose-id=\"<%= data.node.data.id %>\">' +","","                '<% for (var i = 0, len = data.node.depth() - 1; i < len; i++) { %>' +","                    '<span class=\"rednose-treeview-spacer\"></span>' +","                '<% } %>' +","","                '<span class=\"<%= data.classNames.indicator %>\"><s></s></span>' +","","                '<% if (data.node.icon) { %>' +","                    '<span class=\"<%= data.classNames.icon%> <%= data.node.getIcon() %>\"></span>' +","                '<% } else { %>' +","                    '<span class=\"<%= data.classNames.icon %>\"></span>' +","                '<% } %>' +","","                '<span id=\"<%= data.node.id %>-label\" class=\"<%= data.classNames.label %>\"><%= data.node.label %></span>' +","            '</div>' +","        '</li>'","    )","};","","","}, '1.6.0', {\"requires\": [\"template-micro\"]});","","}());"]};
}
var __cov_2ZmVAf6MPvnS7v0RtGOfIA = __coverage__['build/rednose-treeview-templates/rednose-treeview-templates.js'];
__cov_2ZmVAf6MPvnS7v0RtGOfIA.s['1']++;YUI.add('rednose-treeview-templates',function(Y,NAME){__cov_2ZmVAf6MPvnS7v0RtGOfIA.f['1']++;__cov_2ZmVAf6MPvnS7v0RtGOfIA.s['2']++;var Micro=Y.Template.Micro;__cov_2ZmVAf6MPvnS7v0RtGOfIA.s['3']++;Y.namespace('Rednose.TreeView').Templates={children:Micro.compile('<ul class="<%= data.classNames.children %>" '+'<% if (data.node.isRoot()) { %>'+'role="tree" tabindex="0"'+'<% } else { %>'+'role="group"'+'<% } %>'+'></ul>'),node:Micro.compile('<li id="<%= data.node.id %>" class="<%= data.nodeClassNames.join(" ") %>" title="<%= data.node.label %>" role="treeitem" aria-labelled-by="<%= data.node.id %>-label">'+'<div class="<%= data.classNames.row %>" data-node-id="<%= data.node.id %>" data-rednose-type="<%= data.node.data.name %>" data-rednose-id="<%= data.node.data.id %>">'+'<% for (var i = 0, len = data.node.depth() - 1; i < len; i++) { %>'+'<span class="rednose-treeview-spacer"></span>'+'<% } %>'+'<span class="<%= data.classNames.indicator %>"><s></s></span>'+'<% if (data.node.icon) { %>'+'<span class="<%= data.classNames.icon%> <%= data.node.getIcon() %>"></span>'+'<% } else { %>'+'<span class="<%= data.classNames.icon %>"></span>'+'<% } %>'+'<span id="<%= data.node.id %>-label" class="<%= data.classNames.label %>"><%= data.node.label %></span>'+'</div>'+'</li>')};},'1.6.0',{'requires':['template-micro']});
