import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import {
  MapPin, AlertTriangle, ShieldCheck, Activity,
  Layers, Users, Eye, Maximize2, Compass, ArrowRight
} from 'lucide-react';

const GisMineMap = () => {
  const { gisZones, openSiteDrawer, openActionDetail } = useManager();
  const [selectedLayer, setSelectedLayer] = useState('all'); // 'all' | 'sensors' | 'hazards' | 'crews'

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <MapPin className="w-4 h-4" />

            <span>WCL Coal Hazard Surveillance Map</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mine Map
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Topographic visualization of underground face workings, opencast extraction benches, haul networks, and telemetry nodes.
          </p>
        </div>

        {/* Map Layers */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {['all', 'sensors', 'hazards', 'crews'].map(l => (
            <button
              key={l}
              onClick={() => setSelectedLayer(l)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${selectedLayer === l ? 'bg-[#0f4c81] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
            >
              {l} Layer
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="bg-[#1b2631] rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative h-[520px] flex items-center justify-center">

        {/* Real Chandrapur Map Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/chandrapur_mines_map.png"
            alt="Chandrapur Regional Map"
            className="w-full h-full object-cover"
          />
        </div>



        {/* Zone Pins on Map */}
        <div className="absolute inset-0 p-8">
          {gisZones.map((zone) => {
            const isHigh = zone.riskLevel === 'High';
            return (
              <div
                key={zone.id}
                onClick={() => openSiteDrawer(zone.id)}
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`
                }}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
              >
                <div className="relative flex items-center justify-center">
                  {isHigh && (
                    <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-75" />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border-2 text-white font-bold text-sm transition-transform group-hover:scale-125 ${isHigh ? 'bg-red-600 border-white ring-4 ring-red-500/30' :
                      zone.riskLevel === 'Medium' ? 'bg-amber-500 border-white ring-4 ring-amber-500/30' :
                        'bg-emerald-600 border-white ring-4 ring-emerald-500/30'
                    }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                {/* Always-Visible Compact Card */}
                <div className="mt-2 bg-slate-950/90 text-white px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-xl text-center whitespace-nowrap group-hover:border-yellow-400 transition-colors">
                  <div className="text-[11px] font-bold">{zone.name}</div>
                  <div className="text-[10px] text-slate-300">
                    Risk: <span className={isHigh ? 'text-red-400 font-bold' : 'text-slate-300'}>{zone.riskScore || 0}/100</span> · {zone.workers} Personnel
                  </div>
                  {selectedLayer === 'sensors' && zone.sensors && (
                    <div className="text-[9px] text-yellow-300 font-mono mt-0.5">
                      CH4: {zone.sensors.methaneCH4 || 'N/A'} · Air: {zone.sensors.airVelocity || 'N/A'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-xs p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 z-10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Spatial Legend</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-600 border border-white" />
              High Risk (Pit 4, Dump 2, South Quarry)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" />
              Medium Risk (Haul Road B, CHP-1)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white" />
              Normal Cut (Pit 1 & 2)
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            Click on any zone marker to open real-time telemetry, active hazards, and open corrective actions.
          </div>
        </div>

      </div>

      {/* Quick Zone Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gisZones.slice(0, 3).map((zone) => (
          <div
            key={zone.id}
            onClick={() => openSiteDrawer(zone.id)}
            className="bg-white rounded-xl p-4 border border-slate-200/90 hover:border-[#0f4c81] shadow-xs hover:shadow-sm transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0f4c81]">{zone.name}</h3>
              <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${zone.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                {zone.riskLevel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{zone.status}</p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">{zone.workers} Active Crew</span>
              <span className="text-[#0f4c81] font-bold flex items-center gap-1">
                <span>View Telemetry</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GisMineMap;
