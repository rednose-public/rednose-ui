var RichTextEditor;

RichTextEditor = Y.Base.create('richTextEditor', Y.Widget, [], {

    render: function() {
        CKEDITOR.replace(this.get('srcNode').getDOMNode(), {
            toolbar: [
                {
                    "name": "styles",
                    "items": ["Font","FontSize"]
                    }, {
                        "name": "editing",
                        "items": ["Find", "Replace", "-", "SelectAll"]
                    }, {
                        "name": "clipboard",
                        "items": ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"
                        ]
                    }, {
                        "name": "clipboard",
                        "items": ["Undo", "Redo"]
                    }, {
                        "name": "basicstyles",
                        "items": ["Bold", "Italic", "Underline", "-", "RemoveFormat"]
                    }, {
                        "name": "paragraph",
                        "items": ["NumberedList", "BulletedList", "-", "Outdent", "Indent"]
                    }, {
                        "name": "links",
                        "items": ["Link", "Unlink"]
                    }, {
                        "name": "insert",
                        "items": ["SpecialChar"]
                    }, {
                        "name": "tools",
                        "items": ["Maximize"]
                    }
                ],
                disableNativeSpellChecker: false,
                scayt_sLang: YUI_config.lang,
                language: YUI_config.lang,
                height: '100'
        });
    }
}, {
    ATTRS: {
        rules: { value: {} }
    }
});

Y.namespace('Libbit').ControlFormRichTextEditor = RichTextEditor;
