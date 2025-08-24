import ToolBar, {TRow, TSection, TSeparator} from "@/components/toolbar";
import FontPicker from "@/features/Toolbar/sections/fontPicker";
import TextColor from "@/features/Toolbar/sections/textColor";
import HighlightText from "@/features/Toolbar/sections/highlightText";
import LineSpacing from "@/features/Toolbar/sections/lineSpacing";
import ParagraphSpacing from "@/features/Toolbar/sections/paragraphSpacing";
import FontSize from "@/features/Toolbar/sections/fontSize";
import AddChecklist from "@/features/Toolbar/sections/addChecklist";
import AddUnorderedList from "@/features/Toolbar/sections/addUnorderedList";
import AddIndent from "@/features/Toolbar/sections/addIndent";
import RemoveIndent from "@/features/Toolbar/sections/removeIndent";
import {Bold, Italic, StrikeThrough, Underline} from "@/features/Toolbar/sections/commonTextControls.js";
import {AlignCenter, AlignJustify, AlignLeft, AlignRight} from "@/features/Toolbar/sections/paragraphStyling.js";


const Toolbar = () => {

    return <>


        <ToolBar>
            <TRow>

                <TSection>

                    <Bold />

                    <Italic />

                    <Underline />

                    <StrikeThrough />

                </TSection>

                <TSeparator/>

                <TSection>

                    <FontPicker  />

                </TSection>

                <TSeparator/>

                <TSection>

                    <AlignLeft />

                    <AlignCenter />

                    <AlignRight />

                    <AlignJustify />

                </TSection>

            </TRow>

            <TRow>

                <TSection>

                    <TextColor />

                    <HighlightText />

                    <LineSpacing  />

                    <ParagraphSpacing />

                </TSection>

                <TSeparator/>

                <TSection>

                    <FontSize />

                </TSection>

                 <TSeparator/>

                <TSection>

                    <AddIndent />

                    <RemoveIndent />

                    <AddChecklist />

                    <AddUnorderedList />

                </TSection>

            </TRow>

        </ToolBar>

    </>


}

export default Toolbar;