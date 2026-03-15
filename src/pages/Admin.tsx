import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Settings, Bell, Search } from 'lucide-react';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Menu Principal</h2>
          <nav className="space-y-2">
            {[
              { icon: Calendar, label: 'Réservations', active: true },
              { icon: Users, label: 'Clients', active: false },
              { icon: DollarSign, label: 'Revenus', active: false },
              { icon: Settings, label: 'Paramètres', active: false },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  item.active 
                    ? 'bg-brand-purple/10 text-brand-purple' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Admin Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Bienvenue dans l'espace d'administration RSCarWash.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
                  />
                </div>
                <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Réservations du jour", value: "12", trend: "+20%", icon: Calendar, color: "text-blue-500", bg: "bg-blue-100" },
                { title: "Nouveaux Clients", value: "48", trend: "+12%", icon: Users, color: "text-brand-purple", bg: "bg-brand-purple/20" },
                { title: "Revenu Mensuel", value: "3,240 €", trend: "+8%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-100" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={24} />
                    </div>
                    <span className="text-sm font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                  </div>
                  <h3 className="text-gray-500 font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Reservations Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Réservations Récentes</h3>
                <button className="text-sm font-medium text-brand-purple hover:text-brand-blue transition-colors">Voir tout</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="px-6 py-4 font-medium">Client</th>
                      <th className="px-6 py-4 font-medium">Prestation</th>
                      <th className="px-6 py-4 font-medium">Date & Heure</th>
                      <th className="px-6 py-4 font-medium">Statut</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: "Sophie Martin", service: "Lavage Complet", date: "Aujourd'hui, 14:30", status: "Confirmé", statusColor: "bg-emerald-100 text-emerald-700" },
                      { name: "Lucas Bernard", service: "Lavage Extérieur", date: "Aujourd'hui, 16:00", status: "En attente", statusColor: "bg-amber-100 text-amber-700" },
                      { name: "Emma Petit", service: "Pressing Sièges", date: "Demain, 09:00", status: "Confirmé", statusColor: "bg-emerald-100 text-emerald-700" },
                      { name: "Thomas Dubois", service: "Lavage Intérieur", date: "Demain, 11:30", status: "Annulé", statusColor: "bg-red-100 text-red-700" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                        <td className="px-6 py-4 text-gray-600">{row.service}</td>
                        <td className="px-6 py-4 text-gray-600">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-brand-purple transition-colors">Éditer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
