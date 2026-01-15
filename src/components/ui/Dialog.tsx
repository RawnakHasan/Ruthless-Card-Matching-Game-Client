import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import ClickSpark from "@/components/ui/ClickSpark";
import { SparkColor } from "@/env";
import { X } from "lucide-react";

type SpringModalProps = {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  children,
  title,
}: SpringModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background text-text p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <h1
              className={`text-xl font-semibold fixed ${title ? "" : "hidden"}`}
            >
              {title}
            </h1>
            <ClickSpark sparkColor={SparkColor}>
              <div style={title ? { marginTop: "3rem" } : {}}>{children}</div>
            </ClickSpark>
            <X
              className="absolute top-8 right-8"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
