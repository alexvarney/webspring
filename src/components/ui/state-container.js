import React from "react";
import { motion } from "framer-motion";

export default function StateContainer({ children, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: "100%" }}
      animate={{ opacity: 1, scale: 1, y: "0" }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "tween", duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
