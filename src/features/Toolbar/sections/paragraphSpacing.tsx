import {useEffect, useState, memo, FunctionComponent} from "react";
import {DropdownItem, DropdownList, ToolbarButton, ToolbarDropdown} from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {applyStylesToParagraph} from "@/utils/editor";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";


const spacingList = [
    4, 8, 12, 16, 20,
]


export const ParagraphSpacing = () => {

    const [show_spacing_options, set_show_spacing_options] = useState(false);
    const [s_spacing, set_s_spacing] = useState(1.5);

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);


    useEffect(() => {
        set_s_spacing(toolBarState.p_spacing)
    }, [toolBarState.p_spacing]);

    const applyLineSpacing = (spacing) => {

        set_s_spacing(spacing);
        applyStylesToParagraph(editor, `margin-bottom: ${spacing / 2}px; margin-top: ${spacing / 2}px;`);

    }

    const closeColorPicker = (ev) => {

        const element = document.getElementById('Pspacing');

        if (element.contains(ev.target)) {
            return;
        }

        set_show_spacing_options(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <div id={'Pspacing'}>

        <ToolbarDropdown>

            <ToolbarButton
                onPress={() => {
                    set_show_spacing_options(true)
                }}
            >

                < svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M2 8h13v2H2zM2 4h13v2H2zM2 12h13v2H2zM22 22v-8l-5 4zM2 16h13v4H2z"></path>
                </svg>

            </ToolbarButton>


            {show_spacing_options ?
                <DropdownList>

                    {
                        spacingList.map((spacing) => {
                            return <DropdownItem onClick={() => applyLineSpacing(spacing)} selected={s_spacing == spacing}>{spacing}</DropdownItem>
                        })
                    }

                </DropdownList>

                : null}

        </ToolbarDropdown>

    </div>

}

export default memo(ParagraphSpacing as FunctionComponent)