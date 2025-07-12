import FormularioCambiarPasswordReset from "../components/auth/FormularioCambiarPasswordReset";
import { motion } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function CambiarPasswordReset() {
  return (
    <motion.div
      className="min-h-screen bg-background-light flex items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <FormularioCambiarPasswordReset />
    </motion.div>
  );
}

export default CambiarPasswordReset;