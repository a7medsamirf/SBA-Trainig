import "./../profile.scss";
import DeleteAccountComponents from "./components/DeleteAccount-components";
import ProfileFormComponent from "./components/ProfileForm-component";
import { getNationalities, getGenders, getAgeCategories } from "@/shared-apis";

const ProfilePage = async () => {
  // Fetch required data
  const nationalitiesResponse = await getNationalities();
  const nationalities = nationalitiesResponse?.data || [];
  
  const gendersResponse = await getGenders();
  const genders = gendersResponse?.data || [];

  const ageCategoriesResponse = await getAgeCategories();
  const ageCategories = ageCategoriesResponse?.data || [];

  return (
    <div className="card border-0 custom-border-radius h-100">
         <div className="card-header bg-white border-0 custom-border-radius p-4">
          <div className="profile-content-item-header d-flex align-items-center justify-content-between">
            <h4 className="fw-bold color-gray-900">الملف الشخصي </h4>
              <button className='btn btn-primary'>تعديل البيانات</button>
          </div>
        </div>

      <div className="card-body p-4 ">
        <div className="profile-content-item">
          <ProfileFormComponent 
            nationalities={nationalities}
            genders={genders}
            ageCategories={ageCategories}
          />
        </div>
      </div>
      <div className="card-footer bg-white border-0 custom-border-radius p-4">
      <DeleteAccountComponents /> 
      </div>
    </div>
  );
};

export default ProfilePage;
