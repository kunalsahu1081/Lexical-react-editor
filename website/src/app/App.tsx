import Header from "@/components/header/header";
import Sidemenu from "@/components/sidemenu";
import {Editor, Toolbar} from "lexical-react-editor";

function App() {

    return (
        <>

            <section className={"appContainer"}>

                <Header/>

                <section className={"bottomMainContainer"}>

                    <Sidemenu />

                    <main className={"mainContainer"}>

                        <Editor>

                            <Toolbar/>

                        </Editor>

                    </main>

                </section>

            </section>


        </>
    )
}

export default App
