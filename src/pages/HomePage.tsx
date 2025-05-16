import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setCurrentPage } = useAppContext();
  
  const handleCompanyClick = () => {
    setUser({ type: 'company' });
    setCurrentPage('companyForm');
    navigate('/company/register');
  };
  
  const handleStudentClick = () => {
    setUser({ type: 'student' });
    setCurrentPage('studentForm');
    navigate('/student/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <Logo size="large" vertical withSubtitle />
        
        <div className="w-full mt-16 space-y-4">
          <Button
            variant="gradient"
            size="large"
            fullWidth
            onClick={handleCompanyClick}
            className="shadow-lg"
          >
            <span className="text-xl">我是企業主</span>
            <ChevronRight className="ml-2" size={24} />
          </Button>
          
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={handleStudentClick}
            className="shadow-lg"
          >
            <span className="text-xl">我是學生</span>
            <ChevronRight className="ml-2" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;