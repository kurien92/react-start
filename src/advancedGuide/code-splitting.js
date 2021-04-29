import { add } from './advancedGuide/math.js';
import ReactDOM from 'react-dom';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
export { MyComponent as default } from "./advancedGuide/ManyComponents.js"
import MyErrorBoundary from './advancedGuide/MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./advancedGuide/OtherComponent'));
const AnotherComponent = React.lazy(() => import('./advancedGuide/AnotherComponent'));
const Home = lazy(() => import('./advancedGuide/routes/home'));
const About = lazy(() => import('./advancedGuide/routes/About'));
const MyComponent2 = lazy(() => import("./advancedGuide/MyComponent.js"))


console.log(add(16, 26));

// function MyComponent() {
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <section>
//           <OtherComponent />
//           <AnotherComponent />
//         </section>
//       </Suspense>
//     </div>
//   )
// }
    
// const MyComponent = () => (
//   <div>
//     <MyErrorBoundary>
//       <Suspense fallback={<div>Loading...</div>}>
//         <section>
//           <OtherComponent />
//           <AnotherComponent />
//         </section>
//       </Suspense>
//     </MyErrorBoundary>
//   </div>
// )

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(
  App,
  document.getElementById('root')
)
