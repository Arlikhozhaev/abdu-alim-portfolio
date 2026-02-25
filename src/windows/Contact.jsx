import WindowWrapper from "#hoc/WindowWrapper";
import { socials } from "#constants";
import { WindowControls } from "#components";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5 bg-white dark:bg-zinc-900">
        <img
          src="/images/abdualim.jpg"
          alt="Abdu Alim"
          className="w-20 rounded-full"
        />

        <h3 className="text-xl font-semibold dark:text-gray-100">Let's Connect</h3>
        <p className="dark:text-gray-300">Got an idea? A bug to squash? Or just wanna talk tech? I'm in!</p>
        <p className="dark:text-gray-300">arlikhozhaevca@gmail.com</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const contactWindow = WindowWrapper(Contact, "contact");

export default contactWindow;