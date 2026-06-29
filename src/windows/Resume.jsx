import { WindowControls } from "#components";
import ResumeViewer from "#components/ResumeViewer";
import WindowWrapper from "#hoc/WindowWrapper";

const Resume = () => (
  <>
    <div id="window-header">
      <WindowControls target="resume" />
      <h2>Resume.pdf</h2>
    </div>

    <ResumeViewer variant="desktop" />
  </>
);

const resumeWindow = WindowWrapper(Resume, "resume");

export default resumeWindow;
