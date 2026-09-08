import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, Activity, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { POPULAR_SYMPTOM_CHIPS, matchSymptomToRegion, ANATOMY_REGIONS } from '../../data/anatomyData';

/**
 * SymptomSearchBar:
 * "Where does it hurt?" Intelligent Medical Symptom Triage Bar.
 * - Real-time symptom-to-specialty inference
 * - Highlights corresponding anatomical region on the 3D model
 * - Quick-selection symptom chips for immediate booking flow entry
 */
export default function SymptomSearchBar({
  onSelectRegion,
  onHoverRegion,
  activeRegion,
}) {
  const [query, setQuery] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Evaluate query against symptom matching dictionary
  useEffect(() => {
    if (!query.trim()) {
      setMatchResult(null);
      return;
    }
    const result = matchSymptomToRegion(query);
    setMatchResult(result);

    if (result && result.region) {
      onHoverRegion(result.region);
    }
  }, [query, onHoverRegion]);

  const handleSelectChip = (chip) => {
    setQuery(chip.symptom);
    const target = ANATOMY_REGIONS.find(r => r.id === chip.regionId);
    if (target) {
      onSelectRegion(target);
    }
  };

  const handleConfirmSuggestion = () => {
    if (matchResult?.region) {
      onSelectRegion(matchResult.region);
      setQuery('');
      setMatchResult(null);
    }
  };

  const handleClear = () => {
    setQuery('');
    setMatchResult(null);
    onHoverRegion(null);
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto relative z-30 space-y-4">
      
      {/* Label and Diagnostic Pill Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00C2CB] animate-pulse" />
          <label
            htmlFor="symptom-input"
            className="text-sm sm:text-base font-extrabold tracking-tight text-[#0B2438] dark:text-white"
          >
            Where does it hurt?
          </label>
        </div>
        <span className="text-[11px] font-semibold text-[#4A6278] dark:text-gray-400">
          Describe any pain, symptom, or department
        </span>
      </div>

      {/* Main Glass Search Bar */}
      <div
        className={`relative flex items-center bg-white/90 dark:bg-[#0E243A]/90 backdrop-blur-xl rounded-full border transition-all duration-300 shadow-lg ${
          isFocused || query
            ? 'border-[#2F80ED] ring-4 ring-blue-500/15 shadow-[0_12px_40px_rgba(47,128,237,0.2)]'
            : 'border-white/90 dark:border-blue-900/60 shadow-[0_8px_30px_rgba(11,36,56,0.06)]'
        }`}
      >
        <div className="pl-5 text-[#2F80ED]">
          <Search className="w-5 h-5" />
        </div>

        <input
          id="symptom-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder="e.g. Chest pain, migraine, knee stiffness, blurry vision..."
          className="w-full py-4 pl-3 pr-24 bg-transparent text-sm sm:text-base font-semibold text-[#0B2438] dark:text-white placeholder:text-gray-400 focus:outline-none"
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleConfirmSuggestion}
          disabled={!matchResult}
          className={`mr-2 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md ${
            matchResult
              ? 'bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:opacity-95 cursor-pointer shadow-blue-500/30 hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Find Specialist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Real-time Intelligent Recommendation Dropdown Card */}
      {matchResult && (
        <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-blue-200/80 dark:border-blue-800 shadow-[0_16px_50px_rgba(47,128,237,0.22)] animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
              style={{ backgroundColor: matchResult.region.color }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2F80ED] dark:text-blue-400">
                  Recommended Specialty
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                  High Confidence Match
                </span>
              </div>
              <h4 className="text-lg font-black text-[#0B2438] dark:text-white leading-tight">
                {matchResult.region.specialty} ({matchResult.region.name})
              </h4>
              <p className="text-xs text-[#4A6278] dark:text-gray-300">
                Symptom matched: <span className="font-bold underline">{matchResult.matchedSymptom}</span> · {matchResult.region.availableDoctorsCount} Certified Specialists Available
              </p>
            </div>
          </div>

          <button
            onClick={handleConfirmSuggestion}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:opacity-95 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-105"
          >
            <span>Book {matchResult.region.specialty}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Popular Symptom Quick-Action Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-bold text-[#4A6278] dark:text-gray-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
          Common Symptoms:
        </span>
        {POPULAR_SYMPTOM_CHIPS.map((chip, idx) => {
          const isCurrentActive = activeRegion?.id === chip.regionId;
          return (
            <button
              key={idx}
              onClick={() => handleSelectChip(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border ${
                isCurrentActive
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/30 scale-105'
                  : 'bg-white/80 dark:bg-[#0E243A]/70 text-[#0B2438] dark:text-gray-200 border-white/90 dark:border-blue-900/50 hover:border-blue-300 hover:bg-white dark:hover:bg-[#152F48] shadow-sm'
              }`}
            >
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
