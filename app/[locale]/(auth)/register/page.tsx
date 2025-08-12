import React from 'react';
import RegisterForm from './components/RegisterForm';
import { getNationalities , getGenders , getAgeCategories, getLanguageLevels, getEducationDegree } from '@/shared-apis';

export default async function RegisterPage() {
  const nationalitiesResponse = await getNationalities();
  const nationalities = nationalitiesResponse?.data || [];
  
  const gendersResponse = await getGenders();
  const genders = gendersResponse?.data || [];

  const agectegoriesResponse = await getAgeCategories();
  const agectegories = agectegoriesResponse?.data || [];

  const languageLevelsResponse = await getLanguageLevels();
  const languageLevels = languageLevelsResponse?.data || [];

  const educationDegreesResponse = await getEducationDegree();
  const educationDegrees = educationDegreesResponse?.data || [];

  return (
    <RegisterForm 
      nationalities={nationalities} 
      genders={genders} 
      agectegories={agectegories}
      languageLevels={languageLevels}
      educationDegrees={educationDegrees}
    />
  );
}