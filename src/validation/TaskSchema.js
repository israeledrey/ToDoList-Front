import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  name: yup
    .string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters")
    .max(50, "Task name can't exceed 50 characters"),

  subject: yup
    .string()
    .oneOf(["Work", "leisure", "Studies"], "Invalid subject selected")
    .required("Subject is required"),

  dayToComplete: yup
    .date()
    .required("Day to complete is required")
    .min(new Date(), "Date must be in the future"),

  priority: yup
    .string()
    .matches(/^\d{1,3}%$/, "Priority must be a percentage (e.g., 20%)")
    .test("valid-percentage", "Priority must be between 0% and 100%", (value) => {
      const num = parseInt(value, 10);
      return num >= 0 && num <= 100;
    })
    .required("Priority is required"),

  completed: yup.boolean().default(false),

  location: yup.array()
    .of(yup.number().typeError("Each location value must be a number"))
    .min(2, "Location must have at least latitude and longitude")
    .max(2, "Location should contain only latitude and longitude")
    .required("Location is required"),
});
