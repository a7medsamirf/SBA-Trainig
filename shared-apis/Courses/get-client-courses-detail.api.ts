import axiosBase from "@/utils/axios.util";

export const getCourseClientById = async (id: string | number) => {
  try {
    const res = await axiosBase.get(`/courses/${id}`);
    const data = res.data as any;

    console.log(`Course ${id} fetched successfully:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null;
  }
};
