import {useEffect, useState, memo, FunctionComponent} from "react";
import {DropdownItem, DropdownList, ToolbarButton, ToolbarDropdown} from "@/components/toolbar";
import {MdFormatLineSpacing} from "react-icons/md";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {applyStylesToParagraph} from "@/utils/editor";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";


const spacingList = [
    1, 1.5, 2, 3
]


const LineSpacing = () => {

    const [show_spacing_options, set_show_spacing_options] = useState(false);
    const [s_spacing, set_s_spacing] = useState('1.5');

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);


    const applyLineSpacing = (spacing) => {

        set_s_spacing(spacing);
        applyStylesToParagraph(editor, `line-height: ${spacing};`);

    }

    useEffect(() => {
        set_s_spacing(toolBarState.line_height);
    }, [toolBarState.line_height]);

    const closeColorPicker = (ev) => {

        const element = document.getElementById('spacing');

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


    return <div id={'spacing'}>

        <ToolbarDropdown>

            <ToolbarButton
                onPress={() => {
                    set_show_spacing_options(true)
                }}
            >

                <MdFormatLineSpacing/>

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

export default memo(LineSpacing as FunctionComponent)