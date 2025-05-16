import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

const CompanyRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyFormData, setCompanyFormData, setCurrentPage } = useAppContext();
  
  const [formData, setFormData] = useState({
    companyName: companyFormData.companyName || '',
    contactPerson: companyFormData.contactPerson || '',
    email: companyFormData.email || '',
    industry: companyFormData.industry || '',
    description: companyFormData.description || '',
    password: companyFormData.password || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyFormData(formData);
    setCurrentPage('companyChat');
    navigate('/company/chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="公司名稱"
            placeholder="請輸入公司名稱"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          
          <Input
            label="聯絡人姓名"
            placeholder="請輸入聯絡人姓名"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
          
          <Input
            label="電子郵件"
            type="email"
            placeholder="請輸入電子郵件"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            label="產業類別"
            placeholder="請選擇或輸入產業類別"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
          
          <Input
            label="公司簡介"
            placeholder="請簡短描述公司特色與文化"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          
          <Input
            label="設定密碼 / 第三方登入"
            type="password"
            placeholder="設定密碼或選擇第三方登入"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
            >
              <span className="text-lg">下一步</span>
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterPage;