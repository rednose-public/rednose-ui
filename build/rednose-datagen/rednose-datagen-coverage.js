if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-datagen/rednose-datagen.js']) {
   __coverage__['build/rednose-datagen/rednose-datagen.js'] = {"path":"build/rednose-datagen/rednose-datagen.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":11,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":29}}},"3":{"name":"(anonymous_3)","line":36,"loc":{"start":{"line":36,"column":11},"end":{"line":36,"column":33}}},"4":{"name":"(anonymous_4)","line":47,"loc":{"start":{"line":47,"column":25},"end":{"line":47,"column":44}}},"5":{"name":"(anonymous_5)","line":50,"loc":{"start":{"line":50,"column":29},"end":{"line":50,"column":45}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":93,"column":94}},"2":{"start":{"line":5,"column":0},"end":{"line":87,"column":3}},"3":{"start":{"line":12,"column":8},"end":{"line":15,"column":102}},"4":{"start":{"line":17,"column":8},"end":{"line":17,"column":55}},"5":{"start":{"line":19,"column":8},"end":{"line":21,"column":9}},"6":{"start":{"line":20,"column":12},"end":{"line":20,"column":64}},"7":{"start":{"line":23,"column":8},"end":{"line":33,"column":9}},"8":{"start":{"line":24,"column":12},"end":{"line":24,"column":36}},"9":{"start":{"line":26,"column":12},"end":{"line":30,"column":13}},"10":{"start":{"line":27,"column":16},"end":{"line":29,"column":17}},"11":{"start":{"line":28,"column":20},"end":{"line":28,"column":73}},"12":{"start":{"line":32,"column":12},"end":{"line":32,"column":70}},"13":{"start":{"line":37,"column":8},"end":{"line":37,"column":40}},"14":{"start":{"line":39,"column":8},"end":{"line":39,"column":27}},"15":{"start":{"line":41,"column":8},"end":{"line":45,"column":9}},"16":{"start":{"line":42,"column":12},"end":{"line":44,"column":13}},"17":{"start":{"line":43,"column":16},"end":{"line":43,"column":79}},"18":{"start":{"line":47,"column":8},"end":{"line":55,"column":11}},"19":{"start":{"line":48,"column":13},"end":{"line":54,"column":15}},"20":{"start":{"line":51,"column":24},"end":{"line":51,"column":38}},"21":{"start":{"line":90,"column":0},"end":{"line":90,"column":41}}},"branchMap":{"1":{"line":19,"type":"if","locations":[{"start":{"line":19,"column":8},"end":{"line":19,"column":8}},{"start":{"line":19,"column":8},"end":{"line":19,"column":8}}]},"2":{"line":23,"type":"if","locations":[{"start":{"line":23,"column":8},"end":{"line":23,"column":8}},{"start":{"line":23,"column":8},"end":{"line":23,"column":8}}]},"3":{"line":27,"type":"if","locations":[{"start":{"line":27,"column":16},"end":{"line":27,"column":16}},{"start":{"line":27,"column":16},"end":{"line":27,"column":16}}]},"4":{"line":37,"type":"binary-expr","locations":[{"start":{"line":37,"column":8},"end":{"line":37,"column":18}},{"start":{"line":37,"column":23},"end":{"line":37,"column":38}}]},"5":{"line":42,"type":"if","locations":[{"start":{"line":42,"column":12},"end":{"line":42,"column":12}},{"start":{"line":42,"column":12},"end":{"line":42,"column":12}}]}},"code":["(function () { YUI.add('rednose-datagen', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var Datagen = Y.Base.create('datagen', Y.Base, [], {","","    /**","     * @property {String} url","     */","","    initializer: function () {","        var section = this.get('section'),","            fields  = this.get('fields'),","            sort    = this.get('sort'),","            url     = this.get('url') + '/api/datagen/sections/{section}/records?callback={callback}';","","        this.url = Y.Lang.sub(url, {section: section});","","        if (fields) {","            this.url = this.url + '&fields=' + fields.join(',');","        }","","        if (sort) {","            var sortParameters = [];","","            for (var property in sort) {","                if (sort.hasOwnProperty(property)) {","                    sortParameters.push(sort[property] + '.' + property);","                }","            }","","            this.url = this.url + '&sort=' + sortParameters.join(',');","        }","    },","","    query: function (parameters) {","        parameters || (parameters = {});","","        var url = this.url;","","        for (var parameter in parameters) {","            if (parameters.hasOwnProperty(parameter)) {","                url = this.url + '&' + parameter + '=' + parameters[parameter];","            }","        }","","        return Y.Promise(function (resolve) {","             Y.jsonp(url, {","                on: {","                    success: function (data) {","                        resolve(data);","                    }","                }","            });","        });","    }","}, {","    ATTRS: {","        /**","         * @type {String}","         */","        url: {","            value: null","        },","","        /**","         * @type {String}","         */","        section: {","            value: null","        },","","        /**","         * @type {Array}","         */","        fields: {","            value: null","        },","","        /**","         * @type {Object}","         */","        sort: {","            value: null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Datagen = Datagen;","","","}, '1.5.0-DEV', {\"requires\": [\"base\", \"io\", \"jsonp\", \"jsonp-url\", \"promise\", \"view\", \"xml\"]});","","}());"]};
}
var __cov_goN$s4pHomBfsKs3EOSioQ = __coverage__['build/rednose-datagen/rednose-datagen.js'];
__cov_goN$s4pHomBfsKs3EOSioQ.s['1']++;YUI.add('rednose-datagen',function(Y,NAME){__cov_goN$s4pHomBfsKs3EOSioQ.f['1']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['2']++;var Datagen=Y.Base.create('datagen',Y.Base,[],{initializer:function(){__cov_goN$s4pHomBfsKs3EOSioQ.f['2']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['3']++;var section=this.get('section'),fields=this.get('fields'),sort=this.get('sort'),url=this.get('url')+'/api/datagen/sections/{section}/records?callback={callback}';__cov_goN$s4pHomBfsKs3EOSioQ.s['4']++;this.url=Y.Lang.sub(url,{section:section});__cov_goN$s4pHomBfsKs3EOSioQ.s['5']++;if(fields){__cov_goN$s4pHomBfsKs3EOSioQ.b['1'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['6']++;this.url=this.url+'&fields='+fields.join(',');}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['1'][1]++;}__cov_goN$s4pHomBfsKs3EOSioQ.s['7']++;if(sort){__cov_goN$s4pHomBfsKs3EOSioQ.b['2'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['8']++;var sortParameters=[];__cov_goN$s4pHomBfsKs3EOSioQ.s['9']++;for(var property in sort){__cov_goN$s4pHomBfsKs3EOSioQ.s['10']++;if(sort.hasOwnProperty(property)){__cov_goN$s4pHomBfsKs3EOSioQ.b['3'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['11']++;sortParameters.push(sort[property]+'.'+property);}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['3'][1]++;}}__cov_goN$s4pHomBfsKs3EOSioQ.s['12']++;this.url=this.url+'&sort='+sortParameters.join(',');}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['2'][1]++;}},query:function(parameters){__cov_goN$s4pHomBfsKs3EOSioQ.f['3']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['13']++;(__cov_goN$s4pHomBfsKs3EOSioQ.b['4'][0]++,parameters)||(__cov_goN$s4pHomBfsKs3EOSioQ.b['4'][1]++,parameters={});__cov_goN$s4pHomBfsKs3EOSioQ.s['14']++;var url=this.url;__cov_goN$s4pHomBfsKs3EOSioQ.s['15']++;for(var parameter in parameters){__cov_goN$s4pHomBfsKs3EOSioQ.s['16']++;if(parameters.hasOwnProperty(parameter)){__cov_goN$s4pHomBfsKs3EOSioQ.b['5'][0]++;__cov_goN$s4pHomBfsKs3EOSioQ.s['17']++;url=this.url+'&'+parameter+'='+parameters[parameter];}else{__cov_goN$s4pHomBfsKs3EOSioQ.b['5'][1]++;}}__cov_goN$s4pHomBfsKs3EOSioQ.s['18']++;return Y.Promise(function(resolve){__cov_goN$s4pHomBfsKs3EOSioQ.f['4']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['19']++;Y.jsonp(url,{on:{success:function(data){__cov_goN$s4pHomBfsKs3EOSioQ.f['5']++;__cov_goN$s4pHomBfsKs3EOSioQ.s['20']++;resolve(data);}}});});}},{ATTRS:{url:{value:null},section:{value:null},fields:{value:null},sort:{value:null}}});__cov_goN$s4pHomBfsKs3EOSioQ.s['21']++;Y.namespace('Rednose').Datagen=Datagen;},'1.5.0-DEV',{'requires':['base','io','jsonp','jsonp-url','promise','view','xml']});
