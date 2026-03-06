import './App.css'
import ChatBot from './components/ui/chat/ChatBot';
import { ReviewTargetType } from './components/ui/reviews/reviews.types';
import ReviewsOverview from './components/ui/reviews/ReviewsOverview';

function App() {
  return (
    <div className="p-4 h-screen w-full" >
      <ReviewsOverview
        targetId={'01994A49-26CC-7E07-9757-D876C3B384B6'}
        targetType={ReviewTargetType.Clinic}
      />
    </div>
  )
}

export default App
