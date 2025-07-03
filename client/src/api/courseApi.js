export const fetchCourseById = async (courseId) => {
  const res = await fetch(`/api/courses/${courseId}`);
  if (!res.ok) throw new Error("Course not found");
  return res.json();
};
