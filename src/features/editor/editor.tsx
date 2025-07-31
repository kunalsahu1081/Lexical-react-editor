import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import * as React from "react";
import './editor.css'
import Toolbar from "@/features/Toolbar";
import {ParagraphNode, TextNode} from "lexical";
import {MyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import CustomEnterPress from "@/services/Plugins/customEnterPress";
import {MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import CustomSpacePress from "@/services/Plugins/customSpacePress";
import CustomKeyDown from "@/services/Plugins/customKeyDown";


const Editor = () => {


    return <>


        <LexicalComposer initialConfig={{
            namespace: 'VanillaLexicalEditor',
            onError: (error) => console.error('Lexical Error:', error),
            nodes: [ParagraphNode, TextNode, MyParagraphNode, MyCheckBoxNode],
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

            {/*<CustomEnterPress />*/}
            <CustomKeyDown />

        </LexicalComposer>


    </>

}

export default Editor;