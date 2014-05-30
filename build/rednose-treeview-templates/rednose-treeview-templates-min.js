YUI.add("rednose-treeview-templates",function(e,t){var n=e.Template.Micro;e.namespace("TreeView").Templates={children:n.compile('<ul class="<%= data.classNames.children %>" <% if (data.node.isRoot()) { %>role="tree" tabindex="0"<% } else { %>role="group"<% } %>></ul>'),node:n.compile('<li id="<%= data.node.id %>" class="<%= data.nodeClassNames.join(" ") %>" title="<%= data.node.label %>" role="treeitem" aria-labelled-by="<%= data.node.id %>-label"><div class="<%= data.classNames.row %>" data-node-id="<%= data.node.id %>" data-rednose-type="<%= data.node.data.name %>" data-rednose-id="<%= data.node.data.get(\'id\')%>"><% for (var i = 0, len = data.node.depth() - 1; i < len; i++) { %><span class="rednose-treeview-spacer"></span><% } %><span class="<%= data.classNames.indicator %>"><s></s></span><span class="<%= data.treeview.icon(data.node) %>"></span><span id="<%= data.node.id %>-label" class="<%= data.classNames.label %>"><%= data.node.label %></span></div></li>')}},"1.5.0-DEV",{requires:["template-micro"]});
