import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import * as React from "react";
import './editor.css'
import Toolbar from "@/features/Toolbar";
import {ParagraphNode, TextNode} from "lexical";
import {MyParagraphNode} from "@/Plugins/MyParagraphNode";


const Editor = () => {


    return <>


        <LexicalComposer initialConfig={{
            namespace: 'VanillaLexicalEditor',
            onError: (error) => console.error('Lexical Error:', error),
            nodes: [ParagraphNode, TextNode, MyParagraphNode],
            theme: {
                text: {
                    bold: "bold",
                    underline: "underline",
                    italic: "italics",
                    strikethrough: "line-through",
                    underlineStrikethrough: "line-through-strike",
                },
            }
        }}>

            <Toolbar/>

            <RichTextPlugin
                contentEditable={<ContentEditable className="editor"/>}
                placeholder={<div className={'editorPlaceholder'}>Enter text here...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>

        </LexicalComposer>


    </>

}

export default Editor;