import Editor from "../features/editor/editor";
import Toolbar from "@/features/Toolbar";
import Header from "@/components/header/header";
import Sidemenu from "@/components/sidemenu";

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
