import Header from "@/components/header/header";
import Sidemenu from "@/components/sidemenu";
import {defaultEditorTheme, Editor, Toolbar, Bold, Italic} from "lexical-react-editor";

function App() {

    return (
        <>

            <section className={"appContainer"}>

                <Header/>

                <section className={"bottomMainContainer"}>

                    <Sidemenu />

                    <main className={"mainContainer"}>

                        <Editor
                            theme={{
                                ...defaultEditorTheme,
                                editorClassName: 'yourEditorClassName'
                            }}
                        >

                            <Bold />
                            <Italic />

                            <Toolbar/>

                        </Editor>

                    </main>

                </section>

            </section>


        </>
    )
}

export default App
