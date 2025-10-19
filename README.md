# Lexical Text Editor

This is a text editor library I made to support one of my projects

It uses lexical library for rich text editing experience in the web
https://lexical.dev/

A Example of how to use this library can be found in /website directory of this project and hosted in this link https://lexical-text-editor-2.netlify.app/

<img width="380" height="201" alt="image" src="https://github.com/user-attachments/assets/d85fe8c2-f4c4-4fe2-9ff3-542ce03644d6" />


## Basic Example

```js
import {defaultEditorTheme, Editor, Bold, Italic, AddChecklist, AddIndent, AddUnorderedList} from "lexical-react-editor";

function App() {

    return (
        <>

            <div >

                <Editor>

                    <div className="yourToolbar">
                        
                        // imported buttons to perform text editing 
                        <Bold />
                        <Italic />
                        <AddChecklist />
                        <AddIndent />
                        <AddUnorderedList />
                        
                    </div>

                </Editor>

            </div>


        </>
    )
}
```

## Customize Styles

Optionally you can pass a theme prop to customize Editor Styling

```js
import {defaultEditorTheme, Editor, Toolbar, Bold, Italic, AddChecklist, AddIndent, AddUnorderedList} from "lexical-react-editor";

<Editor
    theme={{
        ...defaultEditorTheme,
        editorClassName: 'yourEditorClassName'
    }}
>

    <div className="yourToolbar">
        
        // imported buttons to perform text editing 
        <Bold />
        <Italic />
        <AddChecklist />
        <AddIndent />
        <AddUnorderedList />
        
    </div>

</Editor>
```

Other available properties in defaultEditorTheme are in below interface

```ts
interface IDefaultEditorTheme {
    editorClassName: string;
    placeholderClassName: string;
    toolbarClassName?: string;
    toolbarButton?: string;
    toolbarButtonActive?: string;
    defaultFont?: string;
    dropdownButtonClassname?: string;
    dropdownListClassname?: string;
    dropdownItemClassname?: string;
}
```

## Expanding project as per your use case

Additionally you can make your own lexical nodes and pass it as a props to the editor
To add this properly import lexicalComposerContext as below

Doc to how to add a node
https://lexical.dev/docs/concepts/nodes

Doc to how to add a plugin
https://lexical.dev/docs/react/create_plugin

```js
import {useLexicalComposerContext} from "lexical-react-editor";
```

```js
<Editor
    theme={{
        ...defaultEditorTheme,
        editorClassName: 'yourEditorClassName'
    }}
    nodes={[
        customParagraphNode,
        orderedListNode,
    ]}
>
</Editor>
```
