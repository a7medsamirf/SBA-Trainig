import axiosBase from "@/utils/axios.util";

export const getCourseFeedback = async (course_id: number) => {
try {
  const res = await axiosBase.get(`/feedback/${course_id}`);
  return res.data;
} catch (error) {
  console.log("error fetching course feedback:", error);
  return null;
}
};
