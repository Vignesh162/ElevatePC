import { motion } from 'framer-motion';

export default function BenefitCard({ title, description, icon, index }) {
  const colorSchemes = [
    { bg: 'bg-gradient-to-br from-blue-600 to-blue-800', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { bg: 'bg-gradient-to-br from-purple-600 to-purple-800', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { bg: 'bg-gradient-to-br from-green-600 to-green-800', iconBg: 'bg-green-100', iconColor: 'text-green-600' }
  ];

  const colors = colorSchemes[index] || colorSchemes[0];

  const revealVariants = {
    hidden: {
      clipPath: 'inset(0 100% 0 0)', // Fully hidden from right
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)', // Fully revealed
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden h-full">
      {/* Static background that's always visible */}
      <div className={`${colors.bg} opacity-20 rounded-2xl p-8 h-full flex flex-col`}>
        <div className="flex items-start space-x-4 flex-1">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${colors.iconBg} ${colors.iconColor} opacity-50`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3 opacity-50">{title}</h3>
            <p className="text-white opacity-50 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Animated overlay that reveals content */}
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`absolute inset-0 ${colors.bg} rounded-2xl p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300`}
      >
        <div className="flex items-start space-x-4 flex-1">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${colors.iconBg} ${colors.iconColor}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-white opacity-90 leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}