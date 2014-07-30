if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-datagen/rednose-datagen.js']) {
   __coverage__['build/rednose-datagen/rednose-datagen.js'] = {"path":"build/rednose-datagen/rednose-datagen.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":11,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":29}}},"3":{"name":"(anonymous_3)","line":23,"loc":{"start":{"line":23,"column":11},"end":{"line":23,"column":33}}},"4":{"name":"(anonymous_4)","line":34,"loc":{"start":{"line":34,"column":25},"end":{"line":34,"column":44}}},"5":{"name":"(anonymous_5)","line":37,"loc":{"start":{"line":37,"column":29},"end":{"line":37,"column":45}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":73,"column":94}},"2":{"start":{"line":5,"column":0},"end":{"line":67,"column":3}},"3":{"start":{"line":12,"column":8},"end":{"line":14,"column":102}},"4":{"start":{"line":16,"column":8},"end":{"line":16,"column":55}},"5":{"start":{"line":18,"column":8},"end":{"line":20,"column":9}},"6":{"start":{"line":19,"column":12},"end":{"line":19,"column":64}},"7":{"start":{"line":24,"column":8},"end":{"line":24,"column":40}},"8":{"start":{"line":26,"column":8},"end":{"line":26,"column":27}},"9":{"start":{"line":28,"column":8},"end":{"line":32,"column":9}},"10":{"start":{"line":29,"column":12},"end":{"line":31,"column":13}},"11":{"start":{"line":30,"column":16},"end":{"line":30,"column":79}},"12":{"start":{"line":34,"column":8},"end":{"line":42,"column":11}},"13":{"start":{"line":35,"column":13},"end":{"line":41,"column":15}},"14":{"start":{"line":38,"column":24},"end":{"line":38,"column":38}},"15":{"start":{"line":70,"column":0},"end":{"line":70,"column":41}}},"branchMap":{"1":{"line":18,"type":"if","locations":[{"start":{"line":18,"column":8},"end":{"line":18,"column":8}},{"start":{"line":18,"column":8},"end":{"line":18,"column":8}}]},"2":{"line":24,"type":"binary-expr","locations":[{"start":{"line":24,"column":8},"end":{"line":24,"column":18}},{"start":{"line":24,"column":23},"end":{"line":24,"column":38}}]},"3":{"line":29,"type":"if","locations":[{"start":{"line":29,"column":12},"end":{"line":29,"column":12}},{"start":{"line":29,"column":12},"end":{"line":29,"column":12}}]}},"code":["(function () { YUI.add('rednose-datagen', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var Datagen = Y.Base.create('datagen', Y.Base, [], {","","    /**","     * @property {String} url","     */","","    initializer: function () {","        var section = this.get('section'),","            fields  = this.get('fields'),","            url     = this.get('url') + '/api/datagen/sections/{section}/records?callback={callback}';","","        this.url = Y.Lang.sub(url, {section: section});","","        if (fields) {","            this.url = this.url + '&fields=' + fields.join(',');","        }","    },","","    query: function (parameters) {","        parameters || (parameters = {});","","        var url = this.url;","","        for (var parameter in parameters) {","            if (parameters.hasOwnProperty(parameter)) {","                url = this.url + '&' + parameter + '=' + parameters[parameter];","            }","        }","","        return Y.Promise(function (resolve) {","             Y.jsonp(url, {","                on: {","                    success: function (data) {","                        resolve(data);","                    }","                }","            });","        });","    }","}, {","    ATTRS: {","        /**","         * @type {String}","         */","        url: {","            value: null","        },","","        /**","         * @type {String}","         */","        section: {","            value: null","        },","","        /**","         * @type {Array}","         */","        fields: {","            value: null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Datagen = Datagen;","","","}, '1.5.0-DEV', {\"requires\": [\"base\", \"io\", \"jsonp\", \"jsonp-url\", \"promise\", \"view\", \"xml\"]});","","}());"]};
}
var __cov_goN$s4pHomBfsKs3EOSioQ = __coverage__['build/rednose-datagen/rednose-datagen.js'];
__cov_goN$s4pHomBfsKs3EOSioQ.s['1']++;YUI.add('rednose-datagen',function(Y,NAME){__cov_goN$s4pHomBfsKs3EOSioQ.f['1']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['2']++;var Datagen=Y.Base.create('datagen',Y.Base,[],{initializer:function(){__cov_goN$s4pHomBfsKs3EOSioQ.f['2']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['3']++;var section=this.get('section'),fields=this.get('fields'),url=this.get('url')+'/api/datagen/sections/{section}/records?callback={callback}';__cov_goN$s4pHomBfsKs3EOSioQ.s['4']++;this.url=Y.Lang.sub(url,{section:section});__cov_goN$s4pHomBfsKs3EOSioQ.s['5']++;if(fields){__cov_goN$s4pHomBfsKs3EOSioQ.b['1'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['6']++;this.url=this.url+'&fields='+fields.join(',');}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['1'][1]++;}},query:function(parameters){__cov_goN$s4pHomBfsKs3EOSioQ.f['3']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['7']++;(__cov_goN$s4pHomBfsKs3EOSioQ.b['2'][0]++,parameters)||(__cov_goN$s4pHomBfsKs3EOSioQ.b['2'][1]++,parameters={});__cov_goN$s4pHomBfsKs3EOSioQ.s['8']++;var url=this.url;__cov_goN$s4pHomBfsKs3EOSioQ.s['9']++;for(var parameter in parameters){__cov_goN$s4pHomBfsKs3EOSioQ.s['10']++;if(parameters.hasOwnProperty(parameter)){__cov_goN$s4pHomBfsKs3EOSioQ.b['3'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['11']++;url=this.url+'&'+parameter+'='+parameters[parameter];}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['3'][1]++;}}__cov_goN$s4pHomBfsKs3EOSioQ.s['12']++;return Y.Promise(function(resolve){__cov_goN$s4pHomBfsKs3EOSioQ.f['4']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['13']++;Y.jsonp(url,{on:{success:function(data){__cov_goN$s4pHomBfsKs3EOSioQ.f['5']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['14']++;resolve(data);}}});});}},{ATTRS:{url:{value:null},section:{value:null},fields:{value:null}}});__cov_goN$s4pHomBfsKs3EOSioQ.s['15']++;Y.namespace('Rednose').Datagen=Datagen;},'1.5.0-DEV',{'requires':['base','io','jsonp','jsonp-url','promise','view','xml']});
