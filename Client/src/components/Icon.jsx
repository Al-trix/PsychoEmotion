import { Tooltip, Divider } from "@nextui-org/react";
export default function Icon({ children, nameIcon, name }) {
  return (
    
    <Tooltip
      content={nameIcon}
      classNames={{
        base: [
          // arrow color
          "before:bg-neutral-400 dark:before:bg-white",
        ],
        content: [
          "py-2 px-4 shadow-xl",
          `text-black ${
            name && name === "Alvaro Arboleda"
              ? "bg-ming-200 "
              : name === "Deivy Gallego"
              ? "bg-red-200"
              : "bg-jade-200"
          } from-white to-neutral-400`,
        ],
      }}
    >
      <div
        className={` animation-icons border  border-white/70 p-2 rounded-lg hover:scale-90 cursor-help transition-transform-colors duration-400   ${
          name && name === "Alvaro Arboleda"
            ? "text-ming-500/60 hover:text-ming-500"
            : name === "Deivy Gallego"
            ? "text-red-500/60 hover:text-red-500"
            : "text-jade-500/60 hover:text-jade-500"
        }`}
      >
        {children}
      </div>
    </Tooltip>
  );
}
