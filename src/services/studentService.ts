// studentService.ts

export const studentService = {
  getAllStudents: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/students`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }
    const data = await response.json();
    console.log("Here I am ", data);
    return data;
  },
};
