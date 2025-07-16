import { getCurrentUser } from "@/shared-apis/auth/get-current-user.api";
import "./../profile.scss";
import DeleteAccountComponents from "./components/DeleteAccount-components";
import { getNationalities, getGenders, getAgeCategories } from "@/shared-apis";
import UpdateProfile from "./components/UpdateProfile-component";

const ProfilePage = async () => {
  // Fetch required data
  const nationalitiesResponse = await getNationalities();
  const nationalities = nationalitiesResponse?.data || [];

  const gendersResponse = await getGenders();
  const genders = gendersResponse?.data || [];

  const ageCategoriesResponse = await getAgeCategories();
  const ageCategories = ageCategoriesResponse?.data || [];

  const user = await getCurrentUser();

  return (
    <div className="border-0 card custom-border-radius h-100">
      <UpdateProfile
        ageCategories={ageCategories}
        genders={genders}
        nationalities={nationalities}
        user={user}
      />
      <div className="p-4 bg-white border-0 card-footer custom-border-radius">
        <DeleteAccountComponents />
      </div>
    </div>
  );
};

export default ProfilePage;
