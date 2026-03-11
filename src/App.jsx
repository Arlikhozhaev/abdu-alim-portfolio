import { Navbar, Welcome, Dock, Home, MobileHome } from "#components"
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos, DynamicWindows } from "#windows";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable"
gsap.registerPlugin(Draggable);

const App = () => (
  <main>
    {/* Desktop — hidden on mobile */}
    <div className="hidden sm:block">
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <DynamicWindows />
      <Home />
    </div>

    {/* Mobile — hidden on desktop */}
    <div className="sm:hidden">
      <MobileHome />
    </div>
  </main>
)

export default App