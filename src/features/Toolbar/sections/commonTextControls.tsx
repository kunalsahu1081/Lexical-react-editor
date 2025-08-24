import {ReactNode, useCallback, useEffect, useState} from "react";
import {FORMAT_TEXT_COMMAND, TextFormatType} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {ToolbarButton} from "@/components/toolbar/index.js";
import {FaBold, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";


interface ITextFormatter {
    type: 'bold' | 'underline' | 'italic' | 'strikethrough';
    children: ReactNode;
}

export const TextFormatter = ({type, children}: ITextFormatter) => {

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);

    const [is_active, set_is_active] = useState(false);

    useEffect(() => {
        set_is_active(Boolean(toolBarState[type]));
    }, [toolBarState]);

    const formatText = useCallback(() => {

        set_is_active((prev) => !prev);

        editor.update(() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
        });

    }, [editor])

    return <>

        <ToolbarButton isActive={is_active} onPress={() => formatText()}>
            {children}
        </ToolbarButton>

    </>

}

export const Bold = () => {

    return <>

        <TextFormatter type={'bold'}>

            <FaBold/>

        </TextFormatter>

    </>

}

export const Underline = () => {

    return <>

        <TextFormatter type={'underline'}>

            <FaUnderline />

        </TextFormatter>

    </>

}

export const Italic = () => {

    return <>

        <TextFormatter type={'italic'}>

            <FaItalic />

        </TextFormatter>

    </>

}

export const StrikeThrough = () => {

    return <>

        <TextFormatter type={'strikethrough'}>

            <FaStrikethrough />

        </TextFormatter>

    </>

}