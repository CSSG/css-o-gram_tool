/*
* CSSG converter
*
* 03.08.2013
* author: Khoroshilov Evgeny | skype: khoroshilov-ok
* algorithm : Startsev Anton | skype: ant.startsev
*
* useful links:
* http://operatino.github.io/MCSS/modules/cssg.html
* https://github.com/XOP/css-o-gram/tree/master/en
*
* notes:
*
* */

"use strict";

$(function(){

    // 
    // re-usable regexps
    //
    var reg = {
        spaceBetweenTags :      new RegExp("(^|>)([^<]+)", "g")
        ,validXML :             new RegExp("(<([^>]+)>)", "ig")
        ,clearWhitespace :      new RegExp("\\s*\\n+\\s*", "g")
        ,hasSymbols :           new RegExp("[^\\s]+", "g")

        ,str : {
            allSymbols : '[A-Za-z0-9]+'
        }
    };

    //
    // extending String methods
    //
    String.prototype.cleanHtml = function(){
        return this.replace(reg.spaceBetweenTags,"$1");
    };

    //
    // Constructor
    //
    function CSSG(settings){

        var _this = this;

        // interface basis
        this.cssgInput = $('#cssgInput')
        ,this.cssgOutput = $('#cssgOutput')
        ,this.cssgOutputValue = []
        ,this.cssgLevels = $('#cssgLevels')

        // interface settings
        ,this.cssgSetIndent = $('input[name="indentation"]')
        ,this.cssgSetLine = $('input[name="lineheight"]')
        ,this.cssgSetMod = $('input[name="modifier"]')
        ,this.cssgSetOutput = $('input[name="output"]')

        ,this.cssgSetSpace = $('input[name="rulespace"]')
        ,this.cssgSetTrim = $('input[name="trimtext"]')
        ,this.cssgSetAuto = $('input[name="autorecalc"]')
        ,this.cssgSetTags = $('input[name="tagnames"]')

        // interface controls
        ,this.cssgClear = $('#cssgClear')
        ,this.cssgInit = $('#cssgInit')
        
        // state
        ,this.done = false

        // settings
        ,this.settings = {
            indentation : '\t',
            indentationVal : {
                0 : '\t',
                1 : '  ',
                2 : '    '
            },
            lineheight : '\n\n',
            lineheightVal: {
                0 : '\n\n',
                1 : '\n',
                2 : '\n\n\n'
            },
            trimtext: true,
            rulespace: true,
            autorecalc: true,
            tagnames: false,

            //todo: reverse processing
            //reverse: false,

            modifier : '__',
            modifierVal : {
                0 : '__',
                1 : '_',
                2 : '--',
                3 : '-'
            },

            output : 'cssg',
            outputVal : {
                0 : 'cssg',
                1 : 'css',
                2 : 'haml'
            },

            moddistance : 2,

            textRes : {
                empty : 'Need moar raw HTML...',
                error : 'Can\'t process this HTML...'
            }
        };

        // merge settings
        if(settings){
            this.settings = $.extend({}, this.settings, settings);
        }

        // combine setters
        this.cssgSetters = [
            _this.cssgSetIndent
            ,_this.cssgSetLine
            ,_this.cssgSetMod
            ,_this.cssgSetOutput
            ,_this.cssgSetSpace
            ,_this.cssgSetTrim
            ,_this.cssgSetAuto
            ,_this.cssgSetTags
        ];

        // add listeners to
        this.cssgSetters.map(function(el, index){

            var
                setter = el,
                setterName = setter.get(0).name,
                setterType = setter.get(0).type;

            switch(setterType){
                case 'radio':
                    setter.on('click', function(){

                        setter.checked = 'checked';
                        _this.setValue(setterName, setter.filter(':checked').val());
                        _this.recalc();
                    });
                    break;

                case 'checkbox':
                    setter.on('change', function(){

                        _this.setValue(setterName, setter.get(0).checked ? true : false);
                        _this.recalc();
                    });
                    break;
            }

        });

        //
        // Interface bindings

        // auto recalculate
        this.cssgSetAuto.on({
            change : function(){
                // toggle button
                if(this.checked) _this.cssgInit.hide();
                else _this.cssgInit.show();
            }
        });


        //
        // Initial settings

        // radio buttons
        this.setValue('indentation',        _this.cssgSetIndent.filter(':checked').val());
        this.setValue('lineheight',         _this.cssgSetLine.filter(':checked').val());
        this.setValue('modifier',           _this.cssgSetMod.filter(':checked').val());
        this.setValue('output',             _this.cssgSetOutput.filter(':checked').val());

        //checkboxes
        this.setValue('rulespace',          !!(_this.cssgSetSpace.attr('checked')=='checked'));
        this.setValue('trimtext',           !!(_this.cssgSetTrim.attr('checked')=='checked'));
        this.setValue('tagnames',           !!(_this.cssgSetTags.attr('checked')=='checked'));

        this.setValue('autorecalc',         !!(_this.cssgSetAuto.attr('checked')=='checked'));

        // check autorecalc initital setting
        if(this.cssgSetAuto.attr('checked')=='checked') {
            this.cssgInit.hide();
            this.init();
        }
        else {
            this.cssgInit.show();
        }

        //
        // Main button
        this.cssgInit.on({
            click : function(){
                _this.init();
                return false;
            }
        });

        //
        // Clear
        this.cssgClear.on({
            click : function(){
                _this.cssgOutputValue = [];
                _this.cssgInput.val('');
                _this.cssgOutput.val('');

                return false;
            }
        });

        //
        // Select output
        this.cssgOutput.on({
            'click focus' : function(){
                var textbox = this;
                // hack to prevent mouse action
                textbox.onmouseup = function() {
                    textbox.onmouseup = null;
                    return false;
                };
            }
        });

        //
        // Auto recalc
        var autoRecalc = {
            to: 300,
            id : null
        };

        this.cssgInput.on({
            'keyup paste cut' : function(){
                // wrapper for throttling event
                if(!autoRecalc.id && _this.settings.autorecalc){
                    autoRecalc.id = setTimeout(function(){
                        _this.recalc();
                        clearTimeout(autoRecalc.id);
                        autoRecalc.id = null;
                    }, autoRecalc.to);
                }
            }
        });

    };

    //
    // Settter
    //
    CSSG.prototype.setValue = function(param,value){
        var _this = this;
        // plain value
        if(!this.settings[param + 'Val']){
            this.settings[param] = value;
        }
        // key:value object
        else {
            this.settings[param] = this.settings[param + 'Val'][value];
        }
    };

    //
    // Error throw
    //
    CSSG.prototype.err = function(msg, callback){
        var _this = this;
        // just output the message
        this.cssgOutput.val(_this.settings.textRes[msg]);
        //this.done = true;
        // callback if any
        if(callback && typeof callback == "function") return callback();
    };

    //
    // Level counter
    //
    CSSG.prototype.levels = function(val){
        this.cssgLevels.text(val ? val : 0);
    };

    //
    // Init
    //
    CSSG.prototype.init = function(){

        var
                _this = this,
                inputValue = this.cssgInput.val();

        // reset
        this.cssgOutputValue = [];
        this.done = false;

        // clean-up
        this.cssgOutput.val('');

        // check value
        if(inputValue) inputValue = inputValue.trim();

        // check for bad input
        if(!inputValue) {
            this.err('empty');
            return;
        }
        
        // test for valid XML
        if(!(/(<([^>]+)>)/ig).test(inputValue)){
            this.err('error');
            return;
        }

        // clean all text nodes        
        if(this.settings.trimtext){
            inputValue = inputValue.cleanHtml();
        }

        // output
        this.process(inputValue);

    };

    //
    // recalculate
    //
    CSSG.prototype.recalc = function(){
        var _this = this;
        this.init();
    };

    //
    // Clever output
    //
    CSSG.prototype.outputRender = function(val, isTag){
        var _this = this;
        switch(this.settings.output){
            case 'css' :
                val = val + ' {}';
                break;
            case 'haml' :
                val = (isTag ? '%' : '') + val;
                break;
        }
        return val;
    };

    //
    // Item processing
    //
    CSSG.prototype.refine = function(node, level){

        var
                _this = this
                ,elem = $(node)
                ,klass = ''
                ,tag = node.nodeName.toLowerCase()
                ,output = ''
                ;

        // remove whitespace
        if(node.nodeType==3){
            output = node.nodeValue
                        .trim()
                        .replace(reg.clearWhitespace, ' ');
        }

        if(node.nodeType==1){
			klass = node.getAttribute('class');
            // have classnames, proceed
            if(klass) {
                // collect mods
                var
                        all = klass.split(' '),
                        mods = [],
                        modsKlass = [],
                        modsFree = [],
                        modFreeRegExp = new RegExp('^' + _this.settings.modifier + reg.str.allSymbols),
                        modKlassRegExp = new RegExp(reg.str.allSymbols + _this.settings.modifier + reg.str.allSymbols),
                        modRegExp = new RegExp(_this.settings.modifier),
                        modspace = function(){
                            var md = '';
                            // todo: correct mod calculation
                            for(var i=0; i<(_this.settings.moddistance); i++){
//                                md += _this.settings.indentation;
                                md += '\t';
                            }
                            return md;
                        }(),
                        klasses = []
                        ;

                //inverse selection for klasses
                klasses = $.grep(all, function(el){ return modKlassRegExp.test(el) }, true);
                klasses = $.grep(klasses, function(el){ return modFreeRegExp.test(el) }, true);

                if(this.settings.output != 'cssg'){

                    // todo : currently we leave first class. find compromise
                    klasses = klasses[0];
                    output = this.outputRender( (_this.settings.tagnames ? tag : '') + '.' + klasses, _this.settings.tagnames);

                } else {

                    klasses = klasses.join(' . ');

                    // select all modifiers
                    modsFree = $.grep(all, function(el){ return modFreeRegExp.test(el) });
                    modsKlass = $.grep(all, function(el){ return modKlassRegExp.test(el) });

                    // remove klass base
                    modsKlass = $.map(modsKlass, function(el){ return el.substr(el.indexOf(_this.settings.modifier), el.length) });
                    // all mods
                    mods = modsFree.concat(modsKlass);

                    if(mods.length){
                        mods = modspace + mods.join(' ');
                        output = mods;
                    }

                    output = (this.settings.tagnames ? tag + ' . ' : '') + klasses + output;

                }

            }
            // no classnames, just tags
            else {
                if(this.settings.output != 'cssg'){
                    output = this.outputRender(tag, true);
                } else {
                    output =  tag;
                }
            }
        }

        return output;

    };

    //
    // Process DOM
    //
    CSSG.prototype.process = function (input) {

        var
                _this = this,
                holder = document.createElement('div'),
                next = holder,
                current, sibling, parent,
                indent = '',
                indentLength = this.settings.indentation.length,
                lineheight = this.settings.lineheight,
                cnt = 0,
                levels = 0,
                currentLevel = 0
                ;

        holder.innerHTML = input;

        while (next) {

            current = next;

            // detect maximum level
            currentLevel = indent.split(_this.settings.indentation).length - 1;
            levels = currentLevel > levels ? currentLevel : levels;

            if (current.nodeType == 1 || (current.nodeType == 3 && /[^\s]+/g.test(current.nodeValue))) {
                //ignore holder div
                if(cnt!=0){
                    //add extra line due to cssg rule
                    if(this.settings.rulespace && current.previousSibling && current.previousSibling.firstChild)
                        this.cssgOutputValue += lineheight;

                    this.cssgOutputValue += indent.substr(indentLength) + this.refine(current, indent.length/indentLength) + lineheight;
                }
            }
            if (next.firstChild) {
                next = next.firstChild;
                indent += this.settings.indentation;
            } else {
                sibling = next.nextSibling;
                parent = next.parentNode;
                while (sibling == null && parent) {
                    sibling = parent.nextSibling;
                    parent = parent.parentNode;
                    indent = indent.substr(0, indent.length - indentLength);
                }

                next = sibling;
            }

            cnt++;

        }

        // update levels value
        this.levels(levels);

        this.cssgOutput.val(_this.cssgOutputValue);
        this.done = true;
    };

    //
    // Init finally
    //
    return new CSSG();

});
