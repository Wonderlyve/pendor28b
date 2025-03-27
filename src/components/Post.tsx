import React, { useState } from 'react';
import { Star, MessageCircle, Share2, ThumbsUp, Calendar, Clock, Trophy, ChevronDown, ChevronUp, X } from 'lucide-react';

interface PostProps {
  post: {
    id: number;
    text: string;
    date: string;
    time: string;
    odds: number;
    confidence: number;
    expert: string;
    expertRating: number;
    expertImage: string;
    image: string | null;
    likes: number;
    comments: number;
    shares: number;
    matches?: Array<{
      team1: string;
      team2: string;
      betType: string;
      prediction: string;
    }>;
  };
  onOpenBetModal: (prediction: any) => void;
}

const MAX_CHARS = 200;

export default function Post({ post, onOpenBetModal }: PostProps) {
  const [expanded, setExpanded] = useState(false);
  const [showMatchesModal, setShowMatchesModal] = useState(false);
  const shouldTruncate = post.text.length > MAX_CHARS;
  
  // Fonction pour formater le texte avec les équipes et les tags en bleu
  const formatText = (text: string) => {
    // Diviser le texte en segments pour traiter les tags et les équipes
    const segments = text.split(/(\s+)/).map((segment, index) => {
      if (segment.startsWith('#')) {
        // Mettre en forme les tags
        return (
          <span key={index} className="text-blue-600">
            {segment}
          </span>
        );
      }
      // Vérifier si le segment est une équipe du match
      const isTeam = post.matches?.some(
        match => match.team1 === segment || match.team2 === segment
      );
      if (isTeam) {
        return (
          <span key={index} className="text-blue-600">
            {segment}
          </span>
        );
      }
      return segment;
    });

    return expanded ? segments : segments.slice(0, MAX_CHARS);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3">
        <img 
          src={post.expertImage}
          alt={post.expert}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{post.expert}</h3>
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{post.expertRating}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
            <Clock className="h-4 w-4" />
            <span>{post.time}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-2 text-sm whitespace-pre-line">
          {formatText(post.text)}
          {shouldTruncate && !expanded && "..."}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            {expanded ? (
              <>
                Voir moins
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Lire la suite
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3 mt-2">
          <span>Côte totale:</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{post.odds}</span>
        </div>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="aspect-video relative">
          <img 
            src={post.image} 
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Prediction Info */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span className="font-medium">Confiance</span>
          </div>
          <span className="text-green-600 font-medium">{post.confidence}%</span>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <ThumbsUp className="h-5 w-5" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <Share2 className="h-5 w-5" />
            <span>{post.shares}</span>
          </button>
          <button 
            onClick={() => setShowMatchesModal(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            Voir l'analyse
          </button>
        </div>
      </div>

      {/* Matches Modal */}
      {showMatchesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Détails des Matchs</h3>
              <button 
                onClick={() => setShowMatchesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {post.matches?.map((match, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {match.team1} vs {match.team2}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Type de pari: {match.betType}</p>
                    <p>Pronostic: {match.prediction}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowMatchesModal(false);
                  onOpenBetModal(post);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voir l'analyse complète
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}