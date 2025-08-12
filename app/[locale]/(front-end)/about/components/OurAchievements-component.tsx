import React from 'react'
import { SettingsWithMetaResponse } from '@/models/settings.model';
import { getTranslations } from 'next-intl/server';

interface OurAchievementsComponentProps {
  meta?: SettingsWithMetaResponse['meta'];
}

export const OurAchievementsComponent: React.FC<OurAchievementsComponentProps> = async ({ meta }) => {
  const t = await getTranslations('trans.achievements');
  
  const achievementLabels: { key: keyof NonNullable<SettingsWithMetaResponse['meta']>; label: string }[] = [
    { key: 'student', label: t('trainee') },
    { key: 'courses', label: t('training-course') },
    { key: 'initiatives', label: t('initiatives') },
  ];
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

