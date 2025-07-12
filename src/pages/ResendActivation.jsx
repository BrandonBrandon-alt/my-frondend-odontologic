import FormularioReenviarActivacion from "../components/auth/FormularioReenviarActivacion";
import { motion } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ResendActivation = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <FormularioReenviarActivacion />
    </motion.div>
  );
};

export default ResendActivation;