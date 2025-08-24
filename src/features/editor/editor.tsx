import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import * as React from "react";
import {createContext} from "react";
import '../../styles/editor.css'
import {Klass, LexicalNode, LexicalNodeReplacement, ParagraphNode, TextNode} from "lexical";
import {MyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import EnterPressPlugin from "@/services/Plugins/customEnterPress";
import {MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import BackPressPlugin from "@/services/Plugins/customDelPress";
import {ListItemNode, ListNode} from "@lexical/list";
import {MyListNode} from "@/services/Plugins/MyListNode";
import {MyListNodeItem} from "@/services/Plugins/MyListNodeItem";


interface IDefaultEditorTheme {
    editorClassName: string;
    placeholderClassName: string;
    toolbarClassName?: string;
    toolbarButton?: string;
    toolbarButtonActive?: string;
    defaultFont?: string;
}

export const defaultEditorTheme: IDefaultEditorTheme = {
    editorClassName: 'myEditor',
    placeholderClassName: 'editorPlaceholder',
    toolbarClassName: 'editorToolbar',
    toolbarButton: 'toolbarButton',
    toolbarButtonActive: 'toolbarButtonActive',
    defaultFont: 'Winky Rough'
}

interface IEditor {
    children: React.ReactNode,
    theme?: IDefaultEditorTheme,
    nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
}

export const EditorTheme = createContext(defaultEditorTheme)

const Editor = ({children, theme = defaultEditorTheme, nodes = []} : IEditor) => {


    return <>

        <LexicalComposer
            initialConfig={{
                namespace: 'VanillaLexicalEditor',
                onError: (error) => console.error('Lexical Error:', error),
                nodes: [ParagraphNode, TextNode, MyParagraphNode, MyCheckBoxNode, MyListNode, MyListNodeItem, ...nodes],
                theme: {
                    text: {
                        bold: "bold",
                        underline: "underline",
                        italic: "italics",
                        strikethrough: "line-through",
                        underlineStrikethrough: "line-through-strike",
                    },
                }
            }}
        >

            <EditorTheme value={theme}>

                {children}

                <RichTextPlugin
                    contentEditable={<ContentEditable className={theme.editorClassName}/>}
                    placeholder={<div className={theme.placeholderClassName}>Enter text here...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />

            </EditorTheme>

            <HistoryPlugin/>

            <EnterPressPlugin/>

            <BackPressPlugin/>

        </LexicalComposer>


    </>

}

export default Editor;