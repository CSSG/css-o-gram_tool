/*
* CSSG converter
* 03.08.2013
* author: Khoroshilov Evgeny | skype: khoroshilov-ok
* algorithm : Startsev Anton | skype: ant.startsev
*
* useful links: http://operatino.github.io/MCSS/modules/cssg.html
* notes:
*
* */

"use strict";

require(['jquery'], function(){

    // ****************
    // HELPERS
    // ****************


    // ****************
    // VARS
    // ****************
    var
            cssgInput = $('#cssgInput')
            ,cssgInputClone = $()
            ,cssgOutput = $('#cssgOutput')
            ,cssgOutputValue = []

    //controls
            ,cssgSetIndent = $('input[name="indentation"]')
            ,cssgSetLine = $('input[name="lineheight"]')
            ,cssgSetMod = $('input[name="modifier"]')
            ,cssgSetOutput = $('input[name="output"]')

            ,cssgSetSpace = $('input[name="rulespace"]')
            ,cssgSetTrim = $('input[name="trimtext"]')
            ,cssgSetAuto = $('input[name="autorecalc"]')
            ,cssgSetTags = $('input[name="tagnames"]')

            ,cssgClear = $('#cssgClear')
            ,cssgInit = $('#cssgInit')

            ,cssg = {}
            ,done = false
            ;

    // ****************
    // SETTINGS
    // ****************
    cssg.settings = {
        indent : '\t',
        indentVal : {
            0 : '\t',
            1 : '  ',
            2 : '    '
        },
        line : '\n\n',
        lineVal: {
            0 : '\n\n',
            1 : '\n',
            2 : '\n\n\n'
        },
        trim: true,
        rulespace: true,
        auto: true,
        tagnames: false,

        //todo: reverse processing
        reverse: false,

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
            empty : 'Enter something, MOTHERFUCKER!!!',
            error : 'Invalid XML, MOTHERFUCKER!!!'
        }
    };

    //
    // Settter
    //
    cssg.setValue = function(param, value){
        if(!cssg.settings[param + 'Val']){
            cssg.settings[param] = value;
        }
        else {
            cssg.settings[param] = cssg.settings[param + 'Val'][value];
        }
    };

    //
    // Error throw
    //
    cssg.err = function(msg, callback){

        //just output the message
        cssgOutput.val(this.settings.textRes[msg]);

        //callback if any
        if(callback && typeof callback == "function") return callback();

    };

    //
    // regexp for cleaning HTML
    //
    String.prototype.cleanHtml = function(){
        return this.replace(/(^|>)([^<]+)/g,"$1");
    };

    //
    // Init
    //
    cssg.init = function(){

        var
                _this = this,
                inputValue = cssgInput.val().trim();

        cssgOutput.val('');

        //check for bad input
        if(inputValue=='') {
            _this.err('empty');
            return;
        }

        if(_this.settings.trim){
            //clean all text nodes
            inputValue = inputValue.cleanHtml();
        }

//        try {
//            $(inputValue);
//        }
//        catch(err){
//            inputValue = false;
//        }

        if(!(/(<([^>]+)>)/ig).test(inputValue)) {
            _this.err('error');
            return;
        }

        //if it's ok - proceed
        cssgOutputValue = [];
        done = false;
        cssgOutput.val(_this.process(inputValue));

    };

    //
    // recalculate
    //
    cssg.recalc = function(){
        var _this = this;
        if(done && _this.settings.auto) _this.init();
    };

    //
    // Clever output
    //
    cssg.outputRender = function(val, isTag){
        var _this = this;
        switch(_this.settings.output){
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
    cssg.refine = function(node, level){

        var
                _this = this
                ,elem = $(node)
                ,klass = elem.attr('class')
                ,tag = node.nodeName.toLowerCase()
                ,output = ''
                ;

        if(node.nodeType==3){
            output = node.nodeValue
                        .trim()
                        .replace(/\s*\n+\s*/g, ' ');
        }

        if(node.nodeType==1){
            if(klass) {
                // collect mods
                var
                        all = klass.split(' '),
                        mods = [],
                        modsKlass = [],
                        modsFree = [],
                        modFreeRegExp = new RegExp('^' + _this.settings.modifier + '[A-Za-z0-9]+'),
                        modKlassRegExp = new RegExp('[A-Za-z0-9]+' + _this.settings.modifier + '[A-Za-z0-9]+'),
                        modRegExp = new RegExp(_this.settings.modifier),
                        modspace = function(){
                            var md = '';
                            // todo: correct mod calculation
                            for(var i=0; i<(_this.settings.moddistance); i++){
//                                md += _this.settings.indent;
                                md += '\t';
                            }
                            return md;
                        }(),
                        klasses = []

                        ;

                //invert selection for klasses
                klasses = $.grep(all, function(el){ return modKlassRegExp.test(el) }, true);
                klasses = $.grep(klasses, function(el){ return modFreeRegExp.test(el) }, true);

                if(_this.settings.output != 'cssg'){

                    // todo : currently we leave first class. find compromise
                    klasses = klasses[0];
                    output = _this.outputRender( (_this.settings.tagnames ? tag : '') + '.' + klasses, _this.settings.tagnames);

                } else {

                    klasses = klasses.join(' . ');

                    //select all modifiers
                    modsFree = $.grep(all, function(el){ return modFreeRegExp.test(el) });
                    modsKlass = $.grep(all, function(el){ return modKlassRegExp.test(el) });

                    //remove klass base
                    modsKlass = $.map(modsKlass, function(el){ return el.substr(el.indexOf(_this.settings.modifier), el.length) });
                    //all mods
                    mods = modsFree.concat(modsKlass);

                    if(mods.length){
                        mods = modspace + mods.join(' ');
                        output = mods;
                    }

                    output = (_this.settings.tagnames ? tag + ' . ' : '') + klasses + output;

                }

            }
            else {
                if(_this.settings.output != 'cssg'){
                    output = _this.outputRender(tag, true);
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
    cssg.process = function (input) {

        var
                _this = this,
                holder = document.createElement('div'),
                next = holder,
                current, sibling, parent,
                indent = '',
                indentLength = _this.settings.indent.length,
                lineheight = _this.settings.line,
                cnt = 0
                ;

        holder.innerHTML = input;

        while (next) {

            current = next;

            if (current.nodeType == 1 || (current.nodeType == 3 && /[^\s]+/g.test(current.nodeValue))) {
                //ignore holder div
                if(cnt!=0){
                    //add extra line due cssg rule
                    if(_this.settings.rulespace && current.previousSibling && current.previousSibling.firstChild)
                        cssgOutputValue += lineheight;

                    cssgOutputValue += indent.substr(indentLength) + _this.refine(current, indent.length/indentLength) + lineheight;
                }
            }
            if (next.firstChild) {
                next = next.firstChild;
                indent += _this.settings.indent;
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

        done = true;
        return cssgOutputValue;
    };


    // ****************
    // CONTROLS
    // ****************

    //
    // Settings
    //
    // todo: combine similar settings

    // klass indent
    cssgSetIndent.on({
        click : function(){
            this.checked = 'checked';
            cssg.setValue('indent', cssgSetIndent.filter(':checked').val());
            cssg.recalc();
        }
    });

    // line height
    cssgSetLine.on({
        click : function(){
            this.checked = 'checked';
            cssg.setValue('line', cssgSetLine.filter(':checked').val());
            cssg.recalc();
        }
    });

    // modifier
    cssgSetMod.on({
        click : function(){
            this.checked = 'checked';
            cssg.setValue('modifier', cssgSetMod.filter(':checked').val());
            cssg.recalc();
        }
    });

    // output
    cssgSetOutput.on({
        click : function(){
            this.checked = 'checked';
            cssg.setValue('output', cssgSetOutput.filter(':checked').val());
            cssg.recalc();
        }
    });

    // rule space
    cssgSetSpace.on({
        change : function(){
            cssg.setValue('rulespace', this.checked ? true : false);
            cssg.recalc();
        }
    });

    // text trimming
    cssgSetTrim.on({
        change : function(){
            cssg.setValue('trim', this.checked ? true : false);
            cssg.recalc();
        }
    });

    // leave tagnames
    cssgSetTags.on({
        change : function(){
            cssg.setValue('tagnames', this.checked ? true : false);
            cssg.recalc();
        }
    });

    // auto recalculate
    cssgSetAuto.on({
        change : function(){
            // toggle button
            if(this.checked) cssgInit.hide();
            else cssgInit.show();

            cssg.setValue('auto', this.checked ? true : false);
            cssg.recalc();
        }
    });

    //
    // Initial settings
    //

    // radio buttons
    cssg.setValue('indent',     cssgSetIndent.filter(':checked').val());
    cssg.setValue('line',       cssgSetLine.filter(':checked').val());
    cssg.setValue('modifier',   cssgSetMod.filter(':checked').val());
    cssg.setValue('output',     cssgSetOutput.filter(':checked').val());

    //checkboxes
    cssg.setValue('rulespace',  !!(cssgSetSpace.attr('checked')=='checked'));
    cssg.setValue('trim',       !!(cssgSetTrim.attr('checked')=='checked'));
    cssg.setValue('tagnames',   !!(cssgSetTags.attr('checked')=='checked'));

    cssg.setValue('auto',       !!(cssgSetAuto.attr('checked')=='checked'));
    if(cssgSetAuto.attr('checked')=='checked') {
        cssgInit.hide();
        cssg.init();
    }
    else {
        cssgInit.show();
    }

    //
    // Main button
    //
    cssgInit.on({
        click : function(){
            cssg.init();
            return false;
        }
    });

    //
    // Clear
    //
    cssgClear.on({
        click : function(){
            cssgOutputValue = [];
            cssgInput.val('');
            cssgOutput.val('');

            return false;
        }
    });

    //
    // Select output
    //
    cssgOutput.on({
        'dblclick click focus' : function(){
            var textbox = this;
            textbox.select();
            // hack to prevent mouse action
            textbox.onmouseup = function() {
                textbox.onmouseup = null;
                return false;
            };
        }
    });

    //
    // Auto recalc
    //
    cssgInput.on({
        'keyup change' : function(){
            cssg.recalc();
        }
    });

});
