import {FunctionComponent, memo, useCallback, useContext, useEffect, useState} from "react";
import {DropdownItem, DropdownList, ToolbarButton, ToolbarDropdown} from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";
import {EditorTheme} from "@/features/editor/editor.js";


const font_list = [
    "Roboto",
    "Winky Rough",
    "Work Sans",
    "Fira Sans",
    "Bitcount Prop Single",
    "Bitcount Prop Double"
]

export interface IFontPicker {
    fonts?: string[];
}

export const FontPicker = ({fonts = []} : IFontPicker) => {

    const [editor] = useLexicalComposerContext();
    const editorTheme = useContext(EditorTheme);
    const toolBarState = useToolbarState(editor);
    
    const [show_dropdown, set_show_dropdown] = useState(false);
    const [font, set_font] = useState(editorTheme.defaultFont);


    useEffect(() => {
        set_font(toolBarState.font || editorTheme.defaultFont);
    }, [toolBarState]);

    const onFontChange = useCallback((event) => {

        const font_name = event;
        set_show_dropdown(false)
        set_font(font_name);

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {"font-family": font_name});
            }
        });

    }, [editor])

    const closeColorPicker = (ev) => {
        const element = document.getElementById('fontDropdown');

        if (element.contains(ev.target)) {
            return;
        }

        set_show_dropdown(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <div id={'fontDropdown'}>

        <ToolbarDropdown>

            <ToolbarButton
                style={{width: '150px'}}
                onPress={() => {
                    set_show_dropdown((prev) => !prev)
                }}
            >
                <div style={{width: '160px', marginLeft: '8px', textAlign: 'left'}}> {font || "Roboto"} </div>
            </ToolbarButton>

            {show_dropdown ? <DropdownList>

                {(fonts.length ? fonts : font_list).map((lfont) => {

                    return <DropdownItem
                        key={lfont}
                        selected={lfont === (font)}
                        onClick={() => {
                            onFontChange(lfont)
                        }}
                    >
                        {lfont}
                    </DropdownItem>

                })}

            </DropdownList> : null}


        </ToolbarDropdown>

    </div>

}

export default memo(FontPicker as FunctionComponent)