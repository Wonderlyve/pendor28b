import React, { createContext, useContext, useState } from 'react';

interface Post {
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
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'shares' | 'expert' | 'expertRating' | 'expertImage'>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const defaultExpertInfo = {
  expert: "Expert Pronos",
  expertRating: 4.8,
  expertImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
};

// Sample post
const samplePost = {
  id: 1,
  text: "🔥 ANALYSE LIGUE DES CHAMPIONS 🔥\n\n#LDC #PSG #Barcelone\n\nPSG vs Barcelone - Quart de finale aller\n\nAprès une phase de groupe maîtrisée et une qualification convaincante face à la Real Sociedad, le PSG accueille le Barça pour ce choc des quarts. Les Parisiens sont en grande forme en championnat avec 6 victoires consécutives. Mbappé est au top avec 3 buts sur ses 2 derniers matchs.\n\nLe Barça reste sur 4 victoires de suite mais n'a plus le même niveau qu'à ses grandes heures. Leur défense a montré des signes de faiblesse à l'extérieur.\n\nJe vois le PSG s'imposer dans un match avec des buts.",
  date: "2024-03-31",
  time: "15:30",
  odds: 2.15,
  confidence: 85,
  expert: "Expert Pronos",
  expertRating: 4.8,
  expertImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800",
  likes: 156,
  comments: 24,
  shares: 18,
  matches: [
    {
      team1: "PSG",
      team2: "Barcelone",
      betType: "1X2",
      prediction: "1"
    }
  ]
};

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([samplePost]);

  const addPost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'shares' | 'expert' | 'expertRating' | 'expertImage'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      ...defaultExpertInfo,
    };

    setPosts(currentPosts => [post, ...currentPosts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}