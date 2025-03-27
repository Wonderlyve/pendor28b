import React from 'react';
import { X, TrendingUp, Calendar, Clock, Trophy, ChevronRight, Percent, LineChart, Users, AlertTriangle } from 'lucide-react';

interface BetProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: {
    id: number;
    match: string;
    competition: string;
    date: string;
    time: string;
    teams: {
      home: string;
      away: string;
      homeForm: string[];
      awayForm: string[];
      homeStats: {
        goalsScored: number;
        goalsConceded: number;
        cleanSheets: number;
      };
      awayStats: {
        goalsScored: number;
        goalsConceded: number;
        cleanSheets: number;
      };
    };
    odds: {
      home: number;
      draw: number;
      away: number;
    };
    analysis: {
      confidence: number;
      mainBet: string;
      reasoning: string[];
      keyStats: string[];
      risks: string[];
    };
    relatedBets: Array<{
      id: number;
      match: string;
      prediction: string;
      odds: number;
      confidence: number;
    }>;
  };
}

export default function Bet({ isOpen, onClose, prediction }: BetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{prediction.match}</h3>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {prediction.date}
                <Clock className="h-4 w-4 ml-2" />
                {prediction.time}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Main Analysis */}
              <div className="space-y-6">
                {/* Confidence Score */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Percent className="h-5 w-5 text-blue-600" />
                      Indice de confiance
                    </h4>
                    <span className="text-2xl font-bold text-blue-600">
                      {prediction.analysis.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${prediction.analysis.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Main Analysis */}
                <div className="bg-white rounded-xl border p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-4">
                    <LineChart className="h-5 w-5 text-gray-700" />
                    Analyse détaillée
                  </h4>
                  <ul className="space-y-3">
                    {prediction.analysis.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Stats */}
                <div className="bg-white rounded-xl border p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Statistiques clés
                  </h4>
                  <ul className="space-y-2">
                    {prediction.analysis.keyStats.map((stat, index) => (
                      <li key={index} className="text-sm text-gray-600">• {stat}</li>
                    ))}
                  </ul>
                </div>

                {/* Risk Assessment */}
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-4 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    Points d'attention
                  </h4>
                  <ul className="space-y-2">
                    {prediction.analysis.risks.map((risk, index) => (
                      <li key={index} className="text-sm text-red-600">• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Team Stats & Related Bets */}
              <div className="space-y-6">
                {/* Team Form */}
                <div className="bg-white rounded-xl border p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-gray-700" />
                    Forme des équipes
                  </h4>
                  
                  {/* Home Team */}
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">{prediction.teams.home}</h5>
                    <div className="flex gap-1">
                      {prediction.teams.homeForm.map((result, index) => (
                        <span
                          key={index}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium ${
                            result === 'W' ? 'bg-green-500' :
                            result === 'D' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div>
                    <h5 className="font-medium mb-2">{prediction.teams.away}</h5>
                    <div className="flex gap-1">
                      {prediction.teams.awayForm.map((result, index) => (
                        <span
                          key={index}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium ${
                            result === 'W' ? 'bg-green-500' :
                            result === 'D' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Bets */}
                <div className="bg-white rounded-xl border p-4">
                  <h4 className="font-semibold mb-4">Autres paris suggérés</h4>
                  <div className="space-y-3">
                    {prediction.relatedBets.map((bet) => (
                      <div
                        key={bet.id}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{bet.match}</span>
                          <span className="text-green-600 font-semibold">
                            {bet.odds}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            Pronostic: {bet.prediction}
                          </span>
                          <span className="text-blue-600">
                            {bet.confidence}% confiance
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer (with full-width button) */}
          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Notre pronostic</p>
                    <p className="text-xl font-bold text-blue-600">{prediction.analysis.mainBet}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cote</p>
                    <p className="text-xl font-bold text-green-600">
                      {prediction.odds[prediction.analysis.mainBet.toLowerCase() as keyof typeof prediction.odds]}
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Parier maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
