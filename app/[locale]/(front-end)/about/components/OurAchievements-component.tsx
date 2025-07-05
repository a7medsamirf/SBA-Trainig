import React from 'react'
import { SettingsWithMetaResponse } from '@/models/settings.model';

interface OurAchievementsComponentProps {
  meta?: SettingsWithMetaResponse['meta'];
}

const achievementLabels: { key: keyof NonNullable<SettingsWithMetaResponse['meta']>; label: string }[] = [
  { key: 'student', label: 'متدرب' },
  { key: 'courses', label: 'دورة تدريبية' },
  { key: 'initiatives', label: 'مبادرات' },
];

export const OurAchievementsComponent: React.FC<OurAchievementsComponentProps> = ({ meta }) => {
  return (
    <>
      <div className="box-contact-support pl-50 pr-50 background-gray-50 pt-80 pb-50 mt-50 mb-90">
        <div className="row">
          {achievementLabels.map((achievement, index) => (
            <div key={index} className="col-lg-4 mb-20 text-center">
              <h4 className="mb-5 text-color-primary">
                {meta ? `${meta[achievement.key]} +` : '--'}
              </h4>
              <p className="font-md color-gray-700">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

