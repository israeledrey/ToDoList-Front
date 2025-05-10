import * as yup from 'yup';

const geoJsonSchema = yup.object({
  type: yup
    .string()
    .oneOf(["FeatureCollection"], "Location must be a FeatureCollection")
    .required("GeoJSON type is required"),

  features: yup
    .array()
    .of(
      yup.object({
        type: yup
          .string()
          .oneOf(["Feature"], "Each feature must be of type Feature")
          .required("Feature type is required"),

        geometry: yup
          .object({
            type: yup
              .string()
              .oneOf(["Point"], "Geometry must be of type Point")
              .required("Geometry type is required"),

            coordinates: yup
              .array()
              .of(yup.number().typeError("Coordinates must be numbers"))
              .length(2, "Coordinates must contain exactly [longitude, latitude]")
              .required("Coordinates are required"),
          })
          .required("Geometry is required"),

        properties: yup.object(), 
      })
    )
    .min(1, "GeoJSON must contain at least one feature")
    .required("Features array is required"),
});



export const taskSchema = yup.object().shape({
  name: yup
    .string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters")
    .max(50, "Task name can't exceed 50 characters"),

  subject: yup
    .string()
    .oneOf(["Work", "Leisure", "Studies"], "Invalid subject selected")
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

  location: geoJsonSchema.required("Location is required"),
});