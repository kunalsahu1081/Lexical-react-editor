import {ToolbarButton} from "@/components/toolbar/index.js";
import {FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight} from "react-icons/fa";
import {LexicalComposerContext, useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {applyStylesToParagraph} from "@/utils/editor.js";


interface IParagraphStyling {
    type: 'center' | 'left' | 'right' | 'justify';
    children: ReactNode;
}

const ParagraphStyling = ({type, children} : IParagraphStyling) => {

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);
    const [is_active, set_is_active] = useState(false);

    useEffect(() => {
        set_is_active(Boolean(toolBarState.align === type));
    }, [toolBarState]);

    useEffect(() => {
        //@ts-ignore
        window.__DEBUG_LEXICAL_STATE2 = LexicalComposerContext;

        console.log(LexicalComposerContext, 'context from editor main 2')
    }, []);

    const applyParagraphStyles = useCallback(() => {

        set_is_active(true)

        applyStylesToParagraph(editor, `text-align: ${type};`);

    }, [editor])

    return <>

        <ToolbarButton isActive={is_active} onPress={() => applyParagraphStyles()}>
            {children}
        </ToolbarButton>

    </>

}

export const AlignCenter = () => {

    return <>

        <ParagraphStyling type={'center'} >
            <FaAlignCenter/>
        </ParagraphStyling>

    </>

}

export const AlignLeft = () => {

    return <>

        <ParagraphStyling type={'left'} >
            <FaAlignLeft/>
        </ParagraphStyling>

    </>

}

export const AlignRight = () => {

    return <>

        <ParagraphStyling type={'right'} >
            <FaAlignRight/>
        </ParagraphStyling>

    </>

}

export const AlignJustify = () => {

    return <>

        <ParagraphStyling type={'justify'} >
            <FaAlignJustify/>
        </ParagraphStyling>

    </>

}