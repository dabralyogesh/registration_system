// courseService.ts

export const courseService = {
  getAllCourses: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    return data;
  },
};
