import FormularioActivarCuenta from "../components/auth/FormularioActivarCuenta";
import { motion } from 'framer-motion';

// --- Animaciones de Framer Motion ---
const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Componente que representa la página de activación de cuenta
export default function ActivateAccount(){
    return(
        <motion.div
            className="min-h-screen bg-background-light flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
        >
           <FormularioActivarCuenta/>
        </motion.div>
    )
}
