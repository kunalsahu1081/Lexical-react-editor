import React, {useEffect, useState} from "react";
import TB from "@/components/toolbar";
import {MdFormatLineSpacing} from "react-icons/md";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {applyStylesToParagraph} from "@/utils/editor";


const spacingList = [
    4, 8, 12, 16, 20,
]


const ParagraphSpacing = ({Sspacing = 1.5}) => {

    const [show_spacing_options, set_show_spacing_options] = useState(false);

    const [editor] = useLexicalComposerContext();


    const applyLineSpacing = (spacing) => {

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

        <TB.dropdown>

            <TB.btn
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

            </TB.btn>


            {show_spacing_options ?
                <TB.dropdownL>

                    {
                        spacingList.map((spacing) => {
                            return <TB.dItem onClick={() => applyLineSpacing(spacing)} selected={Sspacing == spacing}>{spacing}</TB.dItem>
                        })
                    }

                </TB.dropdownL>

                : null}

        </TB.dropdown>

    </div>

}

export default React.memo(ParagraphSpacing)