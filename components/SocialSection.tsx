import React, { useState } from 'react';
import { PlayData, Review } from '../types';
import { Share2, Send, Star, User } from 'lucide-react';

interface SocialSectionProps {
  play: PlayData;
}

const SocialSection: React.FC<SocialSectionProps> = ({ play }) => {
  const [reviews, setReviews] = useState<Review[]>(play.reviews);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [username, setUsername] = useState('');

  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    const url = window.location.href;
    const text = `Explore the world of "${play.title}" in this amazing digital opera exhibition!`;
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;

    const review: Review = {
        id: Date.now().toString(),
        user: username,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        rating: newRating
    };

    setReviews([review, ...reviews]);
    setNewComment('');
    setUsername('');
  };

  return (
    <div className="my-16 border-t border-stone-300 pt-12">
        
        {/* Sharing Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white/40 p-6 rounded-xl border border-stone-200">
            <div>
                 <h3 className="text-2xl font-serif font-bold text-opera-ink mb-1">分享剧目 Share This Play</h3>
                 <p className="text-sm text-stone-500">Spread the beauty of Cantonese Opera</p>
            </div>
           
            <div className="flex gap-3">
                <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-full hover:bg-opacity-90 transition-all font-sans text-sm font-bold shadow-sm"
                >
                    Twitter
                </button>
                 <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-full hover:bg-opacity-90 transition-all font-sans text-sm font-bold shadow-sm"
                >
                    Facebook
                </button>
                 <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-700 text-white rounded-full hover:bg-stone-800 transition-all font-sans text-sm font-bold shadow-sm"
                >
                    <Share2 size={16} />
                    Copy Link
                </button>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review Form */}
            <div className="md:col-span-1 bg-opera-paper p-6 rounded-lg shadow-inner border border-stone-200 h-fit">
                <h4 className="text-xl font-bold text-opera-red mb-4 flex items-center gap-2">
                    <span className="text-2xl">✍️</span> 
                    留言 Review
                </h4>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Name</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded p-2 focus:outline-none focus:border-opera-gold"
                            placeholder="Your name"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Rating</label>
                        <div className="flex gap-1 text-opera-gold">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star} 
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    className={`focus:outline-none transition-transform hover:scale-110 ${star <= newRating ? 'fill-current' : 'text-stone-300'}`}
                                >
                                    <Star size={20} fill={star <= newRating ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Comment</label>
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded p-2 focus:outline-none focus:border-opera-gold h-24 resize-none"
                            placeholder="Share your thoughts..."
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-opera-ink text-opera-gold font-bold py-2 rounded hover:bg-opera-red transition-colors flex items-center justify-center gap-2"
                    >
                        <Send size={16} />
                        Post Review
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2 space-y-4">
                <h4 className="text-xl font-bold text-opera-ink mb-4">戏迷热议 Community</h4>
                {reviews.length === 0 ? (
                    <div className="text-center py-10 text-stone-400 italic bg-white/50 rounded-lg">
                        No reviews yet. Be the first to share!
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white p-5 rounded-lg shadow-sm border border-stone-100 flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500">
                                <User size={20} />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="font-bold text-opera-ink mr-2">{review.user}</span>
                                        <span className="text-xs text-stone-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-opera-gold">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-stone-700 text-sm leading-relaxed">{review.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default SocialSection;