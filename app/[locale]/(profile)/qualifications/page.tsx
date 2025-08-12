import React from "react";
import QualificationsFormComponent from "./components/QualificationsForm-component";
import {
  getLanguageLevels,
  getEducationDegree,
  getCurrentUser,
} from "@/shared-apis";

const QualificationsPage = async () => {
  const languageLevelsResponse = await getLanguageLevels();
  const languageLevels = languageLevelsResponse?.data || [];

  const educationDegreesResponse = await getEducationDegree();
  const educationDegrees = educationDegreesResponse?.data || [];

  const user = await getCurrentUser();

  return (
    <>
      <div className="border-0 card custom-border-radius">
        <div className="p-4 card-body">
          <div className="profile-content-item">
            <QualificationsFormComponent
              languageLevels={languageLevels}
              educationDegrees={educationDegrees}
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QualificationsPage;
