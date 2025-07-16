import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND} from 'lexical';
import {$patchStyleText} from '@lexical/selection'
import {useCallback} from "react";
import {FaStrikethrough} from "react-icons/fa";
import {FaUnderline} from "react-icons/fa";


const font_list = [
    'OVSoge-Black',
    'OVSoge-Bold',
    'OVSoge-Regular',
    'Quicky Nick 3D',
    'Quicky Nick Condensed Straight',
    'Quicky Nick',
    'QuickyNickExpanded',
    'QuickyNickGradient',
    'Gantians'
]


const Toolbar = () => {

    const [editor] = useLexicalComposerContext();


    const formatText = useCallback((command) => {

        editor.dispatchCommand(FORMAT_TEXT_COMMAND, command)

    }, [editor])


    const onFontChange = useCallback((event) => {

        const font_name = event?.target?.value;

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {"font-family": font_name});
            }
        });

    }, [editor])


    return <>


        <TB>

            <TB.row>
                <TB.section>

                    <TB.btn onPress={() => formatText('bold')}>
                        B
                    </TB.btn>


                    <TB.btn onPress={() => formatText('italic')}>
                        I
                    </TB.btn>

                    <TB.btn onPress={() => formatText('underline')}>
                        <FaUnderline/>
                    </TB.btn>

                    <TB.btn onPress={() => formatText('strikethrough')}>
                        <FaStrikethrough/>
                    </TB.btn>

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <TB.dropdown onChange={onFontChange}>

                        {font_list.map((font) => {
                            return <>
                                <TB.dItem>{font}</TB.dItem>
                            </>
                        })}


                    </TB.dropdown>


                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;