import "./App.css";
import BackToCCPS530 from "./components/BackToCCPS530";
import ProjectInfo from "./components/ProjectInfo";
import LoginForm from "./components/LoginForm";
import CourseInfo from "./components/CourseInfo";
import UniversityInfo from "./components/UniversityInfo";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className='App'>
      <BackToCCPS530 />
      <div className='container container-fluid'>
        <ProjectInfo />
        <LoginForm />
        <CourseInfo />
        <UniversityInfo />
        <Footer />
      </div>
    </div>
  );
}

export default App;
