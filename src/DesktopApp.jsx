import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
  DynamicWindows,
} from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const DesktopApp = () => (
  <>
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
  </>
);

export default DesktopApp;
