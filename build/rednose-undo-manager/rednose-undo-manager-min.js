YUI.add("rednose-undo-manager",function(e,t){var n=e.Base.create("undoManager",e.Base,[],{initializer:function(){this._actions=[],this._index=0},destructor:function(){for(var e=0,t=this._actions.length;e<t;e++){var n=this._actions[e];typeof n.destroy=="function"&&n.destroy()}this._actions=null},execute:function(e){return this._index<this._actions.length&&this._actions.splice(this._index,this._actions.length-this._index),this._actions.push(e),this._index=this._actions.length,e.execute(),this},undo:function(){if(!this.canUndo())return;this._index--,this._actions[this._index].undo()},redo:function(){if(!this.canRedo())return;this._index++;var e=this._actions[this._index-1];e[typeof e.redo=="function"?"redo":"execute"]()},canUndo:function(){return this._index>0},canRedo:function(){return this._actions[this._index]!==null&&this._index<this._actions.length}});e.namespace("Rednose").UndoManager=n},"1.5.0-DEV",{requires:["base"]});
