import React, { useState } from 'react';
import AdBanner from '../components/AdBanner';
import EnergyDrinkAd from '../components/EnergyDrinkAd';
import Bet from '../components/Bet';
import Post from '../components/Post';
import { usePosts } from '../context/PostContext';

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const { posts } = usePosts();

  const handleOpenBetModal = (match: any) => {
    setSelectedMatch(match);
    setIsBetModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdBanner className="w-full" variant="bonus" />
      
      <div className="space-y-6">
        {posts.map(post => (
          <Post 
            key={post.id} 
            post={post}
            onOpenBetModal={handleOpenBetModal}
          />
        ))}
      </div>

      <EnergyDrinkAd className="w-full" />

      {selectedMatch && (
        <Bet
          isOpen={isBetModalOpen}
          onClose={() => setIsBetModalOpen(false)}
          prediction={selectedMatch}
        />
      )}
    </div>
  );
}