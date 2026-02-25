import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import { WindowControls } from "#components";

const DynamicImageWindow = ({ windowData }) => {
  const { closeDynamicWindow, focusDynamicWindow } = useWindowStore();
  const { key, data, zIndex } = windowData;
  const { name, imageUrl } = data;
  const ref = useRef(null);

  // Entrance animation
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
    );
  }, []);

  // Draggable
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const [instance] = Draggable.create(el, {
      bounds: "body",
      onPress: () => focusDynamicWindow(key),
    });
    return () => instance.kill();
  }, []);

  return (
    <section
      ref={ref}
      id="imgfile"
      className="absolute w-xl top-40 left-[16%]"
      style={{ zIndex }}
      onMouseDown={() => focusDynamicWindow(key)}
    >
      <div id="window-header">
        {/* Pass a custom close handler instead of the store's static closeWindow */}
        <div id="window-controls">
          <button
            className="close"
            onClick={() => closeDynamicWindow(key)}
          />
          <span className="minimize" />
          <span className="maximize" />
        </div>
        <p className="font-bold text-[#5f6266] dark:text-zinc-400">{name}</p>
      </div>

      <div className="p-2 bg-gray-200 dark:bg-zinc-800 max-h-[70vh] overflow-auto">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-fit object-contain object-center"
          />
        )}
      </div>
    </section>
  );
};

// Renders ALL open dynamic windows — drop this once in your App.jsx
const DynamicWindows = () => {
  const { dynamicWindows } = useWindowStore();
  return (
    <>
      {dynamicWindows.map((win) => (
        <DynamicImageWindow key={win.key} windowData={win} />
      ))}
    </>
  );
};

export default DynamicWindows;
