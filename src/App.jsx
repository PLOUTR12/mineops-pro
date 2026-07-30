import React, { useState } from 'react';
import {
  Truck,
  HardHat,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  Play,
  CheckCircle2,
  Layers,
  Settings
} from 'lucide-react';

export default function MiningProductionApp() {
  // --- ÉTATS & DONNÉES DE LA MINE ---
  const [activeTab, setActiveTab] = useState('dashboard');

  // Flotte d'équipements (Données démo)
  const [fleet, setFleet] = useState([
    { id: 'CAT-785-01', type: 'Camion', model: 'CAT 785C', zone: 'West Pit PB3', status: 'En service', driver: 'Koka' },
    { id: 'CAT-785-02', type: 'Camion', model: 'CAT 785C', zone: 'West Pit PB3', status: 'En service', driver: 'JO' },
    { id: 'KOM-PC2000-01', type: 'Pelle', model: 'Komatsu PC2000', zone: 'West Pit PB3', status: 'En service', driver: 'Edv Topo' },
    { id: 'CAT-D10-01', type: 'Dozer', model: 'CAT D10T', zone: 'West Pit PB3', status: 'Standby', driver: 'Attente zone' },
    { id: 'CAT-785-03', type: 'Camion', model: 'CAT 785C', zone: 'East Pit', status: 'Maintenance', driver: '-' },
  ]);

  // Paramètres pour le calcul du temps de cycle
  const [cycleParams, setCycleParams] = useState({
    loadTime: 2.5,       // Temps de chargement (min)
    haulTime: 12.0,      // Temps de transport en charge (min)
    dumpTime: 1.0,       // Temps de déchargement (min)
    returnTime: 9.0,     // Temps de retour à vide (min)
    queueTime: 1.5,      // Temps d'attente (min)
    payload: 135,        // Capacité camion (tonnes)
    activeTrucks: 4      // Nombre de camions sur le circuit
  });

  // --- CALCULS DE PERFORMANCE ---
  // Temps de cycle total (minutes)
  const totalCycleTime =
    parseFloat(cycleParams.loadTime) +
    parseFloat(cycleParams.haulTime) +
    parseFloat(cycleParams.dumpTime) +
    parseFloat(cycleParams.returnTime) +
    parseFloat(cycleParams.queueTime);

  // Nb de cycles par camion / heure
  const cyclesPerHourPerTruck = totalCycleTime > 0 ? (60 / totalCycleTime) : 0;

  // Production horaire totale (Tonnes / heure)
  const hourlyProduction = (cyclesPerHourPerTruck * cycleParams.payload * cycleParams.activeTrucks).toFixed(0);

  // Production estimée par poste de 12h (avec un coefficient d'efficience de 85%)
  const shiftProduction = (hourlyProduction * 12 * 0.85).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">

      {/* 1. BARRE DE NAVIGATION SUPÉRIEURE */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg text-slate-950 font-bold">
            <HardHat className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">MineOps Pro</h1>
            <p className="text-xs text-slate-400">Gestion et Suivi de Production Minière</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Poste Jour (07:00 - 19:00)
          </span>
          <span className="text-slate-400">Zone active : <strong className="text-slate-200">West Pit PB3</strong></span>
        </div>
      </header>

      {/* 2. CONTENU PRINCIPAL & ONGLETS */}
      <div className="flex flex-1">

        {/* Menu latéral */}
        <aside className="w-64 bg-slate-800/50 border-r border-slate-700 p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Activity className="h-5 w-5" /> Vue d'ensemble (Dashboard)
          </button>

          <button
            onClick={() => setActiveTab('cycle')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === 'cycle' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Clock className="h-5 w-5" /> Temps de Cycle & Rendement
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === 'fleet' ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Truck className="h-5 w-5" /> Flotte d'Équipements
          </button>
        </aside>

        {/* Zone d'affichage dynamique */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* ================= VUE DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tableau de Bord Operational</h2>

              {/* Cartes KPI */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs font-semibold uppercase">Production Estimée (Shift)</p>
                  <h3 className="text-3xl font-extrabold text-amber-400 mt-2">{Number(shiftProduction).toLocaleString()} t</h3>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Objectif: 12,000 t
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs font-semibold uppercase">Cadence Horaire</p>
                  <h3 className="text-3xl font-extrabold text-slate-100 mt-2">{hourlyProduction} t/h</h3>
                  <p className="text-xs text-slate-400 mt-1">4 camions en circuit</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs font-semibold uppercase">Temps de Cycle Moyen</p>
                  <h3 className="text-3xl font-extrabold text-slate-100 mt-2">{totalCycleTime.toFixed(1)} min</h3>
                  <p className="text-xs text-slate-400 mt-1">Aller-retour + chargement</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs font-semibold uppercase">Disponibilité Flotte</p>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">80 %</h3>
                  <p className="text-xs text-slate-400 mt-1">4 / 5 engins opérationnels</p>
                </div>
              </div>

              {/* Statut de la fosse active */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  Avancement Zone : West Pit PB3
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Extraction Stérile (Waste)</span>
                      <span className="font-semibold">65,000 / 100,000 m³</span>
                    </div>
                    <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Extraction Minerai (Ore)</span>
                      <span className="font-semibold">18,500 / 25,000 t</span>
                    </div>
                    <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VUE TEMPS DE CYCLE ================= */}
          {activeTab === 'cycle' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Calculateur de Temps de Cycle & Productivité</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Formulaire de saisie */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="text-lg font-semibold text-amber-400 border-b border-slate-700 pb-2">
                    Paramètres du Circuit de Transport
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-slate-400 mb-1">Chargement (min)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cycleParams.loadTime}
                        onChange={(e) => setCycleParams({...cycleParams, loadTime: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Transport en charge (min)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cycleParams.haulTime}
                        onChange={(e) => setCycleParams({...cycleParams, haulTime: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Déchargement (min)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cycleParams.dumpTime}
                        onChange={(e) => setCycleParams({...cycleParams, dumpTime: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Retour à vide (min)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cycleParams.returnTime}
                        onChange={(e) => setCycleParams({...cycleParams, returnTime: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Attente / Queuing (min)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cycleParams.queueTime}
                        onChange={(e) => setCycleParams({...cycleParams, queueTime: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Capacité Camion (Tonnes)</label>
                      <input
                        type="number"
                        value={cycleParams.payload}
                        onChange={(e) => setCycleParams({...cycleParams, payload: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Nombre de Camions en Service</label>
                    <input
                      type="number"
                      value={cycleParams.activeTrucks}
                      onChange={(e) => setCycleParams({...cycleParams, activeTrucks: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>
                </div>

                {/* Synthèse des Résultats */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400 border-b border-slate-700 pb-2 mb-4">
                      Résultats des Calculs
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                        <span className="text-slate-400">Temps de cycle total (Tc)</span>
                        <span className="text-xl font-bold">{totalCycleTime.toFixed(2)} min</span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                        <span className="text-slate-400">Cycles par camion / Heure</span>
                        <span className="text-xl font-bold text-amber-400">{cyclesPerHourPerTruck.toFixed(2)} cycles</span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                        <span className="text-slate-400">Rendement Horaires (Flotte)</span>
                        <span className="text-2xl font-extrabold text-emerald-400">{hourlyProduction} t/h</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700/50 mt-6">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      💡 <strong>Note Opérationnelle :</strong> Réduire le temps d'attente (Queuing) de 1 minute permet d'augmenter la production horaire globale d'environ {((1 / totalCycleTime) * 100).toFixed(1)}%.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= VUE FLOTTE ================= */}
          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestion des Équipements & Affectations</h2>
                <button className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm hover:bg-amber-400 transition">
                  + Affecter un engin
                </button>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="p-4">Identifiant</th>
                      <th className="p-4">Type & Modèle</th>
                      <th className="p-4">Zone d'Affectation</th>
                      <th className="p-4">Opérateur / Contact</th>
                      <th className="p-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {fleet.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-700/50 transition">
                        <td className="p-4 font-mono font-bold text-amber-400">{item.id}</td>
                        <td className="p-4">{item.model}</td>
                        <td className="p-4">{item.zone}</td>
                        <td className="p-4 text-slate-300">{item.driver}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'En service'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.status === 'Standby'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
