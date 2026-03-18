import './App.css'
import { ReviewTargetType } from './components/ui/reviews/reviews.types';
import ReviewsOverview from './components/ui/reviews/ReviewsOverview';

function App() {
  return (
    <div className="p-4 h-screen w-full" >
      <ReviewsOverview
        targetId={'01992CC9-6436-730D-BD16-C90F206B7C7B'}
        targetType={ReviewTargetType.Clinic}
      />
    </div>
  )
}

export default App
