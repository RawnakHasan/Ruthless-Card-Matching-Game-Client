import { CardColor } from "@/types";
import { DestructiveButton } from "@/components/ui/Button";
import SpringModal from "@/components/ui/Dialog";

interface ColorPickerProps {
  onColorSelect: (color: CardColor) => void;
  onCancel: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ColorPicker = ({
  onColorSelect,
  onCancel,
  isOpen,
  setIsOpen,
}: ColorPickerProps) => {
  const colors: { name: CardColor; hex: string }[] = [
    { name: "Red", hex: "#ff5555" },
    { name: "Blue", hex: "#5555ff" },
    { name: "Green", hex: "#55aa55" },
    { name: "Yellow", hex: "#ffaa00" },
  ];

  return (
    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-3xl font-bold mb-6 text-center">Choose a Color</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color.name)}
            className="group relative p-8 rounded-xl border-4 border-text hover:scale-105 transition-all active:scale-95 shadow-lg hover:shadow-2xl"
            style={{ backgroundColor: color.hex }}
          >
            <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {color.name}
            </span>
            <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/20 transition-colors" />
          </button>
        ))}
      </div>

      <DestructiveButton onClick={onCancel} className="w-full">
        Cancel
      </DestructiveButton>
    </SpringModal>
  );
};

export default ColorPicker;
