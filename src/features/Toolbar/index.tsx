import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from 'lexical';
import {useCallback} from "react";
import { FaStrikethrough } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";




const Toolbar = () => {

    const [editor] = useLexicalComposerContext();


    const formatText = useCallback((command) => {

        editor.dispatchCommand(FORMAT_TEXT_COMMAND, command)

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
                       <FaUnderline />
                    </TB.btn>

                    <TB.btn onPress={() => formatText('strikethrough')}>
                        <FaStrikethrough />
                    </TB.btn>

                </TB.section>

                <TB.separator/>

                <TB.section>





                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;