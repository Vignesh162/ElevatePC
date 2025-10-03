export default function BenefitCard({ title, description, icon, index }) {
  const colorSchemes = [
    { bg: 'bg-gradient-to-br from-blue-600 to-blue-800', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { bg: 'bg-gradient-to-br from-purple-600 to-purple-800', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { bg: 'bg-gradient-to-br from-green-600 to-green-800', iconBg: 'bg-green-100', iconColor: 'text-green-600' }
  ];

  const colors = colorSchemes[index] || colorSchemes[0];

  return (
    <div className={`${colors.bg} rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col`}>
      <div className="flex items-start space-x-4 flex-1">
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${colors.iconBg} ${colors.iconColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-white opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}