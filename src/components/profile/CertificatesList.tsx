
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Certificate {
  id: string;
  title: string;
  date: string;
  image: string;
}

interface CertificatesListProps {
  certificates: Certificate[];
}

const CertificatesList: React.FC<CertificatesListProps> = ({ certificates }) => {
  const navigate = useNavigate();
  
  if (certificates.length === 0) {
    return (
      <Card className="bg-black mb-6">
        <CardContent className="p-6 text-center">
          <Award className="mx-auto h-10 w-10 text-gray-500 mb-2" />
          <h3 className="font-bold">No Certificates Yet</h3>
          <p className="text-gray-400 text-sm mb-4">Complete a course to earn your first certificate</p>
          <Button 
            className="mx-auto"
            onClick={() => navigate('/dashboard')}
          >
            Go to Courses
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {certificates.map((cert) => (
        <Card key={cert.id} className="bg-black">
          <div className="h-32 overflow-hidden">
            <img 
              src={cert.image} 
              alt={cert.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold">{cert.title}</h3>
            <p className="text-sm text-gray-400">Issued on {cert.date}</p>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CertificatesList;
