YUI.add("rednose-undo-manager",function(e,t){var n="mutate",r=e.Base.create("undoManager",e.Base,[],{initializer:function(){this._actions=[],this._index=0,this._savedIndex=0},destructor:function(){for(var e=0,t=this._actions.length;e<t;e++){var n=this._actions[e];typeof n.destroy=="function"&&n.destroy()}this._actions=null},execute:function(e){return this._index<this._actions.length&&this._actions.splice(this._index,this._actions.length-this._index),this._actions.push(e),this._index=this._actions.length,e.execute(),this.fire(n,{manager:this}),this},undo:function(){if(!this.canUndo())return;this._index--,this._actions[this._index].undo(),this.fire(n,{manager:this})},redo:function(){if(!this.canRedo())return;this._index++;var e=this._actions[this._index-1];e[typeof e.redo=="function"?"redo":"execute"](),this.fire(n,{manager:this})},canUndo:function(){return this._index>0},canRedo:function(){return this._actions[this._index]!==null&&this._index<this._actions.length},save:function(){this._savedIndex=this._index,this.fire(n,{manager:this})},isDirty:function(){return this._savedIndex!==this._index}});e.namespace("Rednose").UndoManager=r},"1.5.0-DEV",{requires:["base"]});