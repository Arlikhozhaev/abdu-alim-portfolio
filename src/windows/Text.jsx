import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import { CONTACT_EMAIL } from "#constants";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description, headline, sections, cta } = data;
  const hasRichAbout = Boolean(headline && sections?.length);

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 space-y-5 bg-white dark:bg-zinc-900 max-h-[70vh] overflow-y-auto">
        {image ? (
          <div className="w-full overflow-hidden rounded-xl shadow-md">
            <img src={image} alt={name} className="w-full h-auto" />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {subtitle}
          </h3>
        ) : null}

        {hasRichAbout ? (
          <>
            <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {headline}
            </p>

            {Array.isArray(description) && description.length > 0 ? (
              <div className="space-y-3 leading-relaxed text-base text-gray-800 dark:text-gray-100">
                {description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : null}

            {sections.map(({ id, emoji, title, body }) => (
              <div
                key={id}
                className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/80 p-4 space-y-2"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {emoji} {title}
                </p>
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100">
                  {body}
                </p>
              </div>
            ))}

            {cta ? (
              <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 dark:bg-blue-950/40 p-4 space-y-2">
                <p className="text-base leading-relaxed text-gray-900 dark:text-gray-100">
                  {cta.emoji} {cta.body}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  {CONTACT_EMAIL} →
                </a>
              </div>
            ) : null}
          </>
        ) : (
          Array.isArray(description) &&
          description.length > 0 && (
            <div className="space-y-3 leading-relaxed text-base text-gray-800 dark:text-gray-100">
              {description.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
};

const textWindow = WindowWrapper(Text, "txtfile");

export default textWindow;
