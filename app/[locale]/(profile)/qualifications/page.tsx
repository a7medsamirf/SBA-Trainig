import React from 'react'
import QualificationsFormComponent from './components/QualificationsForm-component';
import { getLanguageLevels, getEducationDegree } from "@/shared-apis";

const QualificationsPage = async () => {

  const languageLevelsResponse = await getLanguageLevels();
  const languageLevels = languageLevelsResponse?.data || [];
  
  const educationDegreesResponse = await getEducationDegree();
  const educationDegrees = educationDegreesResponse?.data || [];

  return (
    <>
      <div className="card border-0 custom-border-radius">
        <div className="card-body p-4">
        <div className="profile-content-item">
              <QualificationsFormComponent
                  languageLevels={languageLevels}
                  educationDegrees={educationDegrees}
              />
        </div>
        </div>
      </div>
    </>
  );
}

export default QualificationsPage

